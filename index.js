require('colors')

const Colors = {GREEN : 0, YELLOW: 1, RED : 2}

let currentColor = Colors.GREEN;
const leftRest = +process.argv[2];
const rightRest = +process.argv[3];
let noPrimeNum = true;

if(isNaN(leftRest) || isNaN(rightRest)){
    console.log('Incorrect start parameters'.red);
    return;
}

const isPrimeNum = (num) => {
    if (num <= 1)
        return false;
    for(let i = 2; i < num; i++)
        if(num % i === 0) return false;
    return true;
}
const changeColor = () => {
    currentColor++;
    if (currentColor > Colors.RED)
        currentColor = Colors.GREEN;
}