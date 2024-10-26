// TASK 1

// Якщо імейл і пароль користувача збігаються, зберігайте дані з форми при сабмите
// у локальне сховище і змінюй кнопку login на logout і роби поля введення
// Недоступними зміни.

// При перезавантаженні сторінки, якщо користувач залогінений, ми маємо бачити logout-кнопку
// та недоступні для зміни поля з даними користувача.
// Клік по кнопці logout повертає все до початкового вигляду і видаляє дані користувача
// З локального сховища.
// Якщо введені дані не збігаються з потрібними даними, викликати аlert і
// повідомляти про помилку.

const USER_DATA = {
  email: 'user@mail.com',
  password: 'secret',
};

const LS_KEY = 'user-data';
const form = document.querySelector('.login-form');
const emailInput = document.querySelector('[name="email"]');
const passwordInput = document.querySelector('[name="password"]');
const btn = document.querySelector('.login-form button');

form.addEventListener('submit', handleLogin);

function handleLogin(event) {
  event.preventDefault();

  if (btn.textContent === 'Logout') {
    localStorage.removeItem(LS_KEY);
    form.reset();
    emailInput.removeAttribute('readonly');
    passwordInput.removeAttribute('readonly');
    btn.textContent = 'Login';
    return;
  }

  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  if (emailValue === '' || passwordValue === '') {
    alert('Fill all fields');
    return;
  }

  if (emailValue !== USER_DATA.email || passwordValue !== USER_DATA.password) {
    alert('Incorrect data');
    return;
  }

  localStorage.setItem(
    LS_KEY,
    JSON.stringify({ email: emailValue, password: passwordValue })
  );
  btn.textContent = 'Logout';
  emailInput.setAttribute('readonly', true);
  passwordInput.setAttribute('readonly', true);
}

const savedData = localStorage.getItem(LS_KEY);
if (savedData) {
  const parsedData = JSON.parse(savedData);
  emailInput.value = parsedData.email || '';
  passwordInput.value = parsedData.password || '';
  btn.textContent = 'Logout';
  emailInput.setAttribute('readonly', true);
  passwordInput.setAttribute('readonly', true);
}

// ЗАДАЧА 2

// Створи перелік справ.
// Є інпут, в який вводиться назва завдання.
// Після натискання на кнопку "Додати" завдання додається до списку #list.
// Список із завданнями має бути доступним після перезавантаження сторінки.

const formTask = document.querySelector('.task-form');
const taskList = document.querySelector('#task-list');
const TASKS_KEY = 'tasks';

const tasksArray = [];

formTask.addEventListener('submit', e => {
  e.preventDefault();

  const inputValue = formTask.elements.taskName.value.trim();

  if (!inputValue) {
    return;
  }

  const markup = `<li>${inputValue}</li>`;
  tasksArray.push(markup);
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasksArray));

  taskList.insertAdjacentHTML('beforeend', markup);
  formTask.reset();
});

const lsData = JSON.parse(localStorage.getItem(TASKS_KEY));

if (lsData) {
  taskList.innerHTML = lsData.join('');
}
