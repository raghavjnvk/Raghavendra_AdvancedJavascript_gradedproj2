let authData = JSON.parse( localStorage.getItem('resume-auth-data') );
if( authData != null && authData.status == true ) {
    location.href = '/';
    exit;
}

const switcher = document.querySelector("#switch");
const errorMsg = document.querySelector('.error');

const signinForm = document.querySelector("#signin-form");
const signupForm = document.querySelector("#signup-form");

const formSignup = document.querySelector('#formSignup');
const formSignin = document.querySelector('#formSignin');
const keepLoggedIn = document.querySelector("#keepLoggedIn");
if( authData == null ) {
    keepLoggedIn.checked = false;
} else {
    keepLoggedIn.checked = authData.save;
}

switcher.addEventListener( 'click', () => {
    if( switcher.checked == true ) {
        signinForm.style.left = '-100%';
        signinForm.style.opacity = 0;
        signinForm.style.visibility = 'hidden';

        signupForm.style.left = 0;
        signupForm.style.opacity = 1;
        signupForm.style.visibility = 'visible';
    } else {
        signupForm.style.left = '100%';
        signupForm.style.opacity = 0;
        signupForm.style.visibility = 'hidden';

        signinForm.style.left = '0';
        signinForm.style.opacity = 1;
        signinForm.style.visibility = 'visible';
    }
    errorMsg.textContent = '';
} );

formSignup.addEventListener( 'submit', event => {
    event.preventDefault();

    if ( authData != null ) {
        errorMsg.textContent = 'More than one sign up not allowed';
        formSignup.reset();
        return;
    }
    const usernameSignup = document.querySelector("#username-signup");
    const passwordSignup = document.querySelector("#password-signup");
    const passwordConfirm = document.querySelector("#password-confirm");
    const acceptance = document.querySelector("#acceptance");
    if( 
        usernameSignup.value != '' && 
        passwordSignup.value != '' && 
        passwordConfirm.value != '' && 
        passwordSignup.value == passwordConfirm.value &&
        acceptance.checked == true
    ) {
        authData = {
            username: usernameSignup.value,
            password: passwordSignup.value,
            status: false,
            save: false
        }
        localStorage.setItem('resume-auth-data', JSON.stringify( authData ) );
        errorMsg.textContent = 'Success! Sign in to use the app.';
        formSignup.reset();
    } else {
        errorMsg.textContent = 'Please enter the form details correctly';
    }
} );

formSignin.addEventListener( 'submit', event => {
    event.preventDefault();
    const usernameSignin = document.querySelector("#username-signin");
    const passwordSignin = document.querySelector("#password-signin");
    if( authData == null ) {
        errorMsg.innerHTML = 'No user found<br/>Sign up to use this app';
        formSignin.reset();
        return;
    }
    if(
        usernameSignin.value != '' && 
        passwordSignin.value != '' && 
        usernameSignin.value == authData.username &&
        passwordSignin.value == authData.password
    ) {
        authData.status = true;
        authData.save = keepLoggedIn.checked ? true : false;
        localStorage.setItem('resume-auth-data', JSON.stringify( authData ) );
        location.href = '/';
    } else {
        errorMsg.textContent = 'Invalid username/password';
    }
} );

const showPassword = () => {
    if( authData == null ) {
        errorMsg.innerHTML = 'No user found<br/>Sign up to use this app';
    } else {
        errorMsg.innerHTML = `Username = ${authData.username} <br/> Password = ${authData.password}`;
    }
};

