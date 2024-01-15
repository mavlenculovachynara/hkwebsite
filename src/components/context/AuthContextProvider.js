import React, { createContext, useContext, useEffect, useState } from 'react'
import fire from '../../fire'
import { useNavigate } from 'react-router-dom'
export const authContext = createContext()
export const useAuth = () => useContext(authContext)
const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [emailError, setEmailError] = useState('')
	const [passwordError, setPasswordError] = useState('')
	const [hasAccount, setHasAccount] = useState('')
	const navigate = useNavigate()
	const clearInputs = () => {
		setEmail('')
		setPassword('')
	}
	const clearError = () => {
		setEmailError('')
		setPasswordError('')
	}
	const handleRegister = () => {
		clearError()
		fire
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.catch(err => {
				switch (err.code) {
					case 'auth/email-already-in-use':
					case 'auth/invalid-email':
						setEmailError(err.message)
						break
					case 'auth/weak-password':
						setPasswordError(err.message)
						break
					default:
						break
				}
			})
	}

	const handleLogin = () => {
		clearError()
		fire
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => navigate('/'))
			.catch(err => {
				switch (err.code) {
					case 'auth/user-disabled':
					case 'auth/invalid-email':
					case 'auth/user-not-found':
						setEmailError(err.message)
						break
					case 'auth/wrong-password':
						setPasswordError(err.message)
						break
					default:
						break
				}
			})
	}
	const handleLogout = () => {
		fire.auth().signOut()
	}
	const authListener = () => {
		fire.auth().onAuthStateChanged(user => {
			if (user) {
				clearInputs()
				setUser(user)
			}
		})
	}
	useEffect(() => {
		authListener()
	}, [])

	return (
		<authContext.Provider
			value={{
				user,
				email,
				password,
				emailError,
				passwordError,
				handleRegister,
				handleLogin,
				handleLogout,
				setEmail,
				setPassword,
				hasAccount,
				setHasAccount,
			}}
		>
			{children}
		</authContext.Provider>
	)
}

export default AuthContextProvider
