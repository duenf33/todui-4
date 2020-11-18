const readline = require('readline');
const data = require('./data.js')


const COMPLETE_MARK = '✅';
const INCOMPLETE_MARK = '✖';

let todos = data.todos;
const interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const menu = `
Your options are:

1. Add a todo.
2. Remove a todo.
3. Remove all completed todos.
4. Toggle a todo's completion status.
5. Toggle a todo's priority.
6. Quit.

`

const displayMenu = function() {
  interface.question(menu, handleMenu);
}

const displayTodos = function() {
  console.clear();
  console.log('\nHere are your current todos:\n')
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    const num = i + 1;
    todo.isComplete !== true ? console.log(num + '. ' + todo.text + INCOMPLETE_MARK) : console.log(num + '. ' + todo.text + COMPLETE_MARK);
  }
}

// or, without intermediate variables:
const displayTodosAlt1 = function() {
  console.log('\nHere are your current todos:\n')
  for (let i = 0; i < todos.length; i++) {
    console.log(i + 1 + '. ' + todos[i].text);
  }
}

// or, with interpolation:
const displayTodosAlt2 = function() {
  console.log('\nHere are your current todos:\n')
  for (let i = 0; i < todos.length; i++) {
    console.log(`${i + 1}. ${todos[i].text}`);
  }
}

const add = function(answer) {
  const todo = {
    text: answer,
    priority: 2,
    isComplete: false,
  }

  todos.unshift(todo);
  displayTodos();
  displayMenu();
}

const remove = function(num) {
  todos.splice(num - 1, 1);
  displayTodos();
  displayMenu();
}

const handleMenu = function(cmd) {
  if (cmd === '1') {
    console.clear();
    interface.question('\nWhat should go on your list?\n\n', add)
  } else if (cmd === '2') {
    displayTodos();
    interface.question('\nType a number to pick a todo to remove: ', remove)
  } else if (cmd === '3') {
    removeCompletedTodos();
  } else if (cmd === '4') {
    displayTodos();
    interface.question('\nPlease pick a todo to check complete or incomlete: ', toggleComplete)
  } else if (cmd === '5') {
    displayTodos();
    interface.question('\nPlease pick a todo to toggle its priority: ', togglePriority)
  } else {
    console.log('Quitting!');
    interface.close();
  }
}

displayTodos();
displayMenu();
