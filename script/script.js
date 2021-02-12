'use strict';

let start = document.getElementById('start'),
btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    depositCheck = document.querySelector('#deposit-check'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    accumulatedMonthvalue = document.getElementsByClassName('accumulated_month-value')[0],    
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    expensesTitle = document.querySelector('.expenses-title'),
    incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpenses = document.querySelector('.additional_expenses'),
    periodSelect = document.querySelector('.period-select'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),    
    targetAmount = document.querySelector('.target-amount'),
    incomeItem = document.querySelectorAll('.income-items'),
    periodAmount = document.querySelector('.period-amount'),
    nameFields = document.querySelectorAll('[placeholder="Наименование"]'),
    sumFields = document.querySelectorAll('[placeholder="Сумма"]');
    
const markHigh = "У вас высокий уровень дохода";
const markAverage = "У вас средний уровень дохода";
const markLow = "К сожалению у вас уровень дохода ниже среднего";
const markNegative = "Цель не будет достигнута";
const errorMessage = "Что то пошло не так";

periodAmount.innerHTML = periodSelect.value;
budgetMonthValue.value = 0;
salaryAmount.value = '';
salaryAmount.focus();

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n) && n > 0;
};

// Месячный доход

let appData = {
  budget: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  start: function () {
    if (parseInt(salaryAmount.value) > 0) {
      appData.budget = 0;
      appData.budget = +salaryAmount.value;
      appData.getExpenses();
      appData.getIncome();
      appData.getExpensesMonth();
      appData.getIncomeMonth();
      appData.getAddExpenses();
      appData.getAddIncome();
      appData.getBudget();
      appData.showResult();
    } 
  },
  showResult: function () {  
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = Math.ceil(appData.budgetDay);
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = Math.ceil(appData.calcPeriod());
  },
  addExpensesBlock: function () {  
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.firstChild.nextSibling.value = '';
    cloneExpensesItem.lastChild.previousSibling.value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    nameFields = document.querySelectorAll('[placeholder="Наименование"]');
    sumFields = document.querySelectorAll('[placeholder="Сумма"]');
    appData.setListenerName(nameFields);
    appData.setListenerSum(sumFields);
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  },
  addIncomeBlock: function () {  
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.firstChild.nextSibling.value = '';
    cloneIncomeItem.lastChild.previousSibling.value = '';
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    nameFields = document.querySelectorAll('[placeholder="Наименование"]');
    sumFields = document.querySelectorAll('[placeholder="Сумма"]');
    appData.setListenerName(nameFields);
    appData.setListenerSum(sumFields);
    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  },
  getExpenses: function () {  
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  getIncome: function () {  
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = cashIncome;
      }
    });
  },
  getAddExpenses: function () {  
    appData.addExpenses = [];
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function (item) { 
      if (item !== '') {
        item = item.trim();
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function () {
    appData.addIncome = [];
    additionalIncomeItem.forEach(function (item) { 
      let itemValue = item.value.trim();
      if (item.value !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },
  getExpensesMonth: function () { 
    appData.expensesMonth = 0;
    for (const key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
    return appData.expensesMonth;
  },
  getIncomeMonth: function () {  
    appData.incomeMonth = 0;
    for (const key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },
  getBudget: function() {
    appData.budgetMonth = +appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
  },
  getTargetMonth: function() {
    return targetAmount.value / appData.budgetMonth;
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
  getInfoDeposit: function () {  
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt('Уточните ставку по депозиту?', '10');
      } while (appData.percentDeposit.length === 0);
      do {
      appData.moneyDeposit = prompt('Уточните сумму вклада?', 10000);
      } while (!isNumber(appData.moneyDeposit));
      
    }
  },
  calcPeriod: function () {  
    return appData.budgetMonth * periodSelect.value;
  },
  capitalizeAddExpensesString: function () {
    for (let index = 0; index < appData.addExpenses.length; index++) {
      appData.addExpenses[index] = appData.addExpenses[index].substring(0, 1).toUpperCase() + appData.addExpenses[index].slice(1).toLowerCase();
    }
  },
  getPeriodValue: function (e) {  
    periodAmount.innerHTML = e.target.value;
    incomePeriodValue.value = Math.ceil(appData.calcPeriod());
  },
  checkInputName: function (e) {  
    let punctRE = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g;
    let spaceRE = /\s+/g;
    let numbersRE = /\d/g;
    e.target.value = e.target.value.replace( /[A-z]/gi, '' ).replace(numbersRE, ''); 
  },
  checkInputSum: function (e) {  
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  },
  setListenerName: function (object) {  
    object.forEach(function (item) {
      item.addEventListener('input', appData.checkInputName);
    });
  },
  setListenerSum: function (object) {  
    object.forEach(function (item) {
      item.addEventListener('input', appData.checkInputSum);
    });
  },
};


start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.getPeriodValue);
appData.setListenerName(nameFields);
appData.setListenerSum(sumFields);
//appData.getStatusIncome();
//appData.capitalizeAddExpensesString();
