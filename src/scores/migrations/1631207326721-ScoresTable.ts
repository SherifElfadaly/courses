import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class ScoresTable1631207326721 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'scores',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                    unsigned: true,
                },
                {
                    name: 'grade',
                    type: 'int',
                    isNullable: false,
                    unsigned: true,
                },
                {
                    name: 'pass',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'student_id',
                    type: 'int',
                    isNullable: false,
                    unsigned: true,
                },
                {
                    name: 'course_id',
                    type: 'int',
                    isNullable: false,
                    unsigned: true,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'deleted_at',
                    type: 'timestamp',
                    isNullable: true
                }
            ]
        }));

        await queryRunner.createForeignKey('scores', new TableForeignKey({
            columnNames: ['student_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'students',
        }));

        await queryRunner.createForeignKey('scores', new TableForeignKey({
            columnNames: ['course_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'courses',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('scores');
        const studentIdForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('student_id') !== -1);
        const courseIdForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('course_id') !== -1);
        await queryRunner.dropForeignKeys('scores', [studentIdForeignKey, courseIdForeignKey]);
        await queryRunner.dropTable('scores');
    }

}
