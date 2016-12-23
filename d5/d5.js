'use strict'

const md5 = require('js-md5');

let correctAnswer = '';
let correctAnswer2 = '????????'; 
let id = 0;
let hashedText = 'wtnhxymk';

while (correctAnswer.length < 8 || correctAnswer2.indexOf('?') != -1) {
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

    if((position < 8) && (position => 0) && (correctAnswer2.substring(position,position+1) == '?')) {
        correctAnswer2 = correctAnswer2.substring(0,position) + character + correctAnswer2.substring(position+1,8);
    }
    id = found.id;
}

console.log("Day 5 Part 1 answer: " + correctAnswer);
console.log("Day 5 Part 2 answer: " + correctAnswer2);

function findcorrecthash (text, id) {

    let answer = {"id": 0, "hash": "" };

    while(md5(text+id).substring(0,5) != '00000') {
        id = parseInt(id) + 1;
    }
    answer.id = id+1;
    answer.hash = md5(text+id);

    return answer;
}
