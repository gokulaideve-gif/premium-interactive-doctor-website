# 🎬 Dr. Rudra Wellness Centre - Animation Guide

Complete reference for all 35+ animations and interactive elements.

## 📊 Animation Inventory

### 1. Hero Section Animations

#### Hero Headline Animation
```typescript
// File: src/components/home/HeroSectionV2.tsx
- Fade in from bottom: opacity 0→1, y: 40→0
- Duration: 0.8s with 0.4s delay
- Easing: ease-out
```

#### Hero Background Blobs
```typescript
// 3 animated gradient blobs
Blob 1: Moves in X/Y pattern, duration: 8s
Blob 2: Opposite X/Y pattern, duration: 10s
Blob 3: Scales & rotates, duration: 20s
All repeat infinitely
```

#### Mouse Follow Glow
```typescript
// Cursor-responsive gradient
- Smoothly follows mouse position
- Spring physics: stiffness 50, damping 20
- Creates ambient glow effect
```

#### ECG Heartbeat
```typescript
// SVG path animation
- Draws medical heartbeat line
- Duration: 2s per cycle
- Repeats infinitely
- Pink gradient stroke
```

#### Floating Particles
```typescript
// 20 small particles
Each particle:
- Random position on screen
- Y movement: -30px oscillation
- X movement: ±10px
- Opacity pulse: 0.2→0.8→0.2
- Duration: 3-7s
- Random delay: 0-2s
```

#### Floating Hearts
```typescript
// 15 heart emoji animations
- Y movement: -50→-200→-400px
- X movement: sin wave
- Scale: 0→1→0
- Opacity: 0→1→0
- Duration: 3-5s
```

---

### 2. Animated Character Components

#### Animated Lady Doctor
```typescript
// File: src/components/animations/AnimatedLady.tsx
Component Parts:
├── Body Container
│   ├── Head
│   │   ├── Hair with blink animation
│   │   ├── Eyes (blinking, duration: 1.5s)
│   │   └── Smile
│   ├── Medical Coat (pulse animation)
│   ├── Left Arm (rotate: 0→25→0, duration: 2.5s)
│   ├── Right Arm (rotate: 0→-30→0, duration: 2.5s)
│   ├── Left Leg (rotate: 0→15→0, duration: 2s)
│   ├── Right Leg (rotate: 0→-15→0, duration: 2s)
│   ├── Stethoscope (rotate with hand motion)
│   └── Floating Heart (y, x, scale animation)
```

#### Animated Toy Character
```typescript
// File: src/components/animations/AnimatedToy.tsx
Capsule/Pill Character:
├── Main Body
│   ├── Top Cap (pink gradient)
│   ├── Eyes (scale: 1→0.7→1, duration: 0.8s)
│   ├── Smile
│   ├── Stethoscope on body
│   ├── Left Arm (rotate: 0→45→0, duration: 1.5s)
│   ├── Right Arm (rotate: 0→-45→0, duration: 1.5s)
│   ├── Left Leg (rotate: 0→30→0, duration: 1.5s)
│   ├── Right Leg (rotate: 0→-30→0, duration: 1.5s)
│   └── Sparkles (3 points)
│
└── Main Motion
    ├── X: -100→100→-100 (duration: 4s)
    ├── Y: 0→-30→0 (duration: 2s)
    └── Rotation: 0→10→-10→0 (duration: 1.5s)
```

---

### 3. Navigation Animations

#### Navbar Scroll Animation
```typescript
// File: src/components/ui/NavbarV2.tsx
Transform on Scroll:
- Initial: y: -100
- On Load: y: 0, duration: 0.6s
- On Scroll: 
  - y: 20px → apply backdrop blur
  - Background opacity: 0.8
  - Border: pink accent
```

#### Logo Rotation on Hover
```typescript
- rotate: 360°
- scale: 1→1.1
- Duration: 0.6s
- Timing: ease-out
```

#### Mobile Menu Animation
```typescript
- Enter: opacity 0→1, y: -20→0
- Duration: 0.3s
- Each link: opacity 0→1, y: 20→0
- Link delay: 0.05s * index
```

---

### 4. Service & Feature Cards

#### Service Card Hover
```typescript
// File: src/components/home/ServicesPreviewPink.tsx
On Hover:
- Y: 0→-8px
- Scale: 1→1.02
- Border color: pink-100→pink-200
- Shadow: increase
- Duration: 0.3s
```

#### Feature Icon Scale
```typescript
// File: src/components/home/WhyChooseUsPink.tsx
On Hover:
- Scale: 1→1.1
- Duration: 0.3s
- Icon background glows
```

---

### 5. Stats & Counter Animations

#### Number Counter
```typescript
// File: src/components/home/StatsCounterPink.tsx
When element enters viewport:
- Count from 0 to target value
- Duration: 2s (customizable)
- Easing: 1 - (1-progress)³ (ease-out)
- Uses Intersection Observer
```

#### Counter Stagger
```typescript
- Each stat: delay = index * 0.1s
- Creates wave effect
- All start on viewport intersection
```

---

### 6. Testimonial Carousel

#### Slide Transition
```typescript
// File: src/components/home/TestimonialsPreviewPink.tsx
Enter Animation:
- direction > 0: x: 300→0, opacity: 0→1
- direction < 0: x: -300→0, opacity: 0→1
- Duration: 0.4s
- Easing: easeInOut

Exit Animation:
- Opposite of enter
```

