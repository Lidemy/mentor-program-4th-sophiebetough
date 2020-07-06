const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

const lines = [];

rl.on('line', (line) => {
  lines.push(line);
});

function printStar(n) {
  let str = '';
  for (let i = 1; i <= n; i += 1) {
    str += '*';
  }
  console.log(str);
}

function solve(arr) {
  const N = Number(arr[0]);
  for (let i = 1; i <= N; i += 1) {
    printStar(i);
  }
}

rl.on('close', () => {
  solve(lines);
});
