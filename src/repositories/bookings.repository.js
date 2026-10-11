import { BookingsMongoDAO } from '../dao/bookings.mongo.dao.js';

export class BookingsRepository {
  constructor(dao = new BookingsMongoDAO()) {
    this.dao = dao;
  }

  getAll() {
    return this.dao.getAll();
  }

  getById(id) {
    return this.dao.getById(id);
  }

  getByIdPopulated(id) {
    return this.dao.getByIdPopulated(id);
  }

  create(data) {
    return this.dao.create(data);
  }

  updateServices(id, services) {
    return this.dao.updateServices(id, services);
  }

  delete(id) {
    return this.dao.delete(id);
  }
}