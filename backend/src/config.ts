import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    databaseHost: process.env.DATABASE_HOST,
    databaseName: process.env.DATABASE_NAME,
    databaseUser: process.env.DATABASE_USER,
    databasePort: process.env.DATABASE_PORT,
    databasePassword: process.env.DATABASE_PASSWORD,
    port: process.env.PORT,
  };
});
