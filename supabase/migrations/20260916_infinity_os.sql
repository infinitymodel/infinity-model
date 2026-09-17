-- Infinity OS: run this file once in the Supabase SQL Editor.
-- The service_role key is intentionally not used by the Next.js application.

create type public.ops_role as enum ('owner', 'admin', 'sales', 'production', 'inventory', 'viewer');
create type public.ops_stage as enum ('brief', 'design', 'quote', 'production', 'quality', 'delivery');
create type public.ops_priority as enum ('high', 'medium', 'low');
create sequence public.order_number_sequence start with 2401;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text not null default '',
  role public.ops_role not null default 'viewer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  phone text,
  email text,
  notes text,
  created_at timestamptz not null default now(),
  created_by uuid references public.profiles(id)
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique,
  client_id uuid references public.clients(id) on delete set null,
  title text not null,
  service text not null,
  material text,
  quantity integer not null default 1 check (quantity > 0),
  value_sar numeric(12,2) not null default 0 check (value_sar >= 0),
  due_date date,
  stage public.ops_stage not null default 'brief',
  priority public.ops_priority not null default 'medium',
  contact text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references public.profiles(id)
);

create table public.inventory_items (
  id uuid primary key default gen_random_uuid(),
  sku text unique,
  name text not null,
  item_type text not null check (item_type in ('filament', 'resin', 'spare')),
  brand text,
  color text,
  available numeric(12,2) not null default 0 check (available >= 0),
  reorder_point numeric(12,2) not null default 0 check (reorder_point >= 0),
  unit text not null default 'قطعة',
  location text,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles(id)
);

create table public.pricing_rules (
  id uuid primary key default gen_random_uuid(),
  material_code text not null unique check (material_code in ('pla', 'petg', 'asa', 'abs', 'resin')),
  material_price_per_kg numeric(12,2) not null check (material_price_per_kg >= 0),
  machine_rate_per_hour numeric(12,2) not null check (machine_rate_per_hour >= 0),
  labour_rate_per_hour numeric(12,2) not null check (labour_rate_per_hour >= 0),
  setup_fee numeric(12,2) not null default 0 check (setup_fee >= 0),
  waste_percent numeric(5,2) not null default 0 check (waste_percent between 0 and 100),
  markup_percent numeric(5,2) not null default 0 check (markup_percent between 0 and 500),
  minimum_order numeric(12,2) not null default 0 check (minimum_order >= 0),
  is_active boolean not null default true,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles(id)
);

create table public.order_activity (
  id bigint generated always as identity primary key,
  order_id uuid not null references public.orders(id) on delete cascade,
  actor_id uuid references public.profiles(id),
  action text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, coalesce(new.email, ''), coalesce(new.raw_user_meta_data ->> 'full_name', ''));
  return new;
end;
$$;

create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

create or replace function public.assign_order_number()
returns trigger language plpgsql set search_path = ''
as $$
begin
  if new.order_number is null or new.order_number = '' then
    new.order_number = 'IM-' || lpad(nextval('public.order_number_sequence')::text, 4, '0');
  end if;
  return new;
end;
$$;

create trigger orders_assign_number before insert on public.orders for each row execute procedure public.assign_order_number();

create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = ''
as $$ begin new.updated_at = now(); return new; end; $$;

create trigger profiles_updated_at before update on public.profiles for each row execute procedure public.set_updated_at();
create trigger orders_updated_at before update on public.orders for each row execute procedure public.set_updated_at();
create trigger inventory_updated_at before update on public.inventory_items for each row execute procedure public.set_updated_at();
create trigger pricing_updated_at before update on public.pricing_rules for each row execute procedure public.set_updated_at();

create or replace function public.current_ops_role()
returns public.ops_role
language sql stable security definer set search_path = ''
as $$ select role from public.profiles where id = auth.uid() $$;

create or replace function public.has_ops_role(allowed public.ops_role[])
returns boolean language sql stable security definer set search_path = ''
as $$ select coalesce(public.current_ops_role() = any(allowed), false) $$;

