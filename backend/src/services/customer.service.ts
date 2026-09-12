import { customerRepository, CustomerRepository, FindCustomersParams } from '../repositories/customer.repository';
import { NotFoundError } from '../errors/AppError';
import { CustomerStatus } from '@prisma/client';

export interface CreateCustomerInput {
  name: string;
  contactEmail: string;
  contactPhone?: string;
  industry?: string;
  address?: string;
  status?: CustomerStatus;
  ownerId?: string;
}

export class CustomerService {
  private customerRepo: CustomerRepository;

  constructor(repo = customerRepository) {
    this.customerRepo = repo;
  }

  async createCustomer(input: CreateCustomerInput, currentUserId: string) {
    const ownerId = input.ownerId || currentUserId;
    return this.customerRepo.create({
      ...input,
      ownerId,
    });
  }

  async getCustomerById(id: string) {
    const customer = await this.customerRepo.findById(id);
    if (!customer) {
      throw new NotFoundError(`Customer with ID '${id}' not found`);
    }
    return customer;
  }

  async getCustomers(params: FindCustomersParams) {
    const { customers, total } = await this.customerRepo.findMany(params);
    const totalPages = Math.ceil(total / params.limit) || 1;

    return {
      customers,
      meta: {
        page: params.page,
        limit: params.limit,
        total,
        totalPages,
      },
    };
  }

  async updateCustomer(id: string, data: any) {
    await this.getCustomerById(id);
    return this.customerRepo.update(id, data);
  }
}

export const customerService = new CustomerService();
