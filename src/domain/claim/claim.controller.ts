import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { ClaimService } from './claim.service';
import { CreateClaimDto } from './dtos/create-claim.dto';

@Controller('claims')
export class ClaimController {
  constructor(
    private readonly claimService: ClaimService
  ) {
  }

  @Post()
  create(@Body() createClaimDto: CreateClaimDto) {
    return this.claimService.createClaim(createClaimDto);
  }

  /**
 * ⚠️ Not transactional method. If a claim fail, no removal.
 * @param createClaimDtos 
 * @returns 
 */
  @Post('/all')
  createAll(@Body() createClaimDtos: CreateClaimDto[]) {
    return Promise.all(
      createClaimDtos.map(
        createClaimDto => this.claimService.createClaim(createClaimDto)
      )
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const claim = await this.claimService.findClaim({ id });
    return claim;
  }

  /**
   * Missing Search, Delete, and Update (PATCH) methods
   */
}