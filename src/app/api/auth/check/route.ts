import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(req: NextRequest) {
    try {
        const { data, error } = await supabase.auth.getSession();
        if (data.session != null) {
            return NextResponse.json(true);
        }
        return NextResponse.json(false);
    } catch (error) {
        return NextResponse.json(false);
    }
}