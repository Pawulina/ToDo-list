const input = document.querySelector("input");
const toDoList = document.querySelector(".to-do-list");
const addButton = document.querySelector(".add-task-btn");

// **Adding task**
addButton.addEventListener("click", () => {
	let task = input.value;

	let taskText = document.createElement("span");
	taskText.textContent = task;

	let newTask = document.createElement("li");
	newTask.appendChild(taskText);

	toDoList.appendChild(newTask);
	newTask.classList.add("task-item");
	input.value = "";

	let deleteButton = document.createElement("button");
	deleteButton.textContent = "🗑";
	newTask.appendChild(deleteButton);
	deleteButton.classList.add("delete-btn");

	let editButton = document.createElement("button");
	editButton.textContent = "✏️";
	newTask.appendChild(editButton);
	editButton.classList.add("edit-btn");

	let checkBox = document.createElement("input");
	checkBox.type = "checkbox";
	newTask.prepend(checkBox);

	saveLocalStorage();
});

// Checkbox line-through class

toDoList.addEventListener("change", (event) => {
	if (event.target.type === "checkbox") {
		let taskItem = event.target.parentElement;
		taskItem.classList.toggle("completed");
	}
	saveLocalStorage();
});

// **Delete, edit buttons**

toDoList.addEventListener("click", (event) => {
	if (event.target.classList.contains("delete-btn")) {
		event.target.parentElement.remove();
		saveLocalStorage();
		alert("Task removed");
	} else if (event.target.classList.contains("edit-btn")) {
		let taskItem = event.target.parentElement;
		let taskText = taskItem.querySelector("span");
		let inputField = document.createElement("input");
		inputField.type = "text";
		inputField.value = taskText.textContent;

		taskItem.replaceChild(inputField, taskText);

		inputField.addEventListener("keypress", (e) => {
			if (e.key === "Enter") {
				saveTask(inputField, taskItem);
			}
		});
	}
});

function saveTask(inputField, taskItem) {
	let newText = inputField.value;
	let newSpan = document.createElement("span");
	newSpan.textContent = newText;
	taskItem.replaceChild(newSpan, inputField);

	let editButton = taskItem.querySelector(".edit-btn");
	editButton.textContent = "✏️";
	saveLocalStorage();
}

// **Local storage functions**

// SAVE
function saveLocalStorage() {
	let tasks = [];
	let toDoItems = document.querySelectorAll("li");
	toDoItems.forEach((item) => {
		let taskText = item.querySelector("span");
		let checkBox = item.querySelector("input[type='checkbox']");

		let taskData = {
			text: taskText.textContent,
			completed: checkBox.checked,
		};
		tasks.push(taskData);
	});

	localStorage.setItem("tasks", JSON.stringify(tasks));
}

// LOAD

function loadLocalStorage() {
	let uploadedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

	uploadedTasks.forEach((task) => {
		let listElement = document.createElement("li");
		let spanText = document.createElement("span");
		spanText.textContent = task.text;
		listElement.classList.add("task-item");

		let checkBox = document.createElement("input");
		checkBox.type = "checkbox";
		checkBox.checked = task.completed;

		listElement.appendChild(checkBox);
		listElement.appendChild(spanText);

		let deleteButton = document.createElement("button");
		deleteButton.textContent = "🗑";
		listElement.appendChild(deleteButton);
		deleteButton.classList.add("delete-btn");

		let editButton = document.createElement("button");
		editButton.textContent = "✏️";
		listElement.appendChild(editButton);
		editButton.classList.add("edit-btn");

		listElement.appendChild(deleteButton);
		listElement.appendChild(editButton);

		if (task.completed) {
			listElement.classList.add("completed");
		}

		document.querySelector(".to-do-list").appendChild(listElement);
	});
}

document.addEventListener("DOMContentLoaded", loadLocalStorage);
