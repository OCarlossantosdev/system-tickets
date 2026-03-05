import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv'; // Importação nomeada, que o TypeScript aceita sem reclamar

config(); // Executa o dotenv para carregar as variáveis do .env

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('As variáveis de ambiente do Supabase estão em falta.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);