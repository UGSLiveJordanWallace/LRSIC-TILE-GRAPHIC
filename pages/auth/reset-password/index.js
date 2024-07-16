import Link from "next/link";
import { useState, useRef } from "react"
import { requestPasswordReset } from "../../../services/auth";

export default function ResetPasswordPage() {
	const emailRef = useRef();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();
	const [success, setSuccess] = useState();

	async function handleRequest(e) {
		e.preventDefault()

		setLoading(true);
		setError();
		setSuccess();
		if (emailRef.current.value === "") {
			setError("Email Field Empty");
			return
		}

		const response = await requestPasswordReset(emailRef.current.value);
		if (response.errorMessage) {
			setError(response.errorMessage)
			setLoading(false)
			return
		}

		setSuccess(response.successMessage);
		console.log(response)
		setLoading(false)
	}

	return (
		<div className="flex flex-col justify-center text-center items-center h-screen bg-stone-100">
			<form className="flex flex-col gap-5 wide:w-1/2 desktop:w-3/4 mobile:w-11/12 border p-10 rounded-xl shadow-lg bg-white" onSubmit={handleRequest}>
				<h2 className="text-5xl font-bold mb-4 antialiased">Reset Password</h2>
                {error && (
                    <p className="block w-11/12 m-auto text-xl text-red-900 p-6 bg-red-200 border border-black rounded">
                        {error}
                    </p>
                )}
                {success && (
                    <p className="block w-11/12 m-auto text-xl text-green-900 p-6 bg-green-200 border border-black rounded">
                        {success}{" "}
                        <Link
                            href="/auth/login"
                            className="font-bold text-blue-600 text-underline"
                        >
                            Click Here To Login
                        </Link>
                    </p>
                )}
                <label className="text-2xl">
                    Email <span className="text-red-400">*</span>
                </label>
				<input name="email" type="email" className="border border-black p-1" ref={emailRef}/>
				<input name="submit" type="submit" value={loading ? "..." : "Request"} className="bg-stone-200 w-full p-5 text-xl text-black font-bold rounded-sm"/>
			</form>			
		</div>
	)
}
