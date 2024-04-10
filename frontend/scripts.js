
let users = [];


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

function displayUsers() {
    const container = document.getElementById('usersContainer');
    container.innerHTML = '';

    users.forEach(user => {
        const card = document.createElement('ion-card');
        card.id = 'user-card';
        card.type = 'button';

        const cardHeader = document.createElement('ion-card-header');

        const cardSubtitle = document.createElement('ion-card-subtitle');
        cardSubtitle.textContent = user.email;

        const cardTitle = document.createElement('ion-card-title');
        cardTitle.textContent = user.name;

        cardHeader.appendChild(cardSubtitle);
        cardHeader.appendChild(cardTitle);

        card.appendChild(cardHeader);

        // Add a click event to the card
        card.addEventListener('click', function() {
            selectedUserId = user.id; // Store the selected user's ID
            populateEditModal(user); // Populate the edit modal with the selected user's data
            document.getElementById('edit_modal').classList.add('active'); // Open the edit modal
        });

        // Add the card to the container
        container.appendChild(card);
    });
    createEditModal()
}

function populateEditModal(user) {
    document.getElementById('user_edit_input_name').value = user.name;
    document.getElementById('user_edit_input_surname').value = user.surname;
    document.getElementById('user_edit_input_email').value = user.email;
}


function createEditModal() {
    const modalContainer = document.getElementById('edit_modal');

    const modalHTML = `
        <ion-modal id="edit_modal">
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
                    <ion-input id="user_edit_input_name" label="Enter your name" label-placement="stacked" type="text" placeholder="Your name"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-input id="user_edit_input_surname" label="Enter your surname" label-placement="stacked" type="text" placeholder="Your surname"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-input id="user_edit_input_email" label="Enter your email" label-placement="stacked" type="text" placeholder="Your email"></ion-input>
                </ion-item>
            </ion-content>
        </ion-modal>
    `;

    modalContainer.innerHTML = modalHTML;
    const modal = document.getElementById('edit_modal');
}

let addModal;
function createAddModal() {
    const modalContainer = document.getElementById('add_modal');

    const modalHTML = `
        <ion-modal id="add_modal" trigger="add_user_button">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button onclick="cancel()">Cancel</ion-button>
                </ion-buttons>
                <ion-title>Welcome</ion-title>
                <ion-buttons slot="end">
                    <ion-button onclick="addUser()" strong="true">Add user</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-item>
                <ion-input id="user_add_input_name" label="Enter your name" label-placement="stacked" type="text" placeholder="Your name"></ion-input>
            </ion-item>
            <ion-item>
                <ion-input id="user_add_input_surname" label="Enter your surname" label-placement="stacked" type="text" placeholder="Your surname"></ion-input>
            </ion-item>
            <ion-item>
                <ion-input id="user_add_input_email" label="Enter your email" label-placement="stacked" type="text" placeholder="Your email"></ion-input>
            </ion-item>
        </ion-content>
    </ion-modal>

    `;

    modalContainer.innerHTML = modalHTML;
    addModal = document.querySelector('ion-modal');
}



fetchUsers()
createAddModal()



function cancel() {
    addModal.dismiss(null, 'cancel');
}
function openModal() {
    document.getElementById('add_modal').classList.add('active');
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
        console.log('here')
    })
    .catch(error => {
        presentAlert('An error occurred');
        console.log('error')
    });
}

function editUser(){
    
}