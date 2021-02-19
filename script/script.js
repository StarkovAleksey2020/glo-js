'use strict';

let additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
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
  typeTextFields = document.querySelectorAll('[type="text"]'),
  depositBank = document.querySelector('.deposit-bank'),
  depositAmount = document.querySelector('.deposit-amount'),
  depositPercent = document.querySelector('.deposit-percent');
    
const start = document.getElementById('start'),
  resetBtn = document.getElementById('cancel'),
  btnPlus = document.getElementsByTagName('button'),
  incomePlus = btnPlus[0],
  expensesPlus = btnPlus[1];
    
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
depositCheck.checked = false;

class AppData {
  constructor() {
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
    this.cookieYear = new Date().getFullYear();
    this.cookieMonth = new Date().getMonth() + 1;
    this.cookieDay = new Date().getDay();
  }
  start() {
    if (parseInt(salaryAmount.value) > 0) {
      this.blockInputs();
      this.toggleButtonToReset();
      this.budget = 0;
      this.budget = +salaryAmount.value;
      this.getExpInc();
      this.getAddIncExp();
      this.getInfoDeposit();
      this.getBudget();
      this.showResult();
      this.saveResult();
    }
  }
  blockInputs() {
    typeTextFields = document.querySelectorAll('[type="text"]');
    typeTextFields.forEach(item => {
      item.readOnly = true;
    });
  }

  isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n) && n > 0;
  }

  toggleButtonToReset() {
    start.style.display = 'none';
    resetBtn.style.display = 'block';
  }
  toggleButtonToStart() {
    start.style.display = 'block';
    resetBtn.style.display = 'none';
  }
  reset() {
    typeTextFields.forEach(item => {
      item.readOnly = false;
    });
    this.clearStorages();
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
  }
  setPeriodSelect() {
    periodSelect.value = 1;
    periodAmount.innerHTML = periodSelect.value;
  }
  clearScreenElements() {
    salaryAmount.value = '';
    salaryAmount.focus();
  }
  clearVariables() {
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
  }
  clearAdditionalIncomeItems() {
    for (let index = 0; index < additionalIncomeItem.length; index++) {
      let currentAdditionalIncomeItem = additionalIncomeItem[index];
      currentAdditionalIncomeItem.value = '';
    }
  }
  clearAdditionalExpensesItems() {
    additionalExpensesItem.value = '';
  }
  clearTargetAmount() {
    targetAmount.value = '';
  }
  reduceAddIncomeBlock() {
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
  }
  reduceAddExpensesBlock() {
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
  }
  showResult() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.ceil(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = !isNaN(this.getTargetMonth()) ? Math.ceil(this.getTargetMonth()) : '-';
    incomePeriodValue.value = Math.ceil(this.calcPeriod());
  }
  setCookie(name, value, expYear, expMonth, expDay, secure) {
    let cookieString = name + '=' + encodeURI(value);
    if (expYear && expMonth && expDay) {
      let expDate = new Date(expYear, expMonth, expDay);
      cookieString += '; expires=' + expDate.toGMTString();
    } else {
      cookieString += '; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
    cookieString += secure ? '; secure' : '';
    document.cookie = cookieString;
  }
  getCookie(name) {
    let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  saveResult() {
    localStorage.setItem('budgetMonth', this.budgetMonth);
    localStorage.setItem('budgetDay', Math.ceil(this.budgetDay));
    localStorage.setItem('expensesMonth', this.expensesMonth);
    localStorage.setItem('addExpenses', this.addExpenses.join(', '));
    localStorage.setItem('addIncome', this.addIncome.join(', '));
    localStorage.setItem('targetMonth', !isNaN(this.getTargetMonth()) ? Math.ceil(this.getTargetMonth()) : '-');
    localStorage.setItem('period', Math.ceil(this.calcPeriod()));

    this.setCookie('budgetMonth', this.budgetMonth, this.cookieYear, this.cookieMonth, this.cookieDay, true);
    this.setCookie('budgetDay', Math.ceil(this.budgetDay), this.cookieYear, this.cookieMonth, this.cookieDay, true);
    this.setCookie('expensesMonth', this.expensesMonth, this.cookieYear, this.cookieMonth, this.cookieDay, true);
    this.setCookie('addExpenses', this.addExpenses.join(', '), this.cookieYear, this.cookieMonth, this.cookieDay, true);
    this.setCookie('addIncome', this.addIncome.join(', '), this.cookieYear, this.cookieMonth, this.cookieDay, true);
    this.setCookie('targetMonth', !isNaN(this.getTargetMonth()) ? Math.ceil(this.getTargetMonth()) : '-', this.cookieYear, this.cookieMonth, this.cookieDay, true);
    this.setCookie('period', Math.ceil(this.calcPeriod()), this.cookieYear, this.cookieMonth, this.cookieDay, true);
    this.setCookie('isLoad', true, this.cookieYear, this.cookieMonth, this.cookieDay, true);
  }
  restoreResult() {
    let isLoad = true;

    // сверяем cookie & localStorage
    if (this.getCookie('budgetMonth') !== localStorage.getItem('budgetMonth')) { isLoad = false; }
    if (this.getCookie('budgetDay') !== localStorage.getItem('budgetDay')) { isLoad = false; }
    if (this.getCookie('expensesMonth') !== localStorage.getItem('expensesMonth')) { isLoad = false; }
    if (this.getCookie('addExpenses') !== localStorage.getItem('addExpenses')) { isLoad = false; }
    if (this.getCookie('addIncome') !== localStorage.getItem('addIncome')) { isLoad = false; }
    if (this.getCookie('targetMonth') !== localStorage.getItem('targetMonth')) { isLoad = false; }
    if (this.getCookie('period') !== localStorage.getItem('period')) { isLoad = false; }

    // если сходится - прорисовываем экранные элементы из localStorage, иначе - чистим хранилища и форму
    if (isLoad === true) {
      budgetMonthValue.value = (localStorage.getItem('budgetMonth'));
      budgetDayValue.value = (localStorage.getItem('budgetDay'));
      expensesMonthValue.value = (localStorage.getItem('expensesMonth'));
      additionalExpensesValue.value = (localStorage.getItem('addExpenses'));
      additionalIncomeValue.value = (localStorage.getItem('addIncome'));
      targetMonthValue.value = (localStorage.getItem('targetMonth'));
      incomePeriodValue.value = (localStorage.getItem('period'));
    } else {
      this.clearStorages();
      this.clearVariables();
      this.showResult();
      this.toggleButtonToStart();
    }
  }
  clearStorages() {
    if (localStorage.getItem('budgetMonth')) { localStorage.removeItem('budgetMonth'); }
    if (localStorage.getItem('budgetDay')) { localStorage.removeItem('budgetDay'); }
    if (localStorage.getItem('expensesMonth')) { localStorage.removeItem('expensesMonth'); }
    if (localStorage.getItem('addExpenses')) { localStorage.removeItem('addExpenses'); }
    if (localStorage.getItem('addIncome')) { localStorage.removeItem('addIncome'); }
    if (localStorage.getItem('targetMonth')) { localStorage.removeItem('targetMonth'); }
    if (localStorage.getItem('period')) { localStorage.removeItem('period'); }

    if (this.getCookie('budgetMonth')) { this.setCookie('budgetMonth'); }
    if (this.getCookie('budgetDay')) { this.setCookie('budgetDay'); }
    if (this.getCookie('expensesMonth')) { this.setCookie('expensesMonth'); }
    if (this.getCookie('addExpenses')) { this.setCookie('addExpenses'); }
    if (this.getCookie('addIncome')) { this.setCookie('addIncome'); }
    if (this.getCookie('targetMonth')) { this.setCookie('targetMonth'); }
    if (this.getCookie('period')) { this.setCookie('period'); }

    this.setCookie('isLoad', false, this.cookieYear, this.cookieMonth, this.cookieDay, true);
  }
  addExpInc(value) {
    const arrayName = [value][0][0].toLowerCase() + 'Items';
    const arrayItem = eval(arrayName)[0];
    const cloneItem = eval(arrayName)[0].cloneNode(true);

    cloneItem.firstChild.nextSibling.value = '';
    cloneItem.lastChild.previousSibling.value = '';
    arrayItem.parentNode.insertBefore(cloneItem, ([value][0][0] === 'Income') ? incomePlus : expensesPlus);

    let arrayItemName = ((value === 'Income') ? incomeItems : expensesItems);
    arrayItemName = document.querySelectorAll(`.${[value][0][0].toLowerCase()}-items`);

    nameFields = document.querySelectorAll('[placeholder="Наименование"]');
    sumFields = document.querySelectorAll('[placeholder="Сумма"]');
    this.setListenerName(nameFields);
    this.setListenerSum(sumFields);
    if (arrayItemName.length === 3) {
      if ([value][0][0] === 'Income') {
        incomePlus.style.display = 'none';
      } else {
        expensesPlus.style.display = 'none';
      }
    }
  }

  getExpInc() {
    const count = (item) => {
      const startStr = item.className.split('-')[0];
      const itemTitle = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;
      if (itemTitle !== '' && itemAmount !== '') {
        this[startStr][itemTitle] = itemAmount;
      }
    };

    incomeItems = document.querySelectorAll('.income-items');
    expensesItems = document.querySelectorAll('.expenses-items');

    incomeItems.forEach(count);
    expensesItems.forEach(count);

    for (const key in this.income) {
      this.incomeMonth += +this.income[key];
    }
    for (const key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  }
  getAddIncExp() {
    this.addExpenses = [];
    this.addIncome = [];
    
    this.addExpenses = additionalExpensesItem.value.split(',');
    const splitArray = (item) => {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    };
    additionalIncomeItem.forEach(splitArray);
  }  
  getBudget() {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth = +this.budget + this.incomeMonth + monthDeposit - this.expensesMonth;
    this.budgetDay = this.budgetMonth / 30;
  }
  getTargetMonth() {
    return targetAmount.value / this.budgetMonth;
  }
  getStatusIncome() {
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
  }
  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }
  capitalizeAddExpensesString() {
    for (let index = 0; index < this.addExpenses.length; index++) {
      this.addExpenses[index] = this.addExpenses[index].substring(0, 1).toUpperCase() + this.addExpenses[index].slice(1).toLowerCase();
    }
  }
  getPeriodValue(e) {
    const _this = this;
    periodAmount.innerHTML = e.target.value;
    incomePeriodValue.value = Math.ceil(_this.calcPeriod);
  }
  checkInputName(e) {
    let punctRE = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g;
    let spaceRE = /\s+/g;
    let numbersRE = /\d/g;
    e.target.value = e.target.value.replace(/[A-z]/gi, '').replace(numbersRE, '');
  }
  checkInputSum(e) {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  }
  checkInputPercent(e) {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
    if (e.target.value > 100) {
      alert('Допустимый диапазон ставки - от 0 до 100 %');
      depositPercent.value = '';
    }
  }
  setListenerName(object) {
    object.forEach(item => {
      item.addEventListener('input', AppData.prototype.checkInputName);
    });
  }
  setListenerSum(object) {
    object.forEach(item => {
      item.addEventListener('input', AppData.prototype.checkInputSum);
    });
  }
  setListenerPercent(object) {
    object.addEventListener('input', AppData.prototype.checkInputPercent);
  }
  // Привязать контекст вызова функций к appData
  bind(func, context) {
    return function () {
      return func.bind(context, arguments);
    };
  }
  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }
  validatePercent(e) {
    console.log(e.target.value);
  }
  changePercent() {
    const valueSelect = this.value;
    if (valueSelect === 'other') {
      depositPercent.style.display = 'inline-block';
      depositPercent.value = '';
    } else {
      depositPercent.style.display = 'none';
      depositPercent.value = valueSelect;
    }
  }
  depositHandler() {
    if (depositCheck.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositPercent.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
    }
  }
  eventsListeners() {
    const startFunction = this.bind(this.start, this);
    const resetFunction = this.bind(this.reset, this);
    const addExpIncFunction = this.bind(this.addExpInc, this);

    start.addEventListener('click', startFunction());
    resetBtn.addEventListener('click', resetFunction());

    expensesPlus.addEventListener('click', addExpIncFunction('Expenses'));
    incomePlus.addEventListener('click', addExpIncFunction('Income'));

    periodSelect.addEventListener('input', this.getPeriodValue);
    this.setListenerName(nameFields);
    this.setListenerSum(sumFields);
    this.setListenerPercent(depositPercent);

    depositCheck.addEventListener('change', this.depositHandler.bind(this));
  }
}

const appData = new AppData();
appData.restoreResult();
appData.eventsListeners();



