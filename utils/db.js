const Database = require('better-sqlite3');
const path = require('node:path');

function insertUser(name, email, status){
    const db = new Database(path.join(__dirname, '../data/tempDb.db'), { fileMustExist: true });
    const insrt = db.prepare('INSERT INTO users (name, email, status) VALUES (?, ?, ?)');
    const result = insrt.run(name, email, status);
    const newId = result.lastInsertRowid;
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    const newUser = stmt.get(newId);
    db.close();
    return newUser;
}

function findUserByEmail(email){
    const db = new Database(path.join(__dirname, '../data/tempDb.db'), { fileMustExist: true });
    const slct = db.prepare('SELECT * FROM users WHERE email = ?');
    const userInfo = slct.get(email);
    db.close();
    return userInfo;
}

function countUsersByStatus(status){
    const db = new Database(path.join(__dirname, '../data/tempDb.db'), { fileMustExist: true });
    const slct = db.prepare('SELECT COUNT(*) AS count FROM users WHERE status = ?');
    const userCnt = slct.get(status);
    db.close();
    return userCnt.count;
}

module.exports = { insertUser, findUserByEmail, countUsersByStatus };
