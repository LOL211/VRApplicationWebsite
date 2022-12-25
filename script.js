login_btn = document.getElementById('login_btn')

loginpass = document.getElementById('login_password')
loginemail = document.getElementById('login_email')


login_btn.addEventListener("click", () =>{
    // let xmlHttp = new XMLHttpRequest();
    let url  = new URL("http://localhost:8080/app/login")
  
    url.searchParams.append('email', loginemail.value);
    url.searchParams.append('password', loginpass.value);
    // xmlHttp.open( "GET", url, false ); // false for synchronous request
    // xmlHttp.setRequestHeader("Access-Control-Allow-Origin","*")
    // xmlHttp.send( );
    // console.log("send")
    fetch(url).then(response=>{
        return response.json();
    })
   
   
});  
console.log(login_btn)