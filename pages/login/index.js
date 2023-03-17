import React, { useRef } from 'react'
import PocketBase from 'pocketbase'
import Cookies from 'js-cookie'

export default function LoginPage() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const db = new PocketBase('http://localhost:8090');

    async function handleSubmit(e) {
        e.preventDefault();
        const authId = await db.collection('users').authWithPassword(emailRef.current.value, passwordRef.current.value)
        Cookies.set('auth', JSON.stringify(authId.record), { expires: 7 });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <br></br>
                <input type="email" ref={emailRef} />
                <br></br>
                <label>Password</label>
                <br></br>
                <input type="password" ref={passwordRef} />
                <br></br>
                <input type="submit" />
            </form>
        </div>
    )
}
