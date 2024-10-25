import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClaimController } from './domain/claim/claim.controller';
import { ClaimModule } from './domain/claim/claim.module';
import { Claim } from './domain/claim/entities/claim.entity';
import { CustomerController } from './domain/customer/customer.controller';
import { CustomerModule } from './domain/customer/customer.module';
import { Customer } from './domain/customer/entities/customer.entity';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyAuthGuard } from './auth/api-key-auth.guard';

@Module({
  imports: [
    CqrsModule,
    ClaimModule,
    CustomerModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Claim, Customer],
      synchronize: true,
      logging: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [ClaimController, CustomerController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ApiKeyAuthGuard,
    },
  ],
})
export class AppModule {}