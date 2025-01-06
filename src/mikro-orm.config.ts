import { defineConfig, PostgreSqlDriver, UnderscoreNamingStrategy } from '@mikro-orm/postgresql';
import { EntityGenerator } from '@mikro-orm/entity-generator';
import { Migrator } from '@mikro-orm/migrations';
import pluralize from 'pluralize';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

// no need to specify the `driver` now, it will be inferred automatically
export default defineConfig({
   multipleStatements: true,
   metadataProvider: TsMorphMetadataProvider,
   extensions: [EntityGenerator, Migrator],
   discovery: {
      // we need to disable validation for no entities due to the entity generation
   },
   entities: ['dist/**/*.entity.js'],
   entitiesTs: ['src/**/*.entity.ts'],
   dbName: 'testdb',
   driver: PostgreSqlDriver,
   // enable debug mode to log SQL queries and discovery information
   debug: true, 
   migrations: {
      path: 'dist/migrations',
      pathTs: 'src/migrations',
   },
   namingStrategy: class extends UnderscoreNamingStrategy {
      override getEntityName(tableName: string, schemaName?: string): string {
         return pluralize.singular(super.getEntityName(tableName, schemaName));
      }
   },
   entityGenerator: {
      fileName: (entityName) => {
         switch (entityName) {
            case 'Account':
               return `account/${entityName.toLowerCase()}.entity`;
            default:
               return `common/${entityName.toLowerCase()}.entity`;
         }
      },
      save: true,
      path: 'src',
      esmImport: true,
      readOnlyPivotTables: true,
      outputPurePivotTables: true,
      bidirectionalRelations: true,
      customBaseEntityName: 'Base',
      useCoreBaseEntity: true,
   }
});  