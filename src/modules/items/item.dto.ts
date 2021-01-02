import { IsNotEmpty, MinLength } from 'class-validator';

export class ItemDto {
  @IsNotEmpty()
  @MinLength(4)
  readonly name: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly price: number;

  @IsNotEmpty()
  readonly make: number;



}
