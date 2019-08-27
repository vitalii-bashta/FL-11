let users = [];
let loader = document.querySelector('#page-loader');
let usersWrapper = document.querySelector('#userWrapper');
let postsWrapper = document.querySelector('#postsWrapper');

document.addEventListener("DOMContentLoaded", getUsersRequest);

function getUsersRequest() {
    showPageLoader();
    fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
            return response.json()
        }).then((json) => {
            users = json;
            generateContent();
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            hidePageLoader();
        })
}

function putUserRequest(user) {
    showPageLoader();
    const putMethod = {
        method: 'PUT',
        headers: {
         'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(user)
    }
    return fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, putMethod)
    .then(response => response.json())
    .finally(() => {
        hidePageLoader();
    })
}

function deleteUserRequest(user) {
    showPageLoader();
    const deleteMethod = {
        method: 'DELETE',
        headers: {
         'Content-type': 'application/json; charset=UTF-8'
        }
    }
    return fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, deleteMethod)
    .then(response => response.json())
    .finally(() => {
        hidePageLoader();
    })
}

function getUserPostsRequest(userId) {
    return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then((response) => {
        return response.json()
    });        
}

function getPostCommentsRequest(postId) {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then((response) => {
            return response.json()
        })
}

function generateContent() {
    createLayout();
    addListeners();
}

function createLayout() {
    let wrapper = document.getElementById('userWrapper');
    wrapper.innerHTML = '';
    users.forEach((el) => {
        wrapper.appendChild(createSingleUser(el));
    });
}

function addListeners() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit')) {
            onEditPressed(e);            
        } else if (e.target.classList.contains('cancel-btn')) {
            onCancelPressed(e);
        } else if (e.target.classList.contains('save-btn')) {
            onSavePressed(e);
        } else if (e.target.classList.contains('delete')) {
            onDeletePressed(e);
        } else if (e.target.classList.contains('userName')) {
            onAdvancedClicked(e);
        } else if (e.target.classList.contains('back-to-users-btn')) {
            changeRoute(true);
        }
    })
}

function createSingleUser(user) {
    let random = Math.floor( Math.random() * 10000 ) + 1;
    let newElem = document.createElement('div');
    newElem.classList.add('single-user-wrapper');
    newElem.innerHTML = `
    <img src="https://cataas.com/cat?dummy=${random}" class="avatar" alt="cat">
    <div class="user">
        <h4 class="userName name">${user.name}</h4>
        <p class="email">E-mail: ${user.email}</p>
        <p class="phone">Phone: ${user.phone}</p>
        <i class='material-icons edit'>edit</i>
        <i class='material-icons trash delete'>delete</i>
    </div>
    <input type="hidden" class="user-unique" value="${user.id}">
    `
    return newElem;
}

function createForm(user) {
    let newElem = document.createElement('div');
    newElem.classList.add('form-wrapper');
    newElem.innerHTML = `
    <form class="input-form" action="#">
        <div class="input-block">
            <label for="name">Name:</label>
            <input type="text" name="name" id="name" value="${user.name}">
        </div>
        <div class="input-block">
            <label for="e-mail">E-mail:</label>
            <input type="text" name="email" id="e-mail" value="${user.email}">
        </div>
        <div class="input-block">
            <label for="phone">Phone:</label>
            <input type="text" name="phone" id="phone" value="${user.phone}">
        </div>
    </form>
    <button class="save-btn">Save</button>
    <button class="cancel-btn">Cancel</button>
    `
    return newElem;
}

function createSinglePost(post, postComments) {
    console.log(postComments)
    let newElem = document.createElement('div');

    newElem.classList.add('user-post');
    newElem.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
    `
    let section = document.createElement('section');
    section.classList.add('post-comments');
    postComments.forEach((comment) => {
        let singleComment = document.createElement('p');
        singleComment.classList.add('single-comment');
        singleComment.innerHTML = comment.body;
        section.appendChild(singleComment);
    });

    newElem.appendChild(section);

    return newElem;
}

function displayPosts(posts, comments) {
    let wrapper = document.querySelector('.user-posts-all');
    wrapper.innerHTML = '';
    posts.forEach((post) => {
        let postComments = comments.filter((commentObj) => {
            return commentObj.postId === post.id;
        });
        wrapper.appendChild(createSinglePost(post, postComments))        
    });    
}

function serializeForm (formElement) {
    const formData = {};
    const inputs = formElement.elements;
  
    for (let i = 0; i < inputs.length; i++) {
        if(inputs[i].name!=="") {
            formData[inputs[i].name] = inputs[i].value;
        }
    }
    return formData;
}

function getUserObject(e) {
    let wrapper = e.target.closest('.single-user-wrapper');
    let id = wrapper.querySelector('.user-unique').value;
    let userObject = users.find((user) => {
        return '' + user.id === id;
    });
    return userObject;
}

function showPageLoader() {
    loader.classList.remove('hidden');
}

function hidePageLoader() {
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 500);
}

function changeRoute(changeToUsers) {
    if (changeToUsers) {
        usersWrapper.classList.remove('hidden');
        postsWrapper.classList.add('hidden');
    } else {
        postsWrapper.classList.remove('hidden');
        usersWrapper.classList.add('hidden');
    }
}

function onEditPressed(e) {
    let wrapper = e.target.closest('.single-user-wrapper');
    let userObject = getUserObject(e);
    e.target.parentElement.classList.add('hidden');
    wrapper.appendChild(createForm(userObject));
}

function onCancelPressed(e) {
    let wrapper = e.target.closest('.single-user-wrapper');
    let formBlock = wrapper.querySelector('.form-wrapper');
    let infoBlock = wrapper.querySelector('.user');

    infoBlock.classList.remove('hidden');

    formBlock.remove();
}

function onSavePressed(e) {
    let wrapper = e.target.closest('.single-user-wrapper');
    let formBlock = wrapper.querySelector('.input-form');
    let infoBlock = wrapper.querySelector('.user');
    let newData = serializeForm(formBlock);
    let index = users.indexOf(getUserObject(e));
    let userObject = {...getUserObject(e), ...newData};
    if (index) {
        users[index] = userObject;
    }
    for (let prop in newData) {
        if (newData.hasOwnProperty(prop)) {
            infoBlock.querySelector(`.${prop}`).innerHTML = newData[prop];
        }
    }
    
    putUserRequest(userObject);
    onCancelPressed(e);
}

function onDeletePressed(e) {
    let userObject = getUserObject(e);
    let index = users.indexOf(userObject);
    
    document.querySelector(`[value='${userObject.id}']`).closest('.single-user-wrapper').remove();
    users.splice(index, 1);

    deleteUserRequest(userObject);
}

function onAdvancedClicked(e) {
    let userObject = getUserObject(e);

    showPageLoader();

    Promise.all([getUserPostsRequest(userObject.id), getPostCommentsRequest(userObject.id)])
    .then(([posts, comments]) => {
        changeRoute(false);
        displayPosts(posts, comments)
    }).catch((error) => {
        console.log(error);
    }).finally(() => {
        hidePageLoader();
    })
}