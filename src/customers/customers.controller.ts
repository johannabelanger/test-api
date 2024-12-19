import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, NotFoundException } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { createCustomerSchema, CreateCustomerDto } from './dto/create-customer.dto';
import { updateCustomerSchema, UpdateCustomerDto } from './dto/update-customer.dto';
import { ZodValidationPipe } from 'src/shared/pipes/validation.pipe';
import { NotFoundError } from '@mikro-orm/core';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createCustomerSchema))
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try{
      return this.customersService.findOne(+id);
    } catch(error){
      if (error instanceof NotFoundError){
        console.log("IT WAS");
        throw new NotFoundException(`Customer ${id} does not exist.`, {
          cause: error, 
          description: `Customer ${id} was not found.` 
        });
      } else {
        console.log("IT WAS NOT");
        throw error;
      }
    }
  }

  @Patch(':id')
  @UsePipes(new ZodValidationPipe(updateCustomerSchema))
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(+id);
  }
}
