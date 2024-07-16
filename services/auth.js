import db from "./pdb";

export async function signUp(email, password, confirmPassword) {
    try {
        await db.collection("users").create({
            email: email,
            password: password,
            passwordConfirm: confirmPassword,
        });

        await db.collection("users").requestVerification(email);

        return {
            successMessage:
                "Signed Up Successfully, Check Email To Finish Registration (Check Your Spam)",
        };
    } catch (error) {
        return { errorMessage: `Couldn't Sign Up: ${error}` };
    }
}

export async function signIn(email, password) {
    try {
        await db.collection("users").authWithPassword(email, password);
        return { successMessage: "Logged In Successfully" };
    } catch (error) {
        return { errorMessage: `Couldn't Login: ${error}` };
    }
}

export async function requestPasswordReset(email) {
	try {
		await db.collection("users").requestPasswordReset(email)
		return { successMessage: "Request Sent Successfully, Check Email To Finish Resetting Password (Check Your Spam)" }
	} catch (error) {
        return { errorMessage: `Couldn't Request Password Reset: ${error}` };
	}
}

export async function adminSignIn(email, password) {
    try {
        await db.admins.authWithPassword(email, password);
        return { successMessage: "Logged In Successfully" };
    } catch (error) {
        return { errorMessage: `Couldn't Login: ${error}` };
    }
}

export function logout() {
    try {
        db.authStore.clear();

        return { successMessage: "Logged Out Successfully" };
    } catch (error) {
        return { errorMessage: `Couldn't Logout: ${error}` };
    }
}
