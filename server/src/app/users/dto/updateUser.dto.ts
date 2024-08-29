import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateUserDTO {
  @IsNotEmpty()
  @IsInt()
  points: number;
}
