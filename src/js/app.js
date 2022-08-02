import TaskList from './tasklist';
import StartTaskList from './starttasks';

const taskList = new TaskList();
if (typeof localStorage !== 'undefined') {
  if (localStorage.tasks === undefined) {
    const startTasks = new StartTaskList();
    taskList.tasks.save(startTasks.tasks);
  }
}
taskList.init();
