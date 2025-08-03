'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/supabase/supabaseClient';
import { useRouter } from 'next/navigation';

export default function ProgressPage() {
    const [session, setSession] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession();
            if (!data.session) router.push('/login');
            setSession(data.session);
        };
        checkSession();
    }, []);

    return (
        <div className="container mt-5">
            <h1>📊 Progress Tracker</h1>
            <p>Log your weight, workout performance, and track improvement over time.</p>
            {/* Add progress logging form and display graphs */}
        </div>
    );
}
