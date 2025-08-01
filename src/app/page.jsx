export default function HomePage() {
    return (
        <div className="container mt-5">
            <div className="text-center">
                <h1 className="display-4 text-primary">Welcome to My Gym App 💪</h1>
                <p className="lead">
                    Track your workouts, meals, and progress — all in one place.
                </p>
                <a href="/login" className="btn btn-success btn-lg mt-3">
                    Get Started
                </a>
            </div>

            <hr className="my-5" />

            <div className="row text-center">
                <div className="col-md-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Workout Plans</h5>
                            <p className="card-text">Custom workout plans for your goals.</p>
                            <a href="/workouts" className="btn btn-outline-primary">
                                Explore
                            </a>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Nutrition Tracker</h5>
                            <p className="card-text">Log meals and count your macros easily.</p>
                            <a href="/nutrition" className="btn btn-outline-success">
                                Track
                            </a>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Progress</h5>
                            <p className="card-text">Visualize your fitness journey.</p>
                            <a href="/progress" className="btn btn-outline-warning">
                                View
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
