'use client';
import 'bootstrap/dist/css/bootstrap.min.css';

const trainers = [
    {
        name: 'Sudhanshu Gupta',
        specialty: 'Full Stack Developer & Fitness Mentor',
        description: 'Sudhanshu specializes in both MERN stack training and customized workout plans. Known for discipline and dedication.',
        image: 'https://imgs.search.brave.com/U1ESr9vtmkuRN7Nu4hjke4RDAPqepabtYbxFnqwEt9U/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucGV4ZWxzLmNv/bS9waG90b3MvOTEy/MjcvcGV4ZWxzLXBo/b3RvLTkxMjI3Lmpw/ZWc_YXV0bz1jb21w/cmVzcyZjcz10aW55/c3JnYiZkcHI9MSZ3/PTUwMA',
    },
    {
        name: 'Sudhanshu Gupta',
        specialty: 'Cardio & HIIT Expert',
        description: 'Sudhanshu designs progressive programs for beginners aiming to build muscle and stamina at home.',
        image: 'https://imgs.search.brave.com/U1ESr9vtmkuRN7Nu4hjke4RDAPqepabtYbxFnqwEt9U/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucGV4ZWxzLmNv/bS9waG90b3MvOTEy/MjcvcGV4ZWxzLXBo/b3RvLTkxMjI3Lmpw/ZWc_YXV0bz1jb21w/cmVzcyZjcz10aW55/c3JnYiZkcHI9MSZ3/PTUwMA',
    },
    {
        name: 'Sudhanshu Gupta',
        specialty: 'Beginner Gains Coach',
        description: 'Sudhanshu designs progressive programs for beginners aiming to build muscle and stamina at home.',
        image: 'https://imgs.search.brave.com/U1ESr9vtmkuRN7Nu4hjke4RDAPqepabtYbxFnqwEt9U/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucGV4ZWxzLmNv/bS9waG90b3MvOTEy/MjcvcGV4ZWxzLXBo/b3RvLTkxMjI3Lmpw/ZWc_YXV0bz1jb21w/cmVzcyZjcz10aW55/c3JnYiZkcHI9MSZ3/PTUwMA',
    },
];

export default function TrainerPage() {
    return (
        <div className="container py-5">
            <h1 className="mb-4 text-center">Meet Our Trainers</h1>
            <div className="row">
                {trainers.map((trainer, index) => (
                    <div className="col-md-6 col-lg-4 mb-4" key={index}>
                        <div className="card h-100 shadow-sm">
                            <img src={trainer.image} className="card-img-top" alt={trainer.name} />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{trainer.name}</h5>
                                <h6 className="text-muted">{trainer.specialty}</h6>
                                <p className="card-text">{trainer.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
