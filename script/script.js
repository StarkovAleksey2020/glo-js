let money = 80000;
let income = 50000;
let addExpenses = 'интернет, такси, коммуналка';
let deposit = true;
let mission = 12000000;
let period = 12;

console.log('typeof money: ', typeof money);
console.log('typeof income: ', typeof income);
console.log('typeof deposit: ', typeof deposit);

console.log('addExpenses.length: ', addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);

addExpenses = addExpenses.toLowerCase().split(', ');
console.log('addExpenses: ', addExpenses);

let budgetDay = money / 30;
console.log('budgetDay: ', budgetDay);