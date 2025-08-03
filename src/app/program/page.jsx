'use client';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';

const programCategories = [
    {
        title: 'Muscle Building',
        slug: 'muscle-building',
        description: 'Gain size and strength with hypertrophy-focused plans.',
    },
    {
        title: 'Weight Loss',
        slug: 'weight-loss',
        description: 'Burn fat and tone your body with high-intensity workouts.',
    },
    {
        title: 'Strength Training',
        slug: 'strength-training',
        description: 'Build raw strength with heavy compound exercises.',
    },
    {
        title: 'Home Workouts',
        slug: 'home-workouts',
        description: 'No equipment? No problem. Get fit from home.',
    },
    {
        title: '30-Day Challenges',
        slug: '30-day-challenges',
        description: 'Push your limits and track progress daily.',
    },
];

const testimonials = [
    {
        name: 'Rohit Verma',
        feedback: 'The muscle-building plan gave me amazing results in just 8 weeks!',
    },
    {
        name: 'Ananya Sharma',
        feedback: 'I lost 5 kgs in a month with the weight loss plan. Highly recommend!',
    },
    {
        name: 'Karan Mehta',
        feedback: 'The home workout routines were perfect during my busy exam season.',
    },
    {
        name: 'Pooja Singh',
        feedback: 'Strength training program helped me lift more than ever before!',
    },
];

export default function ProgramPage() {
    return (
        <div className="container py-5">
            <h1 className="mb-4">Our Programs</h1>
            <div className="row">
                {programCategories.map((category) => (
                    <div className="col-md-6 col-lg-4 mb-4" key={category.slug}>
                        <div className="card h-100 shadow-sm">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{category.title}</h5>
                                <p className="card-text">{category.description}</p>
                                <Link href={`/program/${category.slug}`} className="btn btn-primary mt-auto">
                                    View Program
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <hr className="my-5" />

            <h2 className="mb-4">What Our Users Say</h2>
            <div className="row">
                {testimonials.map((t, index) => (
                    <div className="col-md-6 col-lg-3 mb-4" key={index}>
                        <div className="card h-100 border-success shadow-sm">
                            <div className="card-body">
                                <p className="card-text">"{t.feedback}"</p>
                                <h6 className="card-subtitle text-muted mt-3">- {t.name}</h6>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
