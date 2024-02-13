import { ConfigService } from '@nestjs/config';
import { Magazine } from 'src/modules/magazine/entity/magazine.entity';

export const getOrmConfig = (configService: ConfigService) => ({
  type: configService.get('DB_TYPE'),
  host: configService.get('DB_HOST'),
  port: +configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  connectTimeout: 60000,
  entities: [Magazine],
  logging: true,
  synchronize: true,
});
