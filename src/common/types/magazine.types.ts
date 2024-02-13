import { Magazine } from 'src/modules/magazine/entity/magazine.entity';

export type CustomResponse = {
  message: string;
  data?: any;
};

export type MagazineResponse = {
  magazines: Magazine[];
  totalRecords: number;
};
