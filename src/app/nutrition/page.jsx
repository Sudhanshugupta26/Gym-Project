'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/supabase/supabaseClient'; // Your Supabase client
import { useRouter } from 'next/navigation';

export default function NutritionPage() {
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
            <h1>🍎 Nutrition Tracker</h1>
            <p>Track your meals, calories, and macros here.</p>
            {/* Add UI to input and view meals */}
        </div>
    );
}
