import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Pool } from 'pg';
import config from 'src/config';

@Global()
@Module({
  providers: [
    {
      provide: 'client',
      useFactory: async (configType: ConfigType<typeof config>) => {
        const client = new Pool({
          host: configType.databaseHost,
          database: configType.databaseName,
          user: configType.databaseUser,
          port: Number(configType.databasePort),
          password: configType.databasePassword,
          ssl: {
            rejectUnauthorized: false,
          },
        });

        return await client.connect();
      },
      inject: [config.KEY],
    },
  ],
  exports: ['client'],
})
export class DatabaseModule {}
