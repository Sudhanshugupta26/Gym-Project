'use client';
import React from 'react';

const StrengthTraining = () => {
    const keyPrinciples = [
        "Focus on low reps (4–6) and high weights for compound lifts.",
        "Progressively overload every 1–2 weeks to stimulate strength gains.",
        "Rest 2–3 minutes between heavy sets to allow full recovery.",
        "Track your PRs (personal records) and ensure proper form.",
        "Train 3–4 days a week with full body or upper/lower splits.",
        "Incorporate the 'Big 5': Squat, Deadlift, Bench Press, Overhead Press, Barbell Row.",
        "Limit failure training—stop 1–2 reps before failure on most sets.",
        "Utilize deload weeks every 6–8 weeks to recover and grow.",
        "Support training with adequate protein and 7–9 hours of sleep per night."
    ];

    const weeklySplit = [
        { day: "Monday", focus: "Heavy Squats + Accessory Legs" },
        { day: "Tuesday", focus: "Rest or Active Recovery" },
        { day: "Wednesday", focus: "Deadlifts + Back & Core" },
        { day: "Thursday", focus: "Rest or Light Cardio" },
        { day: "Friday", focus: "Bench Press + Push Movements" },
        { day: "Saturday", focus: "Overhead Press + Arms" },
        { day: "Sunday", focus: "Rest / Optional Mobility or Yoga" }
    ];

    return (
        <div className="container py-5">

                <h1 className="display-5 fw-bold text-primary mb-4 text-center">💪 Strength Training</h1>
                <p className=" fs-5 text-center mb-5">
                    Build raw power, increase muscle density, and improve bone strength through a scientifically backed approach to strength training.
                </p>
            <div className="card shadow-lg p-4">

                <h2 className="h4 fw-semibold text-dark mb-3">🔑 Core Principles</h2>
                <ul className="list-group list-group-flush mb-4">
                    {keyPrinciples.map((point, index) => (
                        <li key={index} className="list-group-item bg-transparent text-dark">
                            ✅ {point}
                        </li>
                    ))}
                </ul>

                <h2 className="h4 fw-semibold text-dark mb-3">📅 Weekly Training Split</h2>
                <div className="row g-3">
                    {weeklySplit.map((item, index) => (
                        <div className="col-sm-6 col-md-4" key={index}>
                            <div className="card border-0 h-100 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title text-primary">{item.day}</h5>
                                    <p className="card-text text-dark">{item.focus}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-4 alert alert-info small">
                    🧠 <strong>Tip:</strong> Prioritize quality sleep and nutrition for better recovery and consistent strength gains.
                    Always warm up before heavy lifts and never compromise form for weight.
                </div>
            </div>
        </div>
    );
};

export default StrengthTraining;