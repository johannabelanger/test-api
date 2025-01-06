import { Migration } from '@mikro-orm/migrations';

export class Migration20250106023334 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`
      -- Table: public.accounts

      -- DROP TABLE IF EXISTS public.accounts;

      CREATE TABLE IF NOT EXISTS public.accounts
      (
          id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
          account_name character varying(250) COLLATE pg_catalog."default",
          CONSTRAINT accounts_pkey PRIMARY KEY (id)
      )

      TABLESPACE pg_default;

      ALTER TABLE IF EXISTS public.accounts
      OWNER to postgres;
    `);
  }

  override async down(): Promise<void> {
    this.addSql(`
      DROP TABLE IF EXISTS public.accounts;
    `);
  }

}
