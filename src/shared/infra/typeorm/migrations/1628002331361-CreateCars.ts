import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCars1628002331361 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cars',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'category_id', type: 'uuid', isNullable: true },
          { name: 'name', type: 'varchar' },
          { name: 'description', type: 'varchar' },
          { name: 'brand', type: 'varchar' },
          { name: 'daily_rate', type: 'numeric' },
          { name: 'fine_amount', type: 'numeric' },
          { name: 'license_plate', type: 'varchar' },
          { name: 'available', type: 'boolean', default: true },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
        ],
        foreignKeys: [
          {
            name: 'FK_car_category',
            referencedTableName: 'categories',
            referencedColumnNames: ['id'],
            columnNames: ['category_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cars');
  }
}
