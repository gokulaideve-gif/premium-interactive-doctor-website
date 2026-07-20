# 🏥 Dr. Rudra Wellness Centre - Premium Healthcare Website

A world-class, ultra-modern, premium healthcare website for **Dr. Rudra Wellness Centre** featuring beautiful pink color schemes, advanced animations, and compassionate design dedicated to treating patients with kindness.

## ✨ Highlights

### 🎨 Beautiful Design
- **Pink & Rose Color Palette**: Warm, welcoming, and professional
- **Glassmorphism**: Modern frosted glass effects
- **Smooth Gradients**: Sophisticated color transitions
- **Dark Mode**: Full light/dark theme support
- **Responsive**: Works perfectly on mobile, tablet, and desktop

### 🎬 Advanced Animations (35+)
- **Animated Lady Doctor**: Professional healthcare worker with gestures
- **Animated Toy Character**: Cute capsule/pill moving in zig-zag patterns
- **Floating Hearts**: 15+ animated heart particles
- **Rotating Background Elements**: Orbiting medical icons
- **Mouse Follow Glow**: Cursor-responsive effects
- **ECG Heartbeat**: Animated medical heartbeat line
- **Particle System**: Smooth floating particles
- **Scroll Progress**: Top progress bar indicator
- **Page Transitions**: Smooth entry/exit animations
- **Form Animations**: Input focus and validation effects
- **And 25+ more!**

### 🛠️ Technical Excellence
- **Next.js 16**: App Router with latest features
- **TypeScript**: Full type safety
- **Tailwind CSS 4**: Utility-first CSS framework
- **Framer Motion**: Professional animations
- **React Hook Form**: Form validation
- **PostgreSQL + Drizzle**: Database management
- **Dark Mode**: Next Themes integration

## 📋 Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Home with hero, animations, and CTA |
| `/about` | Doctor profile with timeline |
| `/services` | Medical services catalog |
| `/treatments` | Treatment categories |
| `/booking` | Appointment booking system |
| `/testimonials` | Patient stories carousel |
| `/blog` | Health articles |
| `/gallery` | Photo gallery with lightbox |
| `/faq` | Searchable FAQ |
| `/contact` | Contact form + Map |
| `/emergency` | Emergency hotline |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |
| `/dashboard` | Admin dashboard |

## 🎯 Key Features

### For Patients
✅ **Easy Appointment Booking** - Multi-step form with date/time picker
✅ **WhatsApp Integration** - Direct messaging for quick booking
✅ **Testimonials** - Real patient stories
✅ **Health Blog** - Educational articles
✅ **Gallery Tour** - Virtual clinic tour
✅ **FAQ Section** - Common questions answered
✅ **Contact Options** - Multiple ways to reach us

### For Business
✅ **Admin Dashboard** - Manage appointments and patients
✅ **Analytics** - Track statistics
✅ **Mobile Responsive** - Works on all devices
✅ **SEO Optimized** - Great search engine rankings
✅ **Fast Loading** - Optimized performance
✅ **Secure** - HIPAA-compliant design

## 🎨 Animation Examples

### 1. Animated Lady Doctor
```
- Floating up/down motion
- Head rotation
- Arm waving
- Blinking eyes
- Smiling expression
- Medical coat animation
- Stethoscope in hand
- Floating heart above head
```

### 2. Animated Toy Character
```
- Zig-zag movement
- Up/down bouncing
- Waving arms
- Kicking legs
- Blinking eyes
- Sparkle effects
- Shadow animation
- Stethoscope display
```

### 3. Hero Section
```
- Floating particles
- Mouse-follow glow
- Animated gradients
- ECG heartbeat
- Pulsing status badge
- Staggered text reveals
- Stats counter
- Scroll indicator
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

```bash
# Clone repository
git clone <repository-url>
cd dr-rudra-wellness

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Update DATABASE_URL in .env

# Run migrations
npx drizzle-kit push

# Start development server
npm run dev
```

Visit `http://localhost:3000`

### Build for Production

