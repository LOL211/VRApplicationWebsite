

import { getStorage, ref, listAll , list} from" https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js"
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'


const firebaseApp = initializeApp(
    {
      apiKey: "AIzaSyCpefYz7bDeQkV1evWvFpuEADfNPvsuABU",
    authDomain: "vr-application-29195.firebaseapp.com",
    databaseURL: "https://vr-application-29195-default-rtdb.firebaseio.com",
    projectId: "vr-application-29195",
    storageBucket: "vr-application-29195.appspot.com",
    messagingSenderId: "454382693464",
    appId: "1:454382693464:web:5b34e12099989ab74dee2d"
    });
    

export async function getfiles(){
   
        const storage = getStorage();
        const listRef=ref(storage, '/CS2204');
        const firstPage = await list(listRef, { maxResults: 100 });
    console.log(firstPage.items);
      
}






      


