import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateClaimDto } from './dtos/create-claim.dto';
import { FindClaimDto } from './dtos/find-claim.dto';
import { Claim } from './entities/claim.entity';

@Injectable()
export class ClaimService {
  constructor(
    @InjectRepository(Claim) private readonly claimRepository: Repository<Claim>,
  ) {}

  /**
   * @param createClaimDto
   * @returns promise of claim
   */
  createClaim(createClaimDto: CreateClaimDto): Promise<Claim> {
    const claim: Claim = new Claim();
    claim.title = createClaimDto.title;
    claim.description = createClaimDto.description;
    claim.pointValue = createClaimDto.pointValue;
    return this.claimRepository.save(claim);
  }

  findClaim(findClaimDto: FindClaimDto): Promise<Claim | null> {
    return this.claimRepository.findOne({ where: findClaimDto });
  }
}