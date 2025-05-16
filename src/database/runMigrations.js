
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { pool, connectDB } = require('./connection');
const logger = require('../utils/logger');

const runMigrations = async () => {
  try {
    // Connect to database
    await connectDB();

    // Create migrations table if it doesn't exist
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS migrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Get executed migrations
    const [executedMigrations] = await pool.execute('SELECT name FROM migrations');
    const executedMigrationNames = executedMigrations.map(m => m.name);

    // Read migration files
    const migrationsDir = path.join(__dirname, 'migrations');
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort(); // Ensure migrations run in order

    // Run pending migrations
    for (const file of migrationFiles) {
      if (!executedMigrationNames.includes(file)) {
        const migrationSQL = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
        
        logger.info(`Running migration: ${file}`);
        
        // Run migration in a transaction
        const connection = await pool.getConnection();
        await connection.beginTransaction();
        
        try {
          // Split by ; to handle multiple statements, but preserve ;; in triggers
          const statements = migrationSQL.split(';')
            .map(s => s.trim())
            .filter(s => s.length > 0);
          
          for (const stmt of statements) {
            await connection.execute(stmt);
          }
          
          // Record migration as executed
          await connection.execute('INSERT INTO migrations (name) VALUES (?)', [file]);
          await connection.commit();
          logger.info(`Migration ${file} executed successfully`);
        } catch (error) {
          await connection.rollback();
          logger.error(`Error executing migration ${file}: ${error.message}`);
          throw error;
        } finally {
          connection.release();
        }
      }
    }
    
    logger.info('All migrations executed successfully');
    process.exit(0);
  } catch (error) {
    logger.error(`Migration error: ${error.message}`);
    process.exit(1);
  }
};

runMigrations();
