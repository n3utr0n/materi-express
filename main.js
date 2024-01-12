const express = require('express')
const cors = require('cors');
let db = require('./service/db')
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
  let skill = await db.fetchData()
  console.log(skill)
  res.render('index', {
    nama: req.params.nama,
    skill: skilll
  })
})
app.get('/update-skill', (req,res) => {
    res.render('update-skill')
})
app.post('/skill', async (req,res) => {
    await db.insertData(req.body.skillName, req.body.level)
    res.send("OK")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})