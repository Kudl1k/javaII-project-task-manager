
let users = [];
let projects = [];

function fetchUsers() {
    fetch('http://localhost:8080/users')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        users = []
        users = data;
        displayUsers()
    })
    .catch(error => {
        console.error('An error occurred:', error);
    });
}

function fetchProjects() {
    fetch('http://localhost:8080/projects')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        projects = []
        projects = data;
        displayProjects()
    })
    .catch(error => {
        console.error('An error occurred:', error);
    });
}

let selectedUserId;

function displayUsers() {
    const container = document.getElementById('usersContainer');
    container.innerHTML = '';

    users.forEach(user => {
        const card = document.createElement('ion-card');
        card.dataset.userId = user.id; // Store the user ID in a data attribute

        const cardHeader = document.createElement('ion-card-header');

        const cardSubtitle = document.createElement('ion-card-subtitle');
        cardSubtitle.textContent = user.email;

        const cardTitle = document.createElement('ion-card-title');
        cardTitle.textContent = user.name + " " + user.surname;

        cardHeader.appendChild(cardSubtitle);
        cardHeader.appendChild(cardTitle);

        card.appendChild(cardHeader);

        // Add a click event to the card
        card.addEventListener('click', function() {
            console.log(`Card clicked: ${this.dataset.userId}`); // Log the ID of the clicked user
            selectedUserId = Number(this.dataset.userId); // Convert the user ID to a number
            const user = users.find(user => user.id === selectedUserId);
            editUserModal.classList.add('active');
            console.log(editUserModal)
            console.log(user)
            populateEditModal(user); // Populate the edit modal with the selected user's data
            editUserModal.present()
        });

        // Add the card to the container
        container.appendChild(card);
    });
}

function displayProjects() {
    const container = document.getElementById('projectsContainer');
    container.innerHTML = '';

    projects.forEach(project => {
        const card = document.createElement('ion-card');
        // Add your code here to display the project details in the card
    });
}

function populateEditModal(user) {
    document.getElementById('user_edit_input_name').value = user.name
    document.getElementById('user_edit_input_surname').value = user.surname
    document.getElementById('user_edit_input_email').value = user.email    
}

let editUserModal;

function createEditUserModal() {
    const modalContainer = document.getElementById('edit_user_modal');

    const modalHTML = `
        <ion-modal id="edit_user_modal_w" trigger="user-card">
            <ion-header>
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-button onclick="cancel()">Cancel</ion-button>
                    </ion-buttons>
                    <ion-title>Edit User</ion-title>
                    <ion-buttons slot="end">
                        <ion-button onclick="editUser()" strong="true">Save</ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>
            <ion-content class="ion-padding">
                <ion-item>
                    <ion-input id="user_edit_input_name" label="Enter user name" label-placement="stacked" type="text" placeholder="Your name"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-input id="user_edit_input_surname" label="Enter user surname" label-placement="stacked" type="text" placeholder="Your surname"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-input id="user_edit_input_email" label="Enter user email" label-placement="stacked" type="text" placeholder="Your email"></ion-input>
                </ion-item>
            </ion-content>
        </ion-modal>
    `;

    modalContainer.innerHTML = modalHTML;
    editUserModal = document.getElementById('edit_user_modal_w');
}

let addUserModal;
function createAddUserModal() {
    const modalContainer = document.getElementById('add_user_modal');

    const modalHTML = `
        <ion-modal id="add_user_modal_w" trigger="add_user_button">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button onclick="cancel()">Cancel</ion-button>
                </ion-buttons>
                <ion-title>Creare new user</ion-title>
                <ion-buttons slot="end">
                    <ion-button onclick="addUser()" strong="true">Add user</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-item>
                <ion-input id="user_add_input_name" label="Enter user name" label-placement="stacked" type="text" placeholder="Jan"></ion-input>
            </ion-item>
            <ion-item>
                <ion-input id="user_add_input_surname" label="Enter user surname" label-placement="stacked" type="text" placeholder="Novak"></ion-input>
            </ion-item>
            <ion-item>
                <ion-input id="user_add_input_email" label="Enter user email" label-placement="stacked" type="text" placeholder="nov1234@vsb.cz"></ion-input>
            </ion-item>
        </ion-content>
    </ion-modal>

    `;

    modalContainer.innerHTML = modalHTML;
    addUserModal = document.getElementById('add_user_modal_w');
}

function cancel() {
    addUserModal.dismiss(null, 'cancel');
    editUserModal.dismiss(null,'cancel');
    addProjectModal.dismiss(null, 'cancel');
}

async function presentAlert(message) {
    const alert = document.createElement('ion-alert');
    alert.header = 'Error';
    alert.message = message;
    alert.buttons = ['Close'];

    document.body.appendChild(alert);
    await alert.present();
}

function addUser() {

    var name = document.getElementById('user_add_input_name').value
    var surname = document.getElementById('user_add_input_surname').value
    var email = document.getElementById('user_add_input_email').value

    var data = {
        name: name,
        surname: surname,
        email: email
    };

    fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            console.log('not ok')
            throw new Error('Network response was not ok');
        }
        console.log('ok')
        return response.json();
    })
    .then(data => {
        document.getElementById('user_add_input_name').value = "";
        document.getElementById('user_add_input_surname').value = "";
        document.getElementById('user_add_input_email').value = "";
        cancel()
        fetchUsers()
        displayUsers()
        console.log('here')
    })
    .catch(error => {
        presentAlert('An error occurred');
        console.log('error')
    });
}

function editUser() {
    var name = document.getElementById('user_edit_input_name').value;
    var surname = document.getElementById('user_edit_input_surname').value;
    var email = document.getElementById('user_edit_input_email').value;

    var data = {
        name: name,
        surname: surname,
        email: email
    };

    fetch(`http://localhost:8080/users/${selectedUserId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('User updated:', data);
        fetchUsers(); // Refresh the user list
        displayUsers()
        cancel()
    })
    .catch(error => {
        presentAlert('An error occurred');
    });
}

let addProjectModal;
function createAddProjectModal() {
    const modalContainer = document.getElementById('add_project_modal');
    modalContainer.innerHTML = ''
    let usersHTML = '';
    users.forEach(user => {
        usersHTML += `
            <ion-item>
                <ion-label>${user.name} ${user.surname}</ion-label>
                <ion-button onclick="addUserToProject(${user.id})">Add</ion-button>
            </ion-item>
        `;
    });

    const modalHTML = `
        <ion-modal id="add_project_modal_w" trigger="add_project_button">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button onclick="cancel()">Cancel</ion-button>
                </ion-buttons>
                <ion-title>Create new project</ion-title>
                <ion-buttons slot="end">
                    <ion-button onclick="addUser()" strong="true">Add project</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content id="project_add_modal_content" class="ion-padding">
            <ion-item>
                <ion-input id="project_add_input_name" label="Enter project name" label-placement="stacked" type="text" placeholder="Project 1"></ion-input>
            </ion-item>
            ${usersHTML}
        </ion-content>
    </ion-modal>
    `;

    modalContainer.innerHTML = modalHTML;
    addProjectModal = document.getElementById('add_project_modal_w');
}

document.getElementById('add_project_button').addEventListener('click',function(){
    createAddProjectModal()
    addProjectModal.classList.add('active');
    addProjectModal.present()
})

fetchUsers()
fetchProjects()
createEditUserModal()
createAddUserModal()
createAddProjectModal()