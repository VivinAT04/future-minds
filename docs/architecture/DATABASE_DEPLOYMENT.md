# Future Minds — Database Deployment

## Current Implementation

- PostgreSQL relational schema
- Academic reference data
- Versioned migration runner
- Migration checksum verification
- Transaction-level advisory locking
- Database connection verification
- Authentication configuration checks
- No default administrator credentials
- No public user registration

## Commands

Check database configuration:

npm run db:check

Check authentication configuration:

npm run auth:check

Apply pending database migrations:

npm run db:migrate

## Before Executing Migrations

1. Provision a PostgreSQL database.
2. Ensure it is privately accessible to the server.
3. Take a backup before changing an existing database.
4. Create .env.local with DATABASE_URL.
5. Configure appropriate database credentials.
6. Review the SQL migration files.
7. Run npm run db:migrate.
8. Run npm run db:check.

The migration runner does not execute automatically
during an application build.

## Important Security Requirements

The application currently uses direct PostgreSQL access
from the server.

The migration role and application role should have
different database privileges.

The initial schema enables row-level security without
granting permissive application policies.

Table ownership and PostgreSQL BYPASSRLS privileges
must not be given to the ordinary application role.

Authentication must be tested against the real
database before allowing live users.

Never commit .env.local or real credentials.

Do not put database credentials in NEXT_PUBLIC_ variables.

## Supabase Account Setup

A Supabase project is required for live authentication.

An authorised administrator must configure the project
and provision approved accounts.

Public signup is not enabled by this code.

An active application user requires:
- A verified Supabase Auth identity
- A matching app_users record
- A matching auth_provider_id
- An active account status
- At least one explicit role assignment

Owner and technical administrator roles must never
be assigned by public self-service actions.

## Pending Work

- Provider configuration and deployment
- Live migration execution
- Least-privilege database credentials
- Account provisioning workflow
- Role assignment administration
- Session and access-control integration tests
- Student and teacher management
- Course and batch management
- Guardian and safeguarding controls
- Audit and monitoring verification
