'use strict'

/****************************************
 * http://adventofcode.com/2016/day/6   *
 * **************************************/

const fs = require('fs');

const letters = 8;
const inputfile = "input";

//Read input-file and pass array of strings to solving function
let input = fs.readFile(inputfile,'utf8',function(err,data) {
    if(err) {
	console.log('Input-file reading error: ' + err);
	return process.exit(0);
    }
    findMostAndLeastCommonLetters(data.split('\n'));
});

//Function to solve the most and least used letters
//Takes array of repeted strings in array 
function findMostAndLeastCommonLetters (stringarray) {
    
    let appearance = [];
    
    //Go through all the letters
    for(let i = 0; i < letters; i++) {
	let object = {};
	//Go through all strings
	for(let y = 0; y < stringarray.length; y++) {
	    let nextchar = (stringarray[y])[i];
	    if (object.hasOwnProperty(nextchar)) {
		object[nextchar] += 1;
	    } else {
	    	if(nextchar != undefined) object[nextchar] = 1;
	    }
	}
	appearance.push(object);
    }

    let correctword = findcorrectwords(appearance);
    
    console.log("Day 6 Part 1: "+ correctword[0]);
    console.log("Day 6 Part 2: "+ correctword[1]);
    process.exit(0);
}

// Find the most and least used chars in object array
// Example: [{a: 1, b: 2, ...}, {f: 4, g: 7, ...}]
function findcorrectwords(array) {
   
    let correctword = '';
    let correctword2 = '';
    
    //Go through all the objects containing chars in array
    for(let iterator = 0; iterator < array.length; iterator++) {
    	
	// Variables needed to find most and least used chars
	let mostusedchar = '';
	let mostusedcharappearance = 0;
	let leastusedchar = '';
	let leastusedcharappearance = 9999;
	let examinedArray = array[iterator];

	// Go through all the keys in the object
	for(var key in examinedArray) {
 
	    if(examinedArray[key] > mostusedcharappearance) {
		mostusedcharappearance = examinedArray[key];
		mostusedchar = key;
	    }

	    if(examinedArray[key] < leastusedcharappearance) {
		leastusedcharappearance = examinedArray[key];
		leastusedchar = key;
	    }
	}

	// Add wanted letters to response
	correctword += mostusedchar;
	correctword2 += leastusedchar;
    }
    //Return correct words in array
    return [correctword, correctword2];
}
