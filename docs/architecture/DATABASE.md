# Future Minds — Database Architecture

## Platform

PostgreSQL.

The migration creates the initial relational data model
for the coaching management platform.

## Main domains

Identity
- Users
- Roles
- Student profiles
- Teacher profiles
- Guardian relationships

Academics
- Educational boards
- Disciplines
- Subjects
- Courses
- Batches
- Enrolments

Classroom
- Sessions
- Teacher assignments
- Attendance
- Learning resources
- Assignments
- Submissions

Finance
- Invoices
- Payments
- Payment events

Governance
- Audit logs

## Money

All INR payment amounts are stored as integer paise.

Example:
INR 1,000 = 100000 paise.

Financial totals must use verified transactions,
not unverified frontend payment responses.

## Security

Row-level security is enabled without permissive policies.

The migration deliberately does not provide
student or teacher database access yet.

Authentication, authorisation, guardian consent,
data retention and payment permissions must be
implemented before real user data is stored.

The application must never permit public clients
to assign owner or technical_admin roles.

Service credentials must remain server-side.

## Important limitations

This is a schema foundation, not a deployed database.

The following are still pending:
- Database provider selection
- Database provisioning
- Migration execution
- Authentication provider integration
- Access policies
- Role verification
- Referential and domain validation
- Payment reconciliation logic
- Automated database integration tests
- Backup and recovery testing
