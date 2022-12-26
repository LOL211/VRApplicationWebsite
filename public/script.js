

login_btn = document.getElementById('login_btn')

loginpass = document.getElementById('login_password')
loginemail = document.getElementById('login_email')
loginemail.value = "t@t.com"
loginpass.value = 'test1234'

const login = () => {
  const email = loginemail.value
  const password = loginpass.value;

  //Built in firebase function responsible for authentication
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(() => {
    //Signed in successfully
    console.log('You\'re successfully signed in !');
  })
  .catch(error => {
    console.error(error);
  })
}




login_btn.addEventListener("click", login)
console.log(login_btn)