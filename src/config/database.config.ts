import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const databaseConfig = (
  config: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: config.get<string>('DB_HOST'),
  port: Number(config.get<string>('DB_PORT') || 3306),
  username: config.get<string>('DB_USER'),
  password: config.get<string>('DB_PASS'),
  database: config.get<string>('DB_NAME'),
  autoLoadEntities: true,
  synchronize: false,
});
