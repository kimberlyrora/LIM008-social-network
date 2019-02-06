import { changeTmp } from './app.js';


export const changeHash = (hash) => {
  location.hash = hash;
  changeTmp(location.hash);
};

export const authenticateGoogleAccount = () => 
  firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider().addScope('https://www.googleapis.com/auth/plus.login'));

export const createUserWithEmailAndPassword = (email, password) =>
  firebase.auth().createUserWithEmailAndPassword(email, password);

export const authenticateEmailAndPassword = (email, password) => 
  firebase.auth().signInWithEmailAndPassword(email, password);

export const authenticateFacebookAccount = () => 
  firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider().addScope('public_profile')); 

export const closeSesion = () => firebase.auth().signOut();

export const initRouter = () => {
  window.addEventListener('load', changeTmp(window.location.hash));
  if (('onhashchange' in window)) window.onhashchange = () => changeTmp(window.location.hash);
};

export const savePublication = (name, text, type) => 
  firebase.firestore().collection('Posts').add({
    uid: name, 
    text: text,
    public: type, 
    date: firebase.firestore.FieldValue.serverTimestamp()
  });

const itemNote = (objNote) => {
  const liElement = document.createElement('li');
  liElement.innerHTML = `
    <div class="row">
      <div class="col-12 col-s-12"><div>
        <span>${objNote.text}</span>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-s-12">
        <div class="col-2 col-s-2">
          <button type = "button" id = "btnLogIn"  class="type logIn border">Editar</button>
        </div>
        <div class="col-2 col-s-2">
          <button type = "button" id = "btnLogIn"  class="type logIn border">Eliminar</button>
        </div>
        <div class="col-2 col-s-2">
        </div>
        <div class="col-2 col-s-2">
        </div>
        <div class="col-2">
        </div>
        <div class="col-2">
        </div>
      </div>
    </div>
    `;
  return liElement;
};


export const consultPost = () => {
  firebase.firestore()
    .collection('Posts')
    .orderBy('date', 'desc')
    .onSnapshot(querySnapshot => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
        
      data.forEach((element) => {
        const ul = document.querySelector('#notes-list');
        ul.appendChild(itemNote(element));
      });
    });
};