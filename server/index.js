const sqlite3 = require('sqlite3').verbose();
const { promisify } = require('util');

const db = new sqlite3.cached.Database('db');
db.allAsync = promisify(db.all);

const io = require('blacksocket.io/server')(23013, {
    path: '/db'
});

console.log(typeof promisify);
io.on('connection', (socket) => {
    console.log('on connection');
    socket.on('get-db-info', async () => {
        const result = await db.all('SELECT type,name,sql,tbl_name FROM `main`.sqlite_master;', {});
        return result;
        // , (e, result) => {
        //     if (e) {
        //         console.log(e);
        //     } else {
        //         console.log('result', result);
        //     }
        // });
    });
});
async function a() {
    const result = await db.allAsync('SELECT type,name,sql,tbl_name FROM `main`.sqlite_master;', {});
    console.log('r', result);
    return result;
}
a();

