import { ServiceModel } from './models/service.model.js';

export class ServicesMongoDAO {
  async getAll() {
    return ServiceModel.find().sort({ createdAt: -1 }).lean();
  }

  async getPaginated(filter, sort, skip, limit) {
    return ServiceModel.find(filter).sort(sort).skip(skip).limit(limit).lean();
  }

  async count(filter) {
    return ServiceModel.countDocuments(filter);
  }

  async getById(id) {
    return ServiceModel.findById(id).lean();
  }

  async create(data) {
    const service = await ServiceModel.create(data);
    return service.toObject();
  }

  async update(id, data) {
    return ServiceModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    }).lean();
  }

  async delete(id) {
    return ServiceModel.findByIdAndDelete(id).lean();
  }
}