const sqlite3 = require('sqlite3').verbose();
const { promisify } = require('util');

const db = new sqlite3.cached.Database('./db');
db.allAsync = promisify(db.all);

const io = require('blacksocket.io/server')(23013, {
    path: '/db',
});

// const sqliteParser = require('sqlite-parser');
const sqlUtil = require('./sql-util');

io.on('connection', (socket) => {
    console.log('on connection');
    socket.on('get-db-info', async () => {
        const result = await db.allAsync('SELECT type,name,sql,tbl_name FROM `main`.sqlite_master;');
        return result.map((tables) => {
            console.log(tables);
            const row2 = Object.assign({}, tables);
            if (row2.sql) {
                const columns = sqlUtil.getColumns(row2.sql);
                row2.columns = columns;
            }

            return row2;
        });
    });
});
// async function a() {
//     db.serialize(async () => {
//         db.run('PRAGMA database_list;');
//         db.all('SELECT type,name,sql,tbl_name FROM `main`.sqlite_master;', {}, (e, r) => {
//             r.forEach((row) => {
//                 console.log(sqliteParser(row.sql));
//             });
//             console.log(e, r);
//         });
//     });
// }
// console.log(a());

process.on('uncaughtException', (err) => {
    console.error(err.stack);
    console.log('Node NOT Exiting...');
});
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at:', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});
const a = `CREATE TABLE project (
    id INTEGER PRIMARY KEY,
    Name TEXT, 
    Data TEXT(32)
    )`;
const params = a.replace(/\s*\n\s*/g, '')// remove \n
    .replace(/\s*\(\s*/g, '(')// remove spaces around (
    .replace(/\s*\)\s*/g, ')')// remove spaces around )
    .replace(/\s*;?\s*$/, '')// remove tailing ;
    .match(/^[^(]+\(([\s\S]+)\)$/)[1]
    .split(',')
    .map(section => section.split(/\s+/).slice(0, 2));

console.log(params);
