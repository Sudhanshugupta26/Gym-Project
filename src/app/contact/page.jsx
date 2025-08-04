'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabase/supabaseClient';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

export default function ContactPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userEmail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(true);

    // Validation schema
    const schema = z.object({
        name: z.string().min(2, "Name too short").max(100),
        subject: z.string().min(2, "Subject too short").max(200),
        message: z.string().min(5, "Message too short").max(1000)
    });

    useEffect(() => {
        const checkAuth = async () => {
            const {
                data: { session }
            } = await supabase.auth.getSession();

            if (!session?.user) {
                router.push('/login');
            } else {
                setUserId(session.user.id);
                setUserEmail(session.user.email);
                setLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validation = schema.safeParse(formData);
        if (!validation.success) {
            const firstError = validation.error.errors[0]?.message;
            toast.error(firstError || 'Validation error.', { position: 'top-center' });
            return;
        }

        try {
            const { error } = await supabase.from('contact_messages').insert([
                {
                    name: formData.name.trim(),
                    subject: formData.subject.trim(),
                    message: formData.message.trim(),
                    email: userEmail,
                    user_id: userId
                }
            ]);

            if (error) {
                if (error.message.includes('violates row-level security')) {
                    toast.error('You can only send one message every 5 minutes.', {
                        position: 'top-center'
                    });
                } else {
                    console.error('Submission error:', error.message);
                    toast.error('Something went wrong. Please try again.', {
                        position: 'top-center'
                    });
                }
                return;
            }

            setSubmitted(true);
            if(submitted){
                toast.success('Message sent successfully!', { position: 'top-center' });
            }
            setFormData({ name: '', subject: '', message: '' });
        } catch (err) {
            console.error('Submission Error:', err.message);
            toast.error('Unexpected error occurred.', { position: 'top-center' });
        }
    };

    if (loading) {
        return <div className="text-center mt-5">Checking authentication...</div>;
    }

    return (
        <div className="container mt-5" style={{ maxWidth: '700px' }}>
            <h1 className="text-center mb-4">Contact Us</h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        autoComplete="name"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <input
                        type="text"
                        className="form-control"
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        rows="5"
                        required
                        value={formData.message}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-100">Send Message</button>
            </form>
            <p></p>
        </div>
    );
}
