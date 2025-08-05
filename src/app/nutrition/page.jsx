'use client';
import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/supabase/supabaseClient';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function NutritionPage() {
    const [query, setQuery] = useState('');
    const [foodLog, setFoodLog] = useState([]);
    const [session, setSession] = useState(null);
    const toastRef = useRef(null);
    const router = useRouter();
    const API_SECRET_KEY= process.env.NEXT_PUBLIC_API_SECRET_KEY;
    const API_ID= process.env.NEXT_PUBLIC_API_ID;


    const toTitleCase = (str) =>
        str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

    // Check session and fetch user's food log
    useEffect(() => {
        const init = async () => {
            const { data } = await supabase.auth.getSession();
            if (!data.session) {
                router.push('/login');
                return;
            }

            setSession(data.session);
            await fetchFoodLog(data.session.user.id);
        };

        init();
    }, []);

    const fetchFoodLog = async (userId) => {
        const { data, error } = await supabase
            .from('foods')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching food log:', error);
        else setFoodLog(data);
    };

    const handleAddFood = async () => {
        if (query.trim() === '') {
            toast.error('Enter Ingredient or Food!', { position: 'top-center' });
            return;
        }

        const formattedName = toTitleCase(query.trim());
        const userId = session?.user?.id;

        if (!userId) return;

        // Check if food with same name already exists for this user (case-insensitive exact match)
        const { data: existing, error: existingError } = await supabase
            .from('foods')
            .select('*')
            .eq('user_id', userId)
            .filter('name', 'ilike', formattedName);

        if (existingError) {
            console.error('DB Check Error:', existingError);
            return;
        }

        if (existing && existing.length > 0) {
            toast.error('You already logged this food item!', { position: 'top-center' });
            setQuery('');
            return;
        }

        try {
            const response = await axios.post(
                'https://trackapi.nutritionix.com/v2/natural/nutrients',
                { query: formattedName },
                {
                    headers: {
                        'x-app-id': API_ID,
                        'x-app-key': API_SECRET_KEY,
                        'Content-Type': 'application/json',
                    },
                }
            );

            const foods = response.data.foods;
            if (!foods || foods.length === 0) {
                toast.error('Food not found in Nutritionix API!', { position: 'top-center' });
                setQuery('');
                return;
            }

            const inserted = [];

            for (let food of foods) {
                const { data, error } = await supabase
                    .from('foods')
                    .insert([{
                        user_id: userId,
                        name: toTitleCase(food.food_name),
                        calories: food.nf_calories,
                        protein: food.nf_protein,
                        carbs: food.nf_total_carbohydrate,
                        fat: food.nf_total_fat,
                        quantity: food.serving_qty,
                        weight: food.serving_weight_grams,
                        image_url: food.photo?.thumb || null,
                    }])
                    .select('*');

                if (error) {
                    console.error('Insert error:', error);
                } else {
                    inserted.push(data[0]);
                }
            }

            setFoodLog((prev) => [...inserted, ...prev]);
            setQuery('');
        } catch (error) {
            console.error('API error:', error);
            toast.error('Food not found!', { position: 'top-center' });
            setQuery('');
        }
    };

    const handleDelete = async (id) => {
        const { error } = await supabase.from('foods').delete().eq('id', id);
        if (error) {
            console.error('Delete error:', error);
            return;
        }
        setFoodLog((prev) => prev.filter((item) => item.id !== id));
    };

    const totals = foodLog.reduce(
        (acc, item) => {
            acc.calories += item.calories || 0;
            acc.protein += item.protein || 0;
            acc.carbs += item.carbs || 0;
            acc.fat += item.fat || 0;
            return acc;
        },
        { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );

    return (
        <div className="container my-5">
            <h1 className="mb-4 fw-bold text-center">🍽️ Nutrition Tracker</h1>

            <div className="input-group mb-4" style={{ maxWidth: '400px', margin: '0 auto' }}>
                <input
                    type="text"
                    className="form-control text-uppercase"
                    value={query}
                    onChange={(e) => setQuery(e.target.value.toUpperCase())}
                    placeholder="Insert food name or ingredients"
                />
                <button onClick={handleAddFood} className="btn btn-primary">Add</button>
            </div>

            <div className="table-responsive">
                <table className="table table-bordered align-middle text-center">
                    <thead className="table-light">
                    <tr>
                        <th>Image</th>
                        <th>Food</th>
                        <th>Qty</th>
                        <th>Weight (g)</th>
                        <th>Calories</th>
                        <th>Protein (g)</th>
                        <th>Carbs (g)</th>
                        <th>Fat (g)</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {foodLog.map((item) => (
                        <tr key={item.id}>
                            <td>
                                {item.image_url ? (
                                    <img
                                        src={item.image_url}
                                        alt={item.name}
                                        className="img-thumbnail"
                                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                    />
                                ) : '—'}
                            </td>
                            <td>{toTitleCase(item.name)}</td>
                            <td>{item.quantity}</td>
                            <td>{item.weight}</td>
                            <td>{item.calories}</td>
                            <td>{item.protein}</td>
                            <td>{item.carbs}</td>
                            <td>{item.fat}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    <i className="fa-solid fa-trash" />
                                </button>
                            </td>
                        </tr>
                    ))}

                    {foodLog.length > 0 && (
                        <tr className="fw-bold table-secondary">
                            <td colSpan="4">Total</td>
                            <td>{totals.calories.toFixed(2)}</td>
                            <td>{totals.protein.toFixed(2)}</td>
                            <td>{totals.carbs.toFixed(2)}</td>
                            <td>{totals.fat.toFixed(2)}</td>
                            <td></td>
                        </tr>
                    )}

                    {foodLog.length === 0 && (
                        <tr>
                            <td colSpan="9" className="text-muted">No entries yet.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            <div className="mt-5 p-4 bg-light rounded nutrition-tips">
                <h4>💡 Health & Nutrition Tips</h4>
                <ul>
                    <li>Take at least 1.5x grams of protein as compared to your body weight in Kg to build muscles.</li>
                    <li>Track your calories to maintain or lose weight effectively.</li>
                    <li>Include more fiber-rich foods in your diet.</li>
                    <li>Stay hydrated – drink at least 8 glasses of water a day.</li>
                    <li>Avoid processed sugar as much as possible.</li>
                    <li>Balance your meals with protein, carbs, and fats.</li>
                </ul>
            </div>
        </div>
    );
}
