import db from '../electron/backend/config/database.js';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function applyMigration() {
  try {
    console.log('🔄 Running migration 002_create_workshop_tables...');
    
    const migrationPath = path.join(process.cwd(), '../database/migrations/002_create_workshop_tables.sql');
    const sql = await fs.readFile(migrationPath, 'utf-8');
    
    // Split SQL statements by semicolon and filter out empty ones
    const statements = sql
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);
    
    for (const statement of statements) {
      await db.query(statement);
      console.log('✅ Executed:', statement.substring(0, 80) + '...');
    }
    
    console.log('✅ Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

applyMigration();
