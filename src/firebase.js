import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCXObj0RLkc__DGqtixczsWfTjhit1g2Pk',
  authDomain: 'conversations-2af9b.firebaseapp.com',
  databaseURL: 'https://conversations-2af9b.firebaseio.com',
  projectId: 'conversations-2af9b'
};

const firebaseApp = firebase.initializeApp(config);

export const database = firebaseApp.database();

export const auth = firebaseApp.auth();

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export default firebaseApp;
