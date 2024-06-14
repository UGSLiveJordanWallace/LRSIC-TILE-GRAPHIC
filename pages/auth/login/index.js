import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "../../../services/auth";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState();

    async function handleLogin(e) {
        e.preventDefault();

        const response = await signIn(
            emailRef.current.value,
            passwordRef.current.value,
        );
        if (response.errorMessage) {
            return setError(response.errorMessage);
        }

        router.push("/control-panel");
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                {error && <p>{error}</p>}
                <label>Email: </label>
                <input type="email" ref={emailRef} required />
                <label>Password: </label>
                <input type="password" ref={passwordRef} required />
                <input type="submit" />
            </form>
            <Link href="/auth/signup">Create Account</Link>
        </div>
    );
}
