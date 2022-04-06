require("colors");

const Colors = { GREEN: 0, YELLOW: 1, RED: 2 };

let currentColor = Colors.GREEN;
const leftRest = +process.argv[2];
const rightRest = +process.argv[3];
let noPrimeNum = true;

if (isNaN(leftRest) || isNaN(rightRest)) {
  console.log("Incorrect start parameters".red);
  return;
}

const isPrimeNum = (num) => {
  if (num <= 1) return false;
  for (let i = 2; i < num; i++) if (num % i === 0) return false;
  return true;
};
const changeColor = () => {
  currentColor++;
  if (currentColor > Colors.RED) currentColor = Colors.GREEN;
};

const colorPrint = (num) => {
    if (noPrimeNum) {
        if (currentColor == Colors.RED) {
          console.log(`${num}`.red);
        }
        else if (currentColor == Colors.GREEN) {
          console.log(`${num}`.green);
        }    
        else {
          console.log(`${num}`.yellow);
        }    
        }
  changeColor();
};

for (let i = leftRest; i <= rightRest; i++) {
  if (isPrimeNum(i)) colorPrint(i);
}
if (noPrimeNum)
  console.log(
    `There are no primes in this range[${leftRest},${rightRest}]`.red
  );




  
  