"use strict";
var express = require("express");
var router = express.Router();

require("dotenv").config();
const URL = process.env.URL;   //Url para conexion a la base de datos de mongo. Puede ser "mongodb://localhost:xxxx/<nombre bd>"
const dbname = process.env.DBNAME;
const collect = process.env.COLLECT;
const MongoClient = require("mongodb").MongoClient;

/* back-end + mongo functions */
function addRecurso (recurso, callback) {
  MongoClient.connect(URL, (err, client) => {
    if (err) {
      console.log("________________________________");
      console.log("Se encontro el error:");
      console.log(err.message);
    }else{
      console.log("Connected");
      const db = client.db(dbname);
      insertRecurso(recurso, db, callback);
    }
    client.close();
  });
}

function insertRecurso (recurso, db, callback) {
  const collection = db.collection(collect);
  collection.insert(recurso)
    .then(() => callback(recurso))
    .catch((err)=> console.log("se encontro el error:\n"+err.message));
}


function findrecursos (db, callback) {
  const collection = db.collection(collect);
  collection.find({}).toArray((err, docs) => {
    if(err) {
      console.log("________________________________");
      console.log("Se encontro el error:");
      console.log(err.message);
    }else{
      callback(docs);
    }
  });
}

function getRecursos(callback) {
  MongoClient.connect(URL, (err, client) => { // conexion a la base de datos
    if(err) {
      console.log("________________________________");
      console.log("Se encontro el error:");
      console.log(err.message);
    }else{
      console.log("Connected");
      const db = client.db(dbname); 
      findrecursos(db, callback); 
    }
    client.close(); //se cierra collecion
  });
}


/* backend API */
router.post("/recurso", function (req, res) {
  console.log("se va a agregar: "+JSON.stringify(req.body.mensaje));
  addRecurso(req.body, (mensaje) => res.send(mensaje));
});

//devuelve todos los recursos en BD
router.get("/recursos", (req, res) => {
  getRecursos((recurso) => res.send(recurso));
});


/* external API Instagram */

module.exports = router;