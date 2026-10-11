import { BookingModel } from '../models/booking.model.js';

export class BookingsMongoDAO {
  async getAll() {
    return BookingModel.find().sort({ createdAt: -1 }).populate('services.service').lean();
  }

  async getById(id) {
    return BookingModel.findById(id).lean();
  }

  async getByIdPopulated(id) {
    return BookingModel.findById(id).populate('services.service').lean();
  }

  async create(data) {
    const booking = await BookingModel.create(data);
    return booking.toObject();
  }

  async updateServices(id, services) {
    return BookingModel.findByIdAndUpdate(
      id,
      { services },
      { new: true, runValidators: true }
    ).lean();
  }

  async delete(id) {
    return BookingModel.findByIdAndDelete(id).lean();
  }
}