import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();
export function databaseConfig(): TypeOrmModuleOptions {
  return {
    type: 'mysql',
    host: configService.get('MYSQL_HOST'),
    port: configService.get('MYSQL_PORT'),
    username: configService.get('MYSQL_USER'),
    database: configService.get('MYSQL_DB'),
    timezone: 'America/Sao_Paulo',
    autoLoadEntities: true,
    synchronize: true,
    migrationsTransactionMode: 'each',
    migrations: [__dirname.includes('dist') ? 'dist/src/database/migrations/*.js' : 'src/database/migrations/*.ts']
  };
}
