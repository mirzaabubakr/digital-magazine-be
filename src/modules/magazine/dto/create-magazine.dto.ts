import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class MagazineDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsString()
  @IsOptional()
  imgUrl: string;

  @IsOptional()
  @IsBoolean()
  subscribed: boolean;
}
