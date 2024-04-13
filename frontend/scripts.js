
let users = [];
let projects = [];
let tasks = [];

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

function fetchTasks() {
    fetch('http://localhost:8080/tasks')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        tasks = []
        tasks = data;
        displayTasks()
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
            populateEditUserModal(user); // Populate the edit modal with the selected user's data
            editUserModal.present()
        });

        // Add the card to the container
        container.appendChild(card);
    });
}

let selectedProjectId;

function displayProjects() {
    const container = document.getElementById('projectsContainer');
    container.innerHTML = '';

    projects.forEach(project => {
        const card = document.createElement('ion-card');
        card.dataset.projectId = project.id; // Store the user ID in a data attribute

        const cardHeader = document.createElement('ion-card-header');

        const cardSubtitle = document.createElement('ion-card-subtitle');
        cardSubtitle.textContent = `There are ${project.users.length} users`;

        const cardTitle = document.createElement('ion-card-title');
        cardTitle.textContent = project.name;

        cardHeader.appendChild(cardSubtitle);
        cardHeader.appendChild(cardTitle);

        card.appendChild(cardHeader);

        card.addEventListener('click', function() {
            selectedProjectId = Number(this.dataset.projectId); // Convert the user ID to a number
            const project = projects.find(project => project.id === selectedProjectId);
            editProjectModal.classList.add('active');
            populateEditProjectModal(project); // Populate the edit modal with the selected user's data
            editProjectModal.present()
        });

        // Add the card to the container
        container.appendChild(card);
    });
}
let selectedTaskId
function displayTasks() {
    const container = document.getElementById('tasksContainer');
    container.innerHTML = '';

    tasks.forEach(task => {
        const card = document.createElement('ion-card');
        card.dataset.taskId = task.id; // Store the user ID in a data attribute

        const cardHeader = document.createElement('ion-card-header');

        const cardSubtitle = document.createElement('ion-card-subtitle');
        cardSubtitle.textContent = `This task is for project ${task.project.name}`;

        const cardTitle = document.createElement('ion-card-title');
        cardTitle.textContent = task.name;

        cardHeader.appendChild(cardSubtitle);
        cardHeader.appendChild(cardTitle);

        card.appendChild(cardHeader);

        card.addEventListener('click', function() {
            selectedTaskId = Number(this.dataset.taskId); // Convert the user ID to a number
            const task = tasks.find(task => task.id === selectedTaskId);
            editTaskModal.classList.add('active');
            populateEditTaskModal(task); // Populate the edit modal with the selected user's data
            editTaskModal.present()
        });

        // Add the card to the container
        container.appendChild(card);
    });
}

function populateEditUserModal(user) {
    document.getElementById('user_edit_input_name').value = user.name
    document.getElementById('user_edit_input_surname').value = user.surname
    document.getElementById('user_edit_input_email').value = user.email    
}

function populateEditProjectModal(project) {
    document.getElementById('project_edit_input_name').value = project.name
    selectedUsers = project.users
    selectedEditUsers = project.users.slice()
    updateUsersInEditModal();
}

