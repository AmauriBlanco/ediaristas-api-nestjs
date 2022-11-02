import { MigrationInterface, QueryRunner } from 'typeorm';

export class cidadesAtendidas1667357993402 implements MigrationInterface {
  name = 'cidadesAtendidas1667357993402';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`cidades_atendidas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`codigo_ibge\` varchar(255) NOT NULL, \`cidade\` varchar(255) NOT NULL, \`estado\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`cidades_atendidas_usuarios\` (\`usuario_api_id\` int NOT NULL, \`cidades_atendidas_id\` int NOT NULL, INDEX \`IDX_92ec02c2726dc30411ac8ccd3e\` (\`usuario_api_id\`), INDEX \`IDX_acb5beafbb5aa391950021f149\` (\`cidades_atendidas_id\`), PRIMARY KEY (\`usuario_api_id\`, \`cidades_atendidas_id\`)) ENGINE=InnoDB`,
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
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` ADD CONSTRAINT \`FK_92ec02c2726dc30411ac8ccd3e4\` FOREIGN KEY (\`usuario_api_id\`) REFERENCES \`usuario_api\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` ADD CONSTRAINT \`FK_acb5beafbb5aa391950021f1499\` FOREIGN KEY (\`cidades_atendidas_id\`) REFERENCES \`cidades_atendidas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` DROP FOREIGN KEY \`FK_acb5beafbb5aa391950021f1499\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cidades_atendidas_usuarios\` DROP FOREIGN KEY \`FK_92ec02c2726dc30411ac8ccd3e4\``,
    );
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
    await queryRunner.query(
      `DROP INDEX \`IDX_acb5beafbb5aa391950021f149\` ON \`cidades_atendidas_usuarios\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_92ec02c2726dc30411ac8ccd3e\` ON \`cidades_atendidas_usuarios\``,
    );
    await queryRunner.query(`DROP TABLE \`cidades_atendidas_usuarios\``);
    await queryRunner.query(`DROP TABLE \`cidades_atendidas\``);
  }
}
