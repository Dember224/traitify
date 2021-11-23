require('dotenv').config()
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const Handlebars = require("handlebars");

const app = express();
const port = 3000;

const secret_key = process.env.SECRET_KEY;
const public_key = process.env.PUBLIC_KEY;

app.use(cors());

app.use('/', (req, res,next)=>{
  axios({
    method:'post',
    url:'https://api.traitify.com/v1/assessments',
    data:{
        deck_id:"big-five"
      },
      headers:{
        'Authorization':`Basic ${secret_key}:x`
      },
      responseType:'json'
  }).then((response)=>{
    const return_object = {
      id:response.data.id,
      public_key
    }

    res.send(return_object);


  }).catch((error)=>{
      throw new Error(`There was a problem accessing the assessment. Details: ${error}`);

    })
})

app.get('/assess', (req,res,next)=>{
  res.send();
})

app.listen(port, ()=>{
  console.log(`API is live, port: ${port}`)
})
