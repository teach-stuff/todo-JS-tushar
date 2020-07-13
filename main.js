const todoList = document.getElementsByClassName('todo-list');
const inputTextBar = document.getElementsByClassName('todo-input');
const addButton = document.getElementsByClassName('todo-button');
const checkCompleteButton = document.getElementsByClassName('done');
const checkDeleteButton = document.getElementsByClassName('delete');
const deleteAllCompleteButton = document.getElementsByClassName('delete-complete');

//All the listeners
addButton[0].addEventListener("click", function (event) {
    //prevent the page from refreshing
    event.preventDefault();
    addTodoItem();
});

for (let i = 0; i < checkCompleteButton.length; i++) {
    checkCompleteButton[i].addEventListener("click", function (event) {
        markComplete(event.target);
    });
}

for (let i = 0; i < checkDeleteButton.length; i++) {
    checkDeleteButton[i].addEventListener("click", function (event) {
        markDelete(event.target);
    });
}

deleteAllCompleteButton[0].addEventListener('click',  deleteAllCompletedItems);
updateItemsRemaining();

//Add a new task
function addTodoItem() {
    //create a new list object
    const listItem = document.createElement('li');
    const text = inputTextBar[0].value;
    const span = document.createElement('span');
    span.innerText = text;

    //create a tick-mark object
    const checkCompleteMark = document.createElement('button');
    checkCompleteMark.innerHTML = '&#10003;';
    checkCompleteMark.classList.add('done');
    //Add an event listener
    checkCompleteMark.addEventListener('click', function (event) {
        markComplete(event.target);
    });

    //create a dustbin object
    const dustBin = document.createElement('button');
    dustBin.innerHTML = '&#128465;';
    dustBin.classList.add('delete');
    //Add an event listener
    dustBin.addEventListener('click', function (event) {
        markDelete(event.target);
    });

    //Create final list object
    listItem.appendChild(checkCompleteMark);
    listItem.appendChild(span);
    listItem.appendChild(dustBin);

    if (text === '') {
        alert("Can't add an empty task, write something and try again!");
    } else {
        todoList[0].appendChild(listItem);
    }

    //Clear the text bar
    inputTextBar[0].value = '';
    updateItemsRemaining();
}

function markComplete(doneElement) {
    doneElement.parentElement.classList.toggle('complete');
    updateItemsRemaining();
}

function markDelete(deleteElement) {
    deleteElement.parentElement.remove();
    updateItemsRemaining();
}

function deleteAllCompletedItems() {
    const completedElements = document.getElementsByClassName('complete');

    while (completedElements) {
        completedElements[0].remove();
    }

    updateItemsRemaining();
}

function updateItemsRemaining() {
    const completedElements = document.getElementsByClassName('complete');
    const allElements = document.getElementsByTagName('li');
    const leftTotal = document.getElementsByClassName('left total');

    if (allElements && completedElements) {
        const remaining = allElements.length - completedElements.length;
        leftTotal[0].textContent = remaining + ' items remaining';
        console.log(leftTotal[0].textContent);
    } else {
        leftTotal[0].textContent = '0 items remaining';
    }
}




