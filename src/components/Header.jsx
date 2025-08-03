'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {supabase} from "@/supabase/supabaseClient";

export default function Header() {
    const router = useRouter();
    const pathname = usePathname();
    const [session, setSession] = useState('');

    useEffect(() => {
        import('bootstrap/dist/js/bootstrap.bundle.min.js');

        const getSession = async () => {
            const { data } = await supabase.auth.getSession();
            setSession(data.session);
        };

        getSession();

        // Listen for auth changes (e.g., login/logout)
        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" style={{ fontWeight: "bold" }} role="button" onClick={() => router.push('/')}>
                    Gym Mate
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {[
                            { href: '/', label: 'Home' },
                            { href: '/program', label: 'Programs' },
                            { href: '/trainers', label: 'Trainers' },
                            { href: '/contact', label: 'Contact' }
                        ].map(({ href, label }) => (
                            <li className="nav-item" key={href}>
                                <a
                                    className={`nav-link ${pathname === href ? 'active' : ''}`}
                                    role="button"
                                    onClick={() => router.push(href)}
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="d-flex">
                        {!session ? (
                            <>
                                <button className="btn btn-success me-2" onClick={() => router.push('/login')}>Log In</button>
                                <button className="btn btn-primary" onClick={() => router.push('/signup')}>Sign Up</button>
                            </>
                        ) : (
                            <button className="btn btn-danger" onClick={handleLogout}>Log Out</button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
