"use client";
import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthHeader from "../components/authHeader";

export default function Login() {
    const [error, setError] = useState("");
    const [darkMode, setDarkMode] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const storedDarkMode = JSON.parse(localStorage.getItem('darkMode') || 'false');
        setDarkMode(storedDarkMode);
    }, []);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const response = await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({
                email: formData.get("email"),
                password: formData.get("password")
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.ok) {
            const { token } = await response.json();
            localStorage.setItem("token", token);
            router.push("/");
        } else {
            const { error } = await response.json();
            setError(error);
        }
    };

    return (
        <div className={`${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <AuthHeader darkMode={darkMode} setDarkMode={setDarkMode} />
            <section className={`w-full h-screen flex items-center justify-center`}>
                <form
                    className={`p-6 w-full max-w-[400px] flex flex-col justify-between items-center gap-2
            border border-solid ${darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded`}
                    onSubmit={handleSubmit}>
                    <h1 className="mb-5 w-full text-2xl font-bold">Sign In</h1>
                    <label className="w-full text-sm">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className={`w-full border border-solid ${darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'} text-[13px] rounded p-2`}
                        name="email" />
                    <label className="w-full text-sm">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className={`w-full border border-solid ${darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'} text-[13px] rounded p-2`}
                        name="password" />
                    {error && <div className="text-red-500">{error}</div>}
                    <button className={`w-full ${darkMode ? 'bg-gray-300 text-gray-800' : 'bg-gray-800 text-gray-300'} py-1.5 mt-2.5 rounded`}>
                        Login
                    </button>
                    <Link
                        href="/register"
                        className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition duration-150 ease`}>
                        Do not have an account?
                    </Link>
                </form>
            </section>
        </div>
    );
}