import { IsInt, IsString, MinLength } from 'class-validator';

export class OrderUpdateDto {
  @MinLength(3, {
    message: 'Le nom doit contenir au moins 3 caractères',
  })
  @IsInt()
  user_id: number;
  @IsString()
  status: string;
  @IsInt()
  amount: number;
}
