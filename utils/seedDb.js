const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

try{
    const dbFilePath = path.join(__dirname, '../data/seed.sql');
    const dbQueries = fs.readFileSync(dbFilePath, 'utf-8');
    const db = new Database(path.join(__dirname, '../data/tempDb.db'));
    db.exec(dbQueries);
}
catch(error){
    console.error('Error reading the file.', error)
}

