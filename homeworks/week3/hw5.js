const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

const lines = [];

rl.on('line', (line) => {
  lines.push(line);
});

function contest(a, b, j) {
  if (a.length > b.length && j === '1') {
    return 'A';
  }
  if (a.length > b.length && j === '-1') {
    return 'B';
  }
  if (b.length > a.length && j === '1') {
    return 'B';
  }
  if (b.length > a.length && j === '-1') {
    return 'A';
  }
  if (a.length === b.length) {
    for (let g = 0; g < a.length; g += 1) {
      if (a[g] > b[g] && j === '1') {
        return 'A';
      }
      if (a[g] > b[g] && j === '-1') {
        return 'B';
      }
      if (b[g] > a[g] && j === '1') {
        return 'B';
      }
      if (b[g] > a[g] && j === '-1') {
        return 'A';
      }
    }
  }
  return 'DRAW';
}

// 取得所有資料
function solve(arr) {
  const n = Number(arr[0]);
  for (let i = 1; i <= n; i += 1) {
    const [a, b, j] = arr[i].split(' ');
    console.log(contest(a, b, j));
  }
}

rl.on('close', () => {
  solve(lines);
});
