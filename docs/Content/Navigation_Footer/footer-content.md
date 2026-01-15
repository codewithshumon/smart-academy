# Smart Academy - Footer Content

**Document Version:** 1.0  
**Last Updated:** January 8, 2026  
**Purpose:** Define comprehensive footer structure and content for Smart Academy website  
**Development Environment:** Linux OS, VSCode IDE, Local Database, Vite, HMR  

---

## Table of Contents

1. [Overview](#overview)
2. [Footer Design Principles](#footer-design-principles)
3. [Footer Structure](#footer-structure)
4. [Main Footer Sections](#main-footer-sections)
5. [Bottom Footer Bar](#bottom-footer-bar)
6. [Mobile Footer](#mobile-footer)
7. [Footer Functionality](#footer-functionality)
8. [Technical Implementation](#technical-implementation)

---

## Overview

### Purpose
The footer serves as a comprehensive navigation aid and information repository at the bottom of every page, providing quick access to important links, contact information, and resources.

### Footer Goals
- **Accessibility**: Easy access to key pages from any location
- **Information**: Essential contact and location details
- **Trust Building**: Legal information, certifications, social proof
- **Engagement**: Newsletter signup, social media connections
- **SEO**: Internal linking structure for search engines

### Design Philosophy
- Clean and organized layout
- Consistent with site branding
- Islamic design elements (subtle)
- Mobile-responsive
- Accessibility compliant
- Fast loading

---

## Footer Design Principles

### Visual Design Standards

**Layout:**
```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│  MAIN FOOTER (Dark background - #1B5E20)                      │
│                                                                │
│  ┌──────────┬──────────┬──────────┬──────────┬─────────────┐  │
│  │ About    │ Quick    │ Programs │ Parents  │ Contact Us  │  │
│  │ Smart    │ Links    │          │ & Stud.  │             │  │
│  │ Academy  │          │          │          │  [Contact]  │  │
│  │          │          │          │          │  [Map]      │  │
│  │ [Logo]   │          │          │          │  [Social]   │  │
│  │          │          │          │          │             │  │
│  │ Brief    │          │          │          │  Newsletter │  │
│  │ Desc.    │          │          │          │  [Subscribe]│  │
│  │          │          │          │          │             │  │
│  └──────────┴──────────┴──────────┴──────────┴─────────────┘  │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  BOTTOM BAR (Darker - #0D3818)                                │
│                                                                │
│  © 2026 Smart Academy  │  Privacy  │  Terms  │  Sitemap     │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Color Scheme:**
- **Main Footer Background**: Dark Green (#1B5E20)
- **Text Color**: White (#FFFFFF) and Light Gray (#E8F5E9)
- **Links**: White with green hover (#4CAF50)
- **Bottom Bar**: Darker Green (#0D3818)
- **Dividers**: Light green lines (#2E7D32)

**Typography:**
- **Headings**: 16px, Bold, White
- **Links**: 14px, Regular, White
- **Body Text**: 13px, Regular, Light Gray
- **Bottom Bar**: 12px, Regular, Light Gray

**Spacing:**
- **Section Padding**: 60px top/bottom, 20px sides
- **Column Gutter**: 40px
- **Link Spacing**: 12px between items
- **Bottom Bar**: 20px padding

---

## Footer Structure

### Overall Architecture

The footer consists of two main sections:

1. **Main Footer** - 5 columns with rich content
2. **Bottom Bar** - Legal, copyright, and secondary links

---

## Main Footer Sections

### Column 1: About Smart Academy

**Section Title:** About Smart Academy  
**Width:** 20% (wider for branding)

#### Logo
- **Smart Academy Logo** (white version)
- Size: 150px wide
- Links to: Homepage (/)

#### Tagline
```
"Transforming Minds, Illuminating Futures"
```

#### Brief Description
```
Smart Academy is a pioneering Islamic STEAM institution 
in rural Bangladesh, providing quality education that 
integrates Islamic values with modern technology since 2020.
```

#### Mission Statement (abbreviated)
```
Empowering underprivileged children through excellence 
in education, faith, and character development.
```

#### Quick Stats Box
```
┌─────────────────────┐
│  ✓ 500+ Students    │
│  ✓ 40+ Faculty      │
│  ✓ Est. 2020        │
│  ✓ 96% Retention    │
└─────────────────────┘
```

#### Accreditation Badge
```
[Badge Icon]
Approved by
Ministry of Education
Bangladesh
```

---

### Column 2: Quick Links

**Section Title:** Quick Links  
**Width:** 15%

#### Links List

**About Us:**
- [Our Foundation](/about/foundation)
- [Vision & Mission](/about/vision-mission)
- [Why Choose Us](/about/why-choose-us)
- [Our Faculty](/about/faculty)
- [Campus Tour](/about/campus-tour)

**Admissions:**
- [How to Apply](/admissions/apply)
- [Admission Process](/admissions/process)
- [Tuition & Fees](/admissions/fees)
- [Scholarships](/admissions/scholarships)
- [FAQs](/admissions/faq)

**Resources:**
- [Academic Calendar](/academics/calendar)
- [News & Events](/news)
- [Photo Gallery](/gallery)
- [Downloads](/downloads)
- [Career Opportunities](/careers)

**Support:**
- [Contact Us](/contact)
- [Support Center](/support)
- [Feedback](/feedback)
- [Donate](/donate)

---

### Column 3: Programs

**Section Title:** Academic Programs  
**Width:** 15%

#### Programs by Level

**Early Childhood:**
- [PlayGroup](/academics/early-childhood#playgroup)
- [Nursery](/academics/early-childhood#nursery)
- [Kindergarten](/academics/early-childhood#kindergarten)

**Primary Education:**
- [Class 1-3](/academics/primary#foundation)
- [Class 4-5](/academics/primary#skill-development)

**Secondary Education:**
- [Class 6-8](/academics/secondary#lower-secondary)
- [Class 9-10](/academics/secondary#ssc-prep)

**Special Programs:**
- [STEAM Education](/academics/steam-philosophy)
- [Quran Memorization (Hifz)](/islamic-studies/quran-memorization)
- [Islamic Studies](/islamic-studies/curriculum)
- [Technology & Coding](/academics/technology)
- [Sports & Activities](/student-life/sports)

**Future Plans:**
- [HSC Program (Coming)](/academics/future-plans)

---

### Column 4: For Parents & Students

**Section Title:** For Parents & Students  
**Width:** 15%

#### Parent Resources
**Icon:** 👨‍👩‍👧‍👦

- [Parent Portal Login](/portal/parent)
- [Parent Handbook](/resources/parent-handbook)
- [Fee Payment](/portal/parent/fees)
- [Academic Calendar](/academics/calendar)
- [Transportation Info](/admissions/transportation)
- [Parent-Teacher Meetings](/parents/meetings)
- [Volunteer Opportunities](/community/volunteer)

#### Student Resources
**Icon:** 🎓

- [Student Portal Login](/portal/student)
- [Student Handbook](/resources/student-handbook)
- [Library Access](/student-life/library)
- [Assignment Portal](/portal/student/assignments)
- [Clubs & Activities](/student-life/clubs)
- [Counseling Services](/student-life/counseling)

#### Alumni
**Icon:** 🎓

- [Alumni Portal](/portal/alumni)
- [Alumni Network](/alumni/network)
- [Success Stories](/alumni/stories)
- [Give Back](/alumni/giving)

#### Community
- [Community Programs](/community/programs)
- [Volunteer](/community/volunteer)
- [Partnership Opportunities](/community/partnerships)

---

### Column 5: Contact & Connect

**Section Title:** Contact & Connect  
**Width:** 25% (widest for contact info)

#### Contact Information

**Office Address:**
```
📍 Smart Academy
   Narimpur, Ramganj
   Laxmipur, Bangladesh
   Chittagong Division
```

**Phone Numbers:**
```
📞 Main Office: +8801709-651168
📞 Admissions: +8801709-651168 (Ext. 102)
📞 Principal: +8801709-651168 (Ext. 101)
📱 WhatsApp: +8801709-651168
```

**Email Addresses:**
```
📧 General: info@mysmart.academy
📧 Admissions: admission@mysmart.academy
📧 Principal: principal@mysmart.academy
📧 Support: support@mysmart.academy
```

**Office Hours:**
```
🕐 Sunday - Thursday: 9:00 AM - 5:00 PM
🕐 Friday: 9:00 AM - 12:00 PM (Half Day)
🕐 Saturday: Closed
🕐 Ramadan: Adjusted Timings
```

#### Get Directions
```
[🗺️ View on Google Maps]
[🚗 Get Directions]
[📍 What's Nearby]
```

#### Social Media

**Follow Us:**
```
Connect with us on social media for daily updates,
photos, and announcements.
```

**Social Icons:** (Large, clickable, with hover effects)
```
[Facebook]  facebook.com/smartacademybd
[YouTube]   Smart Academy Bangladesh
[Instagram] @smartacademybd
[LinkedIn]  Smart Academy
```

**Engagement Stats:**
```
👍 5,000+ Facebook Followers
📺 500+ YouTube Subscribers
📸 2,000+ Instagram Followers
```

#### Newsletter Subscription

**Section Heading:** 📬 **Stay Updated**

**Description:**
```
Subscribe to our newsletter for latest news, 
events, and educational insights.
```

**Subscription Form:**
```
┌─────────────────────────────────────┐
│ [Your Email Address]          │
├─────────────────────────────────────┤
│ [Subscribe] Button                  │
└─────────────────────────────────────┘

✓ Weekly newsletter
✓ Event notifications
✓ Admission updates
✓ Educational tips

Privacy: We respect your privacy. No spam.
```

#### Download Mobile App (Future)
```
Coming Soon:
[📱 Download on App Store]
[📱 Get it on Google Play]
```

---

## Bottom Footer Bar

### Design Specifications

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  © 2026 Smart Academy. All rights reserved. │ Privacy Policy │ │
│  Terms of Service │ Cookie Policy │ Sitemap │ Accessibility   │
│                                                                 │
│  [Language: English ▼]         Developed with ❤️ by Team     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Height:** 60px  
**Background:** #0D3818 (Darker Green)  
**Text Color:** #A5D6A7 (Light Green)  
**Font Size:** 12px

---

### Left Side Content

#### Copyright Notice
```
© 2026 Smart Academy. All rights reserved.
```

**Note:** Year auto-updates via JavaScript

#### Organization Info
```
A project of Smart Foundation, Bangladesh
```

---

### Center Links

**Legal & Policy Links:**

#### Privacy Policy
- **URL:** `/privacy-policy`
- **Description:** How we handle user data
- **Updated:** January 2026

#### Terms of Service
- **URL:** `/terms-of-service`
- **Description:** Website usage terms
- **Updated:** January 2026

#### Cookie Policy
- **URL:** `/cookie-policy`
- **Description:** Cookie usage information
- **Updated:** January 2026

#### Sitemap
- **URL:** `/sitemap`
- **Description:** Complete site structure
- **Note:** Also XML sitemap for SEO

#### Accessibility Statement
- **URL:** `/accessibility`
- **Description:** WCAG compliance details
- **Level:** AA compliant

---

### Right Side Content

#### Language Selector
```
Language: [English ▼]
Options:
- English (Current)
- বাংলা (Bengali)
- عربي (Arabic) - Coming Soon
```

#### Developer Credit
```
Developed with ❤️ by Smart Academy Development Team
```

#### Version Info (Hidden, for admins)
```
v2.0.1 | Last Updated: Jan 8, 2026
```

---

## Mobile Footer

### Mobile-Specific Design

**Responsive Breakpoint:** < 768px

**Layout Changes:**
- Single column layout
- Collapsible sections (accordion)
- Larger tap targets (48px minimum)
- Simplified contact information
- Sticky "Back to Top" button

### Mobile Footer Structure

```
┌─────────────────────────────┐
│                             │
│  [Logo]                     │
│  Smart Academy              │
│  Brief Description          │
│                             │
├─────────────────────────────┤
│                             │
│  About Us              [+]  │
│  (Collapsed by default)     │
│                             │
│  Quick Links           [+]  │
│                             │
│  Programs              [+]  │
│                             │
│  For Parents & Students [+] │
│                             │
├─────────────────────────────┤
│                             │
│  📞 +8801709-651168         │
│  📧 info@mysmart.academy    │
│  📍 Narimpur, Laxmipur      │
│                             │
│  [Get Directions]           │
│                             │
├─────────────────────────────┤
│                             │
│  Follow Us:                 │
│  [FB] [YT] [IG] [LI]       │
│                             │
├─────────────────────────────┤
│                             │
│  Newsletter:                │
│  [Email]  [Subscribe]       │
│                             │
├─────────────────────────────┤
│                             │
│  © 2026 Smart Academy       │
│  [Privacy] [Terms]          │
│  [English ▼]                │
│                             │
│  [↑ Back to Top]           │
│                             │
└─────────────────────────────┘
```

### Mobile Accordion Behavior

**Default State:** All sections collapsed

**Tap to Expand:**
- Icon changes from [+] to [-]
- Content slides down smoothly
- Only one section open at a time
- Smooth scroll to expanded section

---

## Footer Functionality

### Interactive Features

#### 1. Newsletter Subscription

**Form Validation:**
```javascript
// Email validation
- Valid email format required
- No duplicate subscriptions
- Confirmation email sent

// Error messages
- "Please enter a valid email address"
- "This email is already subscribed"
- "Subscription failed. Please try again."

// Success message
- "Thank you! Check your email to confirm subscription."
- Green checkmark animation
- Auto-hide after 5 seconds
```

**Integration:**
- MailChimp or similar service
- Database storage
- Welcome email automation
- Unsubscribe option in emails

---

#### 2. Social Media Links

**Behavior:**
- Open in new tab (target="_blank")
- rel="noopener noreferrer" for security
- Hover effect (scale/color change)
- Click tracking via analytics

**Social Feed Integration (Optional):**
- Latest Facebook posts widget
- Instagram feed preview
- YouTube video carousel

---

#### 3. Contact Quick Actions

**Click-to-Call:**
```html
<a href="tel:+8801709651168">📞 +8801709-651168</a>
```
- Opens phone dialer on mobile
- Click-to-copy on desktop

**Click-to-Email:**
```html
<a href="mailto:info@mysmart.academy">📧 info@mysmart.academy</a>
```
- Opens email client
- Pre-filled subject line option

**Click-to-Map:**
```html
<a href="https://goo.gl/maps/..." target="_blank">
  📍 Get Directions
</a>
```
- Opens Google Maps
- Shows directions from user's location

**WhatsApp Direct:**
```html
<a href="https://wa.me/8801709651168">💬 Chat on WhatsApp</a>
```
- Opens WhatsApp chat
- Pre-filled message option

---

#### 4. Back to Top Button

**Behavior:**
- Shows after scrolling 300px down
- Smooth scroll to top
- Fade in/out animation
- Keyboard accessible (tab + enter)

**Design:**
```
┌──────────┐
│    ↑     │
│   Top    │
└──────────┘
```

**Position:**
- Fixed bottom-right corner
- 20px from edges
- Above chat widget (if present)

---

#### 5. Language Switcher

**Dropdown Menu:**
```
Language: English ▼
├─ English (current) ✓
├─ বাংলা (Bengali)
└─ عربي (Arabic) - Coming Soon
```

**Behavior:**
- Saves preference in localStorage
- Applies to entire site
- Translates UI elements
- Content in selected language

---

#### 6. Search Footer Links

**Mini Search Bar (Optional):**
```
[🔍 Search the site...]  [Go]
```

**Recent Searches:**
- Stored in localStorage
- Quick access to popular pages

---

## Technical Implementation

### HTML Structure

```html
<footer class="site-footer">
  <!-- Main Footer -->
  <div class="footer-main">
    <div class="container">
      <div class="footer-grid">
        
        <!-- Column 1: About -->
        <div class="footer-column footer-about">
          <img src="/logo-white.svg" alt="Smart Academy" class="footer-logo">
          <p class="footer-tagline">Transforming Minds, Illuminating Futures</p>
          <p class="footer-description">...</p>
          <div class="footer-stats">...</div>
        </div>
        
        <!-- Column 2: Quick Links -->
        <div class="footer-column footer-links">
          <h3 class="footer-title">Quick Links</h3>
          <ul class="footer-menu">
            <li><a href="/about">About Us</a></li>
            <!-- More links -->
          </ul>
        </div>
        
        <!-- Column 3: Programs -->
        <div class="footer-column footer-programs">
          <h3 class="footer-title">Programs</h3>
          <ul class="footer-menu">
            <!-- Program links -->
          </ul>
        </div>
        
        <!-- Column 4: Parents & Students -->
        <div class="footer-column footer-users">
          <h3 class="footer-title">For Parents & Students</h3>
          <ul class="footer-menu">
            <!-- User links -->
          </ul>
        </div>
        
        <!-- Column 5: Contact -->
        <div class="footer-column footer-contact">
          <h3 class="footer-title">Contact & Connect</h3>
          <div class="contact-info">...</div>
          <div class="social-media">...</div>
          <form class="newsletter-form">...</form>
        </div>
        
      </div>
    </div>
  </div>
  
  <!-- Bottom Bar -->
  <div class="footer-bottom">
    <div class="container">
      <div class="footer-bottom-content">
        <div class="footer-copyright">...</div>
        <div class="footer-legal-links">...</div>
        <div class="footer-language">...</div>
      </div>
    </div>
  </div>
</footer>
```

---

### CSS Structure

```css
/* Main Footer */
.site-footer {
  background: #1B5E20;
  color: #FFFFFF;
}

.footer-main {
  padding: 60px 20px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr 1fr 1.3fr;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-column {
  /* Column styles */
}

.footer-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #FFFFFF;
}

.footer-menu {
  list-style: none;
  padding: 0;
}

.footer-menu li {
  margin-bottom: 12px;
}

.footer-menu a {
  color: #E8F5E9;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-menu a:hover {
  color: #4CAF50;
}

/* Bottom Bar */
.footer-bottom {
  background: #0D3818;
  padding: 20px;
  border-top: 1px solid #2E7D32;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  font-size: 12px;
  color: #A5D6A7;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .footer-column {
    border-bottom: 1px solid rgba(255,255,255,0.1);
    padding-bottom: 20px;
  }
  
  .footer-bottom-content {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
}
```

---

### JavaScript Functionality

```javascript
// Newsletter subscription
document.querySelector('.newsletter-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;
  
  try {
    const response = await fetch('/api/newsletter/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    
    if (response.ok) {
      showSuccessMessage('Thank you for subscribing!');
    } else {
      showErrorMessage('Subscription failed. Please try again.');
    }
  } catch (error) {
    showErrorMessage('Network error. Please try again.');
  }
});

// Back to top button
const backToTopButton = document.createElement('button');
backToTopButton.className = 'back-to-top';
backToTopButton.innerHTML = '↑ Top';
backToTopButton.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Auto-update copyright year
document.querySelector('.copyright-year').textContent = new Date().getFullYear();

// Language switcher
document.querySelector('.language-selector').addEventListener('change', (e) => {
  const language = e.target.value;
  localStorage.setItem('preferredLanguage', language);
  window.location.href = `/${language}${window.location.pathname}`;
});
```

---

### Accessibility Features

**ARIA Labels:**
```html
<footer role="contentinfo" aria-label="Site Footer">
  <nav aria-label="Footer Navigation">
    <ul role="list">
      <li><a href="..." aria-label="About Us">About</a></li>
    </ul>
  </nav>
</footer>
```

**Keyboard Navigation:**
- All links tab-accessible
- Logical tab order
- Visible focus indicators
- Skip link to footer

**Screen Reader:**
- Meaningful heading structure
- Alt text for logos
- ARIA landmarks
- Descriptive link text

---

### Performance Optimization

**Loading Strategy:**
```javascript
// Defer non-critical footer scripts
<script defer src="/js/footer.js"></script>

// Lazy load social media widgets
<div class="social-feed" data-lazy-load></div>

// Optimize images
- SVG for logo
- WebP for photos
- Lazy loading
```

**Caching:**
```
Cache-Control: public, max-age=86400
```

---

### SEO Optimization

**Structured Data:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Smart Academy",
  "url": "https://mysmart.academy",
  "logo": "https://mysmart.academy/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+8801709-651168",
    "contactType": "Admissions",
    "areaServed": "BD",
    "availableLanguage": ["English", "Bengali"]
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Narimpur, Ramganj",
    "addressLocality": "Laxmipur",
    "addressCountry": "BD"
  },
  "sameAs": [
    "https://facebook.com/smartacademybd",
    "https://youtube.com/smartacademybd",
    "https://instagram.com/smartacademybd"
  ]
}
```

---

### Analytics Tracking

**Events to Track:**
```javascript
// Newsletter subscriptions
gtag('event', 'newsletter_signup', {
  'event_category': 'engagement',
  'event_label': 'footer'
});

// Footer link clicks
gtag('event', 'footer_link_click', {
  'event_category': 'navigation',
  'event_label': linkText
});

// Social media clicks
gtag('event', 'social_click', {
  'event_category': 'engagement',
  'event_label': platform
});

// Contact actions
gtag('event', 'contact_action', {
  'event_category': 'engagement',
  'event_label': actionType // call, email, map
});
```

---

## Content Management

### Update Frequency

**Regular Updates:**
- Contact information: Quarterly review
- Office hours: Seasonal adjustments
- Links: Monthly audit
- Social media: Real-time
- Newsletter: Ongoing

**Occasional Updates:**
- Footer structure: Annually
- Design: As needed
- Legal pages: When policies change

### Version Control

**Change Log:**
```
Version 1.0 - Jan 8, 2026
- Initial comprehensive footer
- All sections implemented
- Mobile responsive
- Accessibility compliant

Version 1.1 - Future
- Mobile app links added
- Live chat integration
- Arabic language support
```

---

## Testing Checklist

### Functionality Tests

- [ ] All links working (no 404s)
- [ ] Newsletter form submits correctly
- [ ] Email validation works
- [ ] Social media links open correctly
- [ ] Language switcher functions
- [ ] Back to top button appears/works
- [ ] Mobile accordion expands/collapses
- [ ] Contact click-to-actions work

### Responsive Tests

- [ ] Desktop view (1920px)
- [ ] Laptop view (1366px)
- [ ] Tablet view (768px)
- [ ] Mobile view (375px)
- [ ] Mobile landscape
- [ ] All breakpoints smooth

### Accessibility Tests

- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast passes (AA)
- [ ] Focus indicators visible
- [ ] ARIA labels correct
- [ ] Heading hierarchy logical

### Performance Tests

- [ ] Load time < 1 second
- [ ] No render-blocking resources
- [ ] Images optimized
- [ ] Scripts deferred
- [ ] Lighthouse score > 90

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Jan 8, 2026 | Development Team | Initial comprehensive footer content |

---

**End of Document**
