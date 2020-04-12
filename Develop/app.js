const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");



let team = [];

const questions1 = [
    {
        type: "input",
        name: "managername",
        message: "what is your manager's name?"
    },
    {
        type: "input",
        name: "managerid",
        message: "what is your manager's id?"
    },
    {
        type: "input",
        name: "manageremail",
        message: "what is your manager's email?"
    },
    {
        type: "input",
        name: "managerofficenumber",
        message: "what is your manager's office number?"
    }
]
const questions2 = [
    {
        type: "list",
        name: "typeteam",
        message: "what type of team would you like to add?",
        choices: ["Engineer", "Intern", "NONE"]
    },
    {
        type: "input",
        name: "engineername",
        message: "Please enter Engineer's name:",
        when: (answer) => answer.typeteam === "Engineer"
    },
    {
        type: "input",
        name: "engineerid",
        message: "Please enter Engineer's id:",
        when: (answer) => answer.engineername
    },
    {
        type: "input",
        name: "engineeremail",
        message: "Please enter Engineer's e-mail:",
        when: (answer) => answer.engineerid
    },
    {
        type: "input",
        name: "engineergithub",
        message: "Please enter Engineer's GitHub:",
        when: (answer) => answer.engineeremail
    },
    {
        type: "list",
        message: "do you want to add more team members?",
        name: "addmore",
        choices: ["yes", "no"],
        when: (answer) => answer.engineergithub
    },

    {
        type: "input",
        message: "Please enter Intern's name:",
        name: "internname",
        when: (answer) => answer.typeteam === "Intern"
    },

    {
        type: "input",
        message: "Please enter Intern's id:",
        name: "internid",
        when: (answer) => answer.internname
    },
    {
        type: "input",
        message: "Please enter Intern's email:",
        name: "internemail",
        when: (answer) => answer.interid
    },
    {
        type: "input",
        message: "Please enter Intern's school:",
        name: "internschool",
        when: (answer) => answer.intermail
    },

    {
        type: "list",
        message: "do you want to add more team members?",
        name: "addmoreIntern",
        choices: ["yes", "no"],
        when: (answer) => answer.internschool

    }

]

function init(questions) {

    console.log("Please build your team")
    inquirer.prompt(questions).then(function (answer) {
        //create objects for each employee,
        //push objects to an array;

        if (answer.managername !== undefined) {

            let tempManager = new Manager(answer.managername, answer.managerid, answer.manageremail, answer.managerofficenumber)
            team.push(tempManager);

        }

        if (answer.typeteam === "Engineer") {

            let tempEngineer = new Engineer(answer.engineername)
            team.push(tempEngineer);
        }
        if (answer.typeteam === "Intern") {

            let tempEngineer = new Engineer(answer.internname, answer.interid, answer.intermail, answer.interschool)
            team.push(tempEngineer);
        }

        if (answer.managerofficenumber) {
            init(questions2);
        }
        if (answer.addmore === "yes") {
            init(questions2);
        }
        if (answer.addmore === "NONE") {
            // render(arrayOfObjects);
        }

        // console.log(answer);
    })
}

init(questions1);


function render(teamArray){
    
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
