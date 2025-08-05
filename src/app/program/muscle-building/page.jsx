'use client';
import React from 'react';

const MuscleBuilding = () => {
    const tips = [
        "Focus on progressive overload (increase weights or reps consistently).",
        "Train each major muscle group at least 2 times per week.",
        "Use compound movements: squats, deadlifts, bench press, rows, and overhead press.",
        "Ensure proper rest between sets (1–2 min for hypertrophy, 2–3 min for strength).",
        "Track your progress weekly – both in weights lifted and physique.",
        "Stretch after workouts to reduce soreness and improve flexibility."
    ];

    const exercises = [
        { name: "Chest", moves: ["Barbell Bench Press", "Incline Dumbbell Press", "Push-ups"] },
        { name: "Back", moves: ["Deadlifts", "Pull-ups", "Barbell Rows"] },
        { name: "Legs", moves: ["Squats", "Lunges", "Leg Press"] },
        { name: "Shoulders", moves: ["Overhead Press", "Lateral Raises", "Arnold Press"] },
        { name: "Arms", moves: ["Barbell Curls", "Tricep Dips", "Hammer Curls"] }
    ];

    return (
        <div className="container py-5">
            <h1 className="text-center mb-4 fw-bold display-5">💪 Muscle Building</h1>

            <p className="text-muted text-center mb-5">
                Unlock your potential with proven strategies to gain lean muscle mass, strength, and endurance.
            </p>

            <div className="row mb-5">
                <div className="col-md-6">
                    <h4 className="fw-semibold">Why Focus on Muscle Building?</h4>
                    <ul className="list-group list-group-flush mt-3">
                        <li className="list-group-item mb-4 rounded-2 border-1">🔥 Boosts metabolism and burns more fat</li>
                        <li className="list-group-item mb-4 rounded-2 border-1">💪 Improves strength and physical performance</li>
                        <li className="list-group-item mb-4 rounded-2 border-1">🛡️ Increases bone density and joint protection</li>
                        <li className="list-group-item mb-4 rounded-2 border-1">🧠 Enhances mental health and confidence</li>
                    </ul>
                </div>

                <div className="col-md-6">
                    <h4 className="fw-semibold">Top Muscle-Building Tips</h4>
                    <ul className="list-group list-group-numbered mt-3">
                        {tips.map((tip, index) => (
                            <li key={index} className="list-group-item mb-2 rounded-2">{tip}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="mb-5">
                <h4 className="fw-semibold mb-3">🏋️‍♂️ Example Exercises by Muscle Group</h4>
                <div className="row">
                    {exercises.map((group, i) => (
                        <div key={i} className="col-md-4 mb-4">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{group.name}</h5>
                                    <ul className="list-unstyled">
                                        {group.moves.map((move, idx) => (
                                            <li key={idx}>• {move}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-light p-4 text-black rounded shadow-sm">
                <h4 className="fw-semibold mb-3">🥗 Nutrition Essentials</h4>
                <p>
                    Your body needs the right fuel to grow muscle. Focus on:
                </p>
                <ul>
                    <li>Protein: Aim for 1.6–2.2g per kg of body weight per day</li>
                    <li>Carbohydrates: Vital for training energy and muscle recovery</li>
                    <li>Healthy fats: Support hormones and overall health</li>
                    <li>Stay hydrated: Drink at least 3–4 liters of water daily</li>
                </ul>
            </div>
        </div>
    );
};

export default MuscleBuilding;
