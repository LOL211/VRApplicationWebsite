

let createlinks;
let createhome;

let response;
let setupmod;

let classsname = getParameterByName("class");

let storagefile;
let teacher= false;
let verify = false;


function setup(response)
{  
  let courselist = JSON.parse(response.courses);
  // console.log(courselist);
  
  
  let linklist = document.getElementById("links");
  courselist.forEach(element=>{
    linklist.appendChild(createlinks(element.CourseName));
  });
  linklist.appendChild(createhome())

  document.getElementById("classtitle").innerHTML+= classsname;
  document.getElementById("title").innerHTML+=response.name;

  getfiles(classsname);


}

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


async function getfiles(cname){

  console.log(verify);
  if(verify !="true")
 {
  document.getElementById("bodydiv").innerHTML="<p> Sorry you don't have permission to view this class</p>"
  return;
 }



  storagefile = await import("https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js")
  const storage = storagefile.getStorage(setupmod.firebaseApp);
  const listRef= storagefile.ref(storage, '/'+cname);
  
  storagefile.listAll(listRef)
  .then((res) => {
    res.prefixes.forEach((folderRef) => {
    });
    res.items.forEach((itemRef) => {
      storagefile.getMetadata(itemRef)
      .then((metadata) => {

        let date = new Date(metadata.timeCreated);
        const options = {year: 'numeric', month: 'long', day: 'numeric' };

       let fileinfo ={
        filename: metadata.name,
        filesize: metadata.size,
        filedate:  date.toLocaleDateString(undefined, options)
       }
      document.getElementsByClassName("table")[0].appendChild(createrow(fileinfo, itemRef));
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
    });
  }).catch((error) => {
    // Uh-oh, an error occurred!
  });

  let heading = document.getElementById("heading");




}

async function downloadfile(fileref)
{
  console.log("got here");
  let allblobs = await storagefile.getBlob(fileref);
  console.log(allblobs);
  let saveBlob = (function () {
    let a = document.createElement("a");
    a.style = "display: none";
    return function (blob, fileName) {
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());
  
saveBlob(allblobs, fileref.name);

}

async function uploadfiles(file){
const storage = getStorage();
const listRef=ref(storage, '/CS2204/'+file.name);
uploadBytes(listRef, file).then((snapshot) => {
console.log('Uploaded a blob or file!');
});


}

function createrow(fileinfo, item)
{
  let row = document.createElement("tr");
  let filename = document.createElement("td");
  filename.innerHTML=fileinfo.filename;
  let filedate = document.createElement("td");
  filedate.innerHTML = fileinfo.filedate;
  let filesize= document.createElement("td");
  filesize.innerHTML = fileinfo.filesize;
  row.appendChild(filename);
  row.appendChild(filedate);
  row.appendChild(filesize);
  console.log(fileinfo.filedate);

  row.onclick= 
  ()=>{
  
    downloadfile(item);
  };

  return row;
}

async function loadresources() {
  setupmod= await import("./setup.js");

  verify = await setupmod.verifymemebership(classsname)
  console.log(verify);
  

  response = setupmod.makeCourseRequest();
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
    setupmod.setlogoutbutton();
 
}
loadresources();