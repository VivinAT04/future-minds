BEGIN;

INSERT INTO education_boards (code, name)
VALUES
  ('CBSE', 'Central Board of Secondary Education'),
  ('CISCE', 'Council for the Indian School Certificate Examinations'),
  ('TN_STATE', 'Tamil Nadu State Board'),
  ('MATRIC', 'Matriculation'),
  ('OTHER_STATE', 'Other State Boards')
ON CONFLICT (code) DO NOTHING;

INSERT INTO academic_disciplines (code, name)
VALUES
  ('SCHOOL', 'School Education'),
  ('ENTRANCE', 'Competitive Entrance Preparation'),
  ('CSE', 'Computer Science Engineering'),
  ('IT', 'Information Technology'),
  ('AI_DS', 'Artificial Intelligence and Data Science'),
  ('ECE', 'Electronics and Communication Engineering'),
  ('EEE', 'Electrical and Electronics Engineering'),
  ('MECH', 'Mechanical Engineering'),
  ('CIVIL', 'Civil Engineering'),
  ('BIOMED', 'Biomedical Engineering'),
  ('BIOTECH', 'Biotechnology'),
  ('CHEMICAL', 'Chemical Engineering'),
  ('AERO', 'Aerospace Engineering'),
  ('AUTO', 'Automobile Engineering'),
  ('MECHATRONICS', 'Mechatronics'),
  ('ROBOTICS', 'Robotics and Automation')
ON CONFLICT (code) DO NOTHING;

INSERT INTO subjects (code, name)
VALUES
  ('MATH', 'Mathematics'),
  ('PHYSICS', 'Physics'),
  ('CHEMISTRY', 'Chemistry'),
  ('BIOLOGY', 'Biology'),
  ('SCIENCE', 'General Science'),
  ('TAMIL', 'Tamil'),
  ('ENGLISH', 'English'),
  ('HINDI', 'Hindi'),
  ('SOCIAL', 'Social Science'),
  ('COMPUTER_SCIENCE', 'Computer Science'),
  ('ACCOUNTANCY', 'Accountancy'),
  ('COMMERCE', 'Commerce'),
  ('BOTANY', 'Botany'),
  ('ZOOLOGY', 'Zoology'),
  ('ENGINEERING_MATH', 'Engineering Mathematics'),
  ('PROGRAMMING', 'Programming'),
  ('DATA_STRUCTURES', 'Data Structures'),
  ('ENGINEERING_MECHANICS', 'Engineering Mechanics'),
  ('DIGITAL_ELECTRONICS', 'Digital Electronics')
ON CONFLICT (code) DO NOTHING;

COMMIT;
