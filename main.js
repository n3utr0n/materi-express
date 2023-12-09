const express = require('express')
const sqlite = require('sqlite');
const cors = require('cors');
const app = express()
const port = 3000
var path = require('path');

app.use(express.json());

app.use(express.static('public'))
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend's URL    
    credentials: true, 
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/profile/:nama', async (req, res) => {  
  let skill = await fetchData()
  console.log(skill)
  res.render('index', {
    nama: req.params.nama,
    skill: skill
  })
})
app.get('/update-skill', (req,res) => {
    res.render('update-skill')
})
app.post('/skill', async (req,res) => {
    await insertData(req.body.skillName, req.body.level)
    res.send("OK")
})

async function fetchData() {
    const db = await sqlite.open({
      filename: 'example.db',
      driver: require('sqlite3').Database,
    });
  
    const rows = await db.all('SELECT * FROM skill');
  
    await db.close();
  
    return rows;
  }
  
  
  async function insertData(skillName, level) {
    const db = await sqlite.open({
      filename: 'example.db',
      driver: require('sqlite3').Database,
    });
  
    await db.run('INSERT INTO skill (skillName, level) VALUES (?, ?)', [skillName, level]);
  
    await db.close();
  }

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})