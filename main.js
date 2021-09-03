'use strict';
class User {
    constructor(firstName, lastName, email, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}
let User_LIST = [];
const FORM1 = document.forms.f1;
const FORM2 = document.forms.f2;
let submit = false;
let check = 0;
let check1 = 0;
let arrEmail = [];
let userIndex;
let signIn = false;

function resetForm(form, error) {
    form.reset();
    error.style.display = 'none';
    for (let i = 0; i < form.length - 1; i++) {
        form.elements[i].style.cssText = 'border: 2px solid #00000026';
        document.querySelector(`.error${i}`).style.display = 'none';
    }
}

function validation() {
    let firstName = FORM1.firstName.value;
    let lastName = FORM1.lastName.value;
    let email = FORM1.email.value;
    let password = FORM1.password.value;
    let regExpName = /^[a-zA-Z]{2,20}$/;
    let regExpEmail = /^[a-z]+[a-z0-9_.-]*@[a-z]+\.[a-z]+$/;
    let regExpPassword = /^[a-zA-Z0-9]{8,15}$/;
    let validfirstName = regExpName.test(firstName);
    let validlastName = regExpName.test(lastName);
    let validEmail = regExpEmail.test(email);
    let validPassword = regExpPassword.test(password);
    let arr1 = [];
    arr1.push(FORM1.firstName, FORM1.lastName, FORM1.email, FORM1.password);
    let errclose = [];
    errclose.push(validfirstName, validlastName, validEmail, validPassword);

    let error = {
        firstName: validfirstName,
        lastName: validlastName,
        email: validEmail,
        password: validPassword,
    }
    let keyfalse = Object.keys(error).filter(key => error[key] === false);
    let keytrue = Object.keys(error).filter(key => error[key] === true);

    keyfalse.forEach(elem => {
        document.querySelector(`#${elem}`).style.cssText = 'border: 2px solid #cd1d3ee8;'
        document.querySelector(`#${elem}`).classList.add('red');
        document.querySelector(`#${elem}`).classList.remove('green', 'greenShadow');
    });
    keytrue.forEach(elem => {
        document.querySelector(`#${elem}`).style.cssText = 'border: 2px solid #22c722;'
        document.querySelector(`#${elem}`).classList.add('green');
        document.querySelector(`#${elem}`).classList.remove('red', 'redShadow');
    });

    function localSt() {
        let user = new User(firstName, lastName, email, password);
        arr1.forEach((elem, index) => {
            document.querySelector(`.correct${index}`).style.display = 'none';
            elem.style.border = 'none';
        });
        FORM1.reset();

        if (localStorage.length > 0 && localStorage.getItem('users')) {
            User_LIST = JSON.parse(localStorage.getItem('users'));
        }

        User_LIST.push(user);
        localStorage.setItem('users', JSON.stringify(User_LIST));
        submit = false;
        check = 0;

    }


    for (let i = 0; i < errclose.length; i++) {
        if (errclose[i] == false) {
            document.querySelector(`.error${i}`).style.display = 'block';
            document.querySelector(`.correct${i}`).style.display = 'none';
        }
        if (errclose[i] == true) {
            document.querySelector(`.correct${i}`).style.display = 'block';
            document.querySelector(`.error${i}`).style.display = 'none';
            document.querySelector(`.email`).style.display = 'none';

            if (arrEmail.includes(email) == false && validEmail == true) {
                FORM1.email.style.cssText = 'border: 2px solid #22c722;';
                document.querySelector(`.error2`).style.display = 'none';
                document.querySelector(`.correct2`).style.display = 'block';
                document.querySelector(`.email`).style.display = 'none';

            }
        }
        if (arrEmail.includes(email) == true) {
            FORM1.email.style.cssText = 'border: 2px solid #cd1d3ee8;';
            document.querySelector(`.error2`).style.display = 'block';
            document.querySelector(`.correct2`).style.display = 'none';
            document.querySelector(`.email`).style.display = 'block';
        }
    }
    if (keyfalse.length >= 1) {
        check = 1;
    }
    if (check == 1) {
        if (keytrue.length == 4) {
            submit = false;
        }
    }
    if (keytrue.length == 4 && submit == true && check !== 1) {
        if (arrEmail.includes(email) == false) {
            localSt()
            arr1.forEach(elem => {
                elem.style.cssText = 'border: 2px solid #00000026'
            })
            submit = false;
        }
    }

}
FORM1.addEventListener('submit', function (event) {
    event.preventDefault();
    check = 0;
    submit = true;
    validation();
    getEmail();

})
for (let i = 0; i < FORM1.length - 1; i++) {
    function input(event) {
        FORM1.elements[i].addEventListener(event, function () {
            if (FORM1.elements[i].classList.contains('red')) {
                FORM1.elements[i].classList.add('redShadow');
                FORM1.elements[i].classList.remove('greenShadow', 'green');
            }
            if (FORM1.elements[i].classList.contains('green')) {
                FORM1.elements[i].classList.add('greenShadow');
                FORM1.elements[i].classList.remove('redShadow', 'red');
            }
        })

    }
    FORM1.addEventListener('input', function () {
        if (check == 1) {
            validation();
        }
        getEmail();
    })

    function blur(event) {
        FORM1.elements[i].addEventListener(event, function () {
            FORM1.elements[i].classList.remove('red', 'green', 'redShadow', 'greenShadow');
        })
    }
    input('input');
    blur('blur');
}

function getEmail() {
    if (localStorage.length > 0 && localStorage.getItem('users')) {
        let userN = JSON.parse(localStorage.getItem('users'));
        userN.forEach(function (item) {
            arrEmail.push(item.email);
        })
    }
}

let linkSignIn = document.querySelector('.link-signIn');
let linkSignUp = document.querySelector('.link-signUp');

function displayBlock(displayB, displayN) {
    document.querySelector(displayN).style.display = 'none';
    document.querySelector(displayB).style.display = 'block';
}
linkSignIn.addEventListener('click', function () {
    displayBlock('#block2', '#block1');
    resetForm(FORM2, document.querySelector('.errorEmpty'));
})
linkSignUp.addEventListener('click', function () {
    displayBlock('#block1', '#block2');
    resetForm(FORM1, document.querySelector('.errorEmpty'));
})

let userArr = []
class UserInfo {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}

function getUser() {
    if (localStorage.length > 0 && localStorage.getItem('users')) {
        let users = JSON.parse(localStorage.getItem('users'));
        users.forEach(function (item) {
            let user = new UserInfo(item.email, item.password);
            userArr.push(user);
        })
    }
}

document.querySelector('#btnProfile').addEventListener('click', function () {
    displayBlock('#block2', '#profile');
})

FORM2.addEventListener('submit', function (event) {
    event.preventDefault();
    let arr = [];
    let check;
    signIn = true;
    let emailUs = FORM2.email.value;
    let passwordUs = FORM2.password.value;
    let uSignIn = new UserInfo(emailUs, passwordUs);
    arr.push(uSignIn);
    getUser()

    function deepEqual(obj1, obj2) {
        check = JSON.stringify(obj1) === JSON.stringify(obj2);
        userIndex = userArr.indexOf(obj1);
        return check;
    }

    function getName() {

        if (localStorage.length > 0 && localStorage.getItem('users')) {
            let userN = JSON.parse(localStorage.getItem('users'));
            let firstName = userN[userIndex].firstName;
            let lastName = userN[userIndex].lastName;
            return `${firstName} ${lastName}`
        }
    }
    let result = userArr.some(user => deepEqual(user, uSignIn) == true);
    if (check == true) {
        document.querySelector('#block2').style.display = 'none';
        document.querySelector('#profile').style.display = 'block';
        FORM2.reset();
        document.querySelector('.errorSignIn').style.display = 'none';
        document.querySelector('#user-email').textContent = emailUs;
        document.querySelector('#first-last_name').textContent = getName();
    }
    if (check == false) {
        document.querySelector('.errorSignIn').style.display = 'block';
    }
    if (localStorage.length == 0 && signIn == true) {
        document.querySelector('.errorEmpty').style.display = 'block';
        document.querySelector('.errorSignIn').style.display = 'none';
        document.querySelector('.email').style.display = 'none';
    }

})
document.querySelector('#btnProfile').addEventListener('click', function () {
    displayBlock('#block2', '#profile');
})