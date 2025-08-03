'use client';

import { useState } from 'react';
import {supabase} from "@/supabase/supabaseClient";
import {useRouter} from "next/navigation";
import { toast } from 'react-hot-toast';

export default function SignupPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const router = useRouter();

    const [error, setError] = useState('');

    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormData({...formData,[name]:value});


    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setError('');

        const { data, error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                data: {
                    name: formData.name, // 👈 This will store the display name
                },
            },
        },toast.success('Signup successful! Please check your email for verification.',{position:"top-center"}));

        if (error) {
            toast.error(error.message,{position:"top-center"});
        } else {
            await router.push('/login');
        }
    };



    return (
        <div className="container mt-5" style={{ maxWidth: '500px' }}>
            <h2 className="text-center mb-4 text-primary">Create an Account</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">Sign Up</button>
            </form>

            <div className="text-center mt-3">
                <small>
                    Already have an account? <a href="/login">Login here</a>
                </small>
            </div>
        </div>
    );
}
