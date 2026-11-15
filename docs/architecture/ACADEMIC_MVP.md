# Future Minds — Core Academic MVP

## Delivered in this build

Owner:
- Assign verified teacher accounts to batches
- Enrol active student accounts with capacity checks
- Update batch status
- Create class sessions
- Create assignments
- Record attendance
- View enrolments, timetable and assignments

Teacher:
- View assigned batches
- Schedule classes for assigned batches
- Create assignments for assigned batches
- Record attendance for enrolled students
- View assigned student records

Student:
- View personal enrolments
- View personal timetable
- Access approved external class links
- Read assignment instructions
- View personal attendance

Technical administrator:
- View basic database health
- Inspect migration history

## Existing foundation

- Supabase authentication
- PostgreSQL database
- Role-based application access
- Owner account
- Public academic website
- Admissions enquiry interface
- Course and batch creation

## Access boundaries

All private pages verify the authenticated identity
and application role on the server.

All mutation actions independently check permissions.

Teacher data is filtered by batch assignment.

Student records are scoped to the current authenticated
student, with active enrolment required for lesson
and homework visibility.

## Important limitations

This is not a production-complete education platform.

The following are NOT implemented in this build:

- Public student self-registration
- Guardian consent / verification workflows
- Automated account invitations
- Homework file upload and student submissions
- Automated Google Meet meeting creation
- Razorpay or other payment transactions
- Invoice collection and reconciliation
- Refund processing
- Full technical monitoring
- Secure resource storage and antivirus scanning
- Moderated student communication
- Full administrative audit trails
- Automated integration and access-control tests
- Production-ready rate limiting and safeguards
- Deployment, backups and disaster recovery

## Security before real use

The previously exposed PostgreSQL password must
be rotated before real personal data is stored.

Configure a least-privilege database application role.

The project currently uses direct database queries
from server-only application code.

Ensure the runtime database role is restricted to
the tables and operations actually required.

Complete privacy and safeguarding review before
onboarding children.

Test teacher/student data isolation against
real users and multiple batches.

## Timezone note

HTML date-time inputs use the browser-local timezone,
but the current server actions interpret the supplied
value using the server timezone.

For multi-region live use, explicit centre timezone
handling must be implemented and verified.

## Release policy

Do not enable real payments or register minors
until the remaining operational controls pass review.
