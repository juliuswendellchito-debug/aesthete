-- ============================================================
-- AESTHETE — Supabase schema
-- Run this in the Supabase SQL editor: https://supabase.com/dashboard
-- ============================================================

create extension if not exists "uuid-ossp";

-- ── Products ────────────────────────────────────────────────
create table products (
  id          uuid primary key default uuid_generate_v4(),
  slug        text unique not null,
  name        text not null,
  description text,
  price       numeric(10, 2) not null,
  images      text[] default '{}',
  category    text,
  sizes       text[] default '{}',
  stock       jsonb default '{}',
  featured    boolean default false,
  badge       text,
  created_at  timestamptz default now()
);

-- ── Profiles ────────────────────────────────────────────────
create table profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  email      text,
  full_name  text,
  role       text default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz default now()
);

-- ── Orders ──────────────────────────────────────────────────
create table orders (
  id                        uuid primary key default uuid_generate_v4(),
  user_id                   uuid references profiles(id),
  stripe_payment_intent_id  text unique,
  status                    text default 'pending'
                              check (status in ('pending','confirmed','shipped','delivered','cancelled')),
  shipping_address          jsonb not null,
  items                     jsonb not null,
  subtotal                  numeric(10, 2) not null,
  shipping_cost             numeric(10, 2) default 0,
  total                     numeric(10, 2) not null,
  created_at                timestamptz default now()
);

-- ── Row-Level Security ───────────────────────────────────────
alter table products enable row level security;
alter table profiles enable row level security;
alter table orders   enable row level security;

-- Products: public read
create policy "products_public_read" on products
  for select using (true);

-- Products: admin write
create policy "products_admin_write" on products
  for all using (
    exists (
      select 1 from profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Profiles: own read/update
create policy "profiles_own_read" on profiles
  for select using (auth.uid() = id);

create policy "profiles_own_update" on profiles
  for update using (auth.uid() = id);

-- Profiles: admin read all
create policy "profiles_admin_read" on profiles
  for select using (
    exists (
      select 1 from profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Orders: own read
create policy "orders_own_read" on orders
  for select using (auth.uid() = user_id);

-- ── Auto-create profile on signup ───────────────────────────
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ── Newsletter subscribers ───────────────────────────────────
create table subscribers (
  id         uuid primary key default uuid_generate_v4(),
  email      text unique not null,
  source     text default 'footer',
  created_at timestamptz default now()
);

-- Anyone can insert their own email; only service role can read the list
alter table subscribers enable row level security;

create policy "Insert own email"
  on subscribers for insert
  with check (true);

-- ── Seed data ────────────────────────────────────────────────
insert into products (slug, name, description, price, images, category, sizes, stock, featured, badge)
values
(
  'architectural-wool-coat',
  'Architectural Wool Coat',
  'A structured silhouette in virgin wool. Clean lines and precise tailoring define this modern classic.',
  1850.00,
  array[
    'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80',
    'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&q=80'
  ],
  'outerwear',
  array['XS','S','M','L','XL'],
  '{"XS":3,"S":5,"M":4,"L":2,"XL":1}',
  true,
  'Editorial Pick'
),
(
  'organic-silk-midi-dress',
  'Organic Silk Midi Dress',
  'Fluid drape in certified organic silk. Naturally dyed in a palette drawn from the earth.',
  920.00,
  array[
    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80'
  ],
  'dresses',
  array['XS','S','M','L'],
  '{"XS":2,"S":6,"M":5,"L":3}',
  true,
  null
),
(
  'raw-edge-cashmere-knit',
  'Raw Edge Cashmere Knit',
  'Grade-A Mongolian cashmere. Intentionally unfinished edges for an artisanal, deconstructed aesthetic.',
  650.00,
  array[
    'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80'
  ],
  'knitwear',
  array['S','M','L','XL'],
  '{"S":8,"M":10,"L":7,"XL":4}',
  false,
  'New Arrival'
),
(
  'cashmere-wrap-coat',
  'Cashmere Wrap Coat',
  'Pure cashmere in a generous wrap silhouette. Monogramming available on request.',
  2450.00,
  array[
    'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=800&q=80',
    'https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=800&q=80'
  ],
  'outerwear',
  array['XS','S','M','L','XL'],
  '{"XS":2,"S":3,"M":4,"L":2,"XL":1}',
  true,
  null
);
