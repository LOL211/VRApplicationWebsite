const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCpefYz7bDeQkV1evWvFpuEADfNPvsuABU",
  authDomain: "vr-application-29195.firebaseapp.com",
  databaseURL: "https://vr-application-29195-default-rtdb.firebaseio.com",
  projectId: "vr-application-29195",
  storageBucket: "vr-application-29195.appspot.com",
  messagingSenderId: "454382693464",
  appId: "1:454382693464:web:5b34e12099989ab74dee2d"
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();


login_btn = document.getElementById('login_btn')

loginpass = document.getElementById('login_password')
loginemail = document.getElementById('login_email')
loginemail.value = "t@t.com"
loginpass.value = 'test1234'

const login = () => {
  const email = loginemail.value
  const password = loginpass.value;

  //Built in firebase function responsible for authentication
  auth.signInWithEmailAndPassword(email, password)
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