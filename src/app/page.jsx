'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabase/supabaseClient';


export default function HomePage() {
    const [session, setSession] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const getSession = async () => {
            const { data } = await supabase.auth.getSession();
            if (data?.session) {
                setSession(data.session);
            }
        };

        getSession();
    }, []);

    return (
        <div className="container py-5">
            {/* Hero Section */}
            <section className="text-center mb-5">
                {session ? (
                    <>
                        <h1 className="display-4 fw-bold text-primary">
                            Welcome {session.user.user_metadata?.name || session.user.email}
                        </h1>
                        <p className="fs-5">
                            Track your fitness, monitor your meals, and achieve your goals.
                        </p>
                        <section className="row text-center g-4 mb-5">
                            <div className="col-md-4">
                                <div className="card h-100 border-1 shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title fs-4">🏋️‍♂️ Personalized Workouts</h5>
                                        <p className="card-text text-black">Tailored training plans for strength, fat loss, or endurance.</p>
                                        <a href="/program" className="btn btn-outline-primary">Explore Plans</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card h-100 border-1 shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title fs-4">🥗 Smart Nutrition</h5>
                                        <p className="card-text text-black">Track meals, set macro goals, and stay accountable.</p>
                                        <a href="/nutrition" className="btn btn-outline-success">Track Meals</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card h-100 border-1 shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title fs-4">📈 Progress Analytics</h5>
                                        <p className="card-text text-black">Visual dashboards to monitor your fitness journey.</p>
                                        <a href="/progress" className="btn btn-outline-warning">View Stats</a>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Why Choose Us + Testimonials */}
                        <section className="row g-5 align-items-start mb-5">
                            <div className="col-md-6">
                                <h2 className="fw-bold mb-4">Why Choose Gym Mate?</h2>
                                <ul className="list-group list-group-flush">
                                    <p></p>
                                    <li className="card list-group-item mb-3 border-1">📊 Real-time progress tracking</li>
                                    <li className="card list-group-item mb-3 border-1 ">🥦 Advanced nutrition and macro planner</li>
                                    <li className="card list-group-item mb-3 border-1">🤖 AI-powered workout suggestions</li>
                                    <li className="card list-group-item mb-3 border-1">📅 Schedule workouts & reminders</li>
                                    <li className="card list-group-item mb-3 border-1">🧘 Mindfulness, sleep, and recovery tools</li>
                                    <p></p>
                                </ul>
                            </div>

                            <div className="col-md-6">
                                <h2 className="fw-bold mb-4">What Our Users Say</h2>
                                <div className="card border-1 shadow-sm mb-3">
                                    <div className="card-body ">
                                        <p className="mb-2 fst-italic">
                                            "Since I started using Gym Mate, I’ve lost 8kg and feel stronger than ever!"
                                        </p>

                                        <p></p>
                                        <footer className="blockquote-footer">Ankit Verma, Lucknow</footer>
                                    </div>
                                </div>
                                <div className="card border-1 shadow-sm mb-3">
                                    <div className="card-body">
                                        <p className="mb-2 fst-italic">
                                            "The nutrition tracker helped me finally stay consistent with my diet."
                                        </p>

                                        <p></p>
                                        <footer className="blockquote-footer">Riya Sharma, Delhi</footer>
                                    </div>
                                </div>
                                <div className="card border-1 shadow-sm">
                                    <div className="card-body">
                                        <p className="mb-2 fst-italic">
                                            "Clean UI, accurate tracking, and easy to use. Highly recommend it!"
                                        </p>
                                        <p></p>
                                        <footer className="blockquote-footer">Neeraj Patel, Pune</footer>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* FAQ */}
                        <section className="mt-5">
                            <h3 className="fw-bold mb-4">Frequently Asked Questions</h3>
                            <div className="accordion" id="faqAccordion">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="faqOne">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                                            Is Gym Mate free to use?
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                            Yes! All core features are free with optional premium upgrades.
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="faqTwo">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                                            Do I need gym equipment?
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                            No! We offer both home-based and equipment-based workout plans.
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="faqThree">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                                            Can I track my meals and calories?
                                        </button>
                                    </h2>
                                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                            Yes! Our nutrition tracker lets you log meals, track macros, and set goals.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                ) : (
                    <>
                        <h1 className="display-3 fw-bold text-primary">Welcome To Gym Mate 💪</h1>
                        <p className="fs-5 ">
                            Your all-in-one fitness companion to achieve your health goals.
                        </p>
                        <a href="/login" className="btn btn-success btn-lg px-4 mt-4 shadow">
                            Get Started
                        </a>
                        <p></p>
                        <section className="row text-center g-4 mb-5">
                            <div className="col-md-4">
                                <div className="card h-100 border-1 shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title fs-4">🏋️‍♂️ Personalized Workouts</h5>
                                        <p className="card-text text-black">Tailored training plans for strength, fat loss, or endurance.</p>
                                        <a href="/program" className="btn btn-outline-primary">Explore Plans</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card h-100 border-1 shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title fs-4">🥗 Smart Nutrition</h5>
                                        <p className="card-text text-black">Track meals, set macro goals, and stay accountable.</p>
                                        <a href="/nutrition" className="btn btn-outline-success">Track Meals</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card h-100 border-1 shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title fs-4">📈 Progress Analytics</h5>
                                        <p className="card-text text-black">Visual dashboards to monitor your fitness journey.</p>
                                        <a href="/progress" className="btn btn-outline-warning">View Stats</a>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Why Choose Us + Testimonials */}
                        <section className="row g-5 align-items-start mb-5">
                            <div className="col-md-6">
                                <h2 className="fw-bold mb-4">Why Choose Gym Mate?</h2>
                                <ul className="list-group list-group-flush">
                                    <p></p>
                                    <li className="card list-group-item mb-3 border-1">📊 Real-time progress tracking</li>
                                    <li className="card list-group-item mb-3 border-1 ">🥦 Advanced nutrition and macro planner</li>
                                    <li className="card list-group-item mb-3 border-1">🤖 AI-powered workout suggestions</li>
                                    <li className="card list-group-item mb-3 border-1">📅 Schedule workouts & reminders</li>
                                    <li className="card list-group-item mb-3 border-1">🧘 Mindfulness, sleep, and recovery tools</li>
                                    <p></p>
                                </ul>
                            </div>

                            <div className="col-md-6">
                                <h2 className="fw-bold mb-4">What Our Users Say</h2>
                                <div className="card border-1 shadow-sm mb-3">
                                    <div className="card-body ">
                                        <p className="mb-2 fst-italic">
                                            "Since I started using Gym Mate, I’ve lost 8kg and feel stronger than ever!"
                                        </p>

                                        <p></p>
                                        <footer className="blockquote-footer">Ankit Verma, Lucknow</footer>
                                    </div>
                                </div>
                                <div className="card border-1 shadow-sm mb-3">
                                    <div className="card-body">
                                        <p className="mb-2 fst-italic">
                                            "The nutrition tracker helped me finally stay consistent with my diet."
                                        </p>

                                        <p></p>
                                        <footer className="blockquote-footer">Riya Sharma, Delhi</footer>
                                    </div>
                                </div>
                                <div className="card border-1 shadow-sm">
                                    <div className="card-body">
                                        <p className="mb-2 fst-italic">
                                            "Clean UI, accurate tracking, and easy to use. Highly recommend it!"
                                        </p>
                                        <p></p>
                                        <footer className="blockquote-footer">Neeraj Patel, Pune</footer>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* CTA */}
                        <section className="text-center my-5">
                            <h2 className="fw-bold mb-3">Start Your Transformation Today</h2>
                            <p className="fs-5">Join thousands already reaching their goals with Gym Mate.</p>
                            <a href="/signup" className="btn btn-primary btn-lg px-4 shadow">Join Now</a>
                        </section>

                        {/* FAQ */}
                        <section className="mt-5">
                            <h3 className="fw-bold mb-4">Frequently Asked Questions</h3>
                            <div className="accordion" id="faqAccordion">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="faqOne">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                                            Is Gym Mate free to use?
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                            Yes! All core features are free with optional premium upgrades.
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="faqTwo">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                                            Do I need gym equipment?
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                            No! We offer both home-based and equipment-based workout plans.
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="faqThree">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                                            Can I track my meals and calories?
                                        </button>
                                    </h2>
                                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                            Yes! Our nutrition tracker lets you log meals, track macros, and set goals.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                )}
            </section>
        </div>
    );
}
