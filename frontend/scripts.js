function cancel() {
    const modal = document.querySelector('ion-modal');
    modal.dismiss();
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