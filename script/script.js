'use strict';
// ~~~~~~~~~~~~~~~~~~~~~~~ LESSON 07 ~~~~~~~~~~~~~~~~~~~~~~~
//
// Константы
const markHigh = "У вас высокий уровень дохода";
const markAverage = "У вас средний уровень дохода";
const markLow = "К сожалению у вас уровень дохода ниже среднего";
const markNegative = "Цель не будет достигнута";
const errorMessage = "Что то пошло не так";

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n) && n > 0;
};

// Месячный доход
let money,
  start = function () {
  do {
    money = prompt('Ваш месячный доход?');
  } while (!isNumber(money));
  console.log('Доход в месяц: ', money);
};
start();

let appData = {
  budget: money,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 50000,
  period: 3,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: () => {
    for (let index = 0; index < 3; index++) {
      let currentExpensesName = "";
      let currentExpensesValue = 0;
      do {
        currentExpensesName = prompt(`Введите обязательную статью расходов № ${index + 1}?`);
      } while (currentExpensesName.length === 0);
      do {
        currentExpensesValue = +prompt(`Во сколько обойдутся расходы по статье "${currentExpensesName}"?`);
      } while (!isNumber(currentExpensesValue));
      appData.expenses[currentExpensesName] = currentExpensesValue;
    }
    return appData.expenses;
  },
  getExpensesMonth: function () { 
    for (const key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
    return appData.expensesMonth;
  },
  getBudget: function() {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
  },
  getTargetMonth: function() {
    appData.period = Math.ceil(appData.mission / appData.budgetMonth);
  },
  getStatusIncome: function() {
    switch (true) {
    case (appData.budgetDay >= 1200):
      alert(markHigh);
      break;
    case (appData.budgetDay >= 600 && appData.budgetDay < 1200):
      alert(markAverage);
      break;
  case (appData.budgetDay >= 0 && appData.budgetDay < 600):
      alert(markLow);
      break;
  case (appData.budgetDay < 0):
      alert(markNegative);
      break;
    default:
      alert(errorMessage);
      break;
    }
  },
};

appData.asking();
console.log('Расходы с расшифровкой статей: ', appData.expenses);
console.log('Сумма расходов: ', appData.getExpensesMonth());
appData.getBudget();
appData.getTargetMonth();
console.log('Cрок достижения цели в месяцах:', appData.period);
console.log('Бюджет на день: ', appData.budgetDay);
appData.getStatusIncome();

console.log("Наша программа включает в себя данные:");
for (const key in appData) {
  console.log("Ключ: " + key + "; Значение: " + appData[key]);
}