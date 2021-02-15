'use strict';

let start = document.getElementById('start'),
    resetBtn = document.getElementById('cancel'),
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
    sumFields = document.querySelectorAll('[placeholder="Сумма"]'),
    typeTextFields = document.querySelectorAll('[type="text"]');
    
const markHigh = "У вас высокий уровень дохода";
const markAverage = "У вас средний уровень дохода";
const markLow = "К сожалению у вас уровень дохода ниже среднего";
const markNegative = "Цель не будет достигнута";
const errorMessage = "Что то пошло не так";

resetBtn.style.display = 'none';
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
      this.blockInputs();
      this.toggleButtonToReset();
      this.budget = 0;
      this.budget = +salaryAmount.value;
      this.getExpenses();
      this.getIncome();
      this.getExpensesMonth();
      this.getIncomeMonth();
      this.getAddExpenses();
      this.getAddIncome();
      this.getBudget();
      this.showResult();
    } 
  },
  blockInputs: function () {  
    typeTextFields = document.querySelectorAll('[type="text"]');
    typeTextFields.forEach(function (item) { 
      item.readOnly = true;
    });
  },
  toggleButtonToReset: function () {  
    start.style.display = 'none';
    resetBtn.style.display = 'block';
  },
  toggleButtonToStart: function () {  
    start.style.display = 'block';
    resetBtn.style.display = 'none';
  },
  reset: function () {  
    typeTextFields.forEach(function (item) { 
      item.readOnly = false;
    });
    appData.reduceAddIncomeBlock();
    appData.reduceAddExpensesBlock();
    appData.clearScreenElements();
    appData.clearAdditionalIncomeItems();
    appData.clearAdditionalExpensesItems();
    appData.clearTargetAmount();
    appData.setPeriodSelect();
    appData.clearVariables();
    appData.showResult();
    appData.toggleButtonToStart();
  },
  setPeriodSelect: function () {
    periodSelect.value = 1;
    periodAmount.innerHTML = periodSelect.value;
  },
  clearScreenElements: function () {  
    salaryAmount.value = '';
    salaryAmount.focus();
  },
  clearVariables: function () {  
    appData.budget = 0;
    appData.income = {};
    appData.incomeMonth = 0;
    appData.addIncome = [];
    appData.expenses = {};
    appData.addExpenses = [];
    appData.deposit = false;
    appData.percentDeposit = 0;
    appData.moneyDeposit = 0;
    appData.budgetDay = 0;
    appData.budgetMonth = 0;
    appData.expensesMonth = 0;
  },
  clearAdditionalIncomeItems: function () {  
    for (let index = 0; index < additionalIncomeItem.length; index++) {
      let currentAdditionalIncomeItem = additionalIncomeItem[index];
      currentAdditionalIncomeItem.value = '';
    }
  },
  clearAdditionalExpensesItems: function () {  
    additionalExpensesItem.value = '';
  },
  clearTargetAmount: function () {  
    targetAmount.value = '';
  },
  reduceAddIncomeBlock: function () {  
    incomeItems = document.querySelectorAll('.income-items');
    for (let index = 0; index < incomeItems.length; index++) {
      if (index > 0) {
        incomeItems[index].remove();
      } else if (index === 0) {
        let incomeTitle = incomeItems[index].querySelectorAll('.income-title');
        incomeTitle[0].value = '';
        let incomeAmount = incomeItems[index].querySelectorAll('.income-amount');
        incomeAmount[0].value = '';
      }
    }
    incomePlus.style.display = 'block';
  },
  reduceAddExpensesBlock: function () {  
    expensesItems = document.querySelectorAll('.expenses-items');
    for (let index = 0; index < expensesItems.length; index++) {
      if (index > 0) {
        expensesItems[index].remove();
      } else if (index === 0) {
        let expensesTitle = expensesItems[index].querySelectorAll('.expenses-title');
        expensesTitle[0].value = '';
        let expensesAmount = expensesItems[index].querySelectorAll('.expenses-amount');
        expensesAmount[0].value = '';
      }
    }
    expensesPlus.style.display = 'block';
  },
  showResult: function () {  
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = Math.ceil(appData.budgetDay);
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = !isNaN(appData.getTargetMonth()) ? Math.ceil(appData.getTargetMonth()) : '-';
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
    this.setListenerName(nameFields);
    this.setListenerSum(sumFields);
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
    this.setListenerName(nameFields);
    this.setListenerSum(sumFields);
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

// Привязать контекст вызова функций к appData
function bind(func, context) {  
  return function () { 
    return func.bind(context, arguments);
  };
}

const startFunction = bind(appData.start, appData);
const resetFunction = bind(appData.reset, appData);
const addExpensesBlockFunction = bind(appData.addExpensesBlock, appData);
const addIncomeBlockFunction = bind(appData.addIncomeBlock, appData);

start.addEventListener('click', startFunction());
resetBtn.addEventListener('click', resetFunction());
expensesPlus.addEventListener('click', addExpensesBlockFunction());
incomePlus.addEventListener('click', addIncomeBlockFunction());
periodSelect.addEventListener('input', appData.getPeriodValue);
appData.setListenerName(nameFields);
appData.setListenerSum(sumFields);
//appData.getStatusIncome();
//appData.capitalizeAddExpensesString();
