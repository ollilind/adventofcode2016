'use strict'

const fs = require('fs');
const values = require('object.values');
const _ = require('lodash');

// Get input and pass it to solving function
let input = fs.readFile('input', 'utf8', function(err, data) {
        if(err) {
        console.log(err);
        process.exit(1);
        }
        d4(splitfiletoarray(data));
        });

// Function to split file input to arrays
function splitfiletoarray(input) {
    //Rooms are separated based on linebrakes
    let array = input.split("\n");  

    return array;
}

// Print amount of correct rooms
// Give array room codes
function d4 (rawarray) {

    let parsedRoomArray = parseRoomInput(rawarray);
    let correct = calculateCorrectRooms(parsedRoomArray);

    let unencryptedArray = decrypttext(parsedRoomArray);
    let correctpart2 = findnorthpole(unencryptedArray); 

    console.log("D4 Part 1: " + correct);
    console.log("D4 Part 2: " + correctpart2);
};

//Parse input to wanted format
function parseRoomInput (roomArray) {
    let parsedRooms = [];
    let i = 0;
    roomArray.forEach(function(element,index,array) {
            let checksum = element.substring(element.length - 6, element.length -1);
            let sectorID = element.substring(element.lastIndexOf("-")+1, element.length-7);
            let name = element.substring(0, element.lastIndexOf("-")).replace(new RegExp("-",'g'), "");

            parsedRooms.push([name,checksum,sectorID]);
            });
    return parsedRooms;
}

//Part 2 decrypting task
function decrypttext (cryptedText) {

    // output array for the decrypted room names
    let newarray = [];
    
    for (let y = 0; y < cryptedText.length; y++) {
        let output = '';
            
        //Examined string
        let str = (cryptedText[y])[0];
            

        // Go through each character
        for (let f = 0; f < (cryptedText[y])[0].length; f++) {
        
            //Examined character
            let c = str[f];

            // Find corresponding name
            let code = str.charCodeAt(f);
            c = String.fromCharCode(((code - 97 + parseInt((cryptedText[y])[2])) % 26) + 97);

            output += c;
        }
        //Add found name to outputarray
        newarray.push([output,(cryptedText[y])[2]]);
    }
    return newarray;
}

//find the pole word from the array of strings
function findnorthpole(array) {

    for(let x = 0; x < array.length; x++) {
        if((array[x])[0].indexOf("pole") > -1) {
            return array[x];
        }  

    }
}

// Give array of [[name, checksum, sectorID], [...]]
// Return the sum of the correct rooms' sectorID
function calculateCorrectRooms (roomarray) {

    let correctRoomsSectorId = 0;

    for(let z = 0; z < roomarray.length; z++) {

        //Split letters to array
        let charArray = (roomarray[z])[0].split("");


        // Sum up the individual letters to object-array
        let letterArr = [];

        charArray.forEach((letter, i) => {
                const exists = _.find(letterArr, { letter });

                if (exists) {
                exists.occurence += 1;
                } else { 
                letterArr.push({letter: letter,occurence: 1});
                }
        }
        );

        // Sort founded object-array
        letterArr.sort((a, b) => {
                if(a.occurence == b.occurence) { return a.letter.localeCompare(b.letter) } 
                else {return b.occurence - a.occurence};
                }
                );
        let correctCheck = "";

        // Get 5 first letters for the checksum comparing
        for (let i = 0; i < 5; i++) {
            correctCheck += letterArr[i].letter;
        }

        if(correctCheck == roomarray[z][1]) {    
            correctRoomsSectorId += parseInt(roomarray[z][2]);
        } 
    }

    return correctRoomsSectorId;
}

