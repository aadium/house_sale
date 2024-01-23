require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();

const PORT = 5174;
app.use(cors());
app.use(express.json());

app.post("/api/auth/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) return res.status(401).json({ error: error.message });
    return res.status(200).json({ user: data.user });
});

app.post("/api/auth/logout", async (req, res) => {
    const { error } = await supabase.auth.signOut();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ message: "Logged out" });
});

app.post("/api/auth/register", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const { data, error } = await supabase.auth.signUp({
        email,
        password
    });

    if (error) return res.status(401).json({ error: error.message });
    return res.status(200).json({ user: data.user });
});

app.get("/api/get", async (req, res) => {
    const { data, error } = await supabase.from('houses_for_sale').select();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ data });
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})