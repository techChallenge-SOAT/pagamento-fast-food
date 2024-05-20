import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();


if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL não definida');
}


console.log(process.env.DATABASE_URL)

const sequelize = new Sequelize(
  process.env.DATABASE_URL,
  {
    dialect: 'postgres',
    logging: console.log,
  },
);

export default sequelize;
