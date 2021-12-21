const searchButton = document.getElementById("search-button");
const searchBar = document.getElementById("search-bar");

/*
async function searchPokemon(value){
    const item =  await fetch(`http://12.0.0.1/pokemon/${value}`);
    console.log(item);
}
*/
searchButton.addEventListener("click", async function(){
    let name = searchBar.value;
    console.log(name);
    const item =  await fetch(`http://12.0.0.1/pokemon/${name}`);
    console.log(item);
});

/*
searchBar.addEventListener("input", function(){
    console.log(this.value);
});*/