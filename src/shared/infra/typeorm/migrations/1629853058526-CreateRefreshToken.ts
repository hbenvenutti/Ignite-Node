import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRefreshToken1629853058526 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'refresh_token',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'token', type: 'varchar' },
          { name: 'user_id', type: 'uuid' },
          { name: 'expire_date', type: 'timestamp' },
          { name: 'created_at', type: 'timestamp' }
        ],
        foreignKeys: [
          {
            name: 'FK_refresh_token',
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
    await queryRunner.dropTable('refresh_token');
  }
}
