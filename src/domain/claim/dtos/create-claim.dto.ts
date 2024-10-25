import {
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateClaimDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description?: string;

  @IsInt()
  pointValue: number;
}