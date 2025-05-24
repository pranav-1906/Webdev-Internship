const input = document.getElementById('taskInput');
const list = document.getElementById('taskList');
const priorityInput = document.getElementById('priorityInput');
const dateInput = document.getElementById('dateInput');
const searchInput = document.getElementById('searchInput');

function addTask() {
  const text = input.value.trim();
  const priority = priorityInput.value;
  const date = dateInput.value;
  if (!text) return;

  const taskObj = {
    text,
    priority,
    date,
    completed: false
  };

  const tasks = getTasks();
  tasks.push(taskObj);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  input.value = '';
  renderTasks();
}

function getTasks() {
  return JSON.parse(localStorage.getItem('tasks') || '[]');
}

function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  list.innerHTML = '';
  const tasks = getTasks();
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = `task ${task.completed ? 'completed' : ''}`;
    
    const span = document.createElement('span');
    span.innerHTML = `${task.text} ${task.date ? `<small>(${task.date})</small>` : ''}`;
    span.onclick = () => toggleComplete(index);

    const priority = document.createElement('span');
    priority.className = `priority ${task.priority}`;
    priority.textContent = task.priority.toUpperCase();

    const actions = document.createElement('div');
    actions.className = 'actions';
    actions.innerHTML = `
      <button class="edit-btn" onclick="editTask(${index})">✏️</button>
      <button class="delete-btn" onclick="removeTask(${index})">🗑️</button>
    `;

    li.appendChild(span);
    li.appendChild(priority);
    li.appendChild(actions);
    list.appendChild(li);
  });
}

function toggleComplete(index) {
  const tasks = getTasks();
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  renderTasks();
}

function removeTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  renderTasks();
}

function editTask(index) {
  const tasks = getTasks();
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText !== null) {
    tasks[index].text = newText.trim();
    saveTasks(tasks);
    renderTasks();
  }
}

function filterTasks() {
  const query = searchInput.value.toLowerCase();
  const items = document.querySelectorAll('#taskList .task');
  items.forEach(item => {
    const content = item.querySelector('span').textContent.toLowerCase();
    item.style.display = content.includes(query) ? 'flex' : 'none';
  });
}

document.getElementById('darkModeToggle').onclick = () => {
  document.body.classList.toggle('dark-mode');
};

renderTasks();
