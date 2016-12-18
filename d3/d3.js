'use strict'

let fs = require('fs');

let input = fs.readFile('input', 'utf8', function(err, data) {
    if(err) {
        console.log(err);
        process.exit(1);
    }
    d3(data);
});

function d3 (input, callback) {

    let array = input.split("\n");
    array.pop();
    let correct = 0;
    
    array.forEach(function(element,index,array) { 
        let sides = element.split(/\s+/); 
        
        let a = parseInt(sides[0]);
        let b = parseInt(sides[1]);
        let c = parseInt(sides[2]);

        if(a < b + c && b < a + c && c < a + b) {
            correct += 1;
           }
    });

    console.log("D3 Part 1: " + correct);
}; 
