(function () {
  let todos = [
    { id: 3, content: 'Javascript', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 1, content: 'HTML', completed: false },
  ];

  const $todoForm = document.querySelector('.todo-form');
  const $todoInput = document.querySelector('.todo-input');
  const $todoList = document.querySelector('.todo-list');

  // View
  const renderAll = todos => {
    $todoList.innerHTML = todos
      .map(
        todo =>
          `<li id="${todo.id}">
        <input type="checkbox" ${todo.completed ? 'checked' : ''}>
        <span ${todo.completed ? 'style= text-decoration:line-through' : ''}>${todo.content}</span>
        <button class="todo-remove">X</button>
      </li>`
      )
      .join('');
  };

  // Model
  const addTodo = e => {
    e.preventDefault();
    if ($todoInput.value.trim() === '') return;
    const todo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      content: $todoInput.value,
      completed: false,
    };
    todos = [todo, ...todos];
    $todoInput.value = '';
    renderAll(todos);
  };

  const finishTodo = e => {
    todos = todos.map(todo => (todo.id === +e.target.parentNode.id ? { ...todo, completed: !todo.completed } : todo));
    renderAll(todos);
  };

  const removeTodo = e => {
    if (!e.target.matches('.todo-remove')) return;
    todos = todos.filter(todo => todo.id !== +e.target.parentNode.id);
    renderAll(todos);
  };

  // Controller
  window.addEventListener('DOMContentLoaded', () => {
    renderAll(todos);
  });
  $todoForm.addEventListener('submit', addTodo);
  $todoList.addEventListener('change', finishTodo);
  $todoList.addEventListener('click', removeTodo);
})();
