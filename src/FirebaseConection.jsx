import { initializeApp } from 'firebase/app'
import { getFirestore, getDocs, collection } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { onAuthStateChanged } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyDQ8e2Ce28udLKipKU7zMsHWbdqkScXF5k",
    authDomain: "planner-3789b.firebaseapp.com",
    projectId: "planner-3789b",
    storageBucket: "planner-3789b.appspot.com",
    messagingSenderId: "754978462454",
    appId: "1:754978462454:web:a6586c5ffb614540a7aad7",
    measurementId: "G-HDGNTD6NDN"
  };

  const firebaseApp = initializeApp(firebaseConfig)

  const db = getFirestore(firebaseApp)
  const auth = getAuth(firebaseApp)

  export { db, auth, userId }

  const loggedUser = getAuth();
let userId = null;

onAuthStateChanged(loggedUser, (user) => {
  if (user) {
    userId = user.uid;
    
    callback(userId);
  } else {
    console.log("Nenhum usuário logado");
  }
});


  export const dados = async () => {
    const cityname = collection(db, "usuario");
    const dc = await getDocs(cityname);
  
    const cep = [];
    dc.forEach((busca) => {
      const usersDados = busca.data();
      if (usersDados.city && usersDados.country) {
        cep.push({ city: usersDados.city, country: usersDados.country });
      }
    });
    return cep;
  };

  function callback(userId) {
    console.log("User ID:", userId);
  }