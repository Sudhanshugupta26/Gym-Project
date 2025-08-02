// backend/index.js
import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Sample Route: Get All Users
app.get('/users', async (req, res) => {
    const { data, error } = await supabase.from('users').select('*');
    if (error) return res.status(500).json({ error });
    res.json(data);
});

// Sample Route: Add Workout
app.post('/workouts', async (req, res) => {
    const { user_id, workout_type, duration } = req.body;
    const { data, error } = await supabase
        .from('workouts')
        .insert([{ user_id, workout_type, duration }]);

    if (error) return res.status(500).json({ error });
    res.status(201).json(data);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
