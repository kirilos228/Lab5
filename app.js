const mongoose = require("mongoose");
const express = require("express");
const Schema = mongoose.Schema;
const app = express();
const jsonParser = express.json();
   
const {
    MONGO_DB_HOSTNAME,
    MONGO_DB_PORT,
    MONGO_DB
} = process.env


const url = `mongodb://${MONGO_DB_HOSTNAME}:${MONGO_DB_PORT}/${MONGO_DB}`;

const compScheme = new Schema({
    maker: String,
    cpu: String,
    gpu: String,
    ram: String,
    hdd: String,
    ssd: String,
    color: String,
    countru: String,
    power_supplier: String,
    price: Number}, 
    {versionKey: false});

const Comp = mongoose.model("Computers", compScheme);

app.use(express.static(__dirname + "/public"));

mongoose.connect(url)
.then(() => 
{
    app.listen(3000, function(){
        console.log("Server is successfully connected to Mongo DB...");
    });
}).catch((err) => console.log(err));

 
app.get("/api/computers", function(req, res){

    Comp.find({}).then(function(computers){
        res.json(computers)
    }).catch((err) => console.log(err));
});


app.get("/api/computers/:id", function(req, res){
        
    const id = req.params.id;

    Comp.findOne({_id: id}).then(function(computer){
        res.send(computer);
    }).catch((err) => console.log(err));
});
   
app.post("/api/computers", jsonParser, function (req, res) {
       
    if(!req.body) return res.sendStatus(400);
       
    const computerMaker = req.body.maker;
    const CPU = req.body.cpu;
    const GPU = req.body.gpu;
    const RAM = req.body.ram;
    const HDD = req.body.hdd;
    const SSD = req.body.ssd;
    const COLOR = req.body.color;
    const COUNTRY = req.body.countru;
    const POWER_SUPPLIER = req.body.power_supplier;
    const _PRICE = req.body.price;

    const newComp = new Comp({maker: computerMaker, cpu: CPU, gpu: GPU, ram: RAM, hdd: HDD, ssd: SSD, color: COLOR, countru: COUNTRY, power_supplier:POWER_SUPPLIER, price: _PRICE});

    newComp.save().then(function(){
        res.send(newComp);
    }).catch((err) => console.log(err));
});
    
app.delete("/api/computers/:id", function(req, res){
        
    const id = req.params.id;
    
    Comp.findByIdAndDelete(id).then(function(comp){    
        res.json(comp);
    }).catch((err) => console.log(err));
});
   
app.put("/api/computers", jsonParser, function(req, res){
        
    if(!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const computerMaker = req.body.maker;
    const CPU = req.body.cpu;
    const GPU = req.body.gpu;
    const RAM = req.body.ram;
    const HDD = req.body.hdd;
    const SSD = req.body.ssd;
    const COLOR = req.body.color;
    const COUNTRY = req.body.countru;
    const POWER_SUPPLIER = req.body.power_supplier;
    const _PRICE = req.body.price;

    const newComp = {maker: computerMaker, cpu: CPU, gpu: GPU, ram: RAM, hdd: HDD, ssd: SSD, color: COLOR, countru: COUNTRY, power_supplier:POWER_SUPPLIER, price: _PRICE};
       
    Comp.findOneAndUpdate({_id: id}, newComp, {new: true}).then(function(comp){   
        res.send(comp);
    }).catch((err) => console.log(err));
});

process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});
