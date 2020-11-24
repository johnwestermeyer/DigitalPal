const chalk = require('./ginit/node_modules/chalk');
const clear = require('./ginit/node_modules/clear');
const figlet = require('./ginit/node_modules/figlet');
const inquirer = require('inquirer');

function DigitalPal () {
    this.hungry = false;
    this.sleepy = false;
    this.bored = false;
    this.age = 0;
    this.outside = false;
    this.houseCondition = 100;
    this.play = () => {
        if(this.bored){
            console.log("Yay! Let's play!");
            this.bored = false;
        }else{
            console.log("Not right now. Later?")
        }
    }
    this.sleep = () => {
        if(this.sleepy){
            console.log("Zzzzzzz");
            this.sleepy = false;
            this.increaseAge();
        } else {
            console.log("No way! I'm not tired.")
        }
    }
}

DigitalPal.prototype.feed = function(){
    if(this.hungry){
        console.log("That was yummy!");
        this.hungry = false;
        this.sleepy = true;
    } else {
        console.log("No thanks! I'm full")
    }
}


DigitalPal.prototype.increaseAge = function(){
    this.age++;
    console.log(`Happy Birthday to me! I am ${this.age} years old!`)
}

DigitalPal.prototype.bark = function(){
    console.log("Woof! Woof!")
}

DigitalPal.prototype.goOutside = function(){
    if(!this.outside){
        console.log("Yay! I love the outdoors!");
        this.outside = true;
    } else{
        console.log("We are already outside though...")
    }
}

DigitalPal.prototype.goInside = function(){
    if(this.outside){
        console.log("Do we have to? Fine...");
        this.outside = false;
    } else{
        console.log("I'm already inside...")
    }
}

DigitalPal.prototype.meow = function(){
    console.log("Meow! Meow!")
}

DigitalPal.prototype.destroyFurniture = function(){
    if(this.houseCondition - 10 > 0){
        this.houseCondition  -= 10;
        console.log("MUAHAHAHAHA! TAKE THAT FURNITURE!");
        this.bored = false;
        this.sleepy = true;
    } else{
        console.log("We've already destroyed it all")
    }
}

DigitalPal.prototype.buyNewFurniture = function(){
    this.houseCondition += 50;
    console.log("Are you sure about that?");
}

let dog = new DigitalPal;
let cat = new DigitalPal;

clear();

function display(){
    console.log(
    chalk.yellow(
        figlet.textSync('DigitalPal', { horizontalLayout: 'full' })
    )
    );
}

function hereWeGo(){
    inquirer.prompt([{
        type: "list",
        message: "Who would you like to play with?",
        name: "pet",
        choices: ["Dog", "Cat"]
    },{
        type: "list",
        message: "What would you like to do?",
        name: "select",
        choices: ["Feed", "Sleep", "Play", "Bark", "Meow", "Go Outside", "Go Inside", "Destroy Furniture", "Buy New Furniture", "Quit"]
    }]).then((response) => {
        if(response.select !== "Quit"){
        let pet = response.pet.charAt(0).toLowerCase() + response.pet.slice(1); 
        let sel = response.select.charAt(0).toLowerCase() + response.select.slice(1);
        sel = sel.split(" ").join("");
        let doThis = `${pet}.${sel}()`;
        eval(doThis);
        hereWeGo();
        } else{
            console.log("Thanks for playing")
        }      
        }        
    )
}

display();
hereWeGo();
