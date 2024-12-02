import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDlYQQ502DzaJfdZQU4-Uw5m94tF5KYWBc',
  authDomain: 'student-assistance-chatbot.firebaseapp.com',
  projectId: 'student-assistance-chatbot',
  storageBucket: 'student-assistance-chatbot.firebasestorage.app',
  messagingSenderId: '580188102556',
  appId: '1:580188102556:web:f3b221ec0222495786b259',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
