import { initializeApp } from "firebase/app";
import {getFirestore, collection, getDocs} from 'firebase/firestore'
import 'dotenv/config'

console.log('Start du programme v1 !');

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getFactures = async (db) => {
    const facturesCol = collection(db, 'factures');
    const facturesSnapshot = await getDocs(facturesCol);
    const factures = facturesSnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
    return factures;
}

const afficheFactures = (factures) => {
    const rootE1 = document.querySelector('#root');
    const ulE1 = document.createElement('ul');
    factures.map(factures => {
        const liE1 = document.createElement("li");
        liE1.innerHTML = facture.id + " <button classe='deleteFacture' data-id="+facture.id">x<button>";
        ulE1/appendChild(liE1);
    });

    const buttonsDelete = document.querySelectorAll('.deleteFacture');
    buttonsDelete.forEach(button => {
        button.addEventListener('', () => {
            console.log("click");
            console.log(event.target.getAttribute('data-id'));
        });
    });

    rootE1.appendChild(ulE1);
}

const factures = await getFactures(db)
