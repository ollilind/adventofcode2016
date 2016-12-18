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
console.log(array);
console.log(array[0].split(/(\s+)/));
    
}; 
