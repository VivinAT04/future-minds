# Future Minds — Admissions Enquiries

## Current functionality

The frontend and server-side enquiry route have been implemented.

The form remains unavailable until official email
configuration is supplied.

## Configuration

Set the following environment variables:

- RESEND_API_KEY
- RESEND_FROM_EMAIL
- ENQUIRY_TO_EMAIL

The sending address must be permitted by the email provider.

Do not publish secrets in GitHub.

Do not place secrets in NEXT_PUBLIC_ variables.

## Before enabling the service publicly

- Confirm the official business email.
- Verify the sending domain.
- Implement durable rate limiting and spam protection.
- Publish a suitable privacy notice.
- Establish data retention procedures.
- Review safeguarding arrangements for minors.
- Test delivery and error handling.
- Add delivery monitoring.
- Confirm who may access enquiry emails.

The current form must not be treated as a complete
production admissions management system.

## Next platform phases

1. Database and migrations
2. Authentication and role-based permissions
3. Owner and technical admin dashboards
4. Teacher and student management
5. Course enrolment and batch allocation
6. Timetables, attendance and Google Meet
7. Materials, assignments and assessments
8. Controlled student–teacher communication
9. Verified INR payments and financial reporting
10. Security, testing and production deployment
