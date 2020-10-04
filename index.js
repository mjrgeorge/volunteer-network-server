const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://volunteer-network:volunteerNetwork2020@cluster0.bqmcj.mongodb.net/volunteerNetwork?retryWrites=true&w=majority";

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

const port = 5000

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const usersCollection = client.db("volunteerNetwork").collection("users");
  const data = {name: 'Jubayer', email: 'jubayer@gmail.com'};
  usersCollection.insertOne(data)
  .then(result => {
    console.log(result);
  })
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})