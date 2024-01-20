import { createClient } from '@supabase/supabase-js'
import { useNavigate } from 'react-router-dom';
import config from '../../supabase_config.json';

const supabase_url = config.supabase_url;
const anon_key = config.anon_key;
const supabase = createClient(supabase_url, anon_key)

function HomePage() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            alert(error.message);
        } else {
            alert('Logout successful');
            navigate('/login');
        }
    }

    return (
        <div>
            <h1>Home</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default HomePage;