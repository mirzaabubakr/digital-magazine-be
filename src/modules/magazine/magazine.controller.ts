import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { Magazine } from './entity/magazine.entity';
import { MagazineService } from './magazine.service';
import { MagazineDto } from './dto/create-magazine.dto';
import {
  CustomResponse,
  MagazineResponse,
} from 'src/common/types/magazine.types';

@Controller('magazines')
export class MagazineController {
  constructor(private magazineService: MagazineService) {}

  @Post()
  create(@Body() magazineData: MagazineDto): Promise<Magazine> {
    return this.magazineService.create(magazineData);
  }

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('filter') filter?: string,
  ): Promise<MagazineResponse> {
    return this.magazineService.findAll(page, limit, filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Magazine> {
    return this.magazineService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() magazineData: MagazineDto,
  ): Promise<CustomResponse> {
    return this.magazineService.update(+id, magazineData);
  }

  @Delete(':id')
  softDelete(@Param('id') id: string): Promise<CustomResponse> {
    return this.magazineService.softDelete(+id);
  }

  @Put(':id/restore')
  restore(@Param('id') id: string): Promise<CustomResponse> {
    return this.magazineService.restore(+id);
  }
}
