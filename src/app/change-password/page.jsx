'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabase/supabaseClient';
import { toast } from 'react-hot-toast';

export default function ChangePasswordPage() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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

        if (newPassword !== confirmPassword) {
            setError("Passwords don't match");
            toast.error("Passwords don't match", { position: "top-center" });
            return;
        }

        // Re-authenticate with current password
        const { error: signInError } = await supabase.auth.signInWithPassword({
            email: userEmail,
            password: currentPassword,
        });

        if (signInError) {
            setError("Current password is incorrect.");
            toast.error("Current password is incorrect.", { position: "top-center" });
            return;
        }

        // Update password
        const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });

        if (updateError) {
            setError(updateError.message);
            toast.error("Password change failed", { position: "top-center" });
        } else {
            setSuccess('Password changed successfully');
            toast.success("Password changed successfully", { position: "top-center" });
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '500px' }}>
            <h2 className="mb-4 text-center">Change Password</h2>
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
                    <label className="form-label">New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Confirm New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">Update Password</button>

                {error && <div className="alert alert-danger mt-3">{error}</div>}
                {success && <div className="alert alert-success mt-3">{success}</div>}
            </form>
            <p></p>
        </div>
    );
}
