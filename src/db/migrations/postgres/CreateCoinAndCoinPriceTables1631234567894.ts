import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCoinAndCoinPriceTables1631234567894
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE coin (
        id serial PRIMARY KEY,
        symbol varchar,
        name varchar,
        total_supply float
      )
    `);

    await queryRunner.query(`
      CREATE TABLE coin_price (
        id serial PRIMARY KEY,
        price float
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE coin_price');
    await queryRunner.query('DROP TABLE coin');
  }
}
