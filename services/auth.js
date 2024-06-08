import { createContext, useContext, useState, useEffect } from "react";
import db from "./pdb";

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	async function signUp(email, password, confirmPassword) {
		try {
			await db.collection('users').create({
				email: email,
				password: password,
				passwordConfirm: confirmPassword
			})

			await db.collection('users').requestVerification(email);

			return { successMessage: "Signed Up Successfully, Check Email To Finish Registration" } 
		} catch (error) {
			return { errorMessage: `Couldn't Sign Up: ${error}` }
		}
	}

	async function signIn(email, password) {
		try {
			await db.collection('users').authWithPassword(email, password);

			return { successMessage: "Logged In Successfully" } 
		} catch (error) {
			return { errorMessage: `Couldn't Login: ${error}` }
		}
	}

	function logout() {
		try {
			db.authStore.clear();

			return { successMessage: "Logged Out Successfully" } 
		} catch (error) {
			return { errorMessage: `Couldn't Logout: ${error}` }
		}
	}

	function getUser() {
		return db.authStore.model
	}

	return (
		<AuthContext.Provider value={{ signUp, signIn, logout, getUser }}>
			{children}
		</AuthContext.Provider>
	)
}

