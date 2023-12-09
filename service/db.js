const sqlite = require('sqlite');
module.exports = {
    fetchData: async function () {
        const db = await sqlite.open({
          filename: 'example.db',
          driver: require('sqlite3').Database,
        });
      
        const rows = await db.all('SELECT * FROM skill');
      
        await db.close();
      
        return rows;
      },
      insertData: async function (skillName, level) {
        const db = await sqlite.open({
          filename: 'example.db',
          driver: require('sqlite3').Database,
        });
      
        await db.run('INSERT INTO skill (skillName, level) VALUES (?, ?)', [skillName, level]);
      
        await db.close();
      }
}