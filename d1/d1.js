'use strict'

// Walking direction input gained from AoC16
let plan = "L4,L1,R4,R1,R1,L3,R5,L5,L2,L3,R2,R1,L4,R5,R4,L2,R1,R3,L5,R1,L3,L2,R5,L4,L5,R1,R2,L1,R5,L3,R2,R2,L1,R5,R2,L1,L1,R2,L1,R1,L2,L2,R4,R3,R2,L3,L188,L3,R2,R54,R1,R1,L2,L4,L3,L2,R3,L1,L1,R3,R5,L1,R5,L1,L1,R2,R4,R4,L5,L4,L1,R2,R4,R5,L2,L3,R5,L5,R1,R5,L2,R4,L2,L1,R4,R3,R4,L4,R3,L4,R78,R2,L3,R188,R2,R3,L2,R2,R3,R1,R5,R1,L1,L1,R4,R2,R1,R5,L1,R4,L4,R2,R5,L2,L5,R4,L3,L2,R1,R1,L5,L4,R1,L5,L1,L5,L1,L4,L3,L5,R4,R5,R2,L5,R5,R5,R4,R2,L1,L2,R3,R5,R5,R5,L2,L1,R4,R3,R1,L4,L2,L3,R2,L3,L5,L2,L2,L1,L2,R5,L2,L2,L3,L1,R1,L4,R2,L4,R3,R5,R3,R4,R1,R5,L3,L5,L5,L3,L2,L1,R3,L4,R3,R2,L1,R3,R1,L2,R4,L3,L3,L3,L1,L2";

d1(plan);

function d1 (plan, callback) {

    // akselit
    let x = 0;
    let y = 0;

    // Keep track on moving direction
    // 0=north, 1=east,2=south,3=west
    let direction = 0;

    let steps = plan.split(",");

    let takenSteps = 0;
    let dots = [];
    for (let i=0; i < steps.length; i++) {
        let direc = steps[i].substring(0,1); 
        if (direc == "L") {direction -= 1} else {direction += 1}
        if (direction == -1) {direction = 3}
        if (direction == 4) {direction = 0}
        takenSteps += 1;
        let step = steps[i].substring(1,4);
        step = parseInt(step);

        let xstart = x;
        let ystart = y;

        while (step != 0) {
            switch(direction) {
                case 0:
                    y = y+1;
                    break;
                case 1:
                    x = x + 1;
                    break;
                case 2:
                    y = y - 1;
                    break;
                case 3:
                    x = x - 1;
                    break;
                default:
                    console.log("ERROR");
                    break;
            }
            dots.push({"x": x,"y": y});
            step -= 1; 
        }
    }

    let distance = 0;

    //Find out first point where been once before
    for (let i=0; i < dots.length && distance == 0; i++) {
        for (let z=i+1; z < dots.length; z++) {
            if ( dots[z].x == dots[i].x && dots[z].y == dots[i].y) {
                distance =  Math.abs(x) + Math.abs(y);
                break;
            }
        }
    }
    console.log("Part 2: Distance is: " + distance);
    process.exit(0);
}
