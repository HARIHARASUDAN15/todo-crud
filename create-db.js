import fs from 'fs';
import fetch from 'node-fetch'; // Install with: npm install node-fetch

const apiUrl = 'http://my-json-server.typicode.com/HARIHARASUDAN15/todo-crud'; // Example API

async function createDb() {
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    const dbData = { todos: data }; // Put fetched data into db.json structure
    fs.writeFileSync('db.json', JSON.stringify(dbData, null, 2));

    console.log(' db.json created with API data');
  } catch (err) {
    console.error(' Failed to fetch data:', err);
  }
}

createDb();