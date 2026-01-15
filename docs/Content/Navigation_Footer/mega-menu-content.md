# Smart Academy - Mega Menu Content

**Document Version:** 1.0  
**Last Updated:** January 8, 2026  
**Purpose:** Define detailed mega menu structures and content for Smart Academy website  
**Development Environment:** Linux OS, VSCode IDE, Local Database, Vite, HMR  

---

## Table of Contents

1. [Overview](#overview)
2. [Mega Menu Design Principles](#mega-menu-design-principles)
3. [About Mega Menu](#about-mega-menu)
4. [Admissions Mega Menu](#admissions-mega-menu)
5. [Academics Mega Menu](#academics-mega-menu)
6. [Islamic Studies Mega Menu](#islamic-studies-mega-menu)
7. [Student Life Mega Menu](#student-life-mega-menu)
8. [Portal Dropdown Menu](#portal-dropdown-menu)
9. [Implementation Guidelines](#implementation-guidelines)
10. [Content Management](#content-management)

---

## Overview

### Purpose
This document provides comprehensive content specifications for all mega menu dropdowns on the Smart Academy website, ensuring rich, informative, and accessible navigation experiences.

### What are Mega Menus?
Mega menus are large, multi-column dropdown panels that display extensive navigation options, featured content, and visual elements in an organized, scannable format.

### Benefits of Mega Menus
- **Better Information Architecture**: Display complex site structures clearly
- **Improved Discoverability**: Help users find content quickly
- **Visual Engagement**: Include images, icons, and featured content
- **Reduced Clicks**: Direct access to deep pages
- **Enhanced UX**: Clearer path to desired information

---

## Mega Menu Design Principles

### Visual Design Standards

**Layout Specifications:**
```
┌────────────────────────────────────────────────────────────┐
│  Navigation Bar (Dark text on white background)           │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ┌──────────────┬──────────────┬──────────────┬─────────┐ │
│  │ Column 1     │ Column 2     │ Column 3     │ Featured│ │
│  │              │              │              │ Content │ │
│  │ • Link 1     │ • Link 1     │ • Link 1     │         │ │
│  │ • Link 2     │ • Link 2     │ • Link 2     │ [Image] │ │
│  │ • Link 3     │ • Link 3     │ • Link 3     │         │ │
│  │ • Link 4     │ • Link 4     │ • Link 4     │ [CTA]   │ │
│  │              │              │              │         │ │
│  └──────────────┴──────────────┴──────────────┴─────────┘ │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

**Dimensions:**
- **Width**: Full container width, max 1200px
- **Height**: Auto-adjust based on content
- **Column Width**: Equal distribution or custom
- **Padding**: 30px all sides
- **Gutter**: 20px between columns

**Typography:**
- **Section Headings**: 16px, Bold, Primary Green (#2E7D32)
- **Links**: 14px, Regular, Dark Gray (#333333)
- **Descriptions**: 12px, Light, Gray (#666666)
- **Line Height**: 1.5 for readability

**Colors:**
- **Background**: White (#FFFFFF)
- **Hover**: Light Green (#E8F5E9)
- **Borders**: Light Gray (#E0E0E0)
- **Shadows**: Subtle (0 4px 8px rgba(0,0,0,0.1))

**Icons:**
- **Size**: 20px × 20px
- **Style**: Line icons, consistent style
- **Color**: Primary Green or context-appropriate
- **Placement**: Left of text labels

### Interaction Behavior

**Trigger:**
- Desktop: Hover over menu item
- Mobile: Tap/click menu item
- Keyboard: Arrow keys to navigate

**Animation:**
- **Entry**: Fade in + slide down (0.3s)
- **Exit**: Fade out (0.2s)
- **Delay**: 100ms before showing, 300ms before hiding

**Accessibility:**
- Keyboard navigable
- Screen reader announcements
- Focus management
- ESC key to close

---

## About Mega Menu

### Menu Trigger
**Label:** About  
**Icon:** ℹ️  
**Trigger:** Hover/Click on "About" in main navigation

### Layout Structure
**Columns:** 3 main columns + 1 featured content area  
**Width:** 1100px (responsive)

---

### Column 1: Our Story

**Section Header:** 🏫 **Our Story**

#### Our Foundation
**URL:** `/about/foundation`  
**Description:** Learn about Smart Academy's establishment by Smart Foundation in 2020  
**Icon:** 🌟  

**Preview Text (on hover):**
"Founded in 2020 to provide quality education to underprivileged children in rural Bangladesh"

#### Vision, Mission & Values
**URL:** `/about/vision-mission`  
**Description:** Our educational philosophy and core Islamic values  
**Icon:** 🎯  

**Preview Text:**
"Faith, Excellence, Knowledge, Compassion, Integrity, Innovation, and Service"

#### Why Choose Smart Academy
**URL:** `/about/why-choose-us`  
**Description:** 10 compelling reasons to join our community  
**Icon:** ⭐  

**Preview Text:**
"Islamic values + STEAM education + Modern technology in rural Bangladesh"

**Highlights Box:**
```
✓ 500+ Students
✓ 40+ Qualified Teachers
✓ 96% Retention Rate
✓ 100% English Medium
✓ 25% on Scholarships
```

#### Accreditation & Recognition
**URL:** `/about/accreditation`  
**Description:** Our certifications and achievements  
**Icon:** 🏆  

**Preview Text:**
"Approved by Bangladesh Ministry of Education. Multiple district-level awards."

---

### Column 2: Leadership & Team

**Section Header:** 👥 **Leadership & Team**

#### Message from Principal
**URL:** `/about/principal-message`  
**Description:** Personal welcome from our school leader  
**Icon:** 💼  

**Preview Text:**
"Welcome to Smart Academy, where we nurture minds and strengthen faith"

#### Board of Directors
**URL:** `/about/board-of-directors`  
**Description:** Meet our governance team  
**Icon:** 🤝  

**Preview Text:**
"Experienced leaders guiding Smart Academy's strategic vision"

**Quick List:**
- Chairman: [Name]
- Vice Chairman: [Name]
- Secretary: [Name]
- Members: 7 distinguished professionals

#### Administrative Staff
**URL:** `/about/administrative-staff`  
**Description:** Our dedicated office and support team  
**Icon:** 🏢  

**Preview Text:**
"Professional staff ensuring smooth daily operations"

**Departments:**
- Administration
- Academics
- Accounts & Finance
- IT Support
- Transport
- Facilities Management

#### Our Faculty
**URL:** `/about/faculty`  
**Description:** Meet our passionate and qualified teachers  
**Icon:** 👨‍🏫  

**Preview Text:**
"40+ educators with average 8+ years experience. 100% trained in STEAM pedagogy."

**Quick Stats:**
```
Master's Degree:     45%
Bachelor's Degree:   55%
Islamic Scholars:    12
Tech Certified:      28
```

---

### Column 3: Campus & Facilities

**Section Header:** 🏫 **Campus & Facilities**

#### Virtual Campus Tour
**URL:** `/about/campus-tour`  
**Description:** Explore our campus online  
**Icon:** 🎥  

**Preview Text:**
"360° virtual tour and video walkthroughs of our modern facilities"

**CTA:** [Start Virtual Tour →]

#### Facilities & Infrastructure
**URL:** `/about/facilities`  
**Description:** State-of-the-art learning environment  
**Icon:** 🏗️  

**Preview Text:**
"Smart classrooms, computer labs, science labs, prayer halls, sports fields, and more"

**Facility Highlights:**
- 🖥️ Smart Classrooms (15)
- 💻 Computer Labs (2)
- 🔬 Science Laboratories (3)
- 🕌 Prayer Halls (2)
- 📚 Digital Library
- 🏃 Sports Complex
- 🚌 GPS-Tracked Buses (8)

#### Quick Facts at a Glance
**URL:** `/about/quick-facts`  
**Description:** Smart Academy by the numbers  
**Icon:** 📊  

**Quick Facts Display:**
```
📅 Est. 2020
👨‍🎓 500+ Students
👨‍🏫 40+ Faculty
📍 Narimpur, Laxmipur
🏆 15+ Awards
📕 15 Huffaz Completed
🚌 8 Bus Routes
```

---

### Featured Content Area (Right Side)

**Width:** 300px  
**Background:** Light gradient or subtle pattern

#### Campus Life Video Card

**Design:**
```
┌───────────────────────┐
│                       │
│   [Video Thumbnail]   │
│   [Play Button ▶️]    │
│                       │
├───────────────────────┤
│ Experience Smart      │
│ Academy               │
├───────────────────────┤
│ Take a visual tour    │
│ of our campus, meet   │
│ our students and      │
│ faculty.              │
│                       │
│ [Watch Now →]         │
└───────────────────────┘
```

**Video Details:**
- Duration: 2 minutes
- Content: Campus overview, classrooms, activities
- Call-to-Action: "Watch Now"

#### Quick Action Buttons

**Button 1: Schedule Campus Visit**
- Style: Primary green button
- Icon: 📅
- Action: Opens booking form
- Text: "Schedule Campus Visit"

**Button 2: Download Prospectus**
- Style: Outlined button
- Icon: 📄
- Action: Downloads PDF
- Text: "Download Prospectus"

#### Recent Achievements Badge

**Design:**
```
┌───────────────────────┐
│     🏆               │
│  Latest Achievement   │
│                       │
│ "1st Place District  │
│  Science Fair 2025"   │
│                       │
│ [View All →]         │
└───────────────────────┘
```

---

## Admissions Mega Menu

### Menu Trigger
**Label:** Admissions  
**Icon:** 📋  
**Trigger:** Hover/Click on "Admissions" in main navigation

### Layout Structure
**Columns:** 3 main columns + 1 featured CTA area  
**Width:** 1100px (responsive)  
**Special:** Admissions-focused with enrollment urgency

---

### Column 1: Getting Started

**Section Header:** 🚀 **Getting Started**

#### Admission Overview
**URL:** `/admissions/overview`  
**Description:** Everything you need to know about joining Smart Academy  
**Icon:** 📖  

**Preview Text:**
"Welcome prospective families! Learn why Smart Academy is the right choice."

**Quick Info:**
```
Current Enrollment: Open
Available Seats: Limited
Next Session: April 2026
Deadline: March 15, 2026
```

#### Admission Process
**URL:** `/admissions/process`  
**Description:** Step-by-step guide to enrollment  
**Icon:** 📝  

**Preview Text:**
"Simple 6-step process from application to enrollment"

**Steps Preview:**
```
1️⃣ Submit Application
2️⃣ Document Verification
3️⃣ Entrance Assessment
4️⃣ Parent Interview
5️⃣ Admission Decision
6️⃣ Enrollment & Orientation
```

#### How to Apply Online
**URL:** `/admissions/apply`  
**Description:** Start your application now  
**Icon:** 💻  

**Preview Text:**
"Quick online application form. Takes only 10 minutes."

**Badge:** 🔥 **APPLY NOW - Open**

#### Important Dates & Deadlines
**URL:** `/admissions/dates`  
**Description:** Key admission timeline  
**Icon:** 📅  

**Preview Text:**
"Mark your calendar with these important dates"

**Upcoming Dates:**
```
Open House:       Jan 20, 2026
Application Due:  Mar 15, 2026
Assessment:       Mar 22, 2026
Results:          Mar 29, 2026
Orientation:      Apr 5, 2026
```

---

### Column 2: Requirements & Fees

**Section Header:** 💰 **Requirements & Fees**

#### Admission Requirements
**URL:** `/admissions/requirements`  
**Description:** What you need to apply  
**Icon:** ✅  

**Preview Text:**
"Age eligibility, documents needed, and academic prerequisites"

**Quick Checklist:**
```
✓ Birth Certificate
✓ Previous Report Cards
✓ Passport Photos
✓ Medical Certificate
✓ Parent ID Copies
✓ Completed Application
```

#### Tuition & Fee Structure
**URL:** `/admissions/fees`  
**Description:** Transparent pricing information  
**Icon:** 💳  

**Preview Text:**
"Affordable quality education with flexible payment plans"

**Fee Range Display:**
```
PlayGroup-KG:  60,000 - 70,000 BDT/year
Class 1-5:     70,000 - 80,000 BDT/year
Class 6-9:     80,000 - 90,000 BDT/year

✓ Includes: Tuition, Books, Lab Fees
✓ Sibling Discount: 10%
✓ Early Payment: 5% discount
```

#### Scholarships & Financial Aid
**URL:** `/admissions/scholarships`  
**Description:** Making education accessible to all  
**Icon:** 🎓  

**Preview Text:**
"25% of our students receive financial assistance"

**Types of Support:**
```
🌟 Merit Scholarship:  50-100% tuition
💙 Need-Based Aid:     30-75% tuition
📕 Hafiz Program:      Full tuition + stipend
👨‍👩‍👧 Orphan Support:   100% free education
```

**CTA:** [Check Eligibility →]

#### Transportation Services
**URL:** `/admissions/transportation`  
**Description:** Safe and convenient bus service  
**Icon:** 🚌  

**Preview Text:**
"8 GPS-tracked buses covering 15km radius"

**Coverage Areas:**
- Narimpur
- Ramganj
- Char Alexander
- Raipur
- Ramgati
- Surrounding villages

**Transport Fee:** 1,500 - 2,500 BDT/month

---

### Column 3: Support & Resources

**Section Header:** 🤝 **Support & Resources**

#### Schedule Campus Visit
**URL:** `/admissions/campus-visit`  
**Description:** See our campus in person  
**Icon:** 🏫  

**Preview Text:**
"Book a personalized tour with our admissions team"

**Visit Options:**
```
🗓️ In-Person Tour
   Mon-Sat, 10 AM - 3 PM
   Duration: 45-60 minutes

💻 Virtual Tour
   Available 24/7
   360° campus views
```

**CTA:** [Book Your Visit →]

#### Frequently Asked Questions
**URL:** `/admissions/faq`  
**Description:** Quick answers to common questions  
**Icon:** ❓  

**Preview Text:**
"Find answers about admission process, fees, curriculum, and more"

**Popular Questions:**
- What is the admission age for PlayGroup?
- Do you offer scholarships?
- What is the class size?
- Is English the only medium?
- Are there transport facilities?

**CTA:** [View All FAQs →]

#### Contact Admissions Office
**URL:** `/admissions/contact`  
**Description:** Speak with our enrollment team  
**Icon:** 📞  

**Preview Text:**
"Our admissions counselors are here to help"

**Direct Contact:**
```
📞 Phone: +8801709-651168 (Ext. 102)
📧 Email: admission@mysmart.academy
💬 WhatsApp: +8801709-651168
🕐 Hours: Sun-Thu, 9 AM - 5 PM
```

**CTA:** [Contact Us →]

#### Download Prospectus
**URL:** `/admissions/prospectus`  
**Description:** Complete admission information package  
**Icon:** 📄  

**Preview Text:**
"Comprehensive guide with all details about Smart Academy"

**Documents Available:**
```
📗 School Prospectus (PDF - 5MB)
📋 Application Form (PDF - 200KB)
📊 Fee Structure (PDF - 100KB)
📚 Academic Calendar (PDF - 150KB)
```

**CTA:** [Download All →]

---

### Featured CTA Area (Right Side)

**Width:** 300px  
**Background:** Green gradient (#2E7D32 to #1B5E20)  
**Text Color:** White

#### Primary Call-to-Action Card

**Design:**
```
┌───────────────────────────┐
│                           │
│      ✏️                   │
│                           │
│  ADMISSIONS NOW OPEN      │
│                           │
│  Join 500+ students at    │
│  Bangladesh's premier     │
│  Islamic STEAM Academy    │
│                           │
│  Limited seats available  │
│  for Academic Year        │
│  2026-2027                │
│                           │
│  ┌─────────────────────┐  │
│  │  APPLY NOW →        │  │
│  └─────────────────────┘  │
│                           │
│  Already Applied?         │
│  [Check Status →]         │
│                           │
└───────────────────────────┘
```

#### Quick Stats Box

**Design:**
```
┌───────────────────────────┐
│  Why Families Choose Us   │
├───────────────────────────┤
│                           │
│  96% Retention Rate       │
│  ★★★★★                   │
│                           │
│  25% on Scholarships      │
│  💰                       │
│                           │
│  1:25 Teacher-Student     │
│  👨‍🏫                       │
│                           │
│  100% English Medium      │
│  🌍                       │
│                           │
└───────────────────────────┘
```

#### Upcoming Open House

**Design:**
```
┌───────────────────────────┐
│   📅 Upcoming Event        │
├───────────────────────────┤
│                           │
│  Open House               │
│  Saturday, Jan 20, 2026   │
│  10:00 AM - 2:00 PM       │
│                           │
│  • Campus Tours           │
│  • Meet Faculty           │
│  • Live Demos             │
│  • Q&A Session            │
│                           │
│  [Register Now →]         │
│                           │
└───────────────────────────┘
```

---

## Academics Mega Menu

### Menu Trigger
**Label:** Academics  
**Icon:** 📚  
**Trigger:** Hover/Click on "Academics" in main navigation

### Layout Structure
**Columns:** 4 equal columns  
**Width:** 1200px (wider for more content)  
**Special:** Program-focused with curriculum highlights

---

### Column 1: Programs by Level

**Section Header:** 🎒 **Programs by Level**

#### Early Childhood Education
**URL:** `/academics/early-childhood`  
**Description:** PlayGroup, Nursery, Kindergarten (Ages 3-6)  
**Icon:** 🧸  

**Preview Text:**
"Play-based learning with Islamic values. Building strong foundations."

**Quick Info:**
```
Age Groups:
• PlayGroup (3-4 years)
• Nursery (4-5 years)
• Kindergarten (5-6 years)

Focus Areas:
✓ Islamic Foundation
✓ Language Development
✓ Math & Science Basics
✓ Social-Emotional Growth
```

#### Primary Education
**URL:** `/academics/primary`  
**Description:** Class 1-5 (Ages 6-11)  
**Icon:** 📖  

**Preview Text:**
"Foundation building through STEAM-integrated curriculum"

**Phases:**
```
Class 1-3: Foundation Building
• Core subjects mastery
• Quran memorization
• Basic STEAM concepts

Class 4-5: Skill Development
• Advanced concepts
• Project-based learning
• Technology integration
```

#### Secondary Education
**URL:** `/academics/secondary`  
**Description:** Class 6-9+ (Ages 11-15)  
**Icon:** 🎓  

**Preview Text:**
"Preparing for SSC and beyond with comprehensive education"

**Streams:**
```
Class 6-8: Lower Secondary
• Subject specialization
• Advanced STEAM
• Career exploration

Class 9-10: SSC Preparation
• Board exam focus
• College readiness
• Leadership development
```

#### Future Expansion
**URL:** `/academics/future-plans`  
**Description:** Class 11-12 HSC Program (Coming Soon)  
**Icon:** 🚀  

**Preview Text:**
"Planned expansion to complete secondary education"

**Timeline:** Launch targeted for 2027

---

### Column 2: STEAM Education

**Section Header:** 🔬 **STEAM Education**

#### STEAM Philosophy
**URL:** `/academics/steam-philosophy`  
**Description:** Why and how we integrate STEAM  
**Icon:** 💡  

**Preview Text:**
"Science, Technology, Engineering, Arts, Mathematics - integrated learning"

**Why STEAM:**
```
✓ Real-world problem-solving
✓ Critical thinking
✓ Creativity & innovation
✓ Collaboration skills
✓ 21st-century readiness
```

#### Science Program
**URL:** `/academics/science`  
**Description:** Hands-on scientific exploration  
**Icon:** 🔬  

**Preview Text:**
"Modern laboratories, experiments, science fairs, and research projects"

**Facilities:**
- Physics Lab
- Chemistry Lab
- Biology Lab
- Science Fair (Annual)

#### Technology & Coding
**URL:** `/academics/technology`  
**Description:** Digital literacy and programming  
**Icon:** 💻  

**Preview Text:**
"From basic computer skills to advanced coding and robotics"

**Programs:**
```
Primary: Scratch, Basic Coding
Secondary: Python, Web Dev
Clubs: Robotics, App Development
Tools: Modern computer labs
```

#### Engineering & Design
**URL:** `/academics/engineering`  
**Description:** Design thinking and problem-solving  
**Icon:** ⚙️  

**Preview Text:**
"Building, creating, and innovating through engineering challenges"

**Activities:**
- Design challenges
- Maker space projects
- Robotics competitions
- Engineering club

#### Arts Integration
**URL:** `/academics/arts`  
**Description:** Creativity in STEAM learning  
**Icon:** 🎨  

**Preview Text:**
"Islamic calligraphy, visual arts, music (nasheeds), and creative expression"

**Arts Programs:**
- Islamic Calligraphy
- Drawing & Painting
- Crafts & Design
- Nasheed Performances

#### Mathematics Excellence
**URL:** `/academics/mathematics`  
**Description:** Problem-solving and logical thinking  
**Icon:** 🔢  

**Preview Text:**
"From basic numeracy to advanced problem-solving"

**Highlights:**
- Math competitions
- Olympiad preparation
- Enrichment programs
- Practical applications

---

### Column 3: Core Subjects

**Section Header:** 📝 **Core Subjects**

#### English Language Arts
**URL:** `/academics/english`  
**Description:** Reading, writing, speaking, listening  
**Icon:** 🅰️  

**Preview Text:**
"100% English medium with comprehensive language development"

**Components:**
- Reading fluency
- Creative writing
- Grammar & composition
- Public speaking
- Literature appreciation

#### Bengali Language
**URL:** `/academics/bengali`  
**Description:** Mother tongue preservation  
**Icon:** 🇧🇩  

**Preview Text:**
"Maintaining cultural identity through Bengali language and literature"

**Focus:**
- Reading & writing
- Bengali literature
- Cultural heritage
- National history

#### Mathematics Curriculum
**URL:** `/academics/math-curriculum`  
**Description:** Complete math program details  
**Icon:** ➕  

**Preview Text:**
"Comprehensive math curriculum from basic to advanced"

**Topics by Level:**
- Primary: Operations, fractions, geometry basics
- Secondary: Algebra, geometry, trigonometry

#### Science Curriculum
**URL:** `/academics/science-curriculum`  
**Description:** Integrated science learning  
**Icon:** 🧪  

**Preview Text:**
"Physics, Chemistry, Biology, Environmental Science"

**Approach:**
- Inquiry-based learning
- Hands-on experiments
- Real-world connections
- Lab work

#### Social Studies
**URL:** `/academics/social-studies`  
**Description:** Bangladesh & Global Studies  
**Icon:** 🌍  

**Preview Text:**
"Understanding our country, culture, and the world"

**Content:**
- Bangladesh history
- Geography
- Civics
- World affairs

#### Physical Education
**URL:** `/academics/physical-education`  
**Description:** Health, fitness, and sports  
**Icon:** ⚽  

**Preview Text:**
"Building healthy bodies and teamwork skills"

**Activities:**
- Team sports
- Individual fitness
- Swimming (planned)
- Martial arts

---

### Column 4: Resources & Support

**Section Header:** 📚 **Resources & Support**

#### Assessment System
**URL:** `/academics/assessment`  
**Description:** How we evaluate student progress  
**Icon:** 📊  

**Preview Text:**
"Continuous assessment, examinations, and comprehensive reporting"

**Assessment Types:**
```
✓ Formative Assessment
✓ Summative Exams
✓ Project Evaluation
✓ Practical Tests
✓ Quran Recitation Tests
✓ Portfolio Assessment
```

#### Academic Calendar
**URL:** `/academics/calendar`  
**Description:** Term schedule and important dates  
**Icon:** 📅  

**Preview Text:**
"Academic year structure, holidays, exam schedules"

**Quick View:**
```
Term 1: April - August
Term 2: September - December
Term 3: January - March

Download Full Calendar →
```

#### Learning Resources
**URL:** `/academics/resources`  
**Description:** Digital and physical learning materials  
**Icon:** 📖  

**Preview Text:**
"Access to books, e-learning platforms, educational software"

**Resources:**
- Digital library (5000+ books)
- E-learning platforms
- Educational videos
- Practice worksheets
- Research databases

#### Academic Support Services
**URL:** `/academics/support`  
**Description:** Extra help for students who need it  
**Icon:** 🆘  

**Preview Text:**
"Tutoring, remedial classes, enrichment programs"

**Support Options:**
```
• After-school tutoring
• Remedial classes
• Enrichment programs
• Gifted student programs
• Special education support
• Academic counseling
```

#### Curriculum Downloads
**URL:** `/academics/curriculum-downloads`  
**Description:** Detailed curriculum documents  
**Icon:** ⬇️  

**Preview Text:**
"Download comprehensive curriculum guides by grade and subject"

**Available Downloads:**
- Grade-wise curriculum (PDF)
- Subject syllabi
- Learning outcomes
- Scope and sequence

#### Parent Resources
**URL:** `/academics/parent-resources`  
**Description:** Supporting learning at home  
**Icon:** 👨‍👩‍👧  

**Preview Text:**
"Tips and resources for parents to support their children's education"

**Resources:**
- Home learning guides
- Activity suggestions
- Reading lists
- Educational websites

---

## Islamic Studies Mega Menu

### Menu Trigger
**Label:** Islamic Studies  
**Icon:** ☪️  
**Trigger:** Hover/Click on "Islamic Studies" in main navigation

### Layout Structure
**Columns:** 3 columns + Featured content  
**Width:** 1100px  
**Special:** Islamic theme with green accents

---

### Column 1: Quranic Education

**Section Header:** 📕 **Quranic Education**

#### Quran Memorization (Hifz)
**URL:** `/islamic-studies/quran-memorization`  
**Description:** Comprehensive Hifz program  
**Icon:** 📗  

**Preview Text:**
"Structured program to memorize the complete Quran with qualified Huffaz"

**Program Highlights:**
```
✓ Qualified Instructors (Huffaz)
✓ Small Group Classes
✓ Daily Revision Sessions
✓ Progress Tracking
✓ Completion Certificates
✓ Full Scholarship Available

Current: 45 Students in Hifz
Completed: 15 Huffaz (2020-2025)
```

**CTA:** [Learn About Hifz Program →]

#### Tajweed & Recitation
**URL:** `/islamic-studies/tajweed`  
**Description:** Proper Quranic pronunciation  
**Icon:** 🗣️  

**Preview Text:**
"Learn to recite the Quran beautifully with correct tajweed rules"

**What You'll Learn:**
- Makharij (articulation points)
- Tajweed rules
- Recitation styles (Qira'at)
- Beautification of recitation
- Competitions preparation

#### Quran Understanding (Tafsir)
**URL:** `/islamic-studies/quran-understanding`  
**Description:** Age-appropriate Quran comprehension  
**Icon:** 💭  

**Preview Text:**
"Understanding the meanings and teachings of the Quran"

**Approach:**
- Story-based learning
- Contextual understanding
- Life application
- Daily reflection
- Moral lessons

#### Arabic Language for Quran
**URL:** `/islamic-studies/quranic-arabic`  
**Description:** Classical Arabic to understand Quran  
**Icon:** 🔤  

**Preview Text:**
"Learn the language of the Quran from basics to advanced"

**Curriculum:**
```
Primary: Alphabet, basic words
Secondary: Grammar, translation
Advanced: Classical texts
```

---

### Column 2: Islamic Curriculum

**Section Header:** 📚 **Islamic Curriculum**

#### Islamic Studies Overview
**URL:** `/islamic-studies/curriculum`  
**Description:** Comprehensive Islamic education program  
**Icon:** 📋  

**Preview Text:**
"Grade-wise Islamic curriculum integrated with modern education"

**Components by Level:**
```
PlayGroup-KG:
• Basic prayers
• Islamic stories
• Good manners

Class 1-5:
• Quran recitation
• Fiqh basics
• Seerah
• Duas & Azkaar

Class 6-9:
• Advanced Fiqh
• Hadith studies
• Islamic history
• Contemporary issues
```

#### Fiqh (Islamic Jurisprudence)
**URL:** `/islamic-studies/fiqh`  
**Description:** Learning Islamic rulings  
**Icon:** ⚖️  

**Preview Text:**
"Practical Islamic knowledge for daily life"

**Topics Covered:**
- Taharah (Purification)
- Salah (Prayer)
- Sawm (Fasting)
- Zakat (Charity)
- Halal & Haram
- Social transactions

#### Seerah (Prophet's Biography)
**URL:** `/islamic-studies/seerah`  
**Description:** Life and teachings of Prophet Muhammad ﷺ  
**Icon:** 🕌  

**Preview Text:**
"Learning from the best example for humanity"

**Curriculum:**
- Early life and prophethood
- Makkan period
- Hijrah and Madinan period
- Battles and diplomacy
- Last sermon and legacy
- Character and morals

#### Hadith Studies
**URL:** `/islamic-studies/hadith`  
**Description:** Sayings and actions of the Prophet ﷺ  
**Icon:** 📜  

**Preview Text:**
"Selected authentic ahadith for character building"

**Collections Studied:**
- 40 Hadith for children
- Riyad as-Salihin
- Selected from Sahih Bukhari
- Selected from Sahih Muslim

#### Islamic History
**URL:** `/islamic-studies/islamic-history`  
**Description:** Rich Islamic heritage and civilization  
**Icon:** 🏛️  

**Preview Text:**
"From the companions to modern Muslim contributions"

**Topics:**
- Sahaba (Companions)
- Four Caliphs
- Islamic golden age
- Muslim scientists
- Islamic architecture
- Contemporary Islam

#### Akhlaq (Islamic Ethics)
**URL:** `/islamic-studies/akhlaq`  
**Description:** Character and moral development  
**Icon:** ❤️  

**Preview Text:**
"Building noble character through Islamic teachings"

**Values Taught:**
- Honesty (Siddiq)
- Trustworthiness (Ameen)
- Patience (Sabr)
- Gratitude (Shukr)
- Respect
- Humility

---

### Column 3: Practice & Community

**Section Header:** 🕌 **Practice & Community**

#### Prayer Facilities
**URL:** `/islamic-studies/prayer-facilities`  
**Description:** On-campus mosques and prayer areas  
**Icon:** 🕋  

**Preview Text:**
"Dedicated prayer spaces for boys and girls"

**Facilities:**
```
Boys' Prayer Hall: Capacity 200
Girls' Prayer Hall: Capacity 150
Wudu Areas: Separate, modern
Prayer Times: Displayed digitally
Jumu'ah: Every Friday
```

#### Daily Islamic Practice
**URL:** `/islamic-studies/daily-practice`  
**Description:** Incorporating Islam in daily school life  
**Icon:** ☀️  

**Preview Text:**
"Living Islam every day at Smart Academy"

**Daily Practices:**
```
Morning Assembly:
• Quran recitation
• Du'a
• Islamic reminder

Throughout Day:
• 5 daily prayers
• Islamic etiquettes
• Bismillah before activities
• Good character

Before Leaving:
• Evening du'a
• Salaam to teachers
```

#### Islamic Events & Celebrations
**URL:** `/islamic-studies/events`  
**Description:** Special occasions and activities  
**Icon:** 🎊  

**Preview Text:**
"Celebrating Islamic heritage and occasions"

**Annual Events:**
```
📅 Ramadan Activities:
• Taraweeh prayers
• Iftar gatherings
• Quran competition
• Charity drives

🎉 Eid Celebrations:
• Eid prayers
• Cultural programs
• Gift distribution

📕 Quran Week:
• Recitation competitions
• Hifz achievements
• Tajweed workshops

🕌 Mawlid:
• Seerah programs
• Nasheed performances
• Character discussions
```

#### Community Service (Khidmah)
**URL:** `/islamic-studies/community-service`  
**Description:** Serving community as Islamic duty  
**Icon:** 🤲  

**Preview Text:**
"Teaching responsibility through service"

**Programs:**
```
Zakat & Sadaqah:
• Understanding charity
• Collection drives
• Distribution to needy

Volunteer Work:
• Helping elderly
• Clean-up campaigns
• Food distribution
• Visiting orphanages

Social Responsibility:
• Environmental care
• Helping neighbors
• Community development
```

---

### Featured Content (Right Side)

**Width:** 300px  
**Background:** Subtle Islamic pattern

#### Hafiz Achievement Showcase

**Design:**
```
┌─────────────────────────────┐
│          📕                 │
│                             │
│   Hafiz Achievement         │
│   Gallery                   │
│                             │
│   15 Students Completed     │
│   Quran Memorization        │
│                             │
│   [Photo Collage]          │
│                             │
│   "My journey to becoming   │
│   a Hafiz at Smart Academy  │
│   was beautiful"            │
│   - Ayesha, Class 8         │
│                             │
│   [Read Success Stories →]  │
│                             │
└─────────────────────────────┘
```

#### Prayer Times Widget

**Design:**
```
┌─────────────────────────────┐
│   Today's Prayer Times      │
│   Narimpur, Laxmipur        │
├─────────────────────────────┤
│   Fajr:     5:15 AM ✓      │
│   Dhuhr:   12:30 PM ✓      │
│   Asr:      4:15 PM         │
│   Maghrib:  5:45 PM         │
│   Isha:     7:00 PM         │
│                             │
│   [Full Month Schedule →]   │
└─────────────────────────────┘
```

#### Islamic Quote of the Day

**Design:**
```
┌─────────────────────────────┐
│        ✨                   │
│                             │
│   "The best among you       │
│   are those who learn       │
│   the Quran and teach it"   │
│                             │
│   - Prophet Muhammad ﷺ      │
│   (Sahih Bukhari)           │
│                             │
└─────────────────────────────┘
```

---

## Student Life Mega Menu

### Menu Trigger
**Label:** Student Life  
**Icon:** 🎓  
**Trigger:** Hover/Click on "Student Life" in main navigation

### Layout Structure
**Columns:** 3 equal columns  
**Width:** 1100px  
**Special:** Activity-focused with vibrant imagery

---

### Column 1: Daily Experience

**Section Header:** ☀️ **Daily Experience**

#### Daily Schedule
**URL:** `/student-life/daily-schedule`  
**Description:** A typical day at Smart Academy  
**Icon:** ⏰  

**Preview Text:**
"From morning assembly to afternoon dismissal - see how we spend our day"

**Sample Schedule:**
```
8:00 AM  - Morning Assembly
8:15 AM  - Fajr Prayer
8:30 AM  - Period 1
9:15 AM  - Period 2
10:00 AM - Snack Break
10:15 AM - Period 3
11:00 AM - Period 4
11:45 AM - Dhuhr Prayer
12:00 PM - Lunch
12:30 PM - Period 5
1:15 PM  - Period 6
2:00 PM  - Activities/Sports
3:00 PM  - Dismissal
```

#### School Culture & Values
**URL:** `/student-life/culture`  
**Description:** What makes our community special  
**Icon:** 💚  

**Preview Text:**
"Respectful, inclusive, Islamic environment where every student thrives"

**Our Culture:**
- Islamic values in action
- Respect for all
- No bullying tolerance
- Academic excellence
- Character development
- Community spirit

#### Cafeteria & Nutrition
**URL:** `/student-life/cafeteria`  
**Description:** Healthy, halal meals  
**Icon:** 🍎  

**Preview Text:**
"Nutritious meals prepared with care. 100% halal certified."

**Meal Programs:**
```
Breakfast: Optional (7:30 AM)
Snack: Provided (10:00 AM)
Lunch: Hot meals available
Options: Vegetarian, special diets
```

#### Health & Safety
**URL:** `/student-life/health-safety`  
**Description:** Safe, secure, healthy environment  
**Icon:** 🏥  

**Preview Text:**
"Full-time nurse, first aid, emergency protocols, COVID-19 safety"

**Services:**
- Medical room
- First aid
- Health screenings
- Emergency response
- Parent notification

---

### Column 2: Activities & Enrichment

**Section Header:** 🎯 **Activities & Enrichment**

#### Extracurricular Activities
**URL:** `/student-life/extracurriculars`  
**Description:** Beyond the classroom  
**Icon:** 🎭  

**Preview Text:**
"After-school programs for every interest"

**Available Activities:**
```
Academic:
• Debate club
• Math club
• Science club
• Reading club

Creative:
• Art club
• Calligraphy
• Drama
• Nasheeds

Tech:
• Robotics
• Coding club
• Digital design

Islamic:
• Quran club
• Islamic studies circle
• Community service
```

#### Sports Programs
**URL:** `/student-life/sports`  
**Description:** Building healthy bodies and teamwork  
**Icon:** ⚽  

**Preview Text:**
"Multiple sports with trained coaches"

**Sports Offered:**
- Cricket
- Football
- Basketball
- Badminton
- Table tennis
- Track & field
- Swimming (planned)

**Competitions:**
- Inter-house tournaments
- Inter-school matches
- District championships

#### Arts & Culture
**URL:** `/student-life/arts-culture`  
**Description:** Creative expression programs  
**Icon:** 🎨  

**Preview Text:**
"Nurturing creativity through Islamic and modern arts"

**Programs:**
- Islamic calligraphy
- Drawing & painting
- Crafts
- Drama & theater
- Cultural performances
- Annual art exhibition

#### Clubs & Societies
**URL:** `/student-life/clubs`  
**Description:** Special interest groups  
**Icon:** 🏆  

**Preview Text:**
"Join a club that matches your passion"

**Active Clubs:**
```
✓ Science & Innovation Club
✓ Robotics Club
✓ Debate Society
✓ Environmental Club
✓ Quran Memorization Circle
✓ Leadership Club
✓ Community Service Team
✓ Technology Club
✓ Sports Committee
```

#### Competitions & Events
**URL:** `/student-life/competitions`  
**Description:** Showcase your talents  
**Icon:** 🏅  

**Preview Text:**
"Regular opportunities to compete and excel"

**Annual Events:**
- Science Fair
- Math Olympiad
- Spelling Bee
- Quran Competition
- Sports Day
- Cultural Festival
- Speech Contest
- Art Exhibition

---

### Column 3: Support & Recognition

**Section Header:** 🌟 **Support & Recognition**

#### Counseling Services
**URL:** `/student-life/counseling`  
**Description:** Academic and emotional support  
**Icon:** 💬  

**Preview Text:**
"Professional counselors available for students and families"

**Services:**
```
Academic Counseling:
• Study skills
• Time management
• Course selection
• Goal setting

Emotional Support:
• Stress management
• Peer conflicts
• Family issues
• Self-confidence

Career Guidance:
• Career exploration
• College prep
• Skills assessment
```

**Confidential:** All sessions private

#### Special Education Support
**URL:** `/student-life/special-education`  
**Description:** Inclusive education for all abilities  
**Icon:** ♿  

**Preview Text:**
"Supporting students with diverse learning needs"

**Support Services:**
- Individual Education Plans (IEPs)
- Learning disability support
- Gifted student programs
- ESL support
- Behavioral support
- Resource room

#### Library Services
**URL:** `/student-life/library`  
**Description:** Physical and digital resources  
**Icon:** 📚  

**Preview Text:**
"5000+ books plus digital resources"

**Features:**
```
Collections:
• Fiction & non-fiction
• Islamic books
• Reference materials
• Periodicals
• E-books

Services:
• Book borrowing
• Reading programs
• Research assistance
• Study spaces
• Computer access
```

**Hours:** 8 AM - 4 PM daily

#### Student Government
**URL:** `/student-life/student-government`  
**Description:** Student leadership and voice  
**Icon:** 🎙️  

**Preview Text:**
"Elected representatives serving the student body"

**Structure:**
- President
- Vice President
- Secretary
- Class Representatives
- Committee Members

**Responsibilities:**
- Student advocacy
- Event planning
- School improvement
- Community service

#### Achievements & Recognition
**URL:** `/student-life/achievements`  
**Description:** Celebrating student success  
**Icon:** 🏆  

**Preview Text:**
"Awards, honors, and accomplishments"

**Recognition Programs:**
```
Academic:
• Honor Roll
• Perfect Attendance
• Subject Excellence

Character:
• Good Citizen Award
• Leadership Award
• Community Service Award

Special:
• Hafiz Completion
• Competition Winners
• School Representatives
```

---

## Portal Dropdown Menu

### Menu Trigger
**Label:** Portal  
**Icon:** 🔐  
**Trigger:** Click on "Portal" in main navigation

### Layout Structure
**Type:** Simple dropdown list (not mega menu)  
**Width:** 250px  
**Position:** Right-aligned under Portal button

---

### Dropdown Structure

```
┌─────────────────────────────┐
│  👨‍👩‍👧‍👦 Parent Portal           │
│  Access student information │
│  [Login →]                  │
├─────────────────────────────┤
│  🎓 Student Portal          │
│  View assignments & grades  │
│  [Login →]                  │
├─────────────────────────────┤
│  👨‍🏫 Teacher Portal          │
│  Manage classes & grades    │
│  [Login →]                  │
├─────────────────────────────┤
│  🎓 Alumni Portal           │
│  Stay connected             │
│  [Login →]                  │
└─────────────────────────────┘
```

---

### Portal Options Details

#### Parent Portal
**URL:** `/portal/parent`  
**Icon:** 👨‍👩‍👧‍👦  
**Description:** Access student information  

**Features:**
- Student attendance
- Grade reports
- Fee management
- Teacher communication
- Event calendar
- Announcements

**Login Requirements:**
- Parent ID
- Password
- [Forgot Password]
- [New User Registration]

---

#### Student Portal
**URL:** `/portal/student`  
**Icon:** 🎓  
**Description:** View assignments and grades  

**Features:**
- Class schedule
- Assignments
- Grades & reports
- Digital library
- Submit homework
- Announcements

**Login Requirements:**
- Student ID
- Password
- [Forgot Password]

---

#### Teacher Portal
**URL:** `/portal/teacher`  
**Icon:** 👨‍🏫  
**Description:** Manage classes and grades  

**Features:**
- Attendance marking
- Grade book
- Lesson planning
- Student progress
- Parent communication
- Resource library

**Login Requirements:**
- Staff ID
- Password
- [Forgot Password]

---

#### Alumni Portal
**URL:** `/portal/alumni`  
**Icon:** 🎓  
**Description:** Stay connected  

**Features:**
- Alumni directory
- Events & reunions
- Career network
- Mentorship program
- Give back opportunities
- Success stories

**Login Requirements:**
- Alumni ID
- Password
- [Register as Alumni]

---

## Implementation Guidelines

### Technical Specifications

#### HTML Structure
```html
<nav class="main-navigation">
  <div class="nav-item has-megamenu">
    <a href="/about">About</a>
    <div class="megamenu">
      <div class="megamenu-container">
        <div class="megamenu-column">
          <h3>Our Story</h3>
          <ul>
            <li><a href="/about/foundation">Our Foundation</a></li>
            <!-- More items -->
          </ul>
        </div>
        <!-- More columns -->
        <div class="megamenu-featured">
          <!-- Featured content -->
        </div>
      </div>
    </div>
  </div>
</nav>
```

#### CSS Classes
```css
.main-navigation { }
.nav-item { }
.has-megamenu { }
.megamenu { }
.megamenu-container { }
.megamenu-column { }
.megamenu-featured { }
.megamenu-link { }
.megamenu-icon { }
.megamenu-preview { }
```

### JavaScript Functionality

**Required Features:**
```javascript
// Hover delay
const hoverDelay = 100; // ms before showing
const hideDelay = 300; // ms before hiding

// Keyboard navigation
- Arrow keys to navigate
- Enter to select
- Escape to close
- Tab through items

// Touch devices
- Tap to open/close
- Swipe to dismiss
- No hover state

// Accessibility
- ARIA attributes
- Focus management
- Screen reader support
```

### Performance Optimization

**Loading Strategy:**
```javascript
// Lazy load mega menu content
- Load on first hover
- Cache in memory
- Preload images
- Minimize reflows

// Bundle optimization
- Code splitting
- Tree shaking
- Minification
- Compression
```

---

## Content Management

### CMS Integration

**Edit Capability:**
- Menu structure editable
- Link destinations changeable
- Preview text editable
- Featured content manageable
- Icons customizable

**Version Control:**
- Track changes
- Approve updates
- Rollback capability
- A/B testing support

### Update Workflow

**Process:**
1. Content manager creates draft
2. Review by academic team
3. Approval by principal
4. Staging preview
5. Production deployment
6. Monitor analytics

**Frequency:**
- Quarterly review
- As-needed updates
- Seasonal adjustments
- New program launches

---

## Success Metrics

### Analytics Tracking

**Menu Interactions:**
```javascript
// Track events
- Menu opened
- Link clicked
- Featured content clicked
- Download initiated
- Form submitted from menu
```

**User Behavior:**
- Time to find information
- Click depth
- Popular paths
- Drop-off points
- Search usage after menu

**Performance:**
- Load time
- Response time
- Error rates
- Accessibility scores

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Jan 8, 2026 | Development Team | Initial comprehensive mega menu content |

---

**End of Document**
