import { useRef, useState } from "react"
import { useAuth } from "../../../services/auth";
import Link from "next/link";

export default function SignUpPage() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const confirmPasswordRef = useRef();
	const [error, setError] = useState();
	const [success, setSuccess] = useState();
	const { signUp } = useAuth()

	async function handleSignUp(e) {
		e.preventDefault();

		if (passwordRef.current.value != confirmPasswordRef.current.value) {
			return setError("Passwords Don't Match"); 
		}

		const response = await signUp(emailRef.current.value, passwordRef.current.value, confirmPasswordRef.current.value)

		if (response.errorMessage) {
			return setError(response.errorMessage)
		}

		setSuccess(response.successMessage)
	}

	return (
		<div>
			<form onSubmit={handleSignUp}>
				{error && <p>{error}</p>}
				{success && <p>{success} <Link href="/auth/login">Click Here To Login</Link></p>}
				<label>Email: </label>
				<input type="email" ref={emailRef} required/>
				<label>Password: </label>
				<input type="password" ref={passwordRef} required/>
				<label>Confirm Password: </label>
				<input type="password" ref={confirmPasswordRef} required/>
				<input type="submit" />
			</form>
		</div>
	)
}
