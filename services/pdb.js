import PocketBase from "pocketbase";

const db = new PocketBase(process.env.NEXT_PUBLIC_API_KEY);

export default db;
