import { redirect } from "next/navigation";

export default function Home() {
    redirect('/home');
}
// If user has token, direct to home page, else if user doesn't, direct to Log in page