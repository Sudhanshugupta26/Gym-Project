'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/supabase/supabaseClient';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import { parseISO, format } from 'date-fns';

const COLORS = ['#82ca9d', '#8884d8', '#ffc658'];

function formatDate(dateString) {
    return format(parseISO(dateString), 'MMM d');
}

export default function ProgressCharts({ userId }) {
    const [progressData, setProgressData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProgress = async () => {
            const { data, error } = await supabase
                .from('daily_progress')
                .select('*')
                .eq('user_id', userId)
                .order('date', { ascending: true });

            if (error) {
                console.error('Error fetching progress data:', error);
            } else {
                const formatted = data.map(entry => ({
                    ...entry,
                    date: formatDate(entry.date)
                }));
                setProgressData(formatted);
            }
            setLoading(false);
        };

        if (userId) fetchProgress();
    }, [userId]);

    if (loading) return <div className="mt-4">Loading charts...</div>;
    if (!progressData.length) return <div className="mt-4">No data available yet.</div>;

    const foodCount = progressData.reduce((acc, curr) => {
        const type = curr.food_quality || 'unknown';
        acc[type] = (acc[type] || 0) + 1;
        return acc;
    }, {});

    const foodPieData = Object.keys(foodCount).map((key) => ({ name: key, value: foodCount[key] }));

    return (
        <div className="mt-5">
            <h3 className="mb-3">📈 Your Progress Charts</h3>

            {/* Sleep, Water, Weight */}
            <h5 className="mt-5">Sleep, Water, Weight</h5>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" stroke="	#4169E1" />
                    <YAxis stroke = "#FF6347"/>
                    <Tooltip contentStyle={{ backgroundColor: '#fff', color: '#000', borderRadius: '10px' }}
                             labelStyle={{ color: 'black' }}/>
                    <Legend />
                    <Line type="monotone" dataKey="sleep_hours" stroke="#00bcd4" name="Sleep Hours" />
                    <Line type="monotone" dataKey="water_intake" stroke="#82ca9d" name="Water Intake (L)" />
                    <Line type="monotone" dataKey="weight" stroke="#8884d8" name="Weight (kg)" />
                </LineChart>
            </ResponsiveContainer>

            {/* Mood Score Bar Chart */}
            <h5 className="mt-5">Mood Score</h5>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" stroke = "#4169E1" />
                    <YAxis domain={[1, 5]} stroke = "#FF6347"/>
                    <Tooltip contentStyle={{ backgroundColor: '#fff', color: '#000', borderRadius: '10px' }}
                             labelStyle={{ color: 'black' }}/>
                    <Bar dataKey="mood_score" fill="#ff7f50" name="Mood Score" />
                </BarChart>
            </ResponsiveContainer>

            {/* Workout Duration Bar Chart */}
            <h5 className="mt-5">Workout Duration</h5>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" stroke = "#4169E1"/>
                    <YAxis stroke = "#FF6347"/>
                    <Tooltip contentStyle={{ backgroundColor: '#fff', color: '#000', borderRadius: '10px' }}
                             labelStyle={{ color: 'black' }}/>
                    <Bar dataKey="workout_duration" fill="#00bfa5" name="Workout (min)" />
                </BarChart>
            </ResponsiveContainer>

            {/* Steps Walked */}
            <h5 className="mt-5">Steps Walked</h5>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" stroke = "#4169E1"/>
                    <YAxis stroke = "#FF6347"/>
                    <Tooltip contentStyle={{ backgroundColor: '#fff', color: '#000', borderRadius: '10px' }}
                             labelStyle={{ color: 'black' }}/>
                    <Line type="monotone" dataKey="steps_walked" stroke="#9c27b0" name="Steps" />
                </LineChart>
            </ResponsiveContainer>

            {/* Food Quality Pie */}
            <h5 className="mt-5">Food Quality Distribution</h5>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={foodPieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        fill="#8884d8"
                        label
                    >
                        {foodPieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#fff', color: '#000', borderRadius: '10px' }}
                             labelStyle={{ color: 'black' }}/>
                </PieChart>
            </ResponsiveContainer>
            <p></p>
        </div>
    );
}
