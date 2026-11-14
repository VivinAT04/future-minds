# Future Minds — PostgreSQL and Supabase Setup

## Overview

The application has a database schema, migration scripts,
and authentication integration.

It still requires external infrastructure configuration.

## Required services

1. PostgreSQL database
2. Supabase Auth project

## Secure configuration

Run:

npm run setup:configure

Enter the values obtained directly from the providers:

- DATABASE_URL
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

The script writes `.env.local`.

The file must never be uploaded to GitHub.

## Verify configuration

npm run setup:doctor

This checks:
- Environment variable presence
- Database connectivity
- Core table existence
- Applied migration history

It does not create accounts or approve live deployment.

## Database migration

After provisioning the database, reviewing SQL migrations,
and verifying that you have a backup where required:

npm run db:migrate

Then:

npm run setup:doctor

Migration execution is intentionally separate from
build and deployment.

## Authentication requirements

Before real users can sign in:

- Configure Supabase Auth
- Disable unapproved public signup
- Configure appropriate authentication policies
- Verify account email addresses
- Establish an administrator-controlled provisioning workflow
- Provision owner and technical administrator accounts
- Assign roles only through trusted server-side processes
- Verify PostgreSQL least-privilege permissions
- Test role separation
- Test session expiration and revocation

## Important distinction

A database connection alone does not make the
platform safe for production use.

The application still requires security verification,
student privacy protections, and operational testing.

Do not enter real student records until those reviews
are complete.
