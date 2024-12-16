const human_name = document.getElementById("name");
const height_feet = document.getElementById("feet");
const height_inches = document.getElementById("inches");
const human_weight = document.getElementById("weight");
const human_diet = document.getElementById("diet");
const grid = document.getElementById("grid");
const form = document.getElementById("dino-compare");
let human_object

// Create Dino Constructor
function Dino(species, weight, height, diet, where, when, url) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.url = url;
  this.diet = function () {
    return `The diet of Dinosaur is ${diet}`;
  };
  this.where = function () {
    return `The Dinosaur was originated in ${where}`;
  };
  this.when = function () {
    return `The Dinosaur dates back to ${when}`;
  };
  this.compareWeight = function () {
    if(weight > human_weight.value) {
      return `The Dinosaur is heavier than me.`
    } else {
      return `I am heavier than the Dinosaur.`
    }
  };
  this.compareHeight = function () {
    const human_height = Number(height_feet.value) * 12 + Number(height_inches)
    if(height > human_height) {
      return `The Dinosaur is taller than me.`
    } else {
      `I am taller than the Dinosaur.`
    }
  };
  this.compareDiet = function () {
    return `The Dino's diet is ${diet} whereas my diet is ${human_diet.value}`;
  };
  this.facts = [
    this.diet(),
    this.where(),
    this.when(),
    this.compareWeight(),
    this.compareHeight(),
    this.compareDiet(),
  ];
}

// Create Dino Objects
let dinoArray = [];
const dinoObjects = [];
fetch("dino.json") // Path to the JSON file
  .then((response) => response.json()) // Parse the JSON data
  .then((dinoData) => {
    dinoArray = [...dinoData.Dinos];
    dinoArray.forEach((dino) => {
      const dinoObject = new Dino(
        dino.species,
        dino.weight,
        dino.height,
        dino.diet,
        dino.where,
        dino.when,
        dino.url
      );
      dinoObjects.push(dinoObject);
    });
  })
  .catch((error) => console.error("Error loading the JSON file:", error));
// Create Human Object

function Human() {
  this.species = human_name.value;
  this.height = Number(height_feet.value) * 12 + Number(height_inches.value);
  this.weight = Number(human_weight.value);
  this.diet = human_diet.value;
  this.url = "./images/human.png"
  this.facts = [""]
}

//Generate Tiles

function generateTiles() {
  form.style.display = "none"
  dinoObjects.forEach((obj) => {
    const randomIndex = Math.floor(Math.random() * obj.facts.length);
    const randomFact = obj.facts[randomIndex];
    const html = `
        <h3>${obj.species}</h3>
        <img src="${obj.url}" >
        <p>${obj.species === "Pigeon" ? "All birds are Dinosaurs": randomFact}</p>
    `
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    gridItem.innerHTML = html 
    grid.appendChild(gridItem)
  });
}

function submitData() {
  human_object = new Human();
  dinoObjects.splice(4, 0, human_object);
  generateTiles();
}

const btn = document.getElementById("btn");
btn.addEventListener("click", submitData);




