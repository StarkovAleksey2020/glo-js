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

const AppData = function () { 
  this.budget = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
};

AppData.prototype.start = function () {
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
};

AppData.prototype.blockInputs = function () {
  typeTextFields = document.querySelectorAll('[type="text"]');
  typeTextFields.forEach(function (item) {
    item.readOnly = true;
  });
};

AppData.prototype.toggleButtonToReset = function () {
  start.style.display = 'none';
  resetBtn.style.display = 'block';
};

AppData.prototype.toggleButtonToStart = function () {
  start.style.display = 'block';
  resetBtn.style.display = 'none';
};

AppData.prototype.reset = function () {
  typeTextFields.forEach(function (item) {
    item.readOnly = false;
  });
  this.reduceAddIncomeBlock();
  this.reduceAddExpensesBlock();
  this.clearScreenElements();
  this.clearAdditionalIncomeItems();
  this.clearAdditionalExpensesItems();
  this.clearTargetAmount();
  this.setPeriodSelect();
  this.clearVariables();
  this.showResult();
  this.toggleButtonToStart();
};
AppData.prototype.setPeriodSelect = function () {
  periodSelect.value = 1;
  periodAmount.innerHTML = periodSelect.value;
};

AppData.prototype.clearScreenElements = function () {
  salaryAmount.value = '';
  salaryAmount.focus();
};

AppData.prototype.clearVariables = function () {
  this.budget = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
};

AppData.prototype.clearAdditionalIncomeItems = function () {
  for (let index = 0; index < additionalIncomeItem.length; index++) {
    let currentAdditionalIncomeItem = additionalIncomeItem[index];
    currentAdditionalIncomeItem.value = '';
  }
};

AppData.prototype.clearAdditionalExpensesItems = function () {
  additionalExpensesItem.value = '';
};

AppData.prototype.clearTargetAmount = function () {
  targetAmount.value = '';
};

AppData.prototype.reduceAddIncomeBlock = function () {
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
};

AppData.prototype.reduceAddExpensesBlock = function () {
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
};

AppData.prototype.showResult = function () {
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = Math.ceil(this.budgetDay);
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = !isNaN(this.getTargetMonth()) ? Math.ceil(this.getTargetMonth()) : '-';
  incomePeriodValue.value = Math.ceil(this.calcPeriod());
};
  
AppData.prototype.addExpensesBlock = function () {
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
};

AppData.prototype.addIncomeBlock = function () {
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
};

AppData.prototype.getExpenses = function () {
  const _this = this;
  expensesItems.forEach(function (item) {
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;
    if (itemExpenses !== '' && cashExpenses !== '') {
      _this.expenses[itemExpenses] = cashExpenses;
    }
  });
};

AppData.prototype.getIncome = function () {
  const _this = this;
  incomeItems.forEach(function (item) {
    let itemIncome = item.querySelector('.income-title').value;
    let cashIncome = item.querySelector('.income-amount').value;
    if (itemIncome !== '' && cashIncome !== '') {
      _this.income[itemIncome] = cashIncome;
    }
  });
};

AppData.prototype.getAddExpenses = function () {
  const _this = this;
  this.addExpenses = [];
  let addExpenses = additionalExpensesItem.value.split(',');
  addExpenses.forEach(function (item) {
    if (item !== '') {
      item = item.trim();
      _this.addExpenses.push(item);
    }
  });
};

AppData.prototype.getAddIncome = function () {
  const _this = this;
  this.addIncome = [];
  additionalIncomeItem.forEach(function (item) {
    let itemValue = item.value.trim();
    if (item.value !== '') {
      _this.addIncome.push(itemValue);
    }
  });
};

AppData.prototype.getExpensesMonth = function () {
  this.expensesMonth = 0;
  for (const key in this.expenses) {
    this.expensesMonth += +this.expenses[key];
  }
  return this.expensesMonth;
};

AppData.prototype.getIncomeMonth = function () {
  this.incomeMonth = 0;
  for (const key in this.income) {
    this.incomeMonth += +this.income[key];
  }
};

AppData.prototype.getBudget = function () {
  this.budgetMonth = +this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = this.budgetMonth / 30;
};

AppData.prototype.getTargetMonth = function () {
  return targetAmount.value / this.budgetMonth;
};

AppData.prototype.getStatusIncome = function () {
  switch (true) {
    case (this.budgetDay >= 1200):
      alert(markHigh);
      break;
    case (this.budgetDay >= 600 && this.budgetDay < 1200):
      alert(markAverage);
      break;
    case (this.budgetDay >= 0 && this.budgetDay < 600):
      alert(markLow);
      break;
    case (this.budgetDay < 0):
      alert(markNegative);
      break;
    default:
      alert(errorMessage);
      break;
  }
};

AppData.prototype.getInfoDeposit = function () {
  if (this.deposit) {
    do {
      this.percentDeposit = prompt('Уточните ставку по депозиту?', '10');
    } while (this.percentDeposit.length === 0);
    do {
      this.moneyDeposit = prompt('Уточните сумму вклада?', 10000);
    } while (!isNumber(this.moneyDeposit));
      
  }
};

AppData.prototype.calcPeriod = function () {
  return this.budgetMonth * periodSelect.value;
};

AppData.prototype.capitalizeAddExpensesString = function () {
  for (let index = 0; index < this.addExpenses.length; index++) {
    this.addExpenses[index] = this.addExpenses[index].substring(0, 1).toUpperCase() + this.addExpenses[index].slice(1).toLowerCase();
  }
};

AppData.prototype.getPeriodValue = function (e) {
  const _this = this;
  periodAmount.innerHTML = e.target.value;
  incomePeriodValue.value = Math.ceil(_this.calcPeriod);
};

AppData.prototype.checkInputName = function (e) {
  let punctRE = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g;
  let spaceRE = /\s+/g;
  let numbersRE = /\d/g;
  e.target.value = e.target.value.replace(/[A-z]/gi, '').replace(numbersRE, '');
};

AppData.prototype.checkInputSum = function (e) {
  e.target.value = e.target.value.replace(/[^0-9]/g, '');
};

AppData.prototype.setListenerName = function (object) {
  object.forEach(function (item) {
    item.addEventListener('input', AppData.prototype.checkInputName);
  });
};

AppData.prototype.setListenerSum = function (object) {
  object.forEach(function (item) {
    item.addEventListener('input', AppData.prototype.checkInputSum);
  });
};

// Привязать контекст вызова функций к appData
AppData.prototype.bind =function (func, context) {  
  return function () { 
    return func.bind(context, arguments);
  };
}

AppData.prototype.eventsListeners = function () { 
  const startFunction = this.bind(this.start, this);
  const resetFunction = this.bind(this.reset, this);
  const addExpensesBlockFunction = this.bind(this.addExpensesBlock, this);
  const addIncomeBlockFunction = this.bind(this.addIncomeBlock, this);
  
  start.addEventListener('click', startFunction());
  resetBtn.addEventListener('click', resetFunction());
  expensesPlus.addEventListener('click', addExpensesBlockFunction());
  incomePlus.addEventListener('click', addIncomeBlockFunction());
  periodSelect.addEventListener('input', this.getPeriodValue);
  this.setListenerName(nameFields);
  this.setListenerSum(sumFields);
};

const appData = new AppData();
appData.eventsListeners();
console.log('appData: ', appData);


