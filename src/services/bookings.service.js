import { BookingsRepository } from '../repositories/bookings.repository.js';
import { ServicesRepository } from '../repositories/services.repository.js';
import { HttpError } from '../utils/http-error.js';

export class BookingsService {
  constructor(
    repository = new BookingsRepository(),
    servicesRepository = new ServicesRepository()
  ) {
    this.repository = repository;
    this.servicesRepository = servicesRepository;
  }

  async #getBookingOrFail(bid) {
    const booking = await this.repository.getById(bid);
    if (!booking) throw new HttpError(404, 'Reserva no encontrada');
    return booking;
  }

  async #getAvailableServiceOrFail(sid) {
    const service = await this.servicesRepository.getById(sid);
    if (!service) throw new HttpError(404, 'Servicio no encontrado');
    if (!service.available) throw new HttpError(400, 'El servicio no está disponible');
    return service;
  }

  #cleanItems(booking) {
    return booking.services.map((item) => ({
      service: item.service,
      quantity: item.quantity
    }));
  }

  #findItemIndex(items, sid) {
    return items.findIndex((item) => item.service.toString() === sid);
  }

  async getBookings() {
    return this.repository.getAll();
  }

  async createBooking(data) {
    const quantities = new Map();
    for (const item of data.services ?? []) {
      quantities.set(item.service, (quantities.get(item.service) ?? 0) + item.quantity);
    }

    const services = [];
    for (const [sid, quantity] of quantities) {
      await this.#getAvailableServiceOrFail(sid);
      services.push({ service: sid, quantity });
    }

    const booking = await this.repository.create({ ...data, services });
    return this.repository.getByIdPopulated(booking._id);
  }

  async getBookingById(bid) {
    const booking = await this.repository.getByIdPopulated(bid);
    if (!booking) throw new HttpError(404, 'Reserva no encontrada');
    return booking;
  }

  async addServiceToBooking(bid, sid, quantity = 1) {
    const booking = await this.#getBookingOrFail(bid);
    await this.#getAvailableServiceOrFail(sid);

    const items = this.#cleanItems(booking);
    const index = this.#findItemIndex(items, sid);

    if (index === -1) {
      items.push({ service: sid, quantity });
    } else {
      items[index].quantity += quantity;
    }

    await this.repository.updateServices(bid, items);
    return this.repository.getByIdPopulated(bid);
  }

  async updateServiceQuantity(bid, sid, quantity) {
    const booking = await this.#getBookingOrFail(bid);
    const items = this.#cleanItems(booking);
    const index = this.#findItemIndex(items, sid);

    if (index === -1) throw new HttpError(404, 'El servicio no está en la reserva');

    items[index].quantity = quantity;
    await this.repository.updateServices(bid, items);
    return this.repository.getByIdPopulated(bid);
  }

  async removeServiceFromBooking(bid, sid) {
    const booking = await this.#getBookingOrFail(bid);
    const items = this.#cleanItems(booking);
    const index = this.#findItemIndex(items, sid);

    if (index === -1) throw new HttpError(404, 'El servicio no está en la reserva');

    items.splice(index, 1);
    await this.repository.updateServices(bid, items);
    return this.repository.getByIdPopulated(bid);
  }

  async clearBookingServices(bid) {
    await this.#getBookingOrFail(bid);
    await this.repository.updateServices(bid, []);
    return this.repository.getByIdPopulated(bid);
  }

  async deleteBooking(bid) {
    await this.#getBookingOrFail(bid);
    return this.repository.delete(bid);
  }
}