import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: NextRequest) {
    const { email, password, full_name, dob } = await req.json();
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name,
                dob
            }
        }
    });

    if (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 401 });
    }
    return NextResponse.json({ user: data.user }, { status: 200 });
}