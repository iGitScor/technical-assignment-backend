import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCustomerDto } from './dtos/create-customer.dto';
import { FindCustomerDto } from './dtos/find-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer) private readonly customerRepository: Repository<Customer>,
  ) {}

  /**
   * @param createCustomerDto
   * @returns promise of customer
   */
  createCustomer(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer: Customer = new Customer();
    customer.name = createCustomerDto.name;
    customer.email = createCustomerDto.email;
    return this.customerRepository.save(customer);
  }

  findCustomer(findCustomerDto: FindCustomerDto): Promise<Customer | null> {
    return this.customerRepository.findOne({ where: findCustomerDto });
  }
}