import { Router } from 'express';
import { supabase } from '../lib/supabase';

const router = Router();

// Listar tickets
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('tickets')
      .select('*, phases(name)')
      .order('created_at', { ascending: false });

    if (error) return res.status(400).json({ error: error.message });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar tickets' });
  }
});

// Atualizar fase (Drag and Drop)
router.patch('/:id/phase', async (req, res) => {
  const { id } = req.params;
  const { phase_name } = req.body;

  console.log(`Tentando mover ticket ${id} para: "${phase_name}"`);

  try {
    // Buscamos a fase ignorando espaços extras
    const { data: phaseData, error: phaseError } = await supabase
      .from('phases')
      .select('id')
      // O 'ilike' ignora se é maiúsculo/minúsculo e o '%' busca partes do texto
      .ilike('name', `%${phase_name.trim()}%`)
      .single();

    if (phaseError || !phaseData) {
      console.error("Fase não encontrada no banco:", phase_name);
      return res.status(404).json({ error: `Fase "${phase_name}" não existe no banco.` });
    }

    const { error: updateError } = await supabase
      .from('tickets')
      .update({ phase_id: phaseData.id })
      .eq('id', id);

    if (updateError) throw updateError;

    return res.json({ message: 'Ticket movido com sucesso!' });
  } catch (error) {
    console.error("Erro no patch:", error);
    return res.status(500).json({ error: 'Erro interno ao mover ticket' });
  }
});

export default router;