import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { adminSignIn } from "../../../services/auth";
import Link from "next/link";

export default function AdminLoginPage() {
    const router = useRouter();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    async function handleLogin(e) {
        e.preventDefault();

        setLoading(true);
        const response = await adminSignIn(
            emailRef.current.value,
            passwordRef.current.value,
        );
        if (response.errorMessage) {
            setLoading(false);
            return setError(response.errorMessage);
        }

        router.replace("/management");
    }

    return (
        <div className="flex flex-col justify-center items-center text-center bg-stone-100 w-full h-screen">
            <form
                onSubmit={handleLogin}
                className="flex flex-col gap-5 wide:w-1/2 desktop:w-3/4 mobile:w-11/12 border p-10 rounded-xl shadow-lg bg-white"
            >
                <h1 className="text-5xl font-bold mb-4 antialiased">
                    Admin Login
                </h1>
                <hr className="mb-6 border-grey" />
                {error && (
                    <p className="block w-11/12 m-auto text-xl text-red-900 p-6 bg-red-200 border border-black rounded">
                        {error}
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
                    value={loading ? "..." : "Login"}
                />
            </form>
            <Link
                href="/auth/login"
                className="p-3 bg-white border-black mt-3 shadow rounded"
            >
                User Login
            </Link>
        </div>
    );
}
