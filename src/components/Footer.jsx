// components/Footer.jsx
export default function Footer() {
    return (
        <footer style={{ padding: '10px', backgroundColor: '#eee' }} className="pt-4 pb-3">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <h5>About Us</h5>
                        <p>
                            Learn more about our mission, vision, and commitment to helping you reach your fitness goals.
                        </p>
                    </div>
                    <div className="col-md-3">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="/" >Home</a></li>
                            <li><a href="/about" >About</a></li>
                            <li><a href="/contact" >Contact</a></li>
                            <li><a href="/login" >Login</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h5>Follow Us</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" >Instagram</a></li>
                            <li><a href="#" >Facebook</a></li>
                            <li><a href="#" >Twitter</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h5>Contact</h5>
                        <p>Email: info@gymapp.com</p>
                        <p>Phone: +91 1234567890</p>
                        <p>Location: Lucknow, India</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 text-center">
                        <hr />
                        <p className="text-center mt-3">© {new Date().getFullYear()} Gym App. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
