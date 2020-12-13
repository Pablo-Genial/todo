// Egy olyan függvény, ami tudja kezelni a localStorage-ot
(function () {
// Mock data. Az adatokat dinamikusan kapjuk
let todos = [];
// Parts of date
const bodyDay = document.querySelector('.body__day');
const bodyDate = document.querySelector('.body__date');
const todoAddBtn = document.querySelector('.todo__btn');
const todoInput = document.querySelector('.todo__input');
const todoListPending = document.querySelector('.todo__list--pending');

const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

// LocalStorage handler object
const localDB = {
// localDB.setItem('todos', todos);
    setItem(key, value) {
        value = JSON.stringify(value);
        localStorage.setItem(key, value);
    },
// localDB.getItem('todos');
    getItem(key) {
       const value = localStorage.getItem(key);
       if (!value) {
           return null;
       }

       return JSON.parse(value);
    },
// localDB.removeItem('todos');
    removeItem(key) {
       localStorage.removeItem(key);
    }
};

// Initialize application
    const init = () => {
        const savedTodos = localDB.getItem('todos');
// ha a savedTodos rendelkezik adatokkal, magyarul nem null
        if (savedTodos) {
            todos = savedTodos;
        }

        showDate();
        setListeners();
    };


// Show date.
    const showDate = () => {
            const currentDate = new Date();
            const day = [
                currentDate.getMonth() + 1,
                currentDate.getDate(),
                currentDate.getFullYear(),
            ].map( num => num < 10 ? `0${num}` : num );
  
            bodyDay.textContent = dayNames[currentDate.getDay()];
            bodyDate.textContent = day.join('-');
    };

// Set eventlisteners.
    const setListeners = () => {
        todoAddBtn.addEventListener('click', addNewTodo);
    };
// Save and add todo to the database.
    const addNewTodo = () => {
        const value = todoInput.value;
        if (value === '') {
            alert('Please type a todo.');
            return;
        }

        const todo = {
            text: value,
            done: false,
        };

        todos.push(todo);
        localDB.setItem('todos', todos);
        showTodo(todo);
        todoInput.value = '';
    }
// Show todo in the list.

    const showTodo = todo => {
        const todoItem = document.createElement('div');
        todoListPending.appendChild(todoItem);

        todoItem.innerHTML = `
            <input type="checkbox">
            <span>${todo.text}</span>
            <button class="fa-button">
                <i class="fa fa-trash"></i>
            </button>
        `;    
    }

 


    // Show completed tasks in the list.

    // const showTodo = todo => {
    //     const todoItem = document.createElement('div');
    //     todoListPending.appendChild(todoItem);

    //     todoItem.innerHTML = `
    //         <input type="checkbox">
    //         <span>${todo.text}</span>
    //      `;    
    // }






    init();

})();