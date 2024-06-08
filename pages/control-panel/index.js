import { useRouter } from "next/navigation"
import { useEffect } from  "react"
import { useAuth } from "../../services/auth"

export default function ControlPanelPage() {
	const { logout, getUser } = useAuth()
	const currentUser = getUser()
	const router = useRouter()

	useEffect(() => {
		if (!currentUser) {
			router.push("/auth/login")
		}
	}, [])

	function handleLogout(e) {
		e.preventDefault();

		try {
			logout()
			router.push("/auth/login")
		} catch (error) {
			console.error(error)
		}	
	}

	return (
		<div>
			<nav>Nav</nav>
			<button onClick={handleLogout}>Logout</button>
			{currentUser && <p>{currentUser.email}</p>}
		</div>
	)
}
