'use strict'

/****************************************
 * http://adventofcode.com/2016/day/8   *
 * **************************************/

const fs = require('fs');

//Configure
const wide = 50;
const tall = 6;
const inputfile = './input'

let screen = [];

d8(function action() {
    process.exit(0)
});

//Parse commands given in input-file and 
function d8(callback) {
    fs.readFile(inputfile, 'utf8', function(err, data) {

	
    //initialize screen
    for(let i = 0; i < tall; i++) {
	let array = [];
	for(let y = 0; y < wide; y++) {
	    array.push(".");
	}
	screen.push(array);
    }
   
   //Command array, remove last empty object
   let commands = data.split("\n");
   commands.pop();

    //Go through all the commands, parse parameters and call corresponding functions
    for(let command = 0; commands.length > command; command++) {
	let com = commands[command];
	if(com.substring(0,4) == "rect") {
	    screen = rect(screen, com.substring(com.indexOf(" ") +1, com.indexOf("x")),
		com.substring(com.indexOf("x")+1,com.length));
	} else if (com.substring(0,10) == "rotate row")  {
	    screen = rotaterow(screen, com.substring(com.indexOf("=")+1, com.indexOf(" by ")), 
		com.substring(com.indexOf("by ")+3, com.length));
	} else if (com.substring(0,13) == "rotate column") {
	    screen = rotatecolumn(screen, com.substring(com.indexOf("=")+1, com.indexOf(" by ")), 
		com.substring(com.indexOf("by ")+3, com.length));
	} else {
	    console.log("ERROR: UNKNOWN COMMAND");
	}

    }
    //Print the results
    console.log("Day 8 Part 1: " + calculatePixels(screen));
    console.log("Day 8 Part 2: ");
    printscreen(screen);
    });
}

//For part 1 - how many pixels are lit
function calculatePixels (screen) {
    let pixels = 0;
    for(let height = 0; tall > height; height++) {
	for(let width = 0; wide > width; width++) {
	    if((screen[height])[width] == "#") pixels++;
	}
    }
    return pixels;
}

//Prints the screen
function printscreen (screen) { 
    for(let screenrows = 0; screenrows < tall; screenrows++) {
	let row = '';
	for(let screenwidth = 0; screenwidth < wide; screenwidth++) {
	    row += (screen[screenrows])[screenwidth];
	}
	console.log(row);
    }
}

//Creates a retangle to the screen
function rect(screen, x,y) {
    for(let writeheight = 0; writeheight < y; writeheight++) {
	for(let writewidth = 0; writewidth < x; writewidth++) {
	    (screen[writeheight])[writewidth] = '#';	
	}
    }
    return screen;
}

//Rotates column
function rotatecolumn(screen,x,by) {
    //Read rotated column
    let column = '';
    for(let height = 0; height < tall; height++) {
	column += (screen[height])[x];
    }

    //Rotate column
    let rotated = '';
    for(let index = tall-parseInt(by); rotated.length < tall; index++) {
	if(index == tall) index = 0;
	rotated += column[index];
    }

    //Place rotated column to screen
    for(let y = 0; tall > y; y++) {
	(screen[y])[x] = rotated[y];
    }

    return screen;
}

//Rotates row
function rotaterow(screen,y,by) {
    //Read rotated row
    let row = '';
    for(let width = 0; wide > width; width++) {
	row += (screen[y])[width];
    }

    //Rotate row
    let rotated = '';
    for(let index = wide-parseInt(by); rotated.length < wide; index++) {
	if(index == wide) index = 0;
	rotated += row[index];
    }

    //Place rotated row to screen
    for(let x = 0; wide > x; x++) {
	(screen[y])[x] = rotated[x];
    }

    return screen;
}
