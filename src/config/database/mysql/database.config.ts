import { ConfigService } from '@nestjs/config';

export const getOrmConfig = (configService: ConfigService) => ({
  type: configService.get('DB_TYPE'),
  host: configService.get('DB_HOST'),
  port: +configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DATABASE_PRODUCT'),
  connectTimeout: 60000,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  logging: true,
  synchronize: true,
});
