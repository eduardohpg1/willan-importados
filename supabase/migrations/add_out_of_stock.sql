-- Adiciona o campo de "esgotado" aos perfumes já existentes
ALTER TABLE perfumes ADD COLUMN IF NOT EXISTS out_of_stock BOOLEAN DEFAULT FALSE;
