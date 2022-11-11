const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dqmis3n.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const serviceCollection = client.db('dream-services').collection('services');

        //getting all services from database
        app.get('/services', async(req, res)=>{
            const query = {};
            const cursor = serviceCollection.find(query);
            const allServices = await cursor.toArray();
            res.send(allServices);
        })
    }
    finally{}
}

run().catch(err=>{
    console.log(err);
})



app.get('/', (req, res)=>{
    res.send("Dream Consultancy Server is running");
})

app.listen(port, ()=>{
    console.log(`Consultancy server is running on port: ${port}`)
})