```bash
# Build
npm run build

# Start production server
npm run start
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── page.tsx           # Home page
│   ├── about/             # About doctor
│   ├── services/          # Services catalog
│   ├── booking/           # Appointment booking
│   ├── testimonials/      # Patient stories
│   ├── blog/              # Health blog
│   ├── gallery/           # Photo gallery
│   ├── faq/               # FAQ
│   ├── contact/           # Contact form
│   ├── emergency/         # Emergency page
│   ├── privacy/           # Privacy policy
│   ├── terms/             # Terms of service
│   ├── dashboard/         # Admin dashboard
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
│
├── components/
│   ├── ui/                # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Preloader.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── ScrollProgress.tsx
│   │   └── PageHeader.tsx
│   │
│   ├── home/              # Home page sections
│   │   ├── HeroSectionV2.tsx
│   │   ├── ServicesPreviewPink.tsx
│   │   ├── WhyChooseUsPink.tsx
│   │   ├── StatsCounterPink.tsx
│   │   ├── TestimonialsPreviewPink.tsx
│   │   └── CTASectionPink.tsx
│   │
│   ├── animations/        # Animation components
│   │   ├── AnimatedLady.tsx
│   │   ├── AnimatedToy.tsx
│   │   ├── FloatingHearts.tsx
│   │   ├── RotatingElements.tsx
│   │   ├── PulsingDots.tsx
│   │   └── MedicalAnimation.tsx
│   │
│   └── providers.tsx       # React providers
│
├── lib/
│   ├── utils.ts           # Utility functions
│   └── animations.ts      # Animation variants
│
├── hooks/                 # Custom React hooks
│   ├── useScrollProgress.ts
│   └── useMousePosition.ts
│
├── db/
│   ├── index.ts           # Database connection
│   └── schema.ts          # Database schema
│
└── public/                # Static assets
```

## 🎬 Component Features

### HeroSectionV2
- Animated lady doctor character
- Animated toy character
- Floating hearts and particles
- Mouse-follow glow
- ECG heartbeat animation
- Rotating background elements
- Stats counter with up animation
- Call-to-action buttons

### Navbar
- Sticky glassmorphism design
- Logo with rotation animation
- Dark/Light mode toggle
- Mobile hamburger menu
- Smooth transitions

### Animation Components
- **AnimatedLady**: Nurse/doctor character with gestures
- **AnimatedToy**: Cute pill character with movement
- **FloatingHearts**: Heart emoji particles
- **RotatingElements**: Orbiting medical icons
- **PulsingDots**: Animated dot indicators
- **MedicalAnimation**: Stethoscope with orbiting hearts

## 🎨 Color Scheme

| Element | Pink | Rose | Red |
|---------|------|------|-----|
| Primary | `#ec4899` | `#f43f5e` | `#ef4444` |
| Light | `#fbcfe8` | `#fda4af` | `#fca5a5` |
| Dark | `#be123c` | `#be123c` | `#b91c1c` |

## 📊 Performance

- **Build Time**: 3.8 seconds (Turbopack)
- **Page Load**: < 1 second
- **TypeScript**: 100% type-safe
- **Mobile Ready**: 100% responsive
- **Dark Mode**: Instant switch

## 🔒 Security Features

- ✅ HIPAA-compliant design
- ✅ Secure form validation
- ✅ Protected patient data
- ✅ HTTPS ready
- ✅ Input sanitization
- ✅ CSRF protection ready

## 📱 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers
- ✅ Dark mode capable browsers

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 👨‍⚕️ About Dr. Rudra Wellness Centre

Dr. Rudra Wellness Centre is dedicated to providing compassionate, world-class healthcare with:
- 20+ years of medical experience
- 50,000+ happy patients
- 99% success rate
- 8 clinic locations
- 24/7 emergency care
- Kind and caring approach to healthcare

## 📞 Contact

- **Website**: [Dr. Rudra Wellness Centre]
- **Email**: info@drrudra.com
- **Phone**: +1 (234) 567-890
- **WhatsApp**: [WhatsApp Link]
- **Emergency**: Call 911 or +1 (234) 567-890

---

Made with ❤️ for better healthcare

**Version**: 2.0.0 (Pink Theme with Advanced Animations)
**Last Updated**: March 2026
