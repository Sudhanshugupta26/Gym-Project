'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/supabase/supabaseClient';
import { useRouter } from 'next/navigation';
import ProgressCharts from "@/app/progress/chart/page";
import {toast} from "react-hot-toast";

export default function ProgressPage() {
    const [session, setSession] = useState(null);
    const [formData, setFormData] = useState({
        weight: '',
        sleep_hours: '',
        water_intake: '',
        steps_walked: '',
        food_quality: '',
        workout_duration: '',
        mood_score: '',
    });
    const [userId, setUserId] = useState(null);
    const [alreadySubmitted, setAlreadySubmitted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const router = useRouter();
    
    useEffect(() => {
        const checkSessionAndProgress = async () => {
            const { data } = await supabase.auth.getSession();
            if (!data.session) {
                router.push('/login');
                return;
            }
            const user = data.session.user;
            setUserId(user.id);
            setSession(user);

            const today = new Date().toISOString().split('T')[0];

            const { data: existing, error } = await supabase
                .from('daily_progress')
                .select('id')
                .eq('user_id', user.id)
                .eq('date', today)
                .maybeSingle();

            if (existing) {
                setAlreadySubmitted(true);
            }

            setLoading(false);
        };

        checkSessionAndProgress();
    }, [router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const confirmed = window.confirm("Are you sure you want to submit today's progress?");
        if (!confirmed) return;

        const { error } = await supabase.from('daily_progress').insert([
            {
                user_id: session.id,
                ...formData,
                date: new Date().toISOString().split('T')[0],
            },
        ]);

        if (error) {
            toast.error('Error submitting data.',{position:"top-center"});
            setMessage('Error submitting data.');
            console.error(error);
        } else {
            toast.success('Progress submitted successfully!',{position:"top-center"});
            setMessage('Progress submitted successfully!');
            setAlreadySubmitted(true);
        }
    };


    if (loading) return <div className="container mt-5">Loading...</div>;


    if (alreadySubmitted)
        return (
            <div className="container mt-5">
                <div className="alert alert-info" role="alert">
                    You’ve already submitted today’s progress!
                </div>
                <div className="mt-3 text-center">
                    <ProgressCharts userId={userId} />
                </div>
            </div>
        );


    return (
        <div className="container mt-5">
            <h2 className="mb-4">Daily Progress Form</h2>
            {message && <div className="alert alert-success">{message}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Weight (kg)</label>
                    <input
                        type="number"
                        className="form-control"
                        name="weight"
                        placeholder="Enter your weight"
                        min="0"
                        max="300"
                        step="0.1"
                        value={formData.weight}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Sleep Hours</label>
                    <input
                        type="number"
                        className="form-control"
                        name="sleep_hours"
                        placeholder="Enter your sleep hours"
                        min="0"
                        max="24"
                        step="0.5"
                        value={formData.sleep_hours}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Water Intake (L)</label>
                    <input
                        type="number"
                        className="form-control"
                        name="water_intake"
                        placeholder="Enter your water intake"
                        min="0"
                        max="12"
                        step="0.5"
                        value={formData.water_intake}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Steps Walked</label>
                    <input
                        type="number"
                        className="form-control"
                        name="steps_walked"
                        placeholder="Enter your steps walked"
                        min="0"
                        max="999900"
                        step="100"
                        value={formData.steps_walked}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Food Quality</label>
                    <select
                        className="form-select"
                        name="food_quality"
                        value={formData.food_quality}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select</option>
                        <option value="clean">Clean</option>
                        <option value="normal">Normal</option>
                        <option value="junk">Junk</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Workout Duration (min)</label>
                    <input
                        type="number"
                        className="form-control"
                        name="workout_duration"
                        placeholder="Enter your workout duration"
                        min="0"
                        max="1440"
                        value={formData.workout_duration}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Mood Score (1-5)</label>
                    <select
                        className="form-select"
                        name="mood_score"
                        value={formData.mood_score}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select 1 to 5</option>
                        {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit Progress
                </button>
                <p></p>
            </form>
        </div>
    );
}
