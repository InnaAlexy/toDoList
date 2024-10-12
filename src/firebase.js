import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyAMT8-SOaPsyXQ-oIwF4EqL503VYKfq0Ik',
	authDomain: 'todos-e1032.firebaseapp.com',
	projectId: 'todos-e1032',
	storageBucket: 'todos-e1032.appspot.com',
	messagingSenderId: '258341222544',
	appId: '1:258341222544:web:e9a609416264b5c5614015',
	databaseURL: 'https://todos-e1032-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
