-- Bookings
create table bookings (
  id uuid default gen_random_uuid() primary key,
  service_type text not null,
  property_size text not null,
  preferred_date date not null,
  preferred_time text not null,
  full_name text not null,
  whatsapp text not null,
  email text,
  address text not null,
  special_instructions text,
  estimated_price integer,
  status text default 'pending',
  created_at timestamptz default now()
);

-- Call Requests
create table call_requests (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  phone text not null,
  best_time text not null,
  topic text not null,
  message text,
  status text default 'pending',
  created_at timestamptz default now()
);

-- Feedback & Suggestions
create table feedback (
  id uuid default gen_random_uuid() primary key,
  name text,
  feedback_type text not null,
  rating integer,
  message text not null,
  whatsapp text,
  approved boolean default false,
  created_at timestamptz default now()
);

-- Contact Messages
create table contact_messages (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  phone text not null,
  message text not null,
  created_at timestamptz default now()
);
