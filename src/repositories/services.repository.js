import { ServicesMongoDAO } from '../dao/services.mongo.dao.js';

export class ServicesRepository {
  constructor(dao = new ServicesMongoDAO()) {
    this.dao = dao;
  }

  getAll() {
    return this.dao.getAll();
  }

  getPaginated(filter, sort, skip, limit) {
    return this.dao.getPaginated(filter, sort, skip, limit);
  }

  count(filter) {
    return this.dao.count(filter);
  }

  getById(id) {
    return this.dao.getById(id);
  }

  create(data) {
    return this.dao.create(data);
  }

  update(id, data) {
    return this.dao.update(id, data);
  }

  delete(id) {
    return this.dao.delete(id);
  }
}