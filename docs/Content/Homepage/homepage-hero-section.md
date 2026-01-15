# Homepage Hero Section

**Document Version:** 1.0  
**Last Updated:** January 8, 2026  
**Purpose:** Main banner text and call-to-action for Smart Academy homepage  
**Development Note:** Optimized for full-width hero section with overlay text

---

## Hero Section Overview

The hero section is the first impression visitors receive of Smart Academy. It should immediately communicate our unique value proposition: Islamic education excellence integrated with modern STEAM learning in rural Bangladesh.

---

## Primary Hero Section

### Hero Variant 1: Mission-Focused (Default)

**Background Asset:**
- High-quality image/video of students in Smart Classroom with digital boards
- Alternative: Campus aerial view showing modern facilities
- Video option: 15-second loop of students engaged in STEAM activities
- Overlay: Semi-transparent gradient (dark blue to transparent, 60% opacity)

**Main Headline:**
```
Transforming Minds, Illuminating Futures
```

**Subheadline:**
```
Where Islamic Values Meet Modern Excellence
Quality STEAM Education in Rural Bangladesh
```

**Supporting Text:**
```
Smart Academy provides world-class Islamic education integrated with 
Science, Technology, Engineering, Arts & Mathematics (STEAM) to 
underprivileged children in Laxmipur.
```

**Primary CTA Buttons:**
- **Button 1:** "Apply for Admission 2026" (Primary style - Green/Teal)
  - Link: `/admissions/apply-now`
  - Icon: ➜ or 📝
  
- **Button 2:** "Take Virtual Tour" (Secondary style - White outline)
  - Link: `/virtual-tour`
  - Icon: 🎥 or 360°

**Quick Stats Bar (Below buttons):**
```
500+ Students  |  40+ Teachers  |  96% Retention  |  25% on Scholarship
```

---

### Hero Variant 2: Achievement-Focused

**Background Asset:**
- Students receiving awards/trophies
- Science fair or Quran competition moments
- Graduation ceremony

**Main Headline:**
```
Building Tomorrow's Leaders Today
```

**Subheadline:**
```
Bangladesh's Premier Islamic STEAM Academy
Excellence Without Compromise, Regardless of Background
```

**Supporting Text:**
```
From PlayGroup to Class 9, we nurture young minds through comprehensive 
Quranic studies, cutting-edge technology, and personalized learning in 
one of Bangladesh's most innovative educational institutions.
```

**Primary CTA Buttons:**
- "Explore Our Programs" (Primary)
- "Schedule Campus Visit" (Secondary)

---

### Hero Variant 3: Community Impact

**Background Asset:**
- Diverse group of students (boys and girls in uniform)
- Community engagement activities
- Students working collaboratively

**Main Headline:**
```
Empowering Rural Bangladesh
Through Islamic Education Excellence
```

**Subheadline:**
```
Quality Education is Every Child's Right
Urban Standards, Rural Access, 100% Islamic Values
```

**Supporting Text:**
```
Bridging the education divide in Laxmipur with world-class facilities, 
qualified teachers, and a curriculum that honors Islamic heritage while 
preparing students for global success.
```

**Primary CTA Buttons:**
- "Learn Our Story" (Primary)
- "Admission Information" (Secondary)

---

## Secondary Hero Elements

### Announcement Banner (Above Hero)

**Purpose:** Time-sensitive announcements that need immediate visibility

**Example Content:**
```
🎓 Admission Open for Academic Year 2026-27! | Classes: PlayGroup to Class 9 
| Limited Seats Available | Early Bird Discount: 10% off (Until Jan 31, 2026)
[Apply Now →]
```

**Styling:**
- Slim banner (40-50px height)
- Contrasting color (yellow/gold background with dark text)
- Dismissible option
- Scrolling text for long messages (mobile)

---

### Trust Indicators (Below Hero, Above Content)

**Purpose:** Build immediate credibility and trust

**Content:**
```
Trusted by 500+ Families  |  Accredited by [Authority Name]  
Smart Foundation Initiative  |  Established 2020
```

**Visual Elements:**
- Small icons for each indicator
- Subtle border or card design
- 4-column layout (desktop), 2-column (tablet), stacked (mobile)

---

## Hero Section Specifications

### Technical Requirements

