import React, { useEffect, useRef, useState } from 'react'
import styles from '../../styles/Add.module.css';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function AddTilePage() {
    const router = useRouter()

    // Authentication
    const emailRef = useRef();
    const passwordRef = useRef();

    // Tile Creation
    const nameRef = useRef();
    const descriptionRef = useRef();
    const rowRef = useRef();
    const colRef = useRef();
    const donor_firstnameRef = useRef();
    const donor_lastnameRef = useRef();
    const blockRef = useRef();
    const isUpper = useRef();

    // Error Handling
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const cookie = Cookies.get('auth');
        if (!cookie) {
            router.push('/login');
        } else {
            const auth = JSON.parse(cookie);
            if (!auth.tileEditor) {
                router.push('/login');
            }
        }
    }, [])

    async function handleAdd(e) {
        e.preventDefault();

        setLoading(true);
        setSuccess('');
        setError('');

        const data = {
            name: nameRef.current.value,
            description: descriptionRef.current.value,
            row: rowRef.current.value,
            col: colRef.current.value,
            donor_firstname: donor_firstnameRef.current.value,
            donor_lastname: donor_lastnameRef.current.value,
            block: blockRef.current.value,
            section: isUpper.current.checked ? "upper" : "lower",
        };

        
    }

    return (
        <div className={styles.container}>
            {error && <div className={styles.alert_error}>{error}</div>}
            {success && <div className={styles.alert_success}>{success}</div>}
            <label>Login</label>
            <input type="email" ref={emailRef} required/>
            <input type="password" ref={passwordRef} required/>
            <h2>Create Tile</h2>
            <label>Name</label>
            <input name="name" type="text" ref={nameRef} required/>
            <label>Description</label>
            <input name="description" type="text" ref={descriptionRef}/>
            <label>Row</label>
            <input name="row" type="number" ref={rowRef} required/>
            <label>Column</label>
            <input name="col" type="number"ref={colRef} required/>
            <label>Donor First Name</label>
            <input name="donor_firstname" ref={donor_firstnameRef}/>
            <label>Donor Last Name</label>
            <input name="donor_lastname" ref={donor_lastnameRef}/>
            <label>Block</label>
            <select name="block" ref={blockRef} required>
                <option value="north">north</option>
                <option value="south">south</option>
                <option value="east">east</option>
                <option value="west">west</option>
            </select>
            <label>If it is in the Upper Region with Either (East) or (West) Block</label>
            <input name="upper" type="checkbox" value="upper" ref={isUpper} />
            <button onClick={handleAdd} disabled={loading}>{loading ? "Adding Tile" : "Add Tile"}</button>
        </div>
    )
}
