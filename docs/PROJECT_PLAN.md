# FUTURE MINDS — MASTER PROJECT PLAN

Status: Planning and foundation
Brand: Future Minds
Business: Future Minds Coaching Center
Development: In-house
Repository: https://github.com/VivinAT04/future-minds
Target: Professional, production-ready educational platform

---

## 1. PROJECT VISION

Build a complete online coaching centre, not just a promotional website.

The platform must support:

- Public website and admissions
- Student registration and management
- Teacher registration and management
- Online classes and scheduling
- Google Meet integration
- Student–teacher communication
- Study materials and assignments
- Attendance tracking
- Tests and academic progress
- Fee collection in Indian rupees
- Payment verification and receipts
- Administrative reporting
- Secure system management

The platform must be responsive, accessible, maintainable,
secure, scalable and suitable for real-world hosting.

---

## 2. BRANDING RULES

Primary name: FUTURE MINDS
Secondary name: COACHING CENTER

Existing logo:
public/branding/fm-logo.png

Design rules:

- Display the full logo prominently only in the header.
- Use a small logo or simple wordmark in the footer.
- Never repeat the large logo in the hero section.
- Avoid oversized decorative initials and unnecessary graphics.
- Use professional typography and consistent spacing.
- Use navy, white, subtle blue and restrained accents.
- Prefer purposeful educational imagery over repeated branding.
- Keep the design clean, modern and trustworthy.
- Avoid fake statistics, testimonials or unsupported claims.

---

## 3. EDUCATIONAL PROGRAMMES

School education:
- Classes 6–12
- CBSE
- ICSE
- Matriculation

Competitive preparation:
- NEET
- JEE Main
- JEE Advanced

Higher education:
- Engineering subjects

Subjects, teachers, batches and fees must eventually be
manageable through the admin portal without code changes.

---

## 4. PUBLIC WEBSITE

Pages planned:

1. Home
2. About Future Minds
3. Courses and Programmes
4. Individual Course Details
5. Faculty
6. Admissions
7. Contact
8. Login
9. Privacy Policy
10. Terms and Conditions

Homepage sections:

- Professional navigation
- Strong headline and supporting message
- Purposeful educational visual
- Programmes overview
- Why Future Minds
- Learning methodology
- How online classes work
- Faculty introduction, once verified
- Admissions call to action
- Enquiry information
- Professional footer

Do not advertise functionality as live before implementation.

---

## 5. PLATFORM USER ROLES

OWNER / DIRECTOR
- Business administration
- Student and teacher management
- Fee management
- Financial approvals
- Reports and analytics

TECHNICAL SUPER ADMIN
- System configuration
- User permissions
- Security
- Maintenance
- Integrations
- Technical audit logs

TEACHER
- Assigned students and batches
- Class scheduling
- Google Meet sessions
- Attendance
- Teaching materials
- Assignments and assessments

STUDENT
- Dashboard
- Enrolled courses
- Class timetable
- Online meetings
- Study resources
- Assignments and marks
- Attendance
- Fee and receipt history

Parent/guardian access can be introduced in a later phase.

---

## 6. TECHNICAL ARCHITECTURE

Frontend:
Next.js, React, TypeScript, CSS

Backend:
Next.js server-side APIs initially

Database:
PostgreSQL

Authentication:
Managed authentication with server-side role enforcement

Payments:
Razorpay, subject to account eligibility and integration review

Online meetings:
Google Calendar and Google Meet integration

Hosting:
Production hosting provider to be selected

Code management:
Git and GitHub

Monitoring:
Application errors, audit logs and uptime monitoring

Quality:
ESLint, TypeScript, automated testing, accessibility,
performance monitoring and production build verification

The architecture must remain modular and maintainable.

---

## 7. DEVELOPMENT PHASES

PHASE 1 — FOUNDATION
- Define brand guidelines
- Document requirements
- Establish project architecture
- Configure repository
- Create design system
- Build reusable components

PHASE 2 — PROFESSIONAL PUBLIC WEBSITE
- Responsive homepage
- About page
- Programmes and course pages
- Contact and enquiry system
- Admissions information
- SEO and accessibility

PHASE 3 — AUTHENTICATION AND USER MANAGEMENT
- Secure login
- Student accounts
- Teacher accounts
- Owner dashboard
- Technical admin dashboard
- Role-based access control

PHASE 4 — ACADEMIC MANAGEMENT
- Courses
- Subjects
- Batches
- Timetables
- Class scheduling
- Attendance
- Google Meet integration

PHASE 5 — LEARNING PLATFORM
- Study materials
- Assignments
- Assessments
- Marks and feedback
- Student progress
- Notifications
- Controlled communication

PHASE 6 — PAYMENTS AND FINANCE
- Fee structures
- Student invoices
- INR payment gateway
- Verified payment records
- Receipts
- Outstanding balances
- Financial reporting
- Transaction reconciliation

PHASE 7 — QUALITY AND SECURITY
- Automated tests
- End-to-end testing
- Accessibility testing
- Mobile testing
- Security review
- Privacy and safeguarding requirements
- Backup and recovery testing
- Performance optimisation

PHASE 8 — PRODUCTION
- Hosting
- Domain configuration
- HTTPS
- Deployment pipeline
- Environment configuration
- Monitoring
- Production verification
- Documentation

---

## 8. SECURITY PRINCIPLES

- Never store passwords directly.
- Never commit API keys or credentials.
- Enforce permissions on the server.
- Use multi-factor authentication for administrators.
- Keep payment verification server-side.
- Maintain financial and administrative audit trails.
- Protect student and teacher information.
- Implement appropriate safeguards for minors.
- Assess applicable Indian privacy regulations.
- Separate development and production environments.

---

## 9. DEVELOPMENT RULES

1. Follow the approved master plan.
2. Build reusable and maintainable components.
3. Keep branding consistent.
4. Avoid unnecessary dependencies.
5. Do not create fake functionality.
6. Do not connect production payments during design work.
7. Validate every major change.
8. Keep the public repository free of secrets and personal data.
9. Run lint and build checks before merging.
10. Document important architectural decisions.
11. Work incrementally without compromising long-term quality.
12. Use one complete Terminal command block for local changes.
13. Keep the main branch deployable.

---

## 10. CURRENT PRIORITY

The existing homepage is an early prototype.

It requires a professional design revision before we expand
the platform.

Next development objective:

- Replace the repeated logo hero graphic.
- Create a premium education-focused visual hierarchy.
- Improve typography and whitespace.
- Improve the navigation and course presentation.
- Create consistent, reusable UI components.
- Establish a professional design system.
- Test desktop and mobile layouts.
- Preserve the existing logo asset.
- Complete and approve the public homepage before
  starting authentication or administration features.

---

## 11. DEFINITION OF DONE

A feature is complete only when:

- It works as intended.
- It is responsive.
- It meets accessibility requirements.
- It passes lint and TypeScript checks.
- The production build succeeds.
- Relevant automated tests pass.
- It does not introduce known security problems.
- Its relevant documentation is updated.

This document is the source of truth for Future Minds.
