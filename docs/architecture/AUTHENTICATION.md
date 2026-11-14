# Future Minds — Authentication Architecture

## Identity Provider

Supabase Authentication.

## Database

PostgreSQL.

## Application Roles

- owner
- technical_admin
- teacher
- student

Users may hold multiple roles.

## Security Model

Authentication verifies identity using Supabase Auth.

Authorization queries the Future Minds PostgreSQL
database for the corresponding active user and
assigned roles.

Roles are NEVER trusted from:
- URL parameters
- Browser local storage
- User-supplied form values
- Client-side role claims

Every protected portal page performs server-side
role verification.

## Account Provisioning

Public self-registration is not implemented.

Accounts must be created and verified using an
approved administrative workflow.

The app_users.auth_provider_id column must contain
the exact Supabase Auth user UUID.

The app_users email must match the verified
Supabase user email.

The app_users status must be active.

The user_role_assignments table determines access.

## Owner and Technical Admin

The coaching centre owner manages operations.

The technical administrator manages platform
infrastructure.

These roles are independent.

Technical administrator access does not
automatically grant access to private student
records or financial reports.

Multi-role access requires explicit assignment.

## Database Prerequisites

Before enabling authentication:

1. Create a PostgreSQL database.
2. Apply the initial database migration.
3. Configure DATABASE_URL.
4. Create a Supabase project.
5. Configure the Supabase URL and publishable key.
6. Establish approved account provisioning.
7. Establish database least-privilege access.
8. Verify database role assignments.
9. Test login and logout.
10. Test cross-role access restrictions.
11. Test session expiry and revocation.
12. Complete safeguarding and privacy review.

Do not enable unreviewed public signup.

Do not add demo passwords or privileged
credentials to the Git repository.

Do not store production personal data
until the security controls have been reviewed.

## Current Phase

The authentication and dashboard scaffolding
is implemented.

Live authentication remains inactive
until external services and approved
accounts are configured.

Operational dashboard modules are planned
and have not yet been implemented.
