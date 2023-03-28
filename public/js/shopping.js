const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
// Add a new task when the form is submitted
taskForm.addEventListener("submit", function (event) {
  event.preventDefault();
  // Get the task content from the input field
  const taskContent = taskInput.value;
  // Make sure the task content is not empty
  if (taskContent.trim()) {
    // Create a new list item with the task content
    const taskItem = document.createElement("li");
    taskItem.classList.add(
      "task-item",
      "flex",
      "justify-between",
      "p-2",
      "rounded-lg",
      "shadow-lg",
      "bg-white",
      "my-2"
    );
    taskItem.innerHTML = `
        <span class="flex-1 ml-2 text-gray-800">${taskContent}</span>
        <button class="edit-btn p-1 rounded-full bg-gray-300 mr-2"><i class="fas fa-edit"></i></button>
        <button class="delete-btn p-1 rounded-full bg-red-500"><i class="fas fa-trash-alt"></i></button>
      `;
    // Add the new task item to the task list
    taskList.appendChild(taskItem);
    // Clear the input field
    taskForm.reset();
  }
});
// Edit a task when the edit button is clicked
taskList.addEventListener('click', function(event) {
    if (event.target.classList.contains('edit-btn')) {
      const taskItem = event.target.parentElement;
      const taskText = taskItem.querySelector('span').textContent;
  
      // Replace the task text with an input field
      taskItem.innerHTML = `
        <input type="text" class="w-full p-2 rounded-lg shadow-lg" value="${taskText}">
        <button class="update-btn p-1 rounded-full bg-blue-500 text-white mr-2"><i class="fas fa-check"></i></button>
        <button class="cancel-btn p-1 rounded-full bg-red-500"><i class="fas fa-times"></i></button>
      `;
    }
  });
  // Delete a task when the delete button is clicked
taskList.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
      const taskItem = event.target.parentElement;
      taskList.removeChild(taskItem);
    }
  });
  