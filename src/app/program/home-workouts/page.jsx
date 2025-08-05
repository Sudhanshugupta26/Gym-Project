'use client';
import React from 'react';

const HomeWorkouts = () => {
    const exercises = [
        "Push-ups, squats, lunges, planks, and burpees.",
        "Use resistance bands or water bottles as weights.",
        "Focus on form, control, and consistency.",
        "Create a circuit of 5 exercises, 3 rounds each.",
        "Warm up and cool down with mobility drills."
    ];

    const benefits = [
        "Improves cardiovascular health.",
        "Builds strength without equipment.",
        "Saves time and money.",
        "Boosts mood and mental clarity.",
        "Convenient and flexible schedule."
    ];

    const tips = [
        "Schedule your workouts like appointments.",
        "Wear proper footwear to avoid injury.",
        "Stay hydrated throughout.",
        "Keep a workout journal for tracking progress.",
        "Use music or workout videos to stay motivated."
    ];

    return (
        <div className="container py-5">
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold">🏠 Home Workouts</h1>
                <p className="lead">Stay fit at home using bodyweight exercises and minimal equipment.</p>
            </div>

            <div className="mb-5">
                <h2 className="h4">🔥 Popular Home Exercises</h2>
                <ul className="list-group list-group-flush">
                    {exercises.map((ex, index) => (
                        <li key={index} className="list-group-item mb-4 rounded-2 text-black border-1">{ex}</li>
                    ))}
                </ul>
            </div>

            <div className="mb-5">
                <h2 className="h4">💪 Benefits of Home Workouts</h2>
                <ul className="list-group list-group-flush">
                    {benefits.map((item, idx) => (
                        <li key={idx} className="list-group-item mb-4 rounded-2 text-black  border-1">{item}</li>
                    ))}
                </ul>
            </div>

            <div className="mb-5">
                <h2 className="h4">🗓️ Sample Routine (30 Minutes)</h2>
                <ol className="list-group list-group-numbered list-group-flush">
                    <li className="list-group-item mb-4 rounded-2 text-black border-1">5 min warm-up: arm circles, jumping jacks</li>
                    <li className="list-group-item mb-4 rounded-2 text-black border-1">3 sets of push-ups (10-15 reps)</li>
                    <li className="list-group-item mb-4 rounded-2 text-black border-1">3 sets of bodyweight squats (15-20 reps)</li>
                    <li className="list-group-item mb-4 rounded-2 text-black border-1">3 sets of planks (30–45 seconds)</li>
                    <li className="list-group-item mb-4 rounded-2 text-black border-1">Cool-down: stretch hamstrings, shoulders, and back</li>
                </ol>
            </div>

            <div className="mb-5">
                <h2 className="h4">✅ Tips to Stay on Track</h2>
                <ul className="list-group list-group-flush">
                    {tips.map((tip, i) => (
                        <li key={i} className="list-group-item mb-4 rounded-2 text-black border-1">{tip}</li>
                    ))}
                </ul>
            </div>

            <div className="text-center mt-4">
                <h5 className="fw-bold">Remember:</h5>
                <p className="fst-italic">“You don’t need a gym to transform your body. Your home can be your fitness sanctuary.”</p>
            </div>
        </div>
    );
};

export default HomeWorkouts;
