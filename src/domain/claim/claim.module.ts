import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClaimController } from './claim.controller';
import { ClaimService } from './claim.service';
import { Claim } from './entities/claim.entity';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Claim])],
  controllers: [ClaimController],
  providers: [ClaimService],
  exports: [ClaimService],
})
export class ClaimModule {}