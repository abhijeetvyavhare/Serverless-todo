document.addEventListener("DOMContentLoaded", function() {
    const inputtdl = document.querySelector('.textarea');
    const buttontdl = document.querySelector('.buttoninput');
    const listtdl = document.querySelector('.todolist');


    function clickButton(e) {
        e.preventDefault();
        addTodo();
    }

    // Adding a task
    async function addTodo() {
        const task = inputtdl.value.trim();
        if (!task) {
            // If task is empty, don't proceed
            return;
        }
    
        try {
            const response = await fetch('https://moen4n4blg.execute-api.us-east-1.amazonaws.com/prod/todo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ task })
               
            });
            
            if (!response.ok) {
                // If response is not OK, throw an error
                throw new Error('Failed to add task');
            }
    
            const newItem = await response.json();
            // Assuming createTodoItem function exists and creates UI for the new item
            createTodoItem(newItem);
            displayTasks();
            inputtdl.value = '';
        } catch (error) {
            console.error('Error adding task:', error);
            // Handle error, e.g., display a message to the user
            // Example: displayErrorMessage('Failed to add task. Please try again.');
        }
    }
    
    
    // Delete a task
    async function deleteTask(taskId) {
        try {
            const response = await fetch(`https://moen4n4blg.execute-api.us-east-1.amazonaws.com/prod/delete/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ taskId })
            });
            
            if (!response.ok) {
                throw new Error('Failed to delete task');
            }

            document.getElementById(taskId).remove();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }

    // Display tasks
    async function displayTasks() {
        try {
            const response = await fetch('https://moen4n4blg.execute-api.us-east-1.amazonaws.com/prod/print');
            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }

            const tasks = await response.json();

            for (let i = 1; i < tasks.length; i++) {
                createTodoItem(tasks[i]);
            }            
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }

    function createTodoItem(task) {
        const itemall = document.createElement('div');
        itemall.classList.add('itemall');
        itemall.id = task.id;

        const item = document.createElement('p');
        item.classList.add('item');
        item.innerText = task.task;
        itemall.appendChild(item);

        const checkbutton = document.createElement("button");
        checkbutton.innerHTML = '<i class="fa-solid fa-check"></i>';
        checkbutton.classList.add("check-button");
        itemall.appendChild(checkbutton);

        const trashbutton = document.createElement("button");
        trashbutton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        trashbutton.classList.add("trash-button");
        itemall.appendChild(trashbutton);

        listtdl.appendChild(itemall);
    }

    // Status update tasks
async function toggleTaskStatus(taskId) {
    try {
        const response = await fetch(`https://moen4n4blg.execute-api.us-east-1.amazonaws.com/prod/toggle/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ taskId })
        });
        console.log(JSON.stringify({ taskId }))
        if (!response.ok) {
            let errorMessage = `Failed to toggle task status: ${response.statusText}`;
            if (response.status === 404) {
                errorMessage = 'Task not found';
            } else if (response.status === 500) {
                errorMessage = 'Internal server error';
            }
            throw new Error(errorMessage);
        }

        const updatedTask = await response.json();

        // Update the UI to reflect the updated task status
        const todoItem = document.getElementById(taskId);
        if (todoItem) {
            todoItem.classList.toggle('checklist', updatedTask.completed);
        } else {
            console.warn(`Todo item with id ${taskId} not found in the DOM`);
        }
    } catch (error) {
        console.error('Error toggling task status:', error);
    }
}

    

    // Event listeners
    buttontdl.addEventListener('click', clickButton);
    listtdl.addEventListener('click', function(e) {
        const item = e.target;
        if (item.classList.contains('check-button')) {
            toggleTaskStatus(item.parentElement.id);
        } else if (item.classList.contains('trash-button')) {
            const taskId = item.parentElement.id;
            deleteTask(taskId);
        }
    });
    

    

    // Display tasks when the page loads
    displayTasks();
});

