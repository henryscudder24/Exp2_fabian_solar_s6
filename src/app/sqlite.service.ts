import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { SQLiteConnection, SQLiteDBConnection, CapacitorSQLite } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {
  private db: SQLiteDBConnection | undefined;

  constructor(private platform: Platform) {
    this.initializeDatabase();
  }

  async initializeDatabase() {
    await this.platform.ready();
    if (Capacitor.getPlatform() === 'web') {
      console.error('SQLite plugin is not supported on the web.');
      return;
    }
    try {
      const sqlite = new SQLiteConnection(CapacitorSQLite);
      this.db = await sqlite.createConnection('mydatabase', false, 'no-encryption', 1, false);

      await this.db.open();
      await this.db.execute(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE,
          email TEXT,
          password TEXT
        );
      `);

      console.log('Database and tables created successfully.');
    } catch (error) {
      console.error('Unable to open or initialize database', error);
    }
  }

  async registerUser(username: string, email: string, password: string) {
    try {
      if (this.db) {
        await this.db.run(`
          INSERT INTO users (username, email, password) VALUES (?, ?, ?);
        `, [username, email, password]);
        console.log('User registered successfully.');
      } else {
        const users: { username: string, email: string, password: string }[] = JSON.parse(localStorage.getItem('users') || '[]');
        users.push({ username, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        console.log('User registered successfully in local storage.');
      }
    } catch (error) {
      console.error('Unable to register user', error);
    }
  }

  async getUser(username: string, password: string): Promise<{ username: string, email: string, password: string } | null> {
    try {
      if (this.db) {
        const res = await this.db.query(`
          SELECT * FROM users WHERE username = ? AND password = ?;
        `, [username, password]);

        if (res && res.values && res.values.length > 0) {
          return res.values[0];
        }
      } else {
        const users: { username: string, email: string, password: string }[] = JSON.parse(localStorage.getItem('users') || '[]');
        return users.find(user => user.username === username && user.password === password) || null;
      }
      return null;
    } catch (error) {
      console.error('Unable to get user', error);
      return null;
    }
  }
}
