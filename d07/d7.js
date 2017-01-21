'use strict'

/**********************
 * http://adventofcode.com/2016/day/7
 *
 * Part 2 uses dumb bruteforce-solution
 * ********************/

const fs = require("fs");

//Read the input-file, split it based on row changes and count supported addresses and print the answer
fs.readFile("./input", 'utf8', function(err,data) {
	if(err) {
		console.log('Input-file reading error: ' + err);
		return process.exit(0);
	}
	let input = data.split('\n');
	input.pop();
	
	let supportedip = 0;
	let supportedssl = 0;

	for(let i = 0; i < input.length; i++) {
		let supportipssl = testtlssupport(input[i]);
		if(supportipssl[0]) supportedip += 1;
		if(supportipssl[1]) supportedssl += 1;
	}

	console.log("Day 7 Part 1: " + supportedip);
	console.log("Day 7 Part 2: " + supportedssl);
	
});

// Check is the string TLS and SSL supported
function testtlssupport (ipaddress) {

	let startbracket = 0; 
	let endbracket = -1;
	let bracketbefore;

	let supported = 0;

	let outsidebrackets = [];
	let insidebrackets = [];
	let outsideapa = [];

	// Go through the string until it is handled
	while(true) {

		bracketbefore = endbracket+1;
		startbracket = ipaddress.indexOf('[', endbracket+1);
		endbracket = ipaddress.indexOf(']', endbracket+1); 
		
		//split strings based on brackets and go through founded 
		if(endbracket != -1 && startbracket < endbracket) {					       			    let beforebracket = ipaddress.substring(bracketbefore,startbracket);
			let insidesquare = ipaddress.substring(startbracket+1,endbracket);
			
			if(testabba(insidesquare)) supported = -1;
			if(testabba(beforebracket) && supported != -1) supported = 1;

			if(beforebracket.length > 0) outsidebrackets.push(beforebracket);
			if(insidesquare.length > 0) insidebrackets.push(insidesquare);
		} else {
			//Test last part
			let laststring = ipaddress.substring(ipaddress.lastIndexOf("]")+1,ipaddress.length);
			if(laststring.length > 0) outsidebrackets.push(laststring);
			if(supported != -1 && testabba(laststring)) supported = 1;
			break;
		}
	}
	// Get all the ABA
	for(let x = 0; x < outsidebrackets.length; x++) {
		let foundapa = [];
		foundapa = testapa(outsidebrackets[x]);
		if(foundapa.length > 0) outsideapa.push(foundapa);
	}

	let match = 0;
	//Bruteforce solution - goes through strings inside brackets if matching BAB can be found
	for(let i = 0; i < outsideapa.length && match == 0; i++) {
		for(let x = 0; x < outsideapa[i].length; x++) {

			let apa = (outsideapa[i])[x];
			let searchedapa = apa[1] + apa[0] + apa[1];

			for(let y = 0; y < insidebrackets.length; y++) {
				if(insidebrackets[y].indexOf(searchedapa) >= 0) { 
					match = 1;
				}	
			}
		}
	}
	// Return if tls and SSL supported
	return [supported == 1, match == 1];
}

//Regex solution to find ABBA
function testabba(string) {
	return !!(/([a-z])(?!\1)([a-z])\2\1/.exec(string));	
}

//Bruteforce ABA. Should be replaced to smart regex
function testapa(string) {
	let match = [];
	for(let i = 0; i < string.length -2; i++) {
		if(string[i] == string[i+2] && string[i] != string[i+1]) {
			match.push(string[i] + string[i+1] + string[i+2]);
		}
	}

	return match;
}
