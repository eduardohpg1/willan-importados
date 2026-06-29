-- Habilitar extensão para UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de marcas
CREATE TABLE IF NOT EXISTS brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de perfumes
CREATE TABLE IF NOT EXISTS perfumes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  brand_id UUID REFERENCES brands(id) ON DELETE SET NULL,
  volume TEXT NOT NULL,
  description TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de configurações do site
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  whatsapp_number TEXT NOT NULL DEFAULT '5511999999999',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Inserir configurações padrão
INSERT INTO site_settings (whatsapp_number) VALUES ('5511999999999')
ON CONFLICT DO NOTHING;

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_perfumes_updated_at
  BEFORE UPDATE ON perfumes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Políticas de segurança (RLS)
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE perfumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Leitura pública para todos
CREATE POLICY "Public can read brands" ON brands FOR SELECT USING (true);
CREATE POLICY "Public can read perfumes" ON perfumes FOR SELECT USING (true);
CREATE POLICY "Public can read site_settings" ON site_settings FOR SELECT USING (true);

-- Escrita apenas para usuários autenticados (admin)
CREATE POLICY "Auth users can manage brands" ON brands
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Auth users can manage perfumes" ON perfumes
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Auth users can manage site_settings" ON site_settings
  FOR ALL USING (auth.role() = 'authenticated');

-- Storage bucket para imagens de perfumes
INSERT INTO storage.buckets (id, name, public)
VALUES ('perfume-images', 'perfume-images', true)
ON CONFLICT DO NOTHING;

-- Política de leitura pública para storage
CREATE POLICY "Public can read perfume images"
ON storage.objects FOR SELECT
USING (bucket_id = 'perfume-images');

-- Política de upload apenas para autenticados
CREATE POLICY "Auth users can upload perfume images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'perfume-images' AND auth.role() = 'authenticated');

CREATE POLICY "Auth users can delete perfume images"
ON storage.objects FOR DELETE
USING (bucket_id = 'perfume-images' AND auth.role() = 'authenticated');

-- Dados de exemplo
INSERT INTO brands (name, slug) VALUES
  ('Dior', 'dior'),
  ('Chanel', 'chanel'),
  ('Tom Ford', 'tom-ford'),
  ('Yves Saint Laurent', 'yves-saint-laurent'),
  ('Lancôme', 'lancome')
ON CONFLICT DO NOTHING;

INSERT INTO perfumes (name, slug, brand_id, volume, description, images, featured)
SELECT
  'Sauvage',
  'sauvage',
  id,
  '100ml',
  'Uma fragrância selvagem e nobre ao mesmo tempo. Notas de bergamota da Calábria, pimenta Sichuan e ambroxan criam uma composição moderna e intensa.',
  ARRAY['https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800'],
  true
FROM brands WHERE slug = 'dior'
ON CONFLICT DO NOTHING;

INSERT INTO perfumes (name, slug, brand_id, volume, description, images, featured)
SELECT
  'Bleu de Chanel',
  'bleu-de-chanel',
  id,
  '100ml',
  'Uma fragrância lenhosa e aromática que celebra a liberdade. Notas de citrus, incenso, cedro e sândalo criam uma assinatura única e sofisticada.',
  ARRAY['https://images.unsplash.com/photo-1541643600914-78b084683702?w=800'],
  true
FROM brands WHERE slug = 'chanel'
ON CONFLICT DO NOTHING;

INSERT INTO perfumes (name, slug, brand_id, volume, description, images, featured)
SELECT
  'Black Orchid',
  'black-orchid',
  id,
  '50ml',
  'Uma fragrância floral e oriental luxuosa. Notas de trufa preta, ylang ylang, bergamota e sândalo criam uma composição misteriosa e sedutora.',
  ARRAY['https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800'],
  true
FROM brands WHERE slug = 'tom-ford'
ON CONFLICT DO NOTHING;
