import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';

export enum SortType {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PaginationRequest {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page = 1;

  @IsOptional()
  @IsInt()
  @Min(2)
  @Type(() => Number)
  pageSize = 10;

  @IsOptional()
  @IsString()
  sortBy: string;

  @IsOptional()
  @IsString()
  @IsEnum(SortType)
  sortType: SortType = SortType.ASC;

  @IsOptional()
  @IsString()
  query: string;

  @IsOptional()
  @IsString()
  filters: string;

}
