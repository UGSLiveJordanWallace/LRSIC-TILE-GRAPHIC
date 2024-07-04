import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CorruptPage() {
    const router = useRouter();

    useEffect(() => {
		function redirect() {
			return router.replace("/")
		}
		redirect()
    }, [router]);
}
