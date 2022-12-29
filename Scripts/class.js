function setup(response)
{  
  let courselist = JSON.parse(response.courses);
  console.log(courselist);
  
  let bodyy = document.getElementsByClassName("parent")[0]
  let linklist = document.getElementById("links");
  courselist.forEach(element=>{
    console.log(bodyy);
    linklist.appendChild(createlinks(element.CourseName));
        
  });

  document.getElementById("title").innerHTML+=response.name;
}


  window.onload = async ()=>{
    let setupmod = await import("./setup.js")
    createlinks = setupmod.createlinks;
    setupmod.getCourses(setup)
    
  }
  