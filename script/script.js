'use strict';
// ~~~~~~~~~~~~~~~~~~~~~~~ LESSON 05 ~~~~~~~~~~~~~~~~~~~~~~~
//
// Константы
const markHigh = "У вас высокий уровень дохода";
const markAverage = "У вас средний уровень дохода";
const markLow = "К сожалению у вас уровень дохода ниже среднего";
const markNegative = "Цель не будет достигнута";
const errorMessage = "Что то пошло не так";

// Функции
let showTypeof = function (item) {
  console.log(`typeof ${item}: `, typeof item);
};
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n) && n > 0;
};
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
 case (income < 0):
    alert(markNegative);
    break;
  default:
    alert(errorMessage);
    break;
  }
}
function getAccumulatedMonth(incomes, expenses) {
  return incomes - expenses;
}
function getBudgetDay(budget) {
  return Math.floor(budget / 30);
}
function getTargetMonth(missionAmount, accumutated) {
  return Math.ceil(missionAmount / accumutated);
}

// Переменные
let money,
  income = 'Фриланс',
  addExpenses = prompt('Перечислите возможные расходы через запятую?'),
  deposit = confirm('Есть ли у вас депозит в банке?'),
  mission = 50000,
  period = 3,
  expenses = [],
  expensesArray = [],
  accumulatedMonth = 0;

addExpenses = addExpenses.toLowerCase().split(',');
console.log('Возможные расходы:', addExpenses);

// Месячный доход
let start = function () {
  do {
    money = prompt('Ваш месячный доход?');
  } while (!isNumber(money));
  console.log('Доход в месяц: ', money);
};
start();

// Выводим типы переменных
showTypeof(money);
showTypeof(income);
showTypeof(deposit);

// Формируем массив расходов с формированием общей суммы расходов
let getExpensesMonth = function () { 
  let sum = 0;

  for (let index = 0; index < 3; index++) {
    let expensesCurrent = 0;
    expenses[index] = prompt(`Введите обязательную статью расходов № ${index+1}?`);
    do {
      expensesCurrent = +prompt(`Во сколько обойдутся расходы по статье "${expenses[index]}"?`);
    } while (!isNumber(expensesCurrent));
    sum += expensesCurrent;
    expensesArray[index] = expensesCurrent;
  }
  
  console.log('Расходы за месяц: ', sum);
  return sum;
};

accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth());

console.log('Cрок достижения цели в месяцах:', getTargetMonth(mission, accumulatedMonth));

console.log('Бюджет на день: ', getBudgetDay(accumulatedMonth));

getStatusIncome(getBudgetDay(accumulatedMonth));
