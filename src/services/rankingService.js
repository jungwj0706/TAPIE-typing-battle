import { supabase } from './supabaseClient';

export async function fetchRankings({ mode = 'word', limit = 50 } = {}) {
  const { data, error } = await supabase
    .from('rankings')
    .select('*')
    .eq('mode', mode)
    .order('wpm', { ascending: false }) // wpm 기준 내림차순
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function saveRank({ name, mode, wpm, accuracy }) {
  const { data, error } = await supabase.from('rankings').insert([
    { name, mode, wpm, accuracy }
  ]);

  if (error) throw error;
  return data;
}
