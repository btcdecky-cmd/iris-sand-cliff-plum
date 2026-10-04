create table if not exists agent_runs (
  id text primary key,
  project_id text not null,
  mode text not null,
  request text not null,
  provider text,
  model text,
  status text not null default 'running',
  summary text,
  files_changed jsonb not null default '[]'::jsonb,
  started_at timestamptz not null default now(),
  finished_at timestamptz
);

create index if not exists agent_runs_project_started_idx on agent_runs (project_id, started_at desc);

create table if not exists sandbox_runs (
  id text primary key,
  project_id text not null,
  command text not null,
  status text not null default 'running',
  stdout text not null default '',
  stderr text not null default '',
  exit_code integer,
  created_at timestamptz not null default now(),
  finished_at timestamptz
);

create index if not exists sandbox_runs_project_created_idx on sandbox_runs (project_id, created_at desc);

create table if not exists realtime_events (
  id bigserial primary key,
  project_id text not null,
  event_type text not null,
  payload jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists realtime_events_project_created_idx on realtime_events (project_id, created_at desc);
create index if not exists realtime_events_project_id_idx on realtime_events (project_id, id);
create index if not exists agent_runs_status_idx on agent_runs (status);
create index if not exists sandbox_runs_status_idx on sandbox_runs (status);
create index if not exists realtime_events_type_idx on realtime_events (event_type);
