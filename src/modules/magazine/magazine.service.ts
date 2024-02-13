import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Magazine } from './entity/magazine.entity';
import { ResourceNotFoundException } from 'src/common/exceptions/not-found.exception';
import {
  CustomResponse,
  MagazineResponse,
} from 'src/common/types/magazine.types';
import { MagazineDto } from './dto/create-magazine.dto';

@Injectable()
export class MagazineService {
  constructor(
    @InjectRepository(Magazine)
    private magazineRepository: Repository<Magazine>,
  ) {}

  async create(magazineData: MagazineDto): Promise<Magazine> {
    const magazine = this.magazineRepository.create(magazineData);
    return this.magazineRepository.save(magazine);
  }

  async findAll(
    page: number,
    limit: number,
    filter: string,
  ): Promise<MagazineResponse> {
    let magazineQuery = this.magazineRepository
      .createQueryBuilder('magazine')
      .withDeleted()
      .orderBy('id', 'DESC');

    if (filter === 'current') {
      magazineQuery.where('magazine.subscribed = :subscribed', {
        subscribed: true,
      });
    } else if (filter === 'previous') {
      magazineQuery.where('magazine.deletedAt is not null');
    }
    const [magazines, totalRecords] = await magazineQuery
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { magazines, totalRecords };
  }

  async findOne(id: number): Promise<Magazine> {
    const magazine = await this.magazineRepository.findOne({
      where: { id: id },
    });
    if (!magazine) {
      throw new ResourceNotFoundException('Magazine');
    }
    return magazine;
  }

  async update(id: number, magazineData: MagazineDto): Promise<CustomResponse> {
    await this.magazineRepository.update(id, magazineData);
    const updatedMagazine = await this.findOne(id);
    return { message: 'Magazine Updated Successfully', data: updatedMagazine };
  }

  async softDelete(id: number): Promise<CustomResponse> {
    const deleted = await this.magazineRepository.softDelete(id);
    if (deleted.affected === 0) {
      throw new ResourceNotFoundException('Magazine');
    }
    return { message: 'Magazine Deleted Successfully' };
  }

  async restore(id: number): Promise<CustomResponse> {
    const restored = await this.magazineRepository.restore(id);
    if (restored.affected === 0) {
      throw new ResourceNotFoundException('Magazine');
    }
    return { message: 'Magazine Restored Successfully' };
  }
}
