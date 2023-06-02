import { FirebaseApp, initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyCpgB6L4njthJJN0oXLM-UdmbNvfk9Pwzg',
  authDomain: 'unsoed-fair.firebaseapp.com',
  projectId: 'unsoed-fair',
  storageBucket: 'unsoed-fair.appspot.com',
  messagingSenderId: '15737198058',
  appId: '1:15737198058:web:af4ffeac70aced10ccce93',
}

const app = initializeApp(firebaseConfig)
export default app