**Desktop (1920px+):**
- Hero Height: 80vh (minimum 600px)
- Maximum content width: 1200px centered
- Headline: 56-72px font size
- Subheadline: 20-28px font size
- Body text: 16-18px font size

**Tablet (768px - 1919px):**
- Hero Height: 70vh (minimum 500px)
- Headline: 42-56px font size
- Subheadline: 18-24px font size
- Body text: 16px font size

**Mobile (< 768px):**
- Hero Height: 85vh (minimum 450px)
- Headline: 32-42px font size
- Subheadline: 16-20px font size
- Body text: 14-16px font size
- Buttons: Full width with stacking

### Animation & Interaction

**On Page Load:**
1. Fade in background image/video (0.3s)
2. Slide up headline (0.5s delay, 0.4s duration)
3. Slide up subheadline (0.7s delay, 0.4s duration)
4. Fade in supporting text (1.0s delay, 0.3s duration)
5. Fade in CTA buttons (1.2s delay, 0.3s duration)
6. Fade in stats bar (1.5s delay, 0.3s duration)

**Interactive Elements:**
- Button hover: Scale 1.05, shadow increase
- Video controls (if using video background)
- Pause/play toggle for video
- Scroll indicator (down arrow with bounce animation)

### Accessibility Features

**Required:**
- Alt text for all images
- Proper heading hierarchy (H1 for main headline)
- High contrast text (4.5:1 minimum ratio)
- Keyboard navigation support
- Screen reader friendly
- Focus indicators on interactive elements

**ARIA Labels:**
```html
<section aria-label="Hero banner with main call to action">
<h1>Transforming Minds, Illuminating Futures</h1>
<button aria-label="Apply for admission to Smart Academy">Apply Now</button>
</section>
```

---

## Content Variations by Season/Context

### Admission Season (November - January)

**Emphasis:** Enrollment urgency, limited seats, scholarship opportunities

**Headline:**
```
Admission Open for 2026-27 Academic Year
Secure Your Child's Future Today
```

**CTA:**
- "Apply Now - Limited Seats"
- "Check Admission Requirements"

---

### Academic Excellence Period (March - June)

**Emphasis:** Results, achievements, academic programs

**Headline:**
```
Celebrating Academic Excellence
Where Students Achieve Beyond Expectations
```

**CTA:**
- "View Our Results"
- "Explore Programs"

---

### Ramadan/Islamic Events (Variable)

**Emphasis:** Islamic values, Quranic studies, spiritual development

**Headline:**
```
Ramadan Mubarak from Smart Academy
Where Faith and Learning Unite
```

**CTA:**
- "Our Islamic Programs"
- "Quranic Studies"

---

### New School Year (January)

**Emphasis:** Fresh start, new opportunities, community

**Headline:**
```
Welcome Back to Smart Academy
A New Year of Discovery Awaits
```

**CTA:**
- "Academic Calendar"
- "What's New This Year"

---

## Copywriting Guidelines

### Tone & Voice
- **Inspirational:** Uplift and motivate visitors
- **Confident:** Assert our unique value proposition
- **Inclusive:** Welcome all families regardless of background
- **Islamic:** Integrate faith naturally and respectfully
- **Authentic:** Avoid exaggeration, be truthful

### Language Requirements
- **Primary Language:** English (clear, simple)
- **Secondary Language:** Bengali (toggle option)
- **Avoid Jargon:** Educational terms explained when necessary
- **Reading Level:** Grade 8-10 level for adult content
- **Length:** Headline ≤12 words, Subheadline ≤20 words

### Messaging Hierarchy
1. **What:** Islamic STEAM education
2. **Who:** Underprivileged children in rural Bangladesh
3. **Why:** Transform lives through quality education
4. **How:** Modern facilities + qualified teachers + Islamic values
5. **Proof:** Statistics, accreditation, testimonials

---

## A/B Testing Recommendations

### Test Variables
1. **Headline Focus:** Mission vs. Achievement vs. Community
2. **CTA Text:** "Apply Now" vs. "Start Your Journey" vs. "Secure Admission"
3. **Background:** Photo vs. Video vs. Illustration
4. **Button Color:** Green vs. Teal vs. Orange
5. **Stats Display:** Bar vs. Cards vs. Icons

### Success Metrics
- Click-through rate on primary CTA
- Time spent on hero section
- Scroll depth
- Application initiation rate
- Video engagement (if applicable)

---

## Image/Video Asset Specifications

### Photography Guidelines

