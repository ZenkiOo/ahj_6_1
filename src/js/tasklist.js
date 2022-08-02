import Tasks from './tasks';

export default class TaskList {
  constructor() {
    if (typeof document !== 'undefined') {
      this.container = document.querySelector('.container');
      this.todo = document.querySelector('#todo .item-tasks');
      this.inprogress = document.querySelector('#inprogress .item-tasks');
      this.done = document.querySelector('#done .item-tasks');
    }

    this.tasks = new Tasks();
    this.ghost = null;
    this.dnd = null;
    this.dndWidth = null;
    this.dndHeight = null;
    this.dndTop = null;
    this.dndLeft = null;
  }

  init() {
    if (typeof document !== 'undefined') {
      document.addEventListener('DOMContentLoaded', () => {
        const tasks = this.tasks.load();
        this.addAll(this.todo, tasks.todo);
        this.addAll(this.inprogress, tasks.inprogress);
        this.addAll(this.done, tasks.done);
      });
      this.container.addEventListener('mousedown', (e) => this.onMouseDown(e));
      this.container.addEventListener('mousemove', (e) => this.onMouseMove(e));
      this.container.addEventListener('mouseleave', (e) => this.onMouseLeave(e));
      this.container.addEventListener('mouseup', (e) => this.onMouseUp(e));
    }
  }

  onMouseDown(e) {
    const { target } = e;

    if (target.classList.contains('add-task')) {
      target.parentNode.querySelector('.input-task').classList.remove('hidden');
      target.classList.add('hidden');
    }

    if (target.classList.contains('add-task-button')) {
      this.add(
        target.closest('.tasks').querySelector('.item-tasks'),
        target.closest('.input-task').querySelector('.text-task').value,
      );
      target.closest('.input-task').querySelector('.text-task').value = '';
      target
        .closest('.tasks')
        .querySelector('.add-task')
        .classList.remove('hidden');
      target.parentNode.classList.add('hidden');
      this.tasks.save(this.getAllTasks());
    }

    if (target.classList.contains('cancel')) {
      target
        .closest('.tasks')
        .querySelector('.add-task')
        .classList.remove('hidden');
      target.parentNode.classList.add('hidden');
    }

    if (target.classList.contains('del')) {
      this.del(target.parentNode);
      this.tasks.save(this.getAllTasks());
    }

    if (target.classList.contains('item-task')) {
      e.preventDefault();
      target.querySelector('.del').classList.add('hidden');
      this.dnd = target;
      this.dndWidth = this.dnd.offsetWidth;
      this.dndHeight = this.dnd.offsetHeight;
      this.dndLeft = e.pageX - target.getBoundingClientRect().left;
      this.dndTop = e.pageY - target.getBoundingClientRect().top;
      this.ghost = target.cloneNode(true);
      this.ghost.style.width = `${this.dndWidth}px`;
      this.ghost.style.height = `${this.dndHeight}px`;
      this.dnd.classList.add('dragged');
      target.parentNode.insertBefore(this.ghost, target.nextElementSibling);
      this.dnd.style.left = `${e.pageX - this.dndLeft}px`;
      this.dnd.style.top = `${e.pageY - this.dndTop}px`;
      this.dnd.style.width = `${this.dndWidth}px`;
      this.dnd.style.height = `${this.dndHeight}px`;
    }
  }

  onMouseMove(e) {
    if (!this.dnd) return;
    e.preventDefault();
    this.dragAndDrop(e, this.ghost);
    this.dnd.style.left = `${e.pageX - this.dndLeft}px`;
    this.dnd.style.top = `${e.pageY - this.dndTop}px`;
  }

  onMouseLeave(e) {
    if (!this.dnd) return;
    e.preventDefault();
    this.ghost.parentNode.removeChild(this.ghost);
    this.dnd.classList.remove('dragged');
    this.dnd.style = '';
    this.dnd = null;
    this.ghost = null;
  }

  onMouseUp(e) {
    if (!this.dnd) return;
    this.dragAndDrop(e, this.dnd);
    this.ghost.parentNode.removeChild(this.ghost);
    this.dnd.classList.remove('dragged');
    this.dnd.style = '';
    this.dnd = null;
    this.ghost = null;
    this.tasks.save(this.getAllTasks());
  }

  getAllTasks() {
    if (typeof document !== 'undefined') {
      const all = {
        todo: [],
        inprogress: [],
        done: [],
      };
      const todo = [
        ...document.getElementById('todo').querySelector('.item-tasks')
          .childNodes,
      ];
      const inprogress = [
        ...document.getElementById('inprogress').querySelector('.item-tasks')
          .childNodes,
      ];
      const done = [
        ...document.getElementById('done').querySelector('.item-tasks')
          .childNodes,
      ];

      todo.forEach((item) => all.todo.push(item.textContent.replace('✖', '')));
      inprogress.forEach((item) => all.inprogress.push(item.textContent.replace('✖', '')));
      done.forEach((item) => all.done.push(item.textContent.replace('✖', '')));
      return all;
    }
  }

  add(parent, text) {
    if (typeof document !== 'undefined') {
      const item = document.createElement('div');
      item.classList.add('item-task');
      item.innerHTML = `${text} <div class='del hidden'>&#x2716;</div>`;
      parent.appendChild(item);
    }
  }

  addAll(parent, arr) {
    arr.forEach((item) => this.add(parent, item));
  }

  del(element) {
    element.parentNode.removeChild(element);
  }

  dragAndDrop(e, element) {
    if (typeof document !== 'undefined') {
      const closest = document.elementFromPoint(e.clientX, e.clientY);
      const { top } = closest.getBoundingClientRect();

      if (closest.classList.contains('item-task')) {
        if (e.pageY > window.scrollY + top + closest.offsetHeight / 2) {
          closest
            .closest('.item-tasks')
            .insertBefore(element, closest.nextElementSibling);
        } else {
          closest.closest('.item-tasks').insertBefore(element, closest);
        }
      } else if (
        closest.classList.contains('item-tasks')
        && !closest.querySelector('.item-task')
      ) {
        closest.append(element);
      }
    }
  }
}
