import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { MikroORM } from '@mikro-orm/core';
import { EntityManager, EntityRepository} from '@mikro-orm/postgresql';
import { Customer } from './entities/customer.entity';
import { userInfo } from 'os';
import { InjectRepository } from '@mikro-orm/nestjs';


@Injectable()
export class CustomersService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Customer) private readonly customerRepository: EntityRepository<Customer>){

  }
  async create(createCustomerDto: CreateCustomerDto) {
    const {fullName, email, phone} = createCustomerDto;
    const customer = new Customer(fullName, email, phone);
    await this.em.persistAndFlush(customer);
    return {
      id: customer.id,
      fullName: customer.fullName,
      email: customer.email,
      phone: customer.phone,
    };
  }

  async findAll() {
    const qb = this.customerRepository
    .createQueryBuilder('c')
    .select('c.*');

    const customers = await qb.getResult();
    return {customers: customers.map((c) => c.toJSON())};
  }

  async findOne(id: number) {
    const customer = id ? await this.customerRepository.findOneOrFail(id) : undefined;
    return {customer: customer?.toJSON()};
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
