import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class MagazineDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  imgUrl: string;

  @IsOptional()
  @IsBoolean()
  subscribed: boolean;

  @IsOptional()
  @IsBoolean()
  deleted: boolean;
}
