const title = document.createElement("h1");
title.innerText = "Tasks";
const toDoForm = document.createElement("form");
toDoForm.className = "js-toDoForm";
const addTask = document.createElement("input");
addTask.type = "text";
addTask.placeholder = "Add Task";
const subTitle1 = document.createElement("h2");
subTitle1.innerText = "Pending";
const pending = document.createElement("ul");
pending.className = "js-ul-Pending";
const subTitle2 = document.createElement("h2");
subTitle2.innerText = "Finished";
const finished = document.createElement("ul");
finished.className = "js-ul-Finished";

toDoForm.appendChild(addTask);
document.body.appendChild(title);
document.body.appendChild(toDoForm);
document.body.appendChild(subTitle1);
document.body.appendChild(pending);
document.body.appendChild(subTitle2);
document.body.appendChild(finished);

function randomInt() {
    return Math.floor(Math.random() * 100000);
}

const PENDING = "PENDING";
const FINISHED = "FINISHED";

let pendings = [];
let finisheds = [];

function savePending() {
    localStorage.setItem(PENDING, JSON.stringify(pendings));
}
function saveFinished() {
    localStorage.setItem(FINISHED, JSON.stringify(finisheds));
}

function deleteTask(event) {
    const btn = event.target;
    const li = btn.parentNode;
    if (event.path[2].className === "js-ul-Pending") {
        pending.removeChild(li);
        const cleanPen = pendings.filter(function (data) {
            return data.id !== parseInt(li.id);
        });
        pendings = cleanPen;
        savePending();
    } else {
        finished.removeChild(li);
        const cleanFin = finisheds.filter(function (data) {
            return data.id !== parseInt(li.id);
        });
        finisheds = cleanFin;
        saveFinished();
    }
}

function moveTask(event) {
    const btn = event.target;
    const li = btn.parentNode;
    if (event.path[2].className === "js-ul-Pending") {
        finished.appendChild(li);
        event.toElement.innerText = "🔙";
        const goToFin = pendings.filter(function (data) {
            return data.id === parseInt(li.id);
        });
        finisheds.push(goToFin[0]);
        saveFinished();
        const stayPen = pendings.filter(function (data) {
            return data.id !== parseInt(li.id);
        });
        pendings = stayPen;
        savePending();
    } else {
        pending.appendChild(li);
        event.toElement.innerText = "✅";
        const goToPen = finisheds.filter(function (data) {
            return data.id === parseInt(li.id);
        });
        pendings.push(goToPen[0]);
        savePending();
        const stayFin = finisheds.filter(function (data) {
            return data.id !== parseInt(li.id);
        });
        finisheds = stayFin;
        saveFinished();
    }
}

function paintPending(text) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const switchBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    span.innerHTML = text;
    switchBtn.innerHTML = "✅";
    deleteBtn.innerHTML = "❌";
    li.appendChild(span);
    li.appendChild(deleteBtn);
    li.appendChild(switchBtn);
    pending.appendChild(li);
    deleteBtn.addEventListener("click", deleteTask);
    switchBtn.addEventListener("click", moveTask);

    const newId = randomInt();
    li.id = newId;
    const pendingObj = {
        text: text,
        id: newId
    };
    pendings.push(pendingObj);
    savePending();
}

function paintFinished(text) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const switchBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    span.innerHTML = text;
    switchBtn.innerHTML = "🔙";
    deleteBtn.innerHTML = "❌";
    li.appendChild(span);
    li.appendChild(deleteBtn);
    li.appendChild(switchBtn);
    finished.appendChild(li);
    deleteBtn.addEventListener("click", deleteTask);
    switchBtn.addEventListener("click", moveTask);

    const newId = randomInt();
    li.id = newId;
    const finishedObj = {
        text: text,
        id: newId
    };
    finisheds.push(finishedObj);
    saveFinished();
}

function load() {
    const loadedPendings = localStorage.getItem(PENDING);
    if (loadedPendings !== null) {
        const parsedPendings = JSON.parse(loadedPendings);
        parsedPendings.forEach(function (data) {
            paintPending(data.text);
        });
    }
    const loadedFinisheds = localStorage.getItem(FINISHED);
    if (loadedFinisheds !== null) {
        const parsedFinisheds = JSON.parse(loadedFinisheds);
        parsedFinisheds.forEach(function (data) {
            paintFinished(data.text);
        });
    }
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = addTask.value;
    paintPending(currentValue);
    addTask.value = "";
}

function init() {
    toDoForm.addEventListener("submit", handleSubmit);
    load();
}

init();
