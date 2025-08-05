'use client';

import React from 'react';
import '@/app/globals.css';

const challenges = [
    {
        title: 'Full Body Blast',
        description:
            'A 30-day full-body workout challenge designed to build strength and stamina without the need for equipment. Perfect for all fitness levels.',
        plan: [
            'Day 1–5: 20 squats, 15 push-ups, 30-sec plank.',
            'Day 6–10: 30 squats, 20 push-ups, 40-sec plank, 10 burpees.',
            'Day 11–20: 40 squats, 25 push-ups, 1-min plank, 20 jumping jacks.',
            'Day 21–30: 50 squats, 30 push-ups, 1.5-min plank, 30 jumping jacks, 15 burpees.',
        ],
    },
    {
        title: 'Abs & Core Focus',
        description:
            'Target your core with daily routines aimed at strengthening your abdominal muscles and reducing belly fat.',
        plan: [
            'Day 1–5: 20 crunches, 20 Russian twists, 30-sec plank.',
            'Day 6–10: 30 crunches, 30 Russian twists, 40-sec plank.',
            'Day 11–20: 40 crunches, 40 mountain climbers, 1-min plank.',
            'Day 21–30: 50 crunches, 50 mountain climbers, 1.5-min plank.',
        ],
    },
    {
        title: 'Fat Burn HIIT',
        description:
            'A high-intensity interval training program for fat loss and endurance building. No equipment required.',
        plan: [
            'Day 1–5: 20 jumping jacks, 15 squats, 20 high knees.',
            'Day 6–10: 30 jumping jacks, 20 squats, 30 high knees.',
            'Day 11–20: 40 jumping jacks, 30 squats, 40 high knees.',
            'Day 21–30: 50 jumping jacks, 40 squats, 1-min high knees.',
        ],
    },
];

const ThirtyDayChallenges = () => {
    return (
        <div className="min-vh-100 py-5 px-3">
            <div className="container">
                <h1 className="display-4 fw-bold text-center mb-5">🏋️‍♂️ 30-Day Fitness Challenges</h1>

                <div className="row g-4">
                    {challenges.map((challenge, idx) => (
                        <div className="col-md-6 col-lg-4" key={idx}>
                            <div className="card h-100 shadow-sm rounded text-white">
                                <div className="card-body d-flex flex-column">
                                    <h2 className="h5 card-title text-primary fs-4 fw-bold text-center">{challenge.title}</h2>
                                    <p className="card-text text-black fs-5 flex-grow-1">{challenge.description}</p>
                                    <div className="mt-3">
                                        <h6 className="text-primary fs-4 fw-bold text-center">Challenge Breakdown:</h6>
                                        <ul className="list-unstyled">
                                            {challenge.plan.map((item, index) => (
                                                <li key={index} className="mb-1 fs-5 text-center text-black">
                                                    {item}
                                                    <hr/>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ThirtyDayChallenges;
