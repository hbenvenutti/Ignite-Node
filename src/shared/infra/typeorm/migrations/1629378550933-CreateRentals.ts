import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRentals1629378550933 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'rentals',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'car_id', type: 'uuid' },
          { name: 'user_id', type: 'uuid' },
          { name: 'start_date', type: 'timestamp', default: 'now()' },
          { name: 'end_date', type: 'timestamp', isNullable: true },
          { name: 'expected_return_date', type: 'timestamp' },
          { name: 'total', type: 'numeric', isNullable: true },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp' }
        ],
        foreignKeys: [
          {
            name: 'FK_rental_car',
            referencedTableName: 'cars',
            referencedColumnNames: ['id'],
            columnNames: ['car_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          },
          {
            name: 'FK_rental_user',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('rentals');
  }
}
