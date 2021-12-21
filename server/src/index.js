const express = require("express");
const axios = require("axios");
const path = require("path");
const filesystem = require("fs");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/views"));
app.use(express.static(path.join(__dirname + "/public")));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

function extractDetailData(values){
    let pokemon = new Object, name = new String, id = new Number, abilities = new Array, moves = new Array, species = new String, weight = new Number, height= new Number;

    for(let value in values){
        name = value.name;
        id = value.id;
        weight = value.weight;
        height = value.height;

        for(let i = 0; i < value.abilities.length; i++){
            abilites.push(value.abilities[i].name);
        }

        for(let x = 0; x < value.species.length; x++){
            species.push(value.data.species[x].name);
        }

        for(let y = 0; y < value.moves.length; y++){
            moves.push(value.moves[y].name);
        }

    }

    pokemon["id"] = id;
    pokemon["name"] = name;
    pokemon["weight"] = weight;
    pokemon["height"] = height;
    pokemon["abilities"] = abilities;
    pokemon["species"] = species;
    pokemon["moves"] = moves;

    return pokemon;
}


app.get("/", async(request, response)=> {
    try {
        const items = await axios.get('https://pokeapi.co/api/v2/pokemon/');
        const pokemons = await items.data.results;
        console.log(pokemons);
        response.render("main", {title: "Pokemons", pokemons: pokemons});

    } catch(error){
        console.log(error);
    }

});

app.get("/pokemon/:name", async(request, response)=>{
    let name = request.params.name;

    try{
        const item = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const pokemon = await item.data;
        console.log(pokemon);
        response.end();
    } catch(error){
        console.log(error);
    } 

});

app.listen(PORT, ()=>{
    console.log(`Server running on port: ${PORT}`);
});


