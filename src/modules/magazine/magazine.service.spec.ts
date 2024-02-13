import { Test, TestingModule } from '@nestjs/testing';
import { MagazineService } from './magazine.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Magazine } from './entity/magazine.entity';
import { MagazineDto } from './dto/create-magazine.dto';
import { Repository, SelectQueryBuilder, UpdateResult } from 'typeorm';
import {
  CustomResponse,
  MagazineResponse,
} from '../../common/types/magazine.types';
import { ResourceNotFoundException } from '../../common/exceptions/not-found.exception';

describe('MagazineService', () => {
  let service: MagazineService;
  let magazineRepository: Repository<Magazine>;

  const magazineData: MagazineDto = {
    title: 'Sample Title',
    description: 'This is a sample magazine Final.',
    price: 50.99,
    imgUrl: 'https://picsum.photos/200/300',
    subscribed: true,
  };

  const createdMagazine: Magazine = {
    id: 1,
    ...magazineData,
    updatedAt: null,
    createdAt: new Date(),
    deletedAt: null,
  };

  const customResponse: CustomResponse = {
    message: 'Updated successfully',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MagazineService,
        {
          provide: getRepositoryToken(Magazine),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MagazineService>(MagazineService);
    magazineRepository = module.get<Repository<Magazine>>(
      getRepositoryToken(Magazine),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a magazine', async () => {
    jest.spyOn(magazineRepository, 'create').mockReturnValue(createdMagazine);
    jest.spyOn(magazineRepository, 'save').mockResolvedValue(createdMagazine);

    const result = await service.create(magazineData);

    expect(magazineRepository.create).toHaveBeenCalledWith(magazineData);
    expect(magazineRepository.save).toHaveBeenCalled();

    expect(result).toEqual(createdMagazine);
  });

  it('should find all magazines', async () => {
    const page = 1;
    const limit = 10;
    const filter = 'current';
    const totalRecords = 10;

    const mockQueryBuilder = {
      orderBy: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getManyAndCount: jest
        .fn()
        .mockResolvedValue([createdMagazine, totalRecords]),
    };

    jest
      .spyOn(magazineRepository, 'createQueryBuilder')
      .mockReturnValue(
        mockQueryBuilder as unknown as SelectQueryBuilder<Magazine>,
      );

    const result: MagazineResponse = await service.findAll(page, limit, filter);

    expect(magazineRepository.createQueryBuilder).toHaveBeenCalledWith(
      'magazine',
    );

    expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith('id', 'DESC');
    expect(mockQueryBuilder.skip).toHaveBeenCalledWith((page - 1) * limit);
    expect(mockQueryBuilder.take).toHaveBeenCalledWith(limit);

    expect(result.data).toEqual(createdMagazine);
    expect(result.totalRecords).toEqual(totalRecords);
  });

  it('should find a magazine by ID', async () => {
    const id = 1;
    jest
      .spyOn(magazineRepository, 'findOne')
      .mockResolvedValue(createdMagazine);
    const result = await service.findOne(id);
    expect(magazineRepository.findOne).toHaveBeenCalledWith({ where: { id } });
    expect(result).toEqual(createdMagazine);
  });

  it('should throw ResourceNotFoundException when magazine is not found', async () => {
    const id = 1;
    jest.spyOn(magazineRepository, 'findOne').mockResolvedValue(null);
    await expect(service.findOne(id)).rejects.toThrow(
      ResourceNotFoundException,
    );
  });

  it('should update a magazine', async () => {
    const id = 1;
    jest.spyOn(magazineRepository, 'update').mockResolvedValue(undefined);
    const result = await service.update(id, magazineData);
    expect(magazineRepository.update).toHaveBeenCalledWith(id, magazineData);
    expect(result).toEqual({ message: 'Magazine Updated Successfully' });
  });

  it('should soft delete a magazine', async () => {
    const id = 1;
    const deletedResult: UpdateResult = {
      raw: {},
      affected: 1,
      generatedMaps: [],
    };

    jest
      .spyOn(magazineRepository, 'softDelete')
      .mockResolvedValue(deletedResult);
    const result = await service.softDelete(id);
    expect(magazineRepository.softDelete).toHaveBeenCalledWith(id);
    expect(result).toEqual({ message: 'Magazine Deleted Successfully' });
  });

  it('should restore a magazine', async () => {
    const id = 1;
    const restoredResult: UpdateResult = {
      raw: {},
      affected: 1,
      generatedMaps: [],
    };
    jest.spyOn(magazineRepository, 'restore').mockResolvedValue(restoredResult);
    const result = await service.restore(id);
    expect(magazineRepository.restore).toHaveBeenCalledWith(id);
    expect(result).toEqual({ message: 'Magazine Restored Successfully' });
  });
});
