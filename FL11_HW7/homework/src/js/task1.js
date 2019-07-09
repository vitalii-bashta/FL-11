const minLoginLength = 6;
const minNewPasswordLength = 5;
let login = prompt('Enter your e-mail', '');
let password,
    oldPassword,
    newPassword;
let confirmPasswordChange;
let newPasswordCheck;

if (!login) {
    alert('Canceled')
} else if (login.length < minLoginLength) {
    alert("I don't know any emails having name length less than 6 symbols");
} else if (login === 'user@gmail.com' || login === 'admin@gmail.com') {
    password = prompt('Enter your password');
    if (!password) {
        alert('Canceled');
    } else if (
        login === 'user@gmail.com' && password === 'UserPass' ||
        login === 'admin@gmail.com' && password === 'AdminPass'
    ) {
        confirmPasswordChange = confirm('Do you want to change your password?');
        if (!confirmPasswordChange) {
            alert('You have failed the change.');
        } else {
            oldPassword = prompt('Type in the old password');
            if (!oldPassword) {
                alert('Canceled');
            } else if (oldPassword !== password) {
                alert('Wrong password');
            } else {
                newPassword = prompt('Enter new password');
                if (newPassword.length < minNewPasswordLength) {
                    alert('It’s too short password. Sorry.');
                } else {
                    newPasswordCheck = prompt('Re-enter your new password');
                    if (newPasswordCheck !== newPassword) {
                        alert('You wrote the wrong password.');
                    } else {
                        alert('You have successfully changed your password.');
                    }
                }
            }
        }
    } else {
        alert('Wrong password');
    }
} else {
    alert("I don't know you");
}
