const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const { error } = require('console');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://volunteer-network:volunteerNetwork2020@cluster0.bqmcj.mongodb.net/volunteerNetwork?retryWrites=true&w=majority";
const ObjectId = require("mongodb").ObjectId;

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(cors())

const port = 5000

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

client.connect(err => {
  const usersCollection = client.db("volunteerNetwork").collection("users");
  app.post('/addUser', (req, res) => {
    const document = req.body;
    usersCollection.insertOne(document)
      .then(result => {
        res.send(result.insertedCount > 0)
        console.log(result);
      })
  })

  app.get('/allVolunteers', (req, res)=>{
    usersCollection.find({})
    .toArray((error, documents)=>{
      res.send(documents)
    })
  })

  app.get('/volunteerTasks', (req, res)=>{
    usersCollection.find({email: req.query.email})
    .toArray((error, documents)=>{
      res.send(documents)
    })
  })

  app.delete('/delete/:id', (req, res)=>{
    usersCollection.deleteOne({_id: ObjectId(req.params.id)})
    .then(result=>{
      res.send(result.deletedCount>0);
    })
  })

});

client.connect(err => {
  const jobsCollection = client.db("volunteerNetwork").collection("jobs");
  app.get('/allJobs', (req, res)=>{
    jobsCollection.find({})
    .toArray((error, documents)=>{
      res.send(documents)
    })
  })

});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})