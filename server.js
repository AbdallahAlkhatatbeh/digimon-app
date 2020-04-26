'use strict' ; 
require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const superagent = require('superagent');
const pg = require('pg'); 
const methodoverride = require('method-override');
const PORT = process.env.PORT || 4000;
const app = express();
const client = new pg.client(process.env.DATABASE_URL);
client.on('error',errorHandler);

app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(methodoverride('_method'));
app.use(express.static('./public'));
app.set('view engine', 'ejs');


app.get('/',getcharacter);
app.get('/search',getdetails);
app.post('/search',getdigimon);
add.put('/update/:character_id',updatedigimon);
add.delete('/delete/:character_id',deltedigimon);
add.use('*',notFoundHandler);



function getdigimon(request,response) {
    const url = 'https://digimon-api.herokuapp.com/api/digimon';
    superagent.get(url).then (digicharacter) => {
        let digicharacter = character.body.map((character) =>{
return new Digimon (character);
    });
    response.render('index',{result:digicharacter});


}
function getcharacter (request,response) {
    const SQL = "SELECT * FROM digimon"
    client.query(SQL).then(result) => {
        response.render('index', {character: result.rows});
    }).catch(err)=> errorHandler(err ,request,response));
}

function getdetails (request,response) {
    const detailSQL = "SELECT * FROM digimon WHERE id=$1" ;
    const detailVAL = [request.params.character_id];
    client.query(detailSQL,detailVAL).then((detailall)=>{
    response.render('Details',{digimondetails:detailall.rows[0]})})

}
function updatedigimon (request,response){
    const updi = "UPDATE digimon SET name=$1 , img=$2 , level=$3 ";
    const upval = [request.body.name , request.body.img , request.body.level];
    client.query(updi,upval).then(result=>{
        response.redirect(`/Details/${request.params.character_id}`);
    }).catch((err)=>errorHandler(err,request,esponse));
}
function deltedigimon (request,response){
const dedi = "DELETE FROM digimon WHERE id=$1";
const deval = [request.params.character_id];

client.query(dedi,deval).then(result=>{
    response.redirect('/');
}).catch((err)=>errorHandler(err,request,esponse));




function Digimon (character){
this.name= character.name;
this.img= character.img;
this.level= character.level;
}

function notFoundHandler(request,response){
    response.status(404).send('page not found');
}
function errorHandler(error,request,response) {
    response.status(500).send(error);
}