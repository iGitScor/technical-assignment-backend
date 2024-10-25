import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dtos/create-customer.dto';

@Controller('customers')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService
  ) {
  }

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.createCustomer(createCustomerDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const customer = await this.customerService.findCustomer({ id });
    // Not in the controller
    const claimScore = customer.claims.reduce((a, b) => a + b.pointValue, 0);

    // Type return
    return {
      ...customer,
      claimScore,
    }
  }

  /**
   * Missing Search, Delete, and Update (PATCH) methods
   */
}