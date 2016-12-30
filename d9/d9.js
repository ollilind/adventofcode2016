'use inputict'

/*****************************************
 *  https://adventofcode.com/2016/day/9  *
 *  
 *  Recursive solution to decompress message
 *  Took help for the calculation rule from the Reddit (row 68) 
 ****************************************/

const inputfile = './input';
const fs = require('fs');


//Read inputfile and send it to solving function
fs.readFile(inputfile, 'utf8', function(err, data) {
        if(err) {
        console.log("ERROR: " + error);   
        } else {
        data = data.replace(/\s/g,"");

        console.log("Day 9 Part 1: " + d9(data,false));
        console.log("Day 9 Part 2: " + d9(data,true));
        }
        });

//Recursive function that decompresses inputings
function d9(input, recursive) {
     
    let length = input.length;
    
    const compressed = (input.substring("(") != -1);
    
    // Decompress inputing
    // if brackets cannot be founded (=contains no compression) skip this loop and return only the length of string itself
    for (let i = 0; i < input.length && compressed; i++) { 

        //Continue until finds compression marker
        if (input[i] !== '(') continue; 

        //Extract marker with regex-search
        const marker = input.substr(i).match(/^\((\d+)x(\d+)\)/);  

        //Regex search group 1 matches the length of repeated string
        const matchLength = parseInt(marker[1], 10);
        
        // Reges search group 2 matches the repeating times
        const times = parseInt(marker[2], 10);
        
        //Starting point of the repetation inputing (marker + its length)
        const start = i + marker[0].length;

        //String that needs to be decompressed
        const decompressedString = input.substr(start, matchLength);

        //If recursive, start decompressing of the decompressed string
        const decompressedLength d9(decompressedString, true) : decompressedString.length;  // ,3

        //Length = original length + how much decompressing makes string longer
        // = decompressed string * repetation times - original compressed string - marker length

        // Example: 
        // X(8x2)(3x3)ABCY
        // = 15  +  (8 (="(3x3)ABC".length) + 3 (="ABC".length) * 3 (=3x) - 3 (="ABC".length) - 5 ("(3x3)".length)) * 2  - 8 - 5
        // = 15  +  9 * 2 (=2x) - 8 (="(3x3)ABC".length) - 5 ("(8x2).length)
        // = 15  +  5
        // = 20

        length += decompressedLength * times - decompressedString.length - marker[0].length;
        i = start + decompressedString.length - 1;
    }
    
    return length;
}


