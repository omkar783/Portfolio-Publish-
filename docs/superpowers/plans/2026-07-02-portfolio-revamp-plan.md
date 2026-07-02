# Portfolio Revamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enhance the portfolio site with improved visual design, smoother animations, better mobile experience, and refined interactions while maintaining the DevOps terminal theme in the hero section.

**Architecture:** Incremental enhancements to existing React components. Add CSS animations, improve responsive design, enhance interactivity with micro-interactions, and refine the admin panel experience. Keep the core structure intact while upgrading visual and interaction layers.

**Tech Stack:** React 19, CSS (existing App.css), performative-ui library, Vite

## File Structure
- `src/App.jsx` - Main application component. Contains layout, routing, hero section, and state management. Will be modified to:
  - Refine hero section animations and interactive elements
  - Add contact form component
  - Enhance admin panel with Escape key handling
  - Implement staggered section reveals
- `src/App.css` - Global stylesheet. Will be modified to:
  - Add new animations and keyframes
  - Add category-based colors for skill tags
  - Improve hover/focus states for all interactive elements
  - Enhance responsive layouts
  - Add admin panel mobile card view
  - Add smooth transitions and micro-interactions
- `api/contact.mjs` - New Vercel Serverless Function. Handles contact form submissions:
  - Receives POST with {name, email, message}
  - Validates input
  - Stores to Vercel Blob
  - Returns success/error response

## Global Constraints
- Maintain backward compatibility with existing data structure in src/data.js
- Keep the terminal hero as the brand identity
- All animations respect prefers-reduced-motion
- Mobile-first responsive design
- Accessible focus management
- No breaking changes to existing functionality
- Use existing CSS variables where possible
- Commit frequently with descriptive messages
- Test each feature independently before moving on

---

## Tasks

### Task 1: Create contact API endpoint

**Files:** Create `api/contact.mjs`

**Steps:**
- [ ] Create api/contact.mjs with validation and blob storage
- [ ] Add import and useBlob helper patterns from existing track.mjs
- [ ] Test API with curl POST
- [ ] Commit

### Task 2: Refine hero section with animated stats

**Files:** Modify `src/App.jsx`, `src/App.css`

**Steps:**
- [ ] Add hero pulse animation to profile pic (CSS keyframes)
- [ ] Add sequential terminal line fade-in animations
- [ ] Ensure stats cards have hover lift effect
- [ ] Test hero animations in dev mode
- [ ] Commit

### Task 3: Enhance Skills with colored tags

**Files:** Modify `src/App.jsx`, `src/App.css`

**Steps:**
- [ ] Add getColorClass helper function
- [ ] Add category-specific CSS classes (.skill-tag-blue, .skill-tag-teal, etc.)
- [ ] Test colored tag rendering
- [ ] Commit

### Task 4: Enhance Experience Timeline

**Files:** Modify `src/App.jsx`, `src/App.css`

**Steps:**
- [ ] Add animated timeline line
- [ ] Add hover effects on timeline items
- [ ] Add expandable timeline items on click
- [ ] Test timeline interactions
- [ ] Commit

### Task 5: Add Contact Form

**Files:** Modify `src/App.jsx`, `src/App.css`

**Steps:**
- [ ] Add ContactForm component with floating labels
- [ ] Add form validation (name, email, message)
- [ ] Add success/error states
- [ ] Connect to api/contact.mjs
- [ ] Commit

### Task 6: Admin Panel Polish

**Files:** Modify `src/App.jsx`, `src/App.css`

**Steps:**
- [ ] Add Escape key listener to close admin panel
- [ ] Add responsive card view for admin table on mobile
- [ ] Test admin panel close behavior
- [ ] Commit

### Task 7: Mobile Responsive Improvements

**Files:** Modify `src/App.css`

**Steps:**
- [ ] Ensure all touch targets >= 44px
- [ ] Add bottom nav spacing adjustments
- [ ] Verify scroll reveal on mobile
- [ ] Test on multiple viewport sizes
- [ ] Commit