function populateEditTaskModal(task) {
    document.getElementById('task_edit_input_name').value = task.name;
    document.getElementById('task_edit_input_description').value = task.description;
    document.getElementById('task_edit_input_date').value = task.date;
    console.log(task)
    selectedTaskUserId = task.user.id;
    selectedTaskProjectId = task.project.id;

    const projectListContainer = document.getElementById('task_edit_modal_project_list');
    let projectsHTML = '';
    projects.forEach(project => {
        const isSelected = selectedTaskProjectId === project.id;
        if (isSelected){
            projectsHTML += `
            <ion-item>
                <ion-label>${project.name}</ion-label>
                <ion-button onclick="addProjectToTask(${project.id})">${isSelected ? 'Remove' : 'Add'}</ion-button>
            </ion-item>
        `;
        }
        
    });
    projectListContainer.innerHTML = projectsHTML;

    const usersContainer = document.getElementById('task_edit_modal_user_list');
    let usersHTML = '';
    const selectedProject = projects.find(project => project.id === selectedTaskProjectId);
    selectedProject.users.forEach(user => {
        const isSelected = selectedTaskUserId === user.id;
        if (isSelected){
            usersHTML += `
            <ion-item>
                <ion-label>${user.name}</ion-label>
                <ion-button onclick="addUserToTask(${user.id})">${isSelected ? 'Remove' : 'Add'}</ion-button>
            </ion-item>
        `;
        }
        
    });
    usersContainer.innerHTML = usersHTML;
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
    editProjectModal.dismiss(null, 'cancel');
    addTaskModal.dismiss(null, 'cancel');
    editTaskModal.dismiss(null, 'cancel');
    selectedUserId = -1
    selectedUsers = []
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
let selectedUsers = [];
let selectedEditUsers = [];
function createAddProjectModal() {
    const modalContainer = document.getElementById('add_project_modal');
    modalContainer.innerHTML = ''
    let usersHTML = '';
    users.forEach(user => {
        const isSelected = selectedUsers.includes(user.id);
        usersHTML += `
            <ion-item>
                <ion-label>${user.name} ${user.surname}</ion-label>
                <ion-button onclick="addUserToProject(${user.id})">${isSelected ? 'Remove' : 'Add'}</ion-button>
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
                    <ion-button onclick="addProject()" strong="true">Add project</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content id="project_add_modal_content" class="ion-padding">
            <ion-item>
                <ion-input id="project_add_input_name" label="Enter project name" label-placement="stacked" type="text" placeholder="Project 1"></ion-input>
            </ion-item>
            <div id="project_add_modal_user_list">
                ${usersHTML}
            </div>
        </ion-content>
    </ion-modal>
    `;

    modalContainer.innerHTML = modalHTML;
    addProjectModal = document.getElementById('add_project_modal_w');
}
let editProjectModal;
function createEditProjectModal() {
    const modalContainer = document.getElementById('edit_project_modal');
    modalContainer.innerHTML = ''
    let usersHTML = '';
    users.forEach(user => {
        const isSelected = selectedUsers.includes(user.id);
        usersHTML += `
            <ion-item>
                <ion-label>${user.name} ${user.surname}</ion-label>
                <ion-button onclick="addUserToProject(${user.id})">${isSelected ? 'Remove' : 'Add'}</ion-button>
            </ion-item>
        `;
    });

    const modalHTML = `
        <ion-modal id="edit_project_modal_w" trigger="edit_project_button">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button onclick="cancel()">Cancel</ion-button>
                </ion-buttons>
                <ion-title>Edit Project</ion-title>
                <ion-buttons slot="end">
                    <ion-button onclick="editProject()" strong="true">Save Changes</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content id="project_edit_modal_content" class="ion-padding">
            <ion-item>
                <ion-input id="project_edit_input_name" label="Enter project name" label-placement="stacked" type="text" placeholder="Project 1"></ion-input>
            </ion-item>
            <div id="project_edit_modal_user_list">
                ${usersHTML}
            </div>
        </ion-content>
    </ion-modal>
    `;

    modalContainer.innerHTML = modalHTML;
    editProjectModal = document.getElementById('edit_project_modal_w');
}



function updateUsersInModal() {
    const usersContainer = document.getElementById('project_add_modal_user_list');
    let usersHTML = '';
    users.forEach(user => {
        const isSelected = selectedUsers.some(selectedUser => selectedUser.id === user.id);
        usersHTML += `
            <ion-item>
                <ion-label>${user.name} ${user.surname}</ion-label>
                <ion-button onclick="addUserToProject(${user.id})">${isSelected ? 'Remove' : 'Add'}</ion-button>
            </ion-item>
        `;
    });
    usersContainer.innerHTML = usersHTML;
}

function addUserToProject(userId) {
    const user = users.find(user => user.id === userId);
    const index = selectedUsers.findIndex(selectedUser => selectedUser.id === userId);
    if (index > -1) {
        // User is already selected, remove them from the list
        selectedUsers.splice(index, 1);
    } else {
        // User is not selected, add them to the list
        selectedUsers.push(user);
    }
    console.log(user)
    console.log(selectedEditUsers)
    console.log(selectedUsers)
    // Update the user list in the modal
    updateUsersInModal();
    updateUsersInEditModal();
}

document.getElementById('add_project_button').addEventListener('click',function(){
    createAddProjectModal()
    addProjectModal.classList.add('active');
    addProjectModal.present()
})

function addProject() {
    const projectName = document.getElementById('project_add_input_name').value;

    const data = {
        name: projectName,
        users: selectedUsers
    };

    fetch('http://localhost:8080/projects', {
        method: 'POST',
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
    .then(() => {
        fetchProjects(); // Refresh the project list
        displayProjects();
        cancel();
    })
    .catch(error => {
        console.error('An error occurred:', error);
        presentAlert('An error occurred')
    });
}

async function addUserToProjectDB(projectId, userId) {
    try {
        const response = await fetch(`http://localhost:8080/users/${userId}/projects/${projectId}`, {
            method: 'POST'
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('User added to project:', data);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

function updateUsersInEditModal() {
    const usersContainer = document.getElementById('project_edit_modal_user_list');
    let usersHTML = '';
    users.forEach(user => {
        const isSelected = selectedUsers.some(selectedUser => selectedUser.id === user.id);
        usersHTML += `
            <ion-item>
                <ion-label>${user.name} ${user.surname}</ion-label>
                <ion-button onclick="addUserToProject(${user.id})">${isSelected ? 'Remove' : 'Add'}</ion-button>
            </ion-item>
        `;
    });
    usersContainer.innerHTML = usersHTML;
}

function editProject() {
    const projectName = document.getElementById('project_edit_input_name').value;
    console.log(projectName)
    const data = {
        id: selectedProjectId,
        name: projectName,
        users: selectedUsers,
        tasks: null
    };

    fetch(`http://localhost:8080/projects/${selectedProjectId}`, {
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
    .then(project => {
        console.log('Project created:', project);
        return project
    })
    .then(() => {
        fetchProjects(); // Refresh the project list
        displayProjects();
        cancel();
    })
    .catch(error => {
        console.error('An error occurred:', error);
        presentAlert('An error occurred')
    });
}

let addTaskModal;
let selectedTaskUserId;
let selectedTaskProjectId = -1;
function createAddTaskModal() {
    const modalContainer = document.getElementById('add_task_modal');
    modalContainer.innerHTML = ''
    let projectsHTML = '';
    projects.forEach(project => {
        const isSelected = selectedTaskProjectId === project.id;
        projectsHTML += `
            <ion-item>
                <ion-label>${project.name}</ion-label>
                <ion-button onclick="addProjectToTask(${project.id})">${isSelected ? 'Remove' : 'Add'}</ion-button>
            </ion-item>
        `;
    });

    const modalHTML = `
        <ion-modal id="add_task_modal_w" trigger="add_task_button">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button onclick="cancel()">Cancel</ion-button>
                </ion-buttons>
                <ion-title>Create new task</ion-title>
                <ion-buttons slot="end">
                    <ion-button onclick="addTask()" strong="true">Add task</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content id="task_add_modal_content" class="ion-padding">
            <ion-item>
                <ion-input id="task_add_input_name" label="Enter task name" label-placement="stacked" type="text" placeholder="New task"></ion-input>
            </ion-item>
            <ion-item>
                <ion-input id="task_add_input_description" label="Enter task description" label-placement="stacked" type="text" placeholder="Description of the new task"></ion-input>
            </ion-item>
            <ion-item>
                <ion-datetime-button datetime="datetime"></ion-datetime-button>

                <ion-modal [keepContentsMounted]="true">
                <ng-template>
                    <ion-datetime presentation="date" id="datetime"></ion-datetime>
                </ng-template>
                </ion-modal>
            </ion-item>
            <div id="task_add_modal_project_list">
                <h3>Select project:</h3>
                ${projectsHTML}
            </div>
            <div id="task_add_modal_user_list">
            </div>
        </ion-content>
    </ion-modal>
    `;

    modalContainer.innerHTML = modalHTML;
    addTaskModal = document.getElementById('add_task_modal_w');
}

function addProjectToTask(projectId) {
    const projectListContainer = document.getElementById('task_add_modal_project_list');
    let projectsHTML = '';
    let usersHTML = '';

    if (selectedTaskProjectId === projectId) {
        selectedTaskProjectId = null;
        selectedTaskUserId = null;
        projects.forEach(project => {
            const isSelected = selectedTaskProjectId === project.id;
            projectsHTML += `
                <ion-item>
                    <ion-label>${project.name}</ion-label>
                    <ion-button onclick="addProjectToTask(${project.id})">${isSelected ? 'Remove' : 'Add'}</ion-button>
                </ion-item>
            `;
        });
    } else {
        selectedTaskProjectId = projectId;
        projects.forEach(project => {
            const isSelected = selectedTaskProjectId === project.id;
            if (isSelected){
                projectsHTML += `
                <ion-item>
                    <ion-label>${project.name}</ion-label>
                    <ion-button onclick="addProjectToTask(${project.id})">${isSelected ? 'Remove' : 'Add'}</ion-button>
                </ion-item>
            `;
            
            usersHTML += "<h3>Select user:</h3>"
                project.users.forEach(user => {
                    const isSelectedUser = selectedTaskUserId === user.id;
                    usersHTML += `
                        <ion-item>
                        <ion-label>${user.name} ${user.surname}</ion-label>
                            <ion-button onclick="addUserToTask(${user.id})">${isSelectedUser ? 'Remove' : 'Add'}</ion-button>
                        </ion-item>
                    `;
                });
            }
        });
    }
    console.log(selectedTaskProjectId)
    // Update the project list in the modal
    
    projectListContainer.innerHTML = projectsHTML;
    const usersContainer = document.getElementById('task_add_modal_user_list');
    usersContainer.innerHTML = usersHTML;
}

function addUserToTask(userId) {
    const usersContainer = document.getElementById('task_add_modal_user_list');
    let usersHTML = '';

    if (selectedTaskUserId === userId) {
        selectedTaskUserId = null;
        // Update the user list in the modal
        usersHTML += "<h3>Select user:</h3>"
        const selectedProject = projects.find(project => project.id === selectedTaskProjectId);
        selectedProject.users.forEach(user => {
        const isSelected = selectedTaskUserId === user.id;
        usersHTML += `
        <ion-item>
            <ion-label>${user.name} ${user.surname}</ion-label>
            <ion-button onclick="addUserToTask(${user.id})">${isSelected ? 'Remove' : 'Add'}</ion-button>
        </ion-item>
    `;
        });
    } else {
        selectedTaskUserId = userId;
        // Update the user list in the modal
        const selectedProject = projects.find(project => project.id === selectedTaskProjectId);
        selectedProject.users.forEach(user => {
        const isSelected = selectedTaskUserId === user.id;
        if (isSelected){
            usersHTML += `
            <ion-item>
                 <ion-label>${user.name} ${user.surname}</ion-label>
                <ion-button onclick="addUserToTask(${user.id})">${isSelected ? 'Remove' : 'Add'}</ion-button>
            </ion-item>
        `;
        }
        });
    }
    usersContainer.innerHTML = usersHTML;
}

function addTask(){
    const name = document.getElementById('task_add_input_name').value;
    const description = document.getElementById('task_add_input_description').value;
    const date = new Date(document.getElementById('datetime').value);
    const formattedDate = date.toISOString().slice(0,10);

    const data = {
        name: name,
        description: description,
        date: formattedDate,
        progress: "P",
        user: {
            id: selectedTaskUserId
        },
        project: {
            id: selectedTaskProjectId
        }
    };

    fetch('http://localhost:8080/tasks', {
        method: 'POST',
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
    .then(() => {
        fetchTasks(); // Refresh the task list
        displayTasks();
        cancel();
    })
    .catch(error => {
        console.error('An error occurred:', error);
        presentAlert('An error occurred')
    });
}

document.getElementById('add_task_button').addEventListener('click',function(){
    createAddTaskModal()
    addTaskModal.classList.add('active');
    addTaskModal.present()
})

let editTaskModal
function createEditTaskModal() {
    const modalContainer = document.getElementById('edit_task_modal');
    modalContainer.innerHTML = '';

    const modalHTML = `
        <ion-modal id="edit_task_modal_w" trigger="task-card">
            <ion-header>
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-button onclick="cancel()">Cancel</ion-button>
                    </ion-buttons>
                    <ion-title>Edit Task</ion-title>
                    <ion-buttons slot="end">
                        <ion-button onclick="editTask()" strong="true">Save Changes</ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>
            <ion-content class="ion-padding">
                <ion-item>
                    <ion-input id="task_edit_input_name" label="Enter task name" label-placement="stacked" type="text" placeholder="Task name"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-input id="task_edit_input_description" label="Enter task description" label-placement="stacked" type="text" placeholder="Task description"></ion-input>
                </ion-item>
                <ion-item>
                <ion-datetime-button datetime="datetime"></ion-datetime-button>

                <ion-modal [keepContentsMounted]="true">
                <ng-template>
                    <ion-datetime presentation="date" id="task_edit_input_date"></ion-datetime>
                </ng-template>
                </ion-modal>
                </ion-item>
                <div id="task_edit_modal_user_list">
                </div>
                <div id="task_edit_modal_project_list">
                </div>
            </ion-content>
        </ion-modal>
    `;

    modalContainer.innerHTML = modalHTML;
    editTaskModal = document.getElementById('edit_task_modal_w');
}

fetchUsers()
fetchProjects()
fetchTasks()
createEditUserModal()
createAddUserModal()
createAddProjectModal()
createEditProjectModal()
createAddTaskModal()
createEditTaskModal()