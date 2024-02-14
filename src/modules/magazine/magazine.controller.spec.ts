import { Test, TestingModule } from '@nestjs/testing';
import { MagazineController } from './magazine.controller';
import { MagazineService } from './magazine.service';
import { Magazine } from './entity/magazine.entity';
import { MagazineDto } from './dto/create-magazine.dto';
import {
  CustomResponse,
  MagazineResponse,
} from '../../common/types/magazine.types';

const mockMagazineService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  softDelete: jest.fn(),
  restore: jest.fn(),
};

describe('MagazineController', () => {
  let controller: MagazineController;
  let service: MagazineService;

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

  const magazines: MagazineResponse = {
    data: [
      /* Array of magazines */
    ],
    totalRecords: 10,
  };

  const customResponse: CustomResponse = {
    message: 'Updated successfully',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MagazineController],
      providers: [
        {
          provide: MagazineService,
          useValue: mockMagazineService,
        },
      ],
    }).compile();

    controller = module.get<MagazineController>(MagazineController);
    service = module.get<MagazineService>(MagazineService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a magazine', async () => {
    mockMagazineService.create.mockResolvedValue(createdMagazine);
    const result = await controller.create(magazineData);
    expect(mockMagazineService.create).toHaveBeenCalledWith(magazineData);
    expect(result).toEqual(createdMagazine);
  });

  it('should find all magazines', async () => {
    const page = 1;
    const limit = 10;
    const filter = 'current';
    mockMagazineService.findAll.mockResolvedValue(magazines);
    const result = await controller.findAll(page, limit, filter);
    expect(mockMagazineService.findAll).toHaveBeenCalledWith(
      page,
      limit,
      filter,
    );
    expect(result).toEqual(magazines);
  });

  describe('findOne', () => {
    it('should find a magazine by ID', async () => {
      const id = '1';
      mockMagazineService.findOne.mockResolvedValue(magazineData);
      const result = await controller.findOne(id);
      expect(mockMagazineService.findOne).toHaveBeenCalledWith(+id);
      expect(result).toEqual(magazineData);
    });
  });

  describe('update', () => {
    it('should update a magazine', async () => {
      const id = 1;
      mockMagazineService.update.mockResolvedValue(customResponse);
      const result = await controller.update(id, magazineData);
      expect(mockMagazineService.update).toHaveBeenCalledWith(id, magazineData);
      expect(result).toEqual(customResponse);
    });
  });

  describe('softDelete', () => {
    it('should soft delete a magazine', async () => {
      const id = '1';
      (service.softDelete as jest.Mock).mockResolvedValue(customResponse);
      const result = await controller.softDelete(id);
      expect(service.softDelete).toHaveBeenCalledWith(+id);
      expect(result).toEqual(customResponse);
    });
  });

  describe('restore', () => {
    it('should restore a magazine', async () => {
      const id = '1';
      (service.restore as jest.Mock).mockResolvedValue(customResponse);
      const result = await controller.restore(id);
      expect(service.restore).toHaveBeenCalledWith(+id);
      expect(result).toEqual(customResponse);
    });
  });
});
