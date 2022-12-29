const firebaseApp = firebase.initializeApp(
    {apiKey: "AIzaSyCpefYz7bDeQkV1evWvFpuEADfNPvsuABU",
  authDomain: "vr-application-29195.firebaseapp.com",
  databaseURL: "https://vr-application-29195-default-rtdb.firebaseio.com",
  projectId: "vr-application-29195",
  storageBucket: "vr-application-29195.appspot.com",
  messagingSenderId: "454382693464",
  appId: "1:454382693464:web:5b34e12099989ab74dee2d"});
  
  const getCourses = async ()=>{
    
 
    fetch("http://localhost:8080/home",
    {
        method:"POST",
        headers: {
        'Accept':"*/*",
        'Content-Type':"application/json",
        'Access-Control-Allow-Origin': '*'
        },
        body:JSON.stringify(
        {"requestType":"HOME",
            "idToken": getCookie("id")
        }
        )
    }).then(response => {
        if(response==null) console.log("No response");
        textDecoder = new TextDecoder();
      let read = response['body'].getReader();
      read.read().then(text=>  {
        
        let jsonResponse = JSON.parse(textDecoder.decode(text.value));
       setup(jsonResponse)
        })  
      
    });
}

function setup(response)
{
  
  let courselist = JSON.parse(response.courses);
  console.log(courselist);
  
  let bodyy = document.getElementsByClassName("parent")[0]
  let linklist = document.getElementById("links");
  courselist.forEach(element=>{
    console.log(bodyy);
    linklist.appendChild(createlinks(element.CourseName));
    bodyy.appendChild(createcourse(element.CourseName, element.Teacher));
    
  });

  document.getElementById("title").innerHTML+=response.name;
}




function createcourse(coursename, teacher){
  let child = document.createElement("div");
  child.setAttribute("class", "child");
  child.innerHTML="<p>"+coursename+"<br><span class=\"details\">Teacher: "+teacher+"</span>";
  return child;
}

function createlinks(course)
{
  let child = document.createElement("li");
  child.innerHTML = "<a>"+course+"</a>";
  return child;
}




function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

getCourses();