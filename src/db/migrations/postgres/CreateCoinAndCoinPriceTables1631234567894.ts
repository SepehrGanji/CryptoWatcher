import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCoinAndCoinPriceTables1631234567894 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE coin (
        id serial PRIMARY KEY,
        name varchar
      )
    `);

    await queryRunner.query(`
      CREATE TABLE coin_price (
        id serial PRIMARY KEY,
        coinId integer,
        price numeric,
        FOREIGN KEY (coinId) REFERENCES coin (id) ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query('DROP TABLE coin_price');
    await queryRunner.query('DROP TABLE coin');
  }
}