#### Dot Indicator
```typescript
Active dot:
- Width: 2px→6px
- Background: gray→pink
- Duration: 0.3s
```

---

### 7. UI Element Animations

#### Scroll Progress Bar
```typescript
// File: src/components/ui/ScrollProgress.tsx
- ScaleX animation based on scroll position
- Spring physics: stiffness 100, damping 30
- Gradient: pink→rose→red
- Always visible at top
```

#### Custom Cursor
```typescript
// File: src/components/ui/CustomCursor.tsx
Outer Ring:
- Border: 2px pink
- Size: 24×24px
- Follows cursor position

Inner Dot:
- Size: 8×8px
- Solid pink color

On Hover:
- Outer scale: 1→1.5
- Smooth spring animation
```

#### Preloader
```typescript
// File: src/components/ui/Preloader.tsx
Logo Animation:
- scale: 0→1
- rotate: -180→0
- Duration: 0.8s

Pulsing Rings:
- 3 concentric circles
- scale: 0.8→1.5, opacity: 0.5→0
- Duration: 2s each
- Delay: 0.6s between each

Progress Bar:
- width: 0→100%
- Duration: progress of page load

Exit:
- Fade out: opacity 1→0
- Duration: 0.8s
```

---

### 8. Page Transition Animations

#### Stagger Container
```typescript
// File: src/lib/animations.ts
Children animate with delay:
- staggerChildren: 0.1s
- delayChildren: 0.2s
- Each child: fadeInUp variant
```

#### Fade In Up
```typescript
- Initial: opacity 0, y: 60
- Animate: opacity 1, y: 0
- Duration: 0.6s
```

---

### 9. Form Animations

#### Input Focus
```typescript
// In booking & contact forms
- Border color: gray→pink
- Ring: add pink focus ring
- Background: subtle change
- Duration: 0.2s
```

#### Button Hover
```typescript
- Scale: 1→1.02
- Shadow increase
- Color shift
- Duration: 0.3s
```

#### Success Animation
```typescript
// After form submission
- Checkmark scale in
- Green glow
- Confetti effect (optional)
```

---

### 10. Rotating Background Elements

#### Orbiting Rings
```typescript
// File: src/components/animations/RotatingElements.tsx
Outer Ring:
- Border: pink top, rose right
- rotate: 0→360°
- Duration: 20s
- Repeat: infinite, linear

Inner Ring:
- Border: rose top, rose right
- rotate: 0→-360°
- Duration: 15s

Orbiting Hearts:
- 4 heart emoji at cardinal points
- Follow rings rotation
- Scale pulse on each orbit
```

---

### 11. Advanced Animation Patterns

#### Pulsing Dots
```typescript
// File: src/components/animations/PulsingDots.tsx
Each Dot:
- Scale: 1→1.5→1
- Opacity: 0.5→1→0.5
- Duration: 1.5s
- Delay: index * 0.2s
```

#### Medical Animation
```typescript
// File: src/components/animations/MedicalAnimation.tsx
Center Stethoscope:
- rotate: 0→10→-10→0, duration: 3s
- y: 0→-20→0

Orbiting Hearts (6):
- Full rotation: 8s
- Each heart scale pulse with delay

Floating Pills (4):
- Random X/Y movement
- Individual rotation
- Duration: 4-7s each
```

---

## 🎯 Animation Timing Overview

| Animation | Duration | Delay | Loop |
|-----------|----------|-------|------|
| Fade In Up | 0.6s | 0.2-1.0s | No |
| Number Counter | 2.0s | On Scroll | No |
| Heart Float | 3-5s | 0-2s | Yes |
| Particle Motion | 3-7s | Random | Yes |
| Rotating Ring | 15-20s | 0s | Yes |
| Button Hover | 0.3s | 0s | No |
| Scroll Progress | Dynamic | 0s | N/A |
| Preloader | 0.8s | 0s | No |

---

## 🎬 Performance Tips

### 1. GPU Acceleration
```css
/* Properties that use GPU */
transform: translate3d()
transform: rotate()
transform: scale()
opacity: changes
```

### 2. Avoid Layout Shifts
```css
/* Use transforms, not position changes */
/* Use width/height in CSS, not JS */
```

### 3. Framer Motion Best Practices
```typescript
// Use variants for reusable animations
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 }
}

// Use layout for position changes
<motion.div layout />

// Optimize with whileInView
<motion.div whileInView={{ opacity: 1 }} />
```

---

## 🔧 Customization Guide

### Change Animation Duration
```typescript
// In component
transition={{ duration: 0.6 }} // Change this value
```

### Change Animation Direction
```typescript
// Swap initial and animate values
initial={{ opacity: 1, y: 0 }}
animate={{ opacity: 0, y: -20 }}
```

### Add New Animation
```typescript
// Create in lib/animations.ts
export const newAnimation = {
  hidden: { /* ... */ },
  visible: { /* ... */ }
}

// Use in component
variants={newAnimation}
```

---

## 📱 Mobile Optimization

All animations are optimized for:
- ✅ Reduced motion (prefers-reduced-motion)
- ✅ Touch events (no hover states on mobile)
- ✅ Lower frame rate (smooth on mobile devices)
- ✅ Battery efficiency
- ✅ Memory usage

---

## 🎨 Color Animation Values

All animations use pink/rose gradient:
```
Primary Pink: #ec4899
Rose/Pink: #f43f5e
Light Pink: #fbcfe8
Dark Rose: #be123c
```

---

Made with ❤️ for beautiful healthcare websites.
