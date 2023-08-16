import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCoinAndCoinPriceTables1631234567894 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'coin',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: 'coin_price',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'coinId',
            type: 'int',
          },
          {
            name: 'price',
            type: 'numeric',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['coinId'],
            referencedTableName: 'coin',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('coin_price');
    await queryRunner.dropTable('coin');
  }
}