**Required Shots:**
1. Wide campus shot (aerial or elevated)
2. Students in smart classroom (diverse representation)
3. Islamic studies/Quran class (respectful, dignified)
4. STEAM activities (robotics, science experiments)
5. Community engagement (students helping community)
6. Award ceremonies (academic/Quranic achievements)

**Technical Specs:**
- Resolution: Minimum 1920x1080px (preferably 4K)
- Format: JPG (optimized) or WebP
- File size: <500KB after optimization
- Aspect ratio: 16:9 or 21:9 for hero
- Lighting: Well-lit, natural or professional
- Composition: Leave space for text overlay (rule of thirds)

### Video Guidelines (if applicable)

**Content:**
- 15-30 seconds loop
- Students engaged in learning
- Campus facilities showcase
- No audio or subtle background music

**Technical Specs:**
- Resolution: 1920x1080 minimum
- Format: MP4 (H.264 codec)
- File size: <3MB
- Framerate: 30fps
- Autoplay: Muted, looping
- Mobile alternative: Static image

---

## Responsive Behavior

### Mobile-Specific Adaptations

**Content Adjustments:**
- Shorter headline (≤8 words)
- Hide or shorten supporting text
- Single prominent CTA button
- Stats bar: Horizontal scroll or 2x2 grid

**Layout:**
- Full screen hero (no sidebar)
- Text overlay with stronger gradient
- Larger touch targets (minimum 44x44px)
- Reduced animation complexity

### Tablet Adaptations

**Layout:**
- Balanced text-to-image ratio
- Side-by-side buttons
- Maintain all hero elements
- Adjusted font sizes

---

## SEO Considerations

### Meta Information

**Page Title:**
```
Smart Academy | Islamic STEAM Education in Bangladesh | Laxmipur
```

**Meta Description:**
```
Smart Academy provides quality Islamic education integrated with STEAM 
learning for underprivileged children in rural Bangladesh. Admissions 
open for 2026-27. Apply now!
```

**Keywords:**
- Islamic school Bangladesh
- STEAM education Laxmipur
- English medium school Ramganj
- Quality education rural Bangladesh
- Quranic studies with modern education
- Best school Laxmipur district
- Scholarship school Bangladesh

### Structured Data (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Smart Academy",
  "description": "Islamic STEAM education for underprivileged children",
  "url": "https://www.mysmart.academy",
  "logo": "https://www.mysmart.academy/logo.png",
  "sameAs": [
    "https://facebook.com/smartacademy",
    "https://youtube.com/smartacademy"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Narimpur, Ramganj",
    "addressLocality": "Laxmipur",
    "addressCountry": "BD"
  }
}
```

---

## Implementation Checklist

### Design Phase
- [ ] Select hero variant (default: Mission-Focused)
- [ ] Prepare background assets (photo/video)
- [ ] Design CTA buttons (primary and secondary styles)
- [ ] Create stats bar design
- [ ] Mobile responsiveness mockups
- [ ] Accessibility review

### Development Phase
- [ ] HTML structure with semantic tags
- [ ] CSS with responsive breakpoints
- [ ] Animation implementation (CSS or JS)
- [ ] CTA button tracking (Google Analytics events)
- [ ] Video optimization and fallbacks
- [ ] Cross-browser testing
- [ ] Performance optimization (lazy loading, etc.)

### Content Phase
- [ ] Finalize headline and copy
- [ ] Bengali translation
- [ ] Proofread all text
- [ ] Image alt text
- [ ] Meta tags
- [ ] Schema markup

### Launch Phase
- [ ] A/B test setup
- [ ] Analytics tracking verification
- [ ] Mobile testing (multiple devices)
- [ ] Performance audit (Lighthouse score >90)
- [ [ Final stakeholder approval

---

## Maintenance & Updates

### Regular Updates (Quarterly)
- Refresh background image/video
- Update statistics
- Seasonal messaging adjustments
- A/B test new variations

### Event-Based Updates
- Admission periods
- Ramadan/Eid
- Achievement announcements
- Special programs launch

---

**Document End**

*This hero section is designed to create an immediate, positive impression while clearly communicating Smart Academy's unique value proposition and driving visitors toward primary conversion goals.*

**For Implementation Questions:** Contact web development team  
**For Content Revisions:** Contact marketing/communications team  
**For Visual Assets:** Contact media/photography team
