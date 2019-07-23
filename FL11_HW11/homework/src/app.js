let rootNode = document.getElementById('root');
let input = document.getElementById('input');
let addItemButton = document.getElementsByClassName('add-item')[0];
let listWrapper = document.getElementsByClassName('todo-list-wrapper')[0];
let listFullMessage = document.getElementsByClassName('warning')[0];
let activeButtonClass = 'active';
let checkBoxClass = 'cb-unchecked';
let trashClass = 'trash';
let editClass = 'edit';
let saveClass = 'save';
let dragableElementClass = 'single-item';
let counter = 0;
let maxListItems = 10;
let source;

input.addEventListener('input', checkIfInputEmpty)
addItemButton.addEventListener('click', addItem);
rootNode.addEventListener('click', traceDocumentClicks);

function traceDocumentClicks(e) {
    if (e.target.classList.contains(checkBoxClass)) {
        e.target.classList.add('hidden');
        e.target.parentElement.getElementsByClassName('cb-checked')[0].classList.remove('hidden');
    }
    if (e.target.classList.contains(trashClass)) {
        e.target.parentElement.remove();
        counter--;
        checkIfListFull();
    }
    if (e.target.classList.contains(editClass)) {
        let innerText = e.target.parentElement.getElementsByClassName('todo-item')[0].innerText;
        e.target.parentElement.replaceWith(createEditedItem(innerText));
    }
    if (e.target.classList.contains(saveClass)) {
        let innerText = e.target.parentElement.getElementsByClassName('edit-input')[0].value;
        e.target.parentElement.replaceWith(createListItem(innerText));
    }
    e.stopImmediatePropagation();
}

function createEditedItem(innerText) {
    let newElem = document.createElement('div');
    newElem.classList.add(dragableElementClass);

    newElem.innerHTML = `<input type='text' class='edit-input' value='${innerText}'>
    <i class='material-icons save'>save</i>`
    return newElem;
}

function addItem() {
    if (!checkIfListFull() && input.value) {
        appendListItem(input.value);
        counter++;
        checkIfListFull();
    }
    input.value = '';
    return;
}

function checkIfInputEmpty() {
    if (input.value) {
        addItemButton.classList.add(activeButtonClass);
    } else {
        addItemButton.classList.remove(activeButtonClass);
    }
}

function createListItem(text) {
    let newElem = document.createElement('div');
    newElem.classList.add(dragableElementClass);

    newElem.setAttribute('draggable', 'true');
    newElem.setAttribute('ondragstart', 'dragStarted(event)');
    newElem.setAttribute('ondragover', 'draggingOver(event)');
    newElem.setAttribute('ondrop', 'dropped(event)');

    newElem.innerHTML = `<i class='material-icons cb-checked hidden'>done</i>
    <i class='material-icons cb-unchecked'>check_box_outline_blank</i>
    <p class='todo-item'>${text}</p>
    <i class='material-icons edit'>edit</i>
    <i class='material-icons trash' id='delete'>delete</i>`
    return newElem;
}

function appendListItem(text) {
    let newElem = createListItem(text);
    listWrapper.appendChild(newElem);
    addItemButton.classList.remove(activeButtonClass);
}

function checkIfListFull() {
    if (counter >= maxListItems) {
        listFullMessage.classList.remove('hidden');
        input.setAttribute('disabled', true);
        addItemButton.classList.remove(activeButtonClass);
        return true
    } else {
        listFullMessage.classList.add('hidden');
        input.removeAttribute('disabled');
        return false
    }
}

function dragStarted(e) {
    source = e.target;
    e.dataTransfer.setData('text/plain', e.target.innerHTML);
    e.dataTransfer.effectAllowed = 'move';

}

function draggingOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function dropped(e) {
    e.preventDefault();
    e.stopPropagation();
    let target = e.target;

    if (e.target.localName === 'i' || e.target.localName === 'p') {
        target = target.parentElement;
    }
    if (source.localName === 'i' || source.localName === 'p') {
        source = source.parentElement;
    }

    source.innerHTML = target.innerHTML;
    target.innerHTML = e.dataTransfer.getData('text/plain');
}