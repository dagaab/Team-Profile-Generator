const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const pageTemplate = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.
const teamMembers = [];

// Manager's questions
const questionsManager = () => {
    return inquirer.prompt([
    {
        type: "input",
        name: "nameOfManager",
        message: "Please enter the team's manager name:",
    },
    {
        type: "input",
        name: "managersID",
        message: "What is your ID?",
    },
    {
        type: "input",
        name: "managersEmail",
        message: "What is your email address?",
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is your office number?",
    },
   
]).then(answers => {
    const manager = new Manager(answers.nameOfManager, answers.managersID, answers.managersEmail, answers.officeNumber);
    teamMembers.push(manager);
    listMenu();
})
};

// Choice menu:
const listMenu = () => {
    return inquirer.prompt([
    {
        type: "list",
        name: "menu",
        message: "What do you like to do?",
        choices: ["Add an engineer", "Add an intern", "Finish building the team"]
    }])
    .then(userChoice => {
        switch (userChoice.menu) {
        case "Add an engineer":
             questionsEngineer();
             break;

        case "Add an intern":
            questionsIntern();
            break;

        case "Finish building the team":
            generateTeam();
    }
});
};

// Engineer's questions:
const questionsEngineer = () => {
    return inquirer.prompt([
    {
        type: "input",
        name: "nameOfEngineer",
        message: "What is the new engineer's name?",
    },
    {
        type: "input",
        name: "engineersID",
        message: "What is the new engineer's ID?",
    },
    {
        type: "input",
        name: "engineersEmail",
        message: "What is the new engineer's email address?",
    },
    {
        type: "input",
        name: "engineersGithub",
        message: "What is the new engineer's GitHub username?",
    },
    ]).then(answers => {
        const engineer =  new Engineer(answers.nameOfEngineer, answers.engineersID, answers.engineersEmail, answers.engineersGithub);
        teamMembers.push(engineer);
        listMenu();
    })
};

//Intern's Questions:
const questionsIntern = () => {
    return inquirer.prompt([
    {
        type: "input",
        name: "nameOfIntern",
        message: "What is the new intern name?",
    },
    {
        type: "input",
        name: "internsID",
        message: "What is the new intern ID?",
    },
    {
        type: "input",
        name: "internsEmail",
        message: "What is the new intern's email address?",
    },
    {
        type: "input",
        name: "internsSchool",
        message: "What is the new intern's School?",
    },
    ]).then(answers => {
        const intern = new Intern(answers.nameOfIntern, answers.internsID, answers.internsEmail, answers.internsSchool);
        teamMembers.push(intern);
        listMenu();
    })
};


// function to write HTML file
const generateTeam = () => {
   console.log(`---- Team Profile is ready! ----`);

   if(!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR)
   }
   fs.writeFileSync(outputPath, pageTemplate(teamMembers)); 
}

// function call to initialize program
questionsManager();


