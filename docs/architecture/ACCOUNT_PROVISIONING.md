# Future Minds — Secure Account Provisioning

## Purpose

This phase adds controlled account provisioning
for the following application roles:

- owner
- technical_admin
- teacher
- student

Accounts are not created automatically.

## Prerequisites

1. Provision PostgreSQL.
2. Configure Supabase Auth.
3. Apply database migrations.
4. Configure .env.local.
5. Create and verify an authentication user in Supabase.
6. Obtain the verified Supabase Auth user UUID.
7. Configure a server-only Supabase administrator key.
8. Obtain explicit approval before activating privileged accounts.

The administrator key must be configured using either:

SUPABASE_SECRET_KEY

or:

SUPABASE_SERVICE_ROLE_KEY

Never put this value in a NEXT_PUBLIC_ variable.

Never commit it to GitHub.

## Account Provisioning

Example for an owner:

npm run auth:provision -- --auth-id AUTH_USER_UUID --role owner

Example for a technical administrator:

npm run auth:provision -- --auth-id AUTH_USER_UUID --role technical_admin

Example for a teacher:

npm run auth:provision -- --auth-id AUTH_USER_UUID --role teacher

Example for a student:

npm run auth:provision -- --auth-id AUTH_USER_UUID --role student

The command verifies the identity using the Supabase
administrator API before updating PostgreSQL.

It also requests interactive confirmation.

## Inspecting An Account

npm run auth:inspect -- AUTH_USER_UUID

## Security Considerations

The provisioning utility is intended only for a
trusted administrative environment.

It must never be exposed through a public API.

Do not execute the provisioning command from a
public-facing application endpoint.

Application roles are recorded in PostgreSQL,
not accepted from user-controlled browser inputs.

Privileged role assignment requires explicit approval.

For production, replace the single-operator CLI with
a fully audited administrative approval workflow.

The initial audit entry records a CLI provisioning
event but does not establish the human operator's
identity. Production governance requires attributable
administrative audit logging.

## Remaining Work

- Deploy PostgreSQL
- Configure Supabase
- Apply database migrations
- Create real administrator identities
- Implement role assignment approvals
- Test privilege boundaries
- Test authentication lifecycle
- Enforce application database least privilege
- Test account suspension and revocation
- Build functional administrative modules
- Implement secure guardian and student onboarding
