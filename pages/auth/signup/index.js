import { useRef, useState } from "react";
import Link from "next/link";
import { signUp } from "../../../services/auth";

export default function SignUpPage() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const [loading, setLoading] = useState(false);

    async function handleSignUp(e) {
        e.preventDefault();

        setLoading(true);
        setError();
        setSuccess();

        if (passwordRef.current.value != confirmPasswordRef.current.value) {
            return setError("Passwords Don't Match");
        }

        const response = await signUp(
            emailRef.current.value,
            passwordRef.current.value,
            confirmPasswordRef.current.value,
        );

        if (response.errorMessage) {
            setLoading(false);
            return setError(response.errorMessage);
        }

        setSuccess(response.successMessage);
    }

    return (
        <div className="flex flex-col justify-center items-center text-center bg-stone-100 w-full h-screen">
            <form
                className="flex flex-col gap-5 wide:w-1/2 desktop:w-3/4 mobile:w-11/12 border p-10 rounded-xl shadow-lg bg-white"
                onSubmit={handleSignUp}
            >
                <h1 className="text-5xl font-bold mb-4 antialiased">Signup</h1>
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
                <input
                    type="email"
                    className="border border-black rounded p-1"
                    ref={emailRef}
                    required
                />
                <label className="text-2xl">
                    Password <span className="text-red-400">*</span>
                </label>
                <input
                    type="password"
                    className="border border-black rounded p-1"
                    ref={passwordRef}
                    required
                />
                <input
                    className="bg-green-400 w-full p-5 text-xl text-white font-bold rounded-sm"
                    type="submit"
                    value={loading ? "..." : "Signup"}
                />
            </form>
        </div>
    );
}
