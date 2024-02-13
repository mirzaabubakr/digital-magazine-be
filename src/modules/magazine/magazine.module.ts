import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Magazine } from './entity/magazine.entity';
import { MagazineController } from './magazine.controller';
import { MagazineService } from './magazine.service';

@Module({
  imports: [TypeOrmModule.forFeature([Magazine])],
  controllers: [MagazineController],
  providers: [MagazineService],
})
export class MagazineModule {}
