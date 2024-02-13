import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MagazinesModule } from './modules/magazines/magazines.module';
import { DatabaseModule } from './config/database/mysql/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, MagazinesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
