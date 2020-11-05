const cors = require('cors')
const express = require('express')
const app = express()
app.use(cors())

const Database = require('@replit/database')
const db = new Database();
db.set("1", {firstname: 'Magne', lastname: 'Alvheim'}).then(() => {}) 
db.set("2", {firstname: 'Bill', lastname: 'Gates'}).then(() => {}) 
db.set("3", {firstname: 'Steve', lastname: 'Jobs'}).then(() => {}) 

app.get('/', (req, res) => {res.send('Ulriken Consulting is cooking on gas!')})

app.get('/users', async (req, res) => {
  let all = await db.getAll()
  let result = Object.entries(all)
  res.json(result)
 })

 app.get('/users2', async (req, res) => {  
  let ids = await db.list()
  let result = [{}]

  for (var i = 0; i < ids.length; i++) {    
    let usr = await db.get(i+1)
    result[i] = {id: i, ...usr}
  }
  res.json(result);  
});

app.get('/user/:id', async (req, res) => {
  console.log(req.params.id)
  let result = await db.get(req.params.id)  
  res.json(result)
 })


app.listen(3000, () => console.log('App på port 3000'))

 