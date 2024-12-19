import { Migration } from '@mikro-orm/migrations';

export class Migration20241216225846 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "customer" ("id" serial primary key, "full_name" varchar(255) not null, "email" varchar(255) not null, "phone" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "customer" cascade;`);
  }

}
