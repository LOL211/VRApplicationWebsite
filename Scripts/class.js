let createlinks;
let createhome;
function setup(response)
{  
  let courselist = JSON.parse(response.courses);
  console.log(courselist);
  
  let bodyy = document.getElementsByClassName("parent")[0]
  let linklist = document.getElementById("links");
  courselist.forEach(element=>{
    
    linklist.appendChild(createlinks(element.CourseName));
    
  });
  linklist.appendChild(createhome())

  document.getElementById("classtitle").innerHTML+=getParameterByName("class");
  
  document.getElementById("title").innerHTML+=response.name;
}

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

  
let response;
let setupmod;

async function loadresources() {
  setupmod= await import("./setup.js");
  response = setupmod.makerequest();
  createlinks = setupmod.createlinks;
  createhome = setupmod.createhome;
  while(true)
  {
    try{
      setupmod.getCourses(setup, response);
      break;
    }
    catch(error)
    {

    }
  }
 
}