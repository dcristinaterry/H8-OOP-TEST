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
        when: (answer) => answer.internid
    },
    {
        type: "input",
        message: "Please enter Intern's school:",
        name: "internschool",
        when: (answer) => answer.internemail
    },

    {
        type: "list",
        message: "do you want to add more team members?",
        name: "addmoreIntern",
        choices: ["yes", "no"],
        when: (answer) => answer.internschool

    }

]


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
            // name, id, email, github
            let tempEngineer = new Engineer(answer.engineername, answer.engineerid, answer.engineeremail, answer.engineergithub)
            team.push(tempEngineer);
        }
        if (answer.typeteam === "Intern") {
            let tempIntern = new Intern(answer.internname, answer.internid, answer.internemail, answer.internschool)
            team.push(tempIntern);
        }

        if (answer.managerofficenumber) {
            init(questions2);
        }

        console.log(team);

        if (answer.addmore === "yes" || answer.addmoreIntern === "yes") {
            init(questions2);
        }

        // After the user has input all employees desired, call the `render` function (required
        // above) and pass in an array containing all employee objects; the `render` function will
        // generate and return a block of HTML including templated divs for each employee!
        if (answer.typeteam === "NONE" || answer.addmore === "no" || answer.addmoreIntern === "no") {
            console.log(render(team));
            // const teamHTML = render(team);

            // After you have your html, you're now ready to create an HTML file using the HTML
            // returned from the `render` function. Now write it to a file named `team.html` in the
            // `output` folder. You can use the variable `outputPath` above target this location.
            // Hint: you may need to check if the `output` folder exists and create it if it
            // does not.

            const teamHTML = render(team);
            if(!fs.existsSync(OUTPUT_DIR)){
                fs.mkdirSync(OUTPUT_DIR);
            }

            fs.writeFile(outputPath, teamHTML, function(error){
                if(error){
                    console.log("something wrong when writting file")
                }
            })


        }

    })

}

init(questions1);