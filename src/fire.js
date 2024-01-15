//* Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics'
import firebase from 'firebase/compat/app'
import 'firebase/compat/app'
import 'firebase/compat/auth'
// TODO: Add SDKs for Firebase products that you want to use
//* https://firebase.google.com/docs/web/setup#available-libraries

//* Your web app's Firebase configuration
//* For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyA1Cx4J5FW8BUZ26a4FdfToEkoL7gWhgiw',
	authDomain: 'kujimeow.firebaseapp.com',
	projectId: 'kujimeow',
	storageBucket: 'kujimeow.appspot.com',
	messagingSenderId: '73480158082',
	appId: '1:73480158082:web:49f5a356d9ce7c50296d9b',
	measurementId: 'G-2C73G0WCPV',
}

//* Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig)
const analytics = getAnalytics(fire)
export default fire
