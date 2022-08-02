(()=>{"use strict";class t{save(t){localStorage.setItem("tasks",JSON.stringify(t))}load(){return JSON.parse(localStorage.getItem("tasks"))}}class e{constructor(){this.tasks={todo:["Сверстать модальное окно","Написать логику модального окна"],inprogress:["Сделать слайдер","Покрасить кнопку"],done:["Сверстать главную страницу","Сверстать header"]}}}const s=new class{constructor(){"undefined"!=typeof document&&(this.container=document.querySelector(".container"),this.todo=document.querySelector("#todo .item-tasks"),this.inprogress=document.querySelector("#inprogress .item-tasks"),this.done=document.querySelector("#done .item-tasks")),this.tasks=new t,this.ghost=null,this.dnd=null,this.dndWidth=null,this.dndHeight=null,this.dndTop=null,this.dndLeft=null}init(){"undefined"!=typeof document&&(document.addEventListener("DOMContentLoaded",(()=>{const t=this.tasks.load();this.addAll(this.todo,t.todo),this.addAll(this.inprogress,t.inprogress),this.addAll(this.done,t.done)})),this.container.addEventListener("mousedown",(t=>this.onMouseDown(t))),this.container.addEventListener("mousemove",(t=>this.onMouseMove(t))),this.container.addEventListener("mouseleave",(t=>this.onMouseLeave(t))),this.container.addEventListener("mouseup",(t=>this.onMouseUp(t))))}onMouseDown(t){const{target:e}=t;e.classList.contains("add-task")&&(e.parentNode.querySelector(".input-task").classList.remove("hidden"),e.classList.add("hidden")),e.classList.contains("add-task-button")&&(this.add(e.closest(".tasks").querySelector(".item-tasks"),e.closest(".input-task").querySelector(".text-task").value),e.closest(".input-task").querySelector(".text-task").value="",e.closest(".tasks").querySelector(".add-task").classList.remove("hidden"),e.parentNode.classList.add("hidden"),this.tasks.save(this.getAllTasks())),e.classList.contains("cancel")&&(e.closest(".tasks").querySelector(".add-task").classList.remove("hidden"),e.parentNode.classList.add("hidden")),e.classList.contains("del")&&(this.del(e.parentNode),this.tasks.save(this.getAllTasks())),e.classList.contains("item-task")&&(t.preventDefault(),e.querySelector(".del").classList.add("hidden"),this.dnd=e,this.dndWidth=this.dnd.offsetWidth,this.dndHeight=this.dnd.offsetHeight,this.dndLeft=t.pageX-e.getBoundingClientRect().left,this.dndTop=t.pageY-e.getBoundingClientRect().top,this.ghost=e.cloneNode(!0),this.ghost.style.width=`${this.dndWidth}px`,this.ghost.style.height=`${this.dndHeight}px`,this.dnd.classList.add("dragged"),e.parentNode.insertBefore(this.ghost,e.nextElementSibling),this.dnd.style.left=t.pageX-this.dndLeft+"px",this.dnd.style.top=t.pageY-this.dndTop+"px",this.dnd.style.width=`${this.dndWidth}px`,this.dnd.style.height=`${this.dndHeight}px`)}onMouseMove(t){this.dnd&&(t.preventDefault(),this.dragAndDrop(t,this.ghost),this.dnd.style.left=t.pageX-this.dndLeft+"px",this.dnd.style.top=t.pageY-this.dndTop+"px")}onMouseLeave(t){this.dnd&&(t.preventDefault(),this.ghost.parentNode.removeChild(this.ghost),this.dnd.classList.remove("dragged"),this.dnd.style="",this.dnd=null,this.ghost=null)}onMouseUp(t){this.dnd&&(this.dragAndDrop(t,this.dnd),this.ghost.parentNode.removeChild(this.ghost),this.dnd.classList.remove("dragged"),this.dnd.style="",this.dnd=null,this.ghost=null,this.tasks.save(this.getAllTasks()))}getAllTasks(){if("undefined"!=typeof document){const t={todo:[],inprogress:[],done:[]},e=[...document.getElementById("todo").querySelector(".item-tasks").childNodes],s=[...document.getElementById("inprogress").querySelector(".item-tasks").childNodes],d=[...document.getElementById("done").querySelector(".item-tasks").childNodes];return e.forEach((e=>t.todo.push(e.textContent.replace("✖","")))),s.forEach((e=>t.inprogress.push(e.textContent.replace("✖","")))),d.forEach((e=>t.done.push(e.textContent.replace("✖","")))),t}}add(t,e){if("undefined"!=typeof document){const s=document.createElement("div");s.classList.add("item-task"),s.innerHTML=`${e} <div class='del hidden'>&#x2716;</div>`,t.appendChild(s)}}addAll(t,e){e.forEach((e=>this.add(t,e)))}del(t){t.parentNode.removeChild(t)}dragAndDrop(t,e){if("undefined"!=typeof document){const s=document.elementFromPoint(t.clientX,t.clientY),{top:d}=s.getBoundingClientRect();s.classList.contains("item-task")?t.pageY>window.scrollY+d+s.offsetHeight/2?s.closest(".item-tasks").insertBefore(e,s.nextElementSibling):s.closest(".item-tasks").insertBefore(e,s):s.classList.contains("item-tasks")&&!s.querySelector(".item-task")&&s.append(e)}}};if("undefined"!=typeof localStorage&&void 0===localStorage.tasks){const t=new e;s.tasks.save(t.tasks)}s.init()})();