alter table public.profiles enable row level security;
alter table public.clients enable row level security;
alter table public.orders enable row level security;
alter table public.inventory_items enable row level security;
alter table public.pricing_rules enable row level security;
alter table public.order_activity enable row level security;

create policy "profiles read own" on public.profiles for select to authenticated using (id = auth.uid());
create policy "profiles manage owners" on public.profiles for update to authenticated using (public.has_ops_role(array['owner'::public.ops_role])) with check (public.has_ops_role(array['owner'::public.ops_role]));
create policy "clients read staff" on public.clients for select to authenticated using (public.has_ops_role(array['owner','admin','sales','production','inventory','viewer']::public.ops_role[]));
create policy "clients write sales" on public.clients for all to authenticated using (public.has_ops_role(array['owner','admin','sales']::public.ops_role[])) with check (public.has_ops_role(array['owner','admin','sales']::public.ops_role[]));
create policy "orders read staff" on public.orders for select to authenticated using (public.has_ops_role(array['owner','admin','sales','production','inventory','viewer']::public.ops_role[]));
create policy "orders create sales" on public.orders for insert to authenticated with check (public.has_ops_role(array['owner','admin','sales']::public.ops_role[]));
create policy "orders update staff" on public.orders for update to authenticated using (public.has_ops_role(array['owner','admin','sales','production']::public.ops_role[])) with check (public.has_ops_role(array['owner','admin','sales','production']::public.ops_role[]));
create policy "inventory read staff" on public.inventory_items for select to authenticated using (public.has_ops_role(array['owner','admin','sales','production','inventory','viewer']::public.ops_role[]));
create policy "inventory write owners" on public.inventory_items for all to authenticated using (public.has_ops_role(array['owner','admin','inventory']::public.ops_role[])) with check (public.has_ops_role(array['owner','admin','inventory']::public.ops_role[]));
create policy "pricing read allowed" on public.pricing_rules for select to authenticated using (public.has_ops_role(array['owner','admin','sales','production']::public.ops_role[]));
create policy "pricing manage leaders" on public.pricing_rules for all to authenticated using (public.has_ops_role(array['owner','admin']::public.ops_role[])) with check (public.has_ops_role(array['owner','admin']::public.ops_role[]));
create policy "activity read staff" on public.order_activity for select to authenticated using (public.has_ops_role(array['owner','admin','sales','production','inventory','viewer']::public.ops_role[]));
create policy "activity create staff" on public.order_activity for insert to authenticated with check (actor_id = auth.uid() and public.has_ops_role(array['owner','admin','sales','production','inventory']::public.ops_role[]));

create or replace function public.adjust_inventory_item(item_id uuid, quantity_change numeric)
returns public.inventory_items
language plpgsql
security invoker set search_path = ''
as $$
declare updated_item public.inventory_items;
begin
  if not public.has_ops_role(array['owner','admin','inventory']::public.ops_role[]) then
    raise exception 'insufficient_privilege';
  end if;
  update public.inventory_items
  set available = greatest(0, available + quantity_change), updated_by = auth.uid()
  where id = item_id
  returning * into updated_item;
  if updated_item.id is null then raise exception 'inventory_item_not_found'; end if;
  return updated_item;
end;
$$;

insert into public.pricing_rules (material_code, material_price_per_kg, machine_rate_per_hour, labour_rate_per_hour, setup_fee, waste_percent, markup_percent, minimum_order)
values
  ('pla', 95, 18, 55, 25, 8, 35, 45),
  ('petg', 120, 20, 55, 30, 10, 38, 55),
  ('asa', 150, 24, 60, 35, 12, 42, 70),
  ('abs', 130, 23, 60, 35, 12, 40, 65),
  ('resin', 190, 28, 65, 40, 15, 45, 90);

-- After creating the first user in Supabase Auth, promote it exactly once:
-- update public.profiles set role = 'owner' where email = 'YOUR-OWNER-EMAIL';
