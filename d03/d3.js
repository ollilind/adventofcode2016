'use strict'

let fs = require('fs');
// Get input and pass it to solving function
let input = fs.readFile('input', 'utf8', function(err, data) {
        if(err) {
        console.log(err);
        process.exit(1);
        }
        d3(splitfiletoarray(data));
        });

// Function to split file input to arrays
function splitfiletoarray(input) {
    //Triangles are separated based on linebrakes
    let array = input.split("\n");
    array.pop(); //one extra linebrakes at the end of file

    //Split lines to arrays and remove whitespace
    for(let i = 0; i < array.length; i++) {
        array[i] = array[i].split(/\s+/);
    } 
    return array;
}

// Print amount of correct triangles in array of trianglearrays
// Give array of triangles [[side1, side2, side3],[side1,side2,side3],[...],] 
function d3 (array) {
    let correct = calculateCorrectTriangles(array);
    let correctpart2 = calculateCorrectTriangles(rearrangearray(array));

    console.log("D3 Part 1: " + correct);
    console.log("D3 Part 2: " + correctpart2);
};

// Rearrange array from horisontal to vertical view (Part 2)
function rearrangearray(originalArray) {

    let newArray = [];

    while(originalArray.length > 0) {
        for(let y = 0; y < 3; y++) {
            let newtriangle = [];
            for(let i = 0; i < 3; i++) {
                newtriangle.push((originalArray[i])[y]);
            }
            newArray.push(newtriangle);
        }

        for(let z = 0; z < 3; z++) {
            originalArray.shift();
        }
    } 
    return newArray;
};

// Return amount of correct triangles based on side lengths
function calculateCorrectTriangles(trianglearray) {
    let correctTriangles = 0;

    trianglearray.forEach(function(element,index,array) { 

            let a = parseInt(element[0]);
            let b = parseInt(element[1]);
            let c = parseInt(element[2]);

            if(a < b + c && b < a + c && c < a + b) {
            correctTriangles += 1;
            }

            });
    return correctTriangles; 
}
