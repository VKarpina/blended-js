// // TASK 1

// // Якщо імейл і пароль користувача збігаються, зберігайте дані з форми при сабмите
// // у локальне сховище і змінюй кнопку login на logout і роби поля введення
// // Недоступними зміни.

// // При перезавантаженні сторінки, якщо користувач залогінений, ми маємо бачити logout-кнопку
// // та недоступні для зміни поля з даними користувача.
// // Клік по кнопці logout повертає все до початкового вигляду і видаляє дані користувача
// // З локального сховища.
// // Якщо введені дані не збігаються з потрібними даними, викликати аlert і
// // повідомляти про помилку.

// const USER_DATA = {
// 	email: 'user@mail.com',
// 	password: 'secret',
// };

// const LS_KEY = 'user-data';
// const form = document.querySelector('.login-form');
// const emailInput = document.querySelector('[name="email"]');
// const passwordInput = document.querySelector('[name="password"]');
// const btn = document.querySelector('.login-form button');

// form.addEventListener('submit', handleLogin);

// function handleLogin(event) {
// 	event.preventDefault();

// 	if (btn.textContent === 'Logout') {
// 		localStorage.removeItem(LS_KEY);
// 		form.reset();
// 		emailInput.removeAttribute('readonly');
// 		passwordInput.removeAttribute('readonly');
// 		btn.textContent = 'Login';
// 		return;
// 	}

// 	const emailValue = emailInput.value.trim();
// 	const passwordValue = passwordInput.value.trim();
// 	if (emailValue === '' || passwordValue === '') {
// 		alert('Fill all fields');
// 		return;
// 	}

// 	if (emailValue !== USER_DATA.email || passwordValue !== USER_DATA.password) {
// 		alert('Incorrect data');
// 		return;
// 	}

// 	localStorage.setItem(
// 		LS_KEY,
// 		JSON.stringify({ email: emailValue, password: passwordValue })
// 	);
// 	btn.textContent = 'Logout';
// 	emailInput.setAttribute('readonly', true);
// 	passwordInput.setAttribute('readonly', true);
// }

// const savedData = localStorage.getItem(LS_KEY);
// if (savedData) {
// 	const parsedData = JSON.parse(savedData);
// 	emailInput.value = parsedData.email || '';
// 	passwordInput.value = parsedData.password || '';
// 	btn.textContent = 'Logout';
// 	emailInput.setAttribute('readonly', true);
// 	passwordInput.setAttribute('readonly', true);
// }

// // ЗАДАЧА 2

// // Створи перелік справ.
// // Є інпут, в який вводиться назва завдання.
// // Після натискання на кнопку "Додати" завдання додається до списку #list.
// // Список із завданнями має бути доступним після перезавантаження сторінки.

// const formTask = document.querySelector('.task-form');
// const taskList = document.querySelector('#task-list');
// const TASKS_KEY = 'tasks';

// const tasksArray = [];

// formTask.addEventListener('submit', e => {
// 	e.preventDefault();

// 	const inputValue = formTask.elements.taskName.value.trim();

// 	if (!inputValue) {
// 		return;
// 	}

// 	const markup = `<li>${inputValue}</li>`;
// 	tasksArray.push(markup);
// 	localStorage.setItem(TASKS_KEY, JSON.stringify(tasksArray));

// 	taskList.insertAdjacentHTML('beforeend', markup);
// 	formTask.reset();
// });

// const lsData = JSON.parse(localStorage.getItem(TASKS_KEY));

// if (lsData) {
// 	taskList.innerHTML = lsData.join('');
// }

// - Використовуй prompt та повертай значення звідти.
// - Створи функцію, яка буде набувати значення з prompt і всередині якої буде проміс.
// Якщо значення не є числом, відхиляй проміс та логіруй "error".
// Якщо значення парне, вирішуй проміс та повертай "even" через 1 секунду.
// Якщо значення не парне, вирішуй проміс та повертай "odd" через 2 секунди.

// function getPrompt() {
// 	const message = Number(prompt('Enter smth: '));
// 	return new Promise((resolve, reject) => {
// 		if (isNaN(message)) {
// 			reject('error');
// 		} else if (message % 2 === 0) {
// 			setTimeout(() => resolve('even'), 1000);
// 		} else {
// 			setTimeout(() => resolve('odd'), 2000);
// 		}
// 	});
// }

// getPrompt()
// 	.then(data => console.log(data))
// 	.catch(error => console.log(error));

// Напишіть функцію calculateAge(birthDate), яка приймає дату народження у форматі YYYY-MM-DD і повертає поточний вік.
// Підказка: Використайте об'єкт Date для обчислення різниці між сьогоднішньою датою і датою народження.

function calculateAge(birthDate) {
	const current = new Date();
	const birth = new Date(birthDate);

	let yearDiff = current.getFullYear() - birth.getFullYear();
	let monthDiff = current.getMonth() - birth.getMonth();
	let dayDiff = current.getDay() - birth.getDay();

	if (monthDiff < 0 || (monthDiff == 0 && dayDiff < 0)) yearDiff -= 1;
	return yearDiff;
}

console.log(calculateAge('2004-04-16'));
console.log(calculateAge('2004-11-16'));

// Додай відображення дати і часу в реальному часі

const date = document.querySelector('.date span');
date.textContent = new Date().toLocaleString();

setInterval(() => {
	date.textContent = new Date().toLocaleString();
}, 1000);

// Створіть функцію countdown(seconds), яка приймає кількість секунд і повертає проміс.
// Проміс виконується після того, як пройде зазначений час. Функція має виводити у консоль кожну секунду до завершення.
// countdown(5).then(res => console.log(res));
// 4...
// 3...
// 2...
// 1...
// Час вийшов!

function countdown(seconds) {
	let interval = seconds - 1;
	const id = setInterval(() => {
		console.log(interval + '...');
		interval -= 1;
		if (interval === 0) {
			clearInterval(id);
		}
	}, 1000);

	return new Promise(resolve => {
		setTimeout(() => {
			resolve('Час вийшов!');
		}, seconds * 1000);
	});
}
countdown(5).then(response => console.log(response));

// Зробити перемикач теми. Зберігати тему у локальному сховище.
// При перезавантаженні сторінки перевіряти сховище та ставити тему, яка там вказана.
// Додати класи для змін тем

const checkbox = document.querySelector('.checkbox');
checkbox.addEventListener('change', () => {
   
    if (checkbox.checked) {
        document.body.classList.toggle('light', "dark");
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.toggle('dark', 'light');
        localStorage.setItem('theme', 'light');
    }
});

