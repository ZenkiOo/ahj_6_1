export default class Tasks {
  save(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  load() {
    const allTasks = JSON.parse(localStorage.getItem('tasks'));
    return allTasks;
  }
}
