const rootNode = document.getElementById('root');
const mainPage = document.getElementById('main-page');
const newItemPage = document.getElementById('add-item-page');
const editItemPage = document.getElementById('edit-item-page');
const addNewInput = document.getElementById('add-new-input');
const saveNewBtn = document.getElementById('save-new-btn');
const warning = document.getElementById('warning');
const todoItems = JSON.parse(localStorage.getItem('items')) || [];
const firstElement = 0;
const arrLength = firstElement;
const maxId = 1000000;
const toDoStatus = document.getElementsByClassName('todo-status')[firstElement];
const messages = {
    noEdit: 'You can\'t edit already done item',
    noDuplicateAdd: 'You can\'t add already existent item',
    noEmptyAdd: 'You can\'t add empty item'
}

rootNode.appendChild(mainPage);
changeAlertStyle();

window.onload = locationHashChanged;
window.onhashchange = locationHashChanged;
document.getElementsByClassName('modal-close-btn')[0].addEventListener('click', function () {
    hideAlert();
});

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('unchecked-item')) {
        showAlert(messages.noEdit);
    }
    if (e.target.classList.contains('trash-icon') || e.target.classList.contains('check-item')) {
        let id = parseFloat(e.target.parentNode.classList[firstElement].split('_').pop());
        let arrElem = todoItems.find(function (elem) {
            return elem.id === id;
        });
        let arrIndex = todoItems.indexOf(arrElem);
        todoItems.splice(arrIndex, 1);
        e.target.parentNode.remove();

        if (e.target.classList.contains('check-item')) {
            !arrElem.isDone ? arrElem.position = arrIndex : '';
            arrElem.isDone = !arrElem.isDone;
            if (todoItems.length < arrElem.position || arrElem.isDone) {
                todoItems.push(arrElem);
            } else {
                todoItems.splice(arrElem.position, 0, arrElem);
            }
            todoItems.sort(sortBoolean);
            createItemsList(todoItems);
        }
        saveToLocalStorage();
        hideElement(toDoStatus, todoItems);
    }
});

saveNewBtn.addEventListener('click', function () {
    let val = addNewInput.value;

    function addingCallback() {
        let id = generateId(todoItems);
        todoItems.push({
            isDone: false,
            id: id,
            description: val,
            position: todoItems.length
        });
        todoItems.sort(sortBoolean);
        saveToLocalStorage();
        window.location.href = '#';
    }
    doCheckOnAdding(val, addingCallback);
});

function sortBoolean(obj1, obj2) {
    let sortFalse = -1;
    if (obj1.isDone === obj2.isDone) {
        return 0;
    } else {
        return obj1.isDone ? 1 : sortFalse;
    }
}

function locationHashChanged() {
    if (location.hash.startsWith('#modify-item')) {
        appendCorrectRoot(editItemPage, ['main-page', 'add-item-page']);
        startEditMode(location.hash.split('_').pop());
    } else if (location.hash === '#add-new') {
        appendCorrectRoot(newItemPage, ['main-page', 'edit-item-page']);
        addNewInput.val = '';
    } else {
        appendCorrectRoot(mainPage, ['add-item-page', 'edit-item-page']);
        mainPage.appendChild(createItemsList(todoItems));
    }
}

function appendCorrectRoot(pageToShow, pagesToHide) {
    rootNode.appendChild(pageToShow);
    pagesToHide.forEach(function (elem) {
        let elemToRemove = document.getElementById(elem);
        if (elemToRemove) {
            elemToRemove.remove();
        }
    });
}

function startEditMode(id) {
    let editInput = document.getElementById('edit-input');
    let saveEditBtn = document.getElementById('save-edit-btn');
    let cancelEditBtn = document.getElementById('cancel-edit-btn');
    let editItem = todoItems.find(function (todoItem) {
        return todoItem.id === parseFloat(id);
    });
    editInput.value = editItem.description;
    let eventHandler = function () {
        doCheckOnAdding(editInput.value, function () {
            editItem.description = editInput.value;
            saveToLocalStorage();
            window.location.href = '#';
            saveEditBtn.removeEventListener('click', eventHandler);
        }, editItem.id);
    }
    saveEditBtn.addEventListener('click', eventHandler);
    cancelEditBtn.addEventListener('click', function () {
        saveEditBtn.removeEventListener('click', eventHandler)
    });
}

function doCheckOnAdding(itemName, fn, itemId) {
    let itemExists = checkIfItemExists(itemName, itemId);
    let itemEmpty = itemName === '';
    if (itemExists) {
        showAlert(messages.noDuplicateAdd);
    } else if (itemEmpty) {
        showAlert(messages.noEmptyAdd);
    } else {
        fn();
    }
}

function createItemsList(todoItems) {
    const wrapper = document.getElementsByClassName('all-items-wrapper')[firstElement];
    wrapper.innerHTML = '';
    for (let i = firstElement; i < todoItems.length; i++) {
        let item = document.createElement('div');
        item.classList.add(`todo-item_${todoItems[i].id}`);
        item.classList.add(`${todoItems[i].isDone ? 'checked-wrapper' : 'unchecked-wrapper'}`);
        item.innerHTML = `<input type='checkbox' class='check-item' ${todoItems[i].isDone ? 'checked' : ''}>
        <a class='edit-link' href='#modify-item_${todoItems[i].id}'>
            <span class='item-text ${todoItems[i].isDone ? 'unchecked-item' : 'checked-item'}'>
                ${todoItems[i].description}
            </span>
        </a>
        <i class='material-icons trash-icon'>delete</i>`

        wrapper.appendChild(item);
        if (todoItems[i].isDone) {
            wrapper.querySelector(`.todo-item_${todoItems[i].id} .edit-link`).removeAttribute('href');
        }
    }
    hideElement(toDoStatus, todoItems);
    return wrapper;
}

function checkIfItemExists(itemName, itemId) {
    const items = JSON.parse(localStorage.getItem('items'));
    if (items) {
        return !!items.find(function (obj) {
            return obj.description === itemName && obj.id !== itemId;
        });
    } else {
        return false;
    }
}

function hideElement(e, arr) {
    if (arr.length > arrLength) {
        e.classList.add('hidden')
    }
    if (arr.length === arrLength) {
        e.classList.remove('hidden')
    }
}

function generateId(arr) {
    let id = firstElement;
    let ids = arr.map(function (elem) {
        return elem.id
    });
    while (ids.includes(id)) {
        id = Math.floor(Math.random() * Math.floor(maxId));
    }
    return id;
}

function showAlert(msg) {
    warning.querySelector('.warning-message').innerText = msg;
    warning.classList.remove('hidden');
}

function hideAlert() {
    warning.classList.add('hidden');
}

function saveToLocalStorage() {
    localStorage.setItem('items', JSON.stringify(todoItems));
}

function changeAlertStyle() {
    const isChrome = /Chrome/.test(navigator.userAgent);
    if (!isChrome) {
        warning.style.right = '20px';
    }
}