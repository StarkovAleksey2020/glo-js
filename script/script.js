'use strict';
// LESSON 02
let money = 80000;
let income = 50000;
let addExpenses = 'интернет, такси, коммуналка';
let deposit = true;
let mission = 12000000;
let period = 12;

console.log('typeof money: ', typeof money);
console.log('typeof income: ', typeof income);
console.log('typeof deposit: ', typeof deposit);

//console.log('addExpenses.length: ', addExpenses.length);
//console.log(`Период равен ${period} месяцев`);
//console.log(`Цель заработать ${mission} рублей`);

addExpenses = addExpenses.toLowerCase().split(', ');
//console.log('addExpenses: ', addExpenses);

let budgetDay = money / 30;
//console.log('budgetDay: ', budgetDay);

// LESSON 03
// Месячный доход
const MONEY_TITLE = "Ваш месячный доход?";
let defaultMoney = 80000;
money = parseInt(prompt(MONEY_TITLE, defaultMoney));
//console.log('money: ', money);

// Расходы
const EXPENSES_TITLE = "Перечислите возможные расходы за рассчитываемый период через запятую";
let defaultAddExpenses = "Квартплата, проездной, кредит";
//addExpenses = prompt(EXPENSES_TITLE, defaultAddExpenses);
//console.log('addExpenses: ', addExpenses);

// Наличие депозита
const DEPOSIT_TITLE = "Есть ли у вас депозит в банке?";
//deposit = confirm(DEPOSIT_TITLE);
//console.log('deposit: ', deposit);

// Статьи расходов и их стоимость
const EXPENSES_TITLE_1 = "Введите обязательную статью расходов? (1)";
const EXPENSES_TITLE_2 = "Введите обязательную статью расходов? (2)";
const AMOUNT_TITLE_1 = "Во сколько это обойдется? (1)";
const AMOUNT_TITLE_2 = "Во сколько это обойдется? (2)";
let expenses1, expenses2;
let amount1, amount2;
let amountDefaultOne = 1000;
let amountDefaultTwo = 10000;
let expensesDefaultOne = "Интернет";
let expensesDefaultTwo = "Продукты";
let expensesArrayWithItem = [];

expenses1 = prompt(EXPENSES_TITLE_1, expensesDefaultOne);
while (typeof amount1 !== "number") {
  amount1 = parseInt(prompt(AMOUNT_TITLE_1, amountDefaultOne));
  expensesArrayWithItem.push({name: expenses1, amount: amount1 });
}
expenses2 = prompt(EXPENSES_TITLE_2, expensesDefaultTwo);
while (typeof amount2 !== "number") {
  amount2 = parseInt(prompt(AMOUNT_TITLE_2, amountDefaultTwo));
  expensesArrayWithItem.push({name: expenses2, amount: amount2 });
}
//console.log('expenses1: ', expenses1);
//console.log('amount1: ', amount1);
//console.log('expenses2: ',expenses2) ;
//console.log('amount2: ', amount2);

// Месячный бюджет
//let budgetMonth = money - amount1 - amount2;
//console.log('budgetMonth: ', budgetMonth);

// Число месяцев, за которое будет накоплена сумма mission
//console.log('Months to mission: ', Math.ceil(mission / budgetMonth));

// Уточненная сумма дневного бюджета
//let budgetDayRevised = Math.floor(budgetMonth / 30);
//console.log('Revised daily budget: ', budgetDayRevised);

// Оценка бюджета
const markHigh = "У вас высокий уровень дохода";
const markAverage = "У вас средний уровень дохода";
const markLow = "К сожалению у вас уровень дохода ниже среднего";
const errorMessage = "Что то пошло не так";
/*
switch (true) {
  case (budgetDayRevised >= 1200):
    alert(markHigh);
    break;
  case (budgetDayRevised >= 600 && budgetDayRevised < 1200):
    alert(markAverage);
    break;
 case (budgetDayRevised >= 0 && budgetDayRevised < 600):
    alert(markLow);
    break;
  default:
    alert(errorMessage);
    break;
}
*/




// ~~~~~~~~~~~~~~~~~~~~~~~ LESSON 04 ~~~~~~~~~~~~~~~~~~~~~~~
//
function expensesLog(expenses) {
  expenses.forEach((item) => {
    console.log(item.name + ' - ' + item.amount);
  }); 
}
function getStatusIncome(income) {
  switch (true) {
  case (income >= 1200):
    alert(markHigh);
    break;
  case (income >= 600 && income < 1200):
    alert(markAverage);
    break;
 case (income >= 0 && income < 600):
    alert(markLow);
    break;
  default:
    alert(errorMessage);
    break;
  }
}
function getExpensesMonth(...expenses) {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  return expenses[0].reduce(reducer);
}

function getAccumulatedMonth(incomes, expenses, expFunc) {
  return incomes - expFunc(expenses);
}

let expensesArray = new Array(amount1, amount2);

console.log('Расходы за месяц (lesson 04): ', getExpensesMonth(expensesArray));
expensesLog(expensesArrayWithItem);

let accumulatedMonth = getAccumulatedMonth(money, expensesArray, getExpensesMonth);

function getTargetMonth(missionAmount, accumutated) {
  return Math.ceil(missionAmount / accumutated);
}

console.log('Cрок достижения цели в месяцах (lesson 04):', getTargetMonth(mission, accumulatedMonth));

function getBudgetDay(budget) {
  return Math.floor(budget / 30);
}

console.log('Бюджет на день (lesson 04): ', getBudgetDay(accumulatedMonth));

getStatusIncome(getBudgetDay(accumulatedMonth));