BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE user_role AS ENUM (
  'owner',
  'technical_admin',
  'teacher',
  'student'
);

CREATE TYPE user_status AS ENUM (
  'invited',
  'active',
  'suspended'
);

CREATE TYPE batch_status AS ENUM (
  'draft',
  'active',
  'completed',
  'cancelled'
);

CREATE TYPE enrolment_status AS ENUM (
  'pending',
  'active',
  'completed',
  'cancelled'
);

CREATE TYPE attendance_status AS ENUM (
  'present',
  'absent',
  'late',
  'excused'
);

CREATE TYPE invoice_status AS ENUM (
  'draft',
  'issued',
  'partially_paid',
  'paid',
  'void'
);

CREATE TYPE payment_status AS ENUM (
  'pending',
  'captured',
  'failed',
  'refunded'
);

CREATE TABLE app_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_provider_id TEXT UNIQUE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  status user_status NOT NULL DEFAULT 'invited',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT users_name_check
    CHECK (length(trim(full_name)) BETWEEN 2 AND 150),
  CONSTRAINT users_email_check
    CHECK (email = lower(trim(email)) AND length(email) <= 254)
);

CREATE UNIQUE INDEX app_users_email_unique
ON app_users (lower(email));

CREATE TABLE user_role_assignments (
  user_id UUID NOT NULL REFERENCES app_users(id) ON DELETE CASCADE,
  role user_role NOT NULL,
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, role)
);

CREATE TABLE student_profiles (
  user_id UUID PRIMARY KEY REFERENCES app_users(id) ON DELETE CASCADE,
  grade_level SMALLINT,
  notes TEXT,
  CONSTRAINT student_grade_check
    CHECK (grade_level IS NULL OR grade_level BETWEEN 6 AND 12)
);

CREATE TABLE teacher_profiles (
  user_id UUID PRIMARY KEY REFERENCES app_users(id) ON DELETE CASCADE,
  biography TEXT,
  qualifications TEXT,
  is_public BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE guardian_relationships (
  guardian_user_id UUID NOT NULL REFERENCES app_users(id),
  student_user_id UUID NOT NULL REFERENCES app_users(id),
  relationship TEXT NOT NULL,
  verified_at TIMESTAMPTZ,
  PRIMARY KEY (guardian_user_id, student_user_id),
  CHECK (guardian_user_id <> student_user_id)
);

CREATE TABLE education_boards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE academic_disciplines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  parent_id UUID REFERENCES academic_disciplines(id),
  is_active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  discipline_id UUID REFERENCES academic_disciplines(id),
  is_active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  board_id UUID REFERENCES education_boards(id),
  discipline_id UUID REFERENCES academic_disciplines(id),
  grade_level SMALLINT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (grade_level IS NULL OR grade_level BETWEEN 6 AND 12)
);

CREATE TABLE course_subjects (
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES subjects(id),
  PRIMARY KEY (course_id, subject_id)
);

CREATE TABLE batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id),
  name TEXT NOT NULL,
  status batch_status NOT NULL DEFAULT 'draft',
  capacity INTEGER,
  starts_on DATE,
  ends_on DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (capacity IS NULL OR capacity > 0),
  CHECK (ends_on IS NULL OR starts_on IS NULL OR ends_on >= starts_on)
);

CREATE TABLE batch_teachers (
  batch_id UUID NOT NULL REFERENCES batches(id) ON DELETE CASCADE,
  teacher_id UUID NOT NULL REFERENCES app_users(id),
  PRIMARY KEY (batch_id, teacher_id)
);

CREATE TABLE enrolments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id UUID NOT NULL REFERENCES batches(id),
  student_id UUID NOT NULL REFERENCES app_users(id),
  status enrolment_status NOT NULL DEFAULT 'pending',
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (batch_id, student_id)
);

CREATE TABLE class_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id UUID NOT NULL REFERENCES batches(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  meeting_provider TEXT,
  external_meeting_id TEXT,
  meeting_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (ends_at > starts_at),
  CHECK (meeting_url IS NULL OR meeting_url ~ '^https://')
);

CREATE TABLE attendance (
  session_id UUID NOT NULL REFERENCES class_sessions(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES app_users(id),
  status attendance_status NOT NULL,
  recorded_by UUID REFERENCES app_users(id),
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (session_id, student_id)
);

CREATE TABLE learning_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id UUID NOT NULL REFERENCES batches(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  uploaded_by UUID NOT NULL REFERENCES app_users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id UUID NOT NULL REFERENCES batches(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  due_at TIMESTAMPTZ,
  created_by UUID NOT NULL REFERENCES app_users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE assignment_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id UUID NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES app_users(id),
  submission_path TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  marks NUMERIC(7,2),
  feedback TEXT,
  UNIQUE (assignment_id, student_id),
  CHECK (marks IS NULL OR marks >= 0)
);

CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number TEXT NOT NULL UNIQUE,
  student_id UUID NOT NULL REFERENCES app_users(id),
  enrolment_id UUID REFERENCES enrolments(id),
  currency CHAR(3) NOT NULL DEFAULT 'INR',
  total_paise BIGINT NOT NULL,
  status invoice_status NOT NULL DEFAULT 'draft',
  issued_at TIMESTAMPTZ,
  due_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (currency = 'INR'),
  CHECK (total_paise >= 0)
);

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES invoices(id),
  provider TEXT NOT NULL,
  provider_payment_id TEXT UNIQUE,
  amount_paise BIGINT NOT NULL,
  currency CHAR(3) NOT NULL DEFAULT 'INR',
  status payment_status NOT NULL DEFAULT 'pending',
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (amount_paise > 0),
  CHECK (currency = 'INR')
);

CREATE TABLE payment_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider TEXT NOT NULL,
  provider_event_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  received_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  processed_at TIMESTAMPTZ,
  UNIQUE (provider, provider_event_id)
);

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES app_users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_batches_course ON batches(course_id);
CREATE INDEX idx_enrolments_student ON enrolments(student_id);
CREATE INDEX idx_sessions_batch_start ON class_sessions(batch_id, starts_at);
CREATE INDEX idx_invoices_student ON invoices(student_id);
CREATE INDEX idx_payments_invoice ON payments(invoice_id);
CREATE INDEX idx_audit_actor_time ON audit_logs(actor_id, created_at);

-- Default-deny database access until a verified
-- authentication and authorisation design is implemented.
-- No application role or access policy is created here.

ALTER TABLE app_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_role_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE guardian_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE education_boards ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_disciplines ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE batch_teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrolments ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

COMMIT;
