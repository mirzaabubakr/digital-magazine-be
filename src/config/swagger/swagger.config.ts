import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Digital Magazines APIs')
  .setDescription('The Digital Magazines APIs for testing')
  .setVersion('1.0')
  .addTag('Magazines')
  .build();
