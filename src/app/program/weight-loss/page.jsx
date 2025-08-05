'use client';
import React from 'react';

const WeightLoss = () => {
    const strategies = [
        "Maintain a caloric deficit (eat fewer calories than you burn).",
        "Include cardio and strength training in your routine.",
        "Track your food and stay hydrated.",
        "Get enough sleep and reduce stress.",
        "Avoid processed foods and sugary drinks.",
        "Eat high-protein meals to support fat loss and muscle retention.",
        "Incorporate fiber-rich foods to increase satiety.",
        "Limit alcohol, late-night snacking, and emotional eating.",
        "Prioritize consistency over perfection.",
    ];

    const weeklyPlan = [
        { day: "Monday", focus: "Full-body Strength + 20 min Cardio" },
        { day: "Tuesday", focus: "Brisk Walk or Light Jog (30–45 mins)" },
        { day: "Wednesday", focus: "HIIT or Circuit Training" },
        { day: "Thursday", focus: "Active Recovery / Yoga" },
        { day: "Friday", focus: "Strength Training + Abs" },
        { day: "Saturday", focus: "Hiking / Outdoor Cardio / Fun Activity" },
        { day: "Sunday", focus: "Rest or Light Stretching" }
    ];

    return (
        <div className="container py-5">
            <h1 className="display-5 fw-bold text-danger mb-4 text-center">🔥 Weight Loss</h1>
            <p className="fs-5 text-center mb-5">
                Proven methods to lose weight healthily and sustainably through proper training, nutrition, and recovery.
            </p>

            <div className="card shadow-lg p-4 border-1">
                <h2 className="h4 fw-semibold text-dark mb-3">🎯 Key Strategies</h2>
                <ul className="list-group list-group-flush mb-4">
                    {strategies.map((item, index) => (
                        <li key={index} className="list-group-item bg-transparent text-dark">
                            ✅ {item}
                        </li>
                    ))}
                </ul>

                <h2 className="h4 fw-semibold text-dark mb-3">📅 Weekly Workout Plan</h2>
                <div className="row g-3">
                    {weeklyPlan.map((item, index) => (
                        <div className="col-sm-6 col-md-4" key={index}>
                            <div className="card border-0 bg-light h-100 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title text-danger">{item.day}</h5>
                                    <p className="card-text text-dark">{item.focus}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-4 alert alert-warning small">
                    💡 <strong>Tip:</strong> Stay patient and consistent. Sustainable fat loss happens over time—not overnight.
                    Hydration, stress control, and sleep are as important as your workouts.
                </div>
            </div>
        </div>
    );
};

export default WeightLoss;
