'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabase/supabaseClient';
import { toast } from 'react-hot-toast';

export default function ChangeEmailPage() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (!data?.user || error) {
                router.replace('/login');
            } else {
                setUserEmail(data.user.email);
            }
        };
        checkUser();
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (newEmail !== confirmEmail) {
            setError("Emails don't match");
            toast.error("Emails don't match", { position: "top-center" });
            return;
        }

        // Re-authenticate using current email and password
        const { error: signInError } = await supabase.auth.signInWithPassword({
            email: userEmail,
            password: currentPassword,
        });

        if (signInError) {
            setError("Current password is incorrect.");
            toast.error("Current password is incorrect.", { position: "top-center" });
            return;
        }

        // Proceed with email update
        const { error: updateError } = await supabase.auth.updateUser({ email: newEmail });

        if (updateError) {
            setError(updateError.message);
            toast.error('Email change failed', { position: 'top-center' });
        } else {
            setSuccess('Email change request sent. Please verify your new email.');
            toast.success('Email change request sent. Please verify your new email.', { position: 'top-center' });
            setNewEmail('');
            setConfirmEmail('');
            setCurrentPassword('');
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '500px' }}>
            <h2 className="mb-4 text-center">Change Email</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Current Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">New Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Confirm New Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={confirmEmail}
                        onChange={(e) => setConfirmEmail(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">Update Email</button>

                {error && <div className="alert alert-danger mt-3">{error}</div>}
                {success && <div className="alert alert-success mt-3">{success}</div>}
            </form>
            <p></p>
        </div>
    );
}
