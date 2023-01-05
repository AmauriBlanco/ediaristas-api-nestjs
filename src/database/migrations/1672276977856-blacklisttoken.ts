import { MigrationInterface, QueryRunner } from 'typeorm';

export class blacklisttoken1672276977856 implements MigrationInterface {
  name = 'blacklisttoken1672276977856';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`token\` (\`id\` int NOT NULL AUTO_INCREMENT, \`token\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario_api\` DROP FOREIGN KEY \`FK_401d8e2a36cf32c19a6a9226dc9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario_api\` DROP FOREIGN KEY \`FK_336688b5460b598bd991358aeda\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario_api\` CHANGE \`cpf\` \`cpf\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario_api\` CHANGE \`nascimento\` \`nascimento\` datetime NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario_api\` CHANGE \`telefone\` \`telefone\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario_api\` CHANGE \`reputacao\` \`reputacao\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario_api\` CHANGE \`chave_pix\` \`chave_pix\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario_api\` CHANGE \`foto_usuario\` \`foto_usuario\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario_api\` CHANGE \`foto_documento\` \`foto_documento\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario_api\` ADD CONSTRAINT \`FK_401d8e2a36cf32c19a6a9226dc9\` FOREIGN KEY (\`foto_usuario\`) REFERENCES \`foto\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario_api\` ADD CONSTRAINT \`FK_336688b5460b598bd991358aeda\` FOREIGN KEY (\`foto_documento\`) REFERENCES \`foto\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`usuario_api\` DROP FOREIGN KEY \`FK_336688b5460b598bd991358aeda\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario_api\` DROP FOREIGN KEY \`FK_401d8e2a36cf32c19a6a9226dc9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario_api\` CHANGE \`foto_documento\` \`foto_documento\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario_api\` CHANGE \`foto_usuario\` \`foto_usuario\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario_api\` CHANGE \`chave_pix\` \`chave_pix\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario_api\` CHANGE \`reputacao\` \`reputacao\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario_api\` CHANGE \`telefone\` \`telefone\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario_api\` CHANGE \`nascimento\` \`nascimento\` datetime NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario_api\` CHANGE \`cpf\` \`cpf\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario_api\` ADD CONSTRAINT \`FK_336688b5460b598bd991358aeda\` FOREIGN KEY (\`foto_documento\`) REFERENCES \`foto\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`usuario_api\` ADD CONSTRAINT \`FK_401d8e2a36cf32c19a6a9226dc9\` FOREIGN KEY (\`foto_usuario\`) REFERENCES \`foto\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`DROP TABLE \`token\``);
  }
}
