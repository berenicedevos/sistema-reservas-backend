import { ServicesRepository } from '../repositories/services.repository.js';
import { HttpError } from '../utils/http-error.js';

const BASE_PATH = '/api/services';

export class ServicesService {
  constructor(repository = new ServicesRepository()) {
    this.repository = repository;
  }

  async getAllServices() {
    return this.repository.getAll();
  }

  async getServices(query) {
    const { category, available, page = 1, limit = 10, sort } = query;
    
    const filter = {};
    if (category) filter.category = category;
    if (available !== undefined) filter.available = available;

    let sortOption = {};
    if (sort === 'asc') sortOption = { price: 1 };
    if (sort === 'desc') sortOption = { price: -1 };

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const [payload, total] = await Promise.all([
      this.repository.getPaginated(filter, sortOption, skip, limitNum),
      this.repository.count(filter)
    ]);

    const totalPages = Math.ceil(total / limitNum);
    const hasPrevPage = pageNum > 1;
    const hasNextPage = pageNum < totalPages;
    const prevPage = hasPrevPage ? pageNum - 1 : null;
    const nextPage = hasNextPage ? pageNum + 1 : null;

    const buildLink = (targetPage) => {
      const params = new URLSearchParams();
      if (category) params.set('category', category);
      if (available !== undefined) params.set('available', String(available));
      if (sort) params.set('sort', sort);
      params.set('page', String(targetPage));
      params.set('limit', String(limitNum));
      return `${BASE_PATH}?${params.toString()}`;
    };

    return {
      payload,
      totalPages,
      prevPage,
      nextPage,
      page: pageNum,
      hasPrevPage,
      hasNextPage,
      prevLink: hasPrevPage ? buildLink(prevPage) : null,
      nextLink: hasNextPage ? buildLink(nextPage) : null
    };
  }

  async getServiceById(id) {
    const service = await this.repository.getById(id);
    if (!service) throw new HttpError(404, 'Servicio no encontrado');
    return service;
  }

  async createService(data) {
    return this.repository.create(data);
  }

  async updateService(id, data) {
    await this.getServiceById(id);
    return this.repository.update(id, data);
  }

  async deleteService(id) {
    await this.getServiceById(id);
    return this.repository.delete(id);
  }
}