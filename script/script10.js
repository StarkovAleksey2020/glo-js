'use strict';
// Восстановить порядок книг
const books = document.querySelector('.books'),
book = document.querySelectorAll('.book');
book[0].before(book[1]);
book[0].after(book[4]);
book[4].after(book[3]);
book[3].after(book[5]);

// Заменить картинку заднего фона на другую из папки image
const bodyElement = document.querySelector('body');
bodyElement.style.backgroundImage = 'url(image/you-dont-know-js.jpg)';

// Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")
book[4].querySelectorAll('h2 > a')[0].text = 'Книга 3. this и Прототипы Объектов';

// Удалить рекламу со страницы
let advElement = document.querySelector('.adv');
advElement.remove();

// Восстановить порядок глав во второй и пятой книге (внимательно инспектируйте индексы элементов, поможет dev tools)
const bookTwoChapters = book[0].querySelectorAll('li');
bookTwoChapters[3].after(bookTwoChapters[6]);
bookTwoChapters[6].after(bookTwoChapters[8]);
bookTwoChapters[9].after(bookTwoChapters[2]);

const bookFiveChapters = book[5].querySelectorAll('li');
bookFiveChapters[1].after(bookFiveChapters[9]);
bookFiveChapters[9].after(bookFiveChapters[3]);
bookFiveChapters[3].after(bookFiveChapters[4]);
bookFiveChapters[2].after(bookFiveChapters[6]);
bookFiveChapters[6].after(bookFiveChapters[7]);

// в шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место
const bookSixUl = book[2].querySelector('ul');
let chapterLast = document.createElement('li');
chapterLast.innerHTML = 'Глава 8: За пределами ES6';
bookSixUl.append(chapterLast);

const bookSixChapters = book[2].querySelectorAll('li');
bookSixChapters[8].after(bookSixChapters[10]);