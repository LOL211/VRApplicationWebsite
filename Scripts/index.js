// import { getfiles } from "./test.js";

const firebaseApp = firebase.initializeApp(
{
  apiKey: "AIzaSyCpefYz7bDeQkV1evWvFpuEADfNPvsuABU",
authDomain: "vr-application-29195.firebaseapp.com",
databaseURL: "https://vr-application-29195-default-rtdb.firebaseio.com",
projectId: "vr-application-29195",
storageBucket: "vr-application-29195.appspot.com",
messagingSenderId: "454382693464",
appId: "1:454382693464:web:5b34e12099989ab74dee2d"
});


const auth = firebaseApp.auth();


login_btn = document.getElementById('login_btn')

loginpass = document.getElementById('login_password')
loginemail = document.getElementById('login_email')

loginpass.value="test1234";
loginemail.value="teacher1@gmail.com";


let user;
const getIdToken =()=> user.getIdToken().then((result) => {return result});
const getName = async ()=>{
    fetch("http://localhost:8080/name",
    {
        method:"POST",
        headers: {
        'Accept':"*/*",
        'Content-Type':"application/json",
        'Access-Control-Allow-Origin': '*'
        },
        body:JSON.stringify(
        {"requestType":"NAME",
            "idToken": await getIdToken()
        }
        )
    }).then(response => {
        d = new TextDecoder();
      let read = response['body'].getReader();
      read.read().then(t=>  console.log( d.decode(t.value)));  
      
    });
}

const login = async () => {
  const email = loginemail.value
  const password = loginpass.value;

  //Built in firebase function responsible for authentication
  auth.signInWithEmailAndPassword(email, password)
  .then(async (response) => {
   
    //Signed in successfully
    alert('You\'re successfully signed in !');
    console.log(response["user"]);
    user = response["user"]
    // getName();
  
      const cookies = document.cookie.split(";");
  
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i];
          const eqPos = cookie.indexOf("=");
          const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
  
    document.cookie = "id="+await getIdToken()+"; path=/;";
    document.cookie = "refreshtoken="+user.refreshToken+"; path=/";
    // getfiles();
    // let getfiles = await import("./test.js")
    // getfiles.getfiles();

    window.open("../Html/home.html");
  })
  .catch(error => {
    alert("Unsucessful sign-in!")
    console.log(error)
  })



}





login_btn.addEventListener("click", login)
