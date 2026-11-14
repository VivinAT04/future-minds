# Future Minds — Course and Batch Management

## Implemented

Owner-restricted academic management routes:

- /portal/owner/courses

Features:

- List courses
- Create unpublished course drafts
- List batches
- Create draft batches
- Server-side input validation
- Parameterised PostgreSQL queries
- Server-side owner role verification
- Responsive management interface

## Security

All mutations call requireRole("owner").

Technical administrators do not automatically gain
academic management access.

Course identifiers and capacities are validated
on the server.

User input is passed through PostgreSQL parameters.

New courses are unpublished by default.

New batches use draft status.

## Before live use

- Provision PostgreSQL
- Apply database migrations
- Configure Supabase Auth
- Create approved owner account
- Establish least-privilege application DB access
- Test role boundaries and database permissions
- Test complete user journeys
- Add operational monitoring

## Remaining

- Course editing and archival
- Course-to-subject mapping
- Educational board assignment
- Batch timetable management
- Teacher assignment
- Student enrolment
- Attendance management
- Course publication approval
- Pagination and searching
- Integration tests against real PostgreSQL
- Production auditing of administrative changes

This phase provides initial course and batch
management functionality, not the complete
academic management system.
