'use strict'

/****************************************
 * http://adventofcode.com/2016/day/5   *
 * **************************************/

const md5 = require('js-md5');

let correctAnswer = '';
let correctAnswer2 = '????????'; //Starting point, answer formed by replacing chars
let id = 0;
let hashedText = 'wtnhxymk'; //Puzzle input from AoC

//Go through hashes until both answers has been formed
while (correctAnswer.length < 8 || correctAnswer2.indexOf('?') != -1) {
    
    //Find next hash starting with 5 zeroes. Returns whole hash
    let found = findcorrecthash(hashedText, id);
    
    //Form answer for part 1	
    if(correctAnswer.length < 8) correctAnswer += found.hash.substring(5,6);

    //Form answer for part2
    let position = -1;
    let character = '';
    try {
        position = parseInt(found.hash.substring(5,6));
        character = found.hash.substring(6,7);
    } catch (e) {
        position = -1;
    }
    
    //Check that position is valid and that position isn't filled yet
    if((position < 8) && (position => 0) && (correctAnswer2.substring(position,position+1) == '?')) {
        correctAnswer2 = correctAnswer2.substring(0,position) + character + correctAnswer2.substring(position+1,8);
    }

    //Continue from next id 
    id = found.id + 1;
}

//Print correct answers to console
console.log("Day 5 Part 1 answer: " + correctAnswer);
console.log("Day 5 Part 2 answer: " + correctAnswer2);

function findcorrecthash (text, id) {

    let answer = {"id": 0, "hash": "" };

    //Find the id which produces hash starting with five zeroes
    while(md5(text+id).substring(0,5) != '00000') {
        id = parseInt(id);
    }

    //Return the hash and the ID that produced wanted hash 
    answer.id = id;
    answer.hash = md5(text+id);

    return answer;
}
