var prompt = require('prompt');
/*
 * This is the main entry file of the robot example
 * try running npm i first and then npm start to start the program
 */


class Robot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        // console.log(x);
        // console.log(y);
    }
    getFinalPosition() {
        // Priniting final position of robot
        console.log("New position of robot is (" + this.x + "," + this.y + ")");
    }
    BestMoves(x1, y1) {
        var FinalString = ""; // used a string to append and finally show answer , because as far as I know console.log doesn't support inline
        var possibility = true; // counter variable to check if the possibility of moving the robot is possible
        if (this.x < x1) { // checking if movement should be on the right
            for (var i = this.x; i <= x1 - 1; i++) {
                // this.x += 1;
                FinalString += "R,"; // appending to the string
            }
        } else {
            if (this.x > x1) { // checking if movement should be on the left
                for (var i = this.x; i >= x1 + 1; i--) {
                    // this.x -= 1;
                    FinalString += "L,";
                }
            }
        }
        if (this.y < y1) { // checking if movement should be forward
            for (var i = this.y; i <= y1 - 1; i++) {
                // this.y += 1;
                FinalString += "F,";
            }
        } else {
            if (this.y > y1) { // checking if there is no possibility of movement (i.e Backwards)
                possibility = false;
            }
        }
        if (!possibility) {
            console.log("Not possible, because robot cannot move backwards!");
        } else {
            FinalString = FinalString.substr(0, FinalString.length - 1); // removing the last comma from the string to make it neat
            console.log(FinalString);
        }
    }
    move(orientation) {
        switch (orientation) {
            case 'F':
                if (this.y + 1 > 10) {
                    // console.log(this.y);
                    console.log("Robot out of the grid , wrong input"); // checking if robot goes out of the grid
                } else {
                    this.y += 1;
                }
                break;
            case 'L':
                if (this.x - 1 < 0) {
                    // console.log("L");
                    console.log("Robot out of the grid , wrong input");
                } else {
                    this.x -= 1;
                }
                break;
            case 'R':
                if (this.x + 1 > 10) {
                    // console.log("R");
                    console.log("Robot out of the grid , wrong input");
                } else {
                    this.x += 1;
                }
                break;
        }
    }
};

var schema = {
    properties: {
        coOrdinates: {
            message: 'Please enter the initial location of the robot'
        },
        orientation: {
            message: 'Please enter the initial direction of the robot'
        },
        commandList: {
            message: 'Please enter a command list'
        }
    }
}; // schema for menu's 1st option
var schema2 = {
    properties: {
        startCoOrdinates: {
            message: 'Please enter the initial location of the robot'
        },
        endCoOrdinates: {
            message: 'Please enter the final location of the robot'
        }
    }
}; // schema for menu's 2md option

prompt.start(); // starting the prompt

function UserInteraction() {
    var x, y;
    var commandList;
    var tempForCoOrdinates;
    var choice;
    console.log("1. Enter best Results with start and endpoint");
    console.log("2. Enter start point and movements");
    console.log("Enter choice(1-2)?");
    prompt.get(['choice'], function(err, result) { //for entering choice based on the menu system
        var choice = result.choice;
        switch (choice) {
            case '1':
                prompt.get(schema2, function(err, result) { // showed every string operation line-by-line to demonstrate methodology
                    var tempForstartCoOrdinates = result.startCoOrdinates,
                        tempForendCoOrdinates = result.endCoOrdinates;
                    tempForstartCoOrdinates = tempForstartCoOrdinates.substr(1, tempForstartCoOrdinates.length - 1); // removing the brackets from the input
                    tempForstartCoOrdinates = tempForstartCoOrdinates.split(","); // spliting the string by a comma to an array
                    tempForendCoOrdinates = tempForendCoOrdinates.substr(1, tempForendCoOrdinates.length - 1);
                    tempForendCoOrdinates = tempForendCoOrdinates.split(",");
                    var dummyRobot = new Robot(parseInt(tempForstartCoOrdinates[0]), parseInt(tempForstartCoOrdinates[1])); //initialzing the robot class with default args
                    // console.log(tempForendCoOrdinates[0], tempForendCoOrdinates[1]);
                    dummyRobot.BestMoves(parseInt(tempForendCoOrdinates[0]), parseInt(tempForendCoOrdinates[1])); // calling the best move function from robot class
                });
                break;
            case '2':
                prompt.get(schema, function(err, result) {
                    tempForCoOrdinates = result.coOrdinates;
                    tempForCoOrdinates = tempForCoOrdinates.substr(1, tempForCoOrdinates.length - 1);
                    tempForCoOrdinates = tempForCoOrdinates.split(",");
                    var dummyRobot = new Robot(parseInt(tempForCoOrdinates[0]), parseInt(tempForCoOrdinates[1]));
                    commandList = result.commandList.split(",");
                    var firstMove = result.orientation.trim(); // to prevent extra spaces
                    // console.log(firstMove);
                    dummyRobot.move(firstMove); // moving the robot
                    for (var i = 1; i < commandList.length; i++) { // started from index 1 , because the robot moved for the first time
                        commandList[i] = commandList[i].trim(); // again preventing extra spaces
                        dummyRobot.move(commandList[i]);
                    }
                    dummyRobot.getFinalPosition(); // get Final Position of robot
                });
                break;
        }
    });
}

UserInteraction();