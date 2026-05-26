# OITS Dhaka - Modern Software Solutions
## Comprehensive Technical Documentation & Developer's Reference

Welcome to the definitive backend and frontend architectural blueprint of the **OITS Dhaka Multi-Page Web Application**. This document serves as the guide for engineers, designers, and project managers. It covers state management, routing paradigms, theme controllers, accessibility, performance optimizations, and the Gemini-integrated AI Assistant.

---

## Table of Contents
1. [Architecture & System Paradigm](#1-architecture--system-paradigm)
2. [Module Map & Core Mechanics](#2-module-map--core-mechanics)
   - [Global Theme Controller & Sticky Shrinking Header](#global-theme-controller--sticky-shrinking-header)
   - [Hero Section with Performance Parallax & Responsive Layout](#hero-section-with-performance-parallax--responsive-layout)
   - [Process timeline with Animated Milestones](#process-timeline-with-animated-milestones)
   - [Enhanced Filterable Case Studies Hub](#enhanced-filterable-case-studies-hub)
   - [Reusable Keyboard-Navigable Accordions & FAQs](#reusable-keyboard-navigable-accordions--faqs)
   - [Form Ingestion & Transmission Engine](#form-ingestion--transmission-engine)
3. [Intelligent Assistant Core (Gemini SDK)](#3-intelligent-assistant-core-gemini-sdk)
   - [Client-Side SDK Initialization](#client-side-sdk-initialization)
   - [System Prompting & Context Adaptation](#system-prompting--context-adaptation)
   - [Fault-Tolerance Lifecycle](#fault-tolerance-lifecycle)
4. [Developer's Guide & Directory Blueprint](#4-developers-guide--directory-blueprint)
   - [Active Tech Stack](#active-tech-stack)
   - [File Tree & System Coordinates](#file-tree--system-coordinates)
5. [Standard Modification Playbooks](#5-standard-modification-playbooks)
   - [Adding a Case Study / Portfolio Piece](#adding-a-case-study--portfolio-piece)
   - [Registering a New Career Opening](#registering-a-new-career-opening)
   - [Adding System-Wide Constants](#adding-system-wide-constants)

---

## 1. Architecture & System Paradigm

The **OITS Dhaka Web Platform** is styled as a multi-page, components-driven web application using **React 18/19**, **Vite**, **TypeScript**, and **Tailwind CSS**. It is fully client-side and optimized for perfect Lighthouse web vitals metrics (LCP, FID, CLS).

### Design Philosophy
Elegance through structure. It leverages robust neutral spacing, a Swiss-Modern color pallet, and dynamic micro-interactions. The layout alternates between:
- **Light Theme**: Solid Slate-White canvas with distinct dark text overlays for ultra-high readability.
- **Dark Theme**: Rich Obsidian-Space-Gray slate canvases designed for minimal eye strain in low-light environments.

### Core Architecture Flow
```
                                 [ React Router / Browser History ]
                                                 |
                                                 v
                       +---------------------------------------------------+
                       |                     App.tsx                       |
                       |   (Houses Shared Themes, Global SEO Controllers)  |
                       +-------------------------+-------------------------+
                                                 |
                     +---------------------------+---------------------------+
                     |                           |                           |
                     v                           v                           v
             +---------------+           +---------------+           +---------------+
             |  Header/Menu  |           | Dynamic Page  |           |  Gemini AI    |
             | (Theme Switch)|           |  Router Root  |           |   Assistant   |
             +---------------+           +---------------+           +---------------+
                                                 |   
                                                 v
                     +-------------------------------------------------------+
                     |  /Home  |  /Services  |  /Portfolio  | /About | /Contact  |
                     +-------------------------------------------------------+
```

---

## 2. Module Map & Core Mechanics

### Global Theme Controller & Sticky Shrinking Header
- **Code Locations**: `App.tsx`, `components/Header.tsx`
- **Theme Support**: Realized via Tailwind CSS `dark:` variant bindings coupled to an active React document level state. It matches preferences from local browser cache (`localStorage`) or browser variables.
- **Shrinking Mechanics**: A dynamic scroll event listener with a viewport check (`window.scrollY > 20px`) runs inside a native web performance `requestAnimationFrame` handler. This keeps scrolling visual transitions fluidly animated (moving between transparent `py-6` or `py-8` spacing and a shrunk `py-2` glassmorphic background layout with customizable backdrop blur).

### Hero Section with Performance Parallax & Responsive Layout
- **Code Location**: `components/Hero.tsx`
- **Interactive Depth**: A 3D parallax background layer tracking subtle mouse coordinate changes. Events are compiled using passive browser events and rendered sequentially within native screen refresh cycles, preventing main thread blocking.
- **Vitals Optimization**: High-performance image optimization flags (e.g., `fm=webp&auto=format&fit=crop`) are pre-applied to the hero assets to keep LCP durations at a minimum.

### Process Timeline with Animated Milestone Blocks
- **Code Location**: `components/Process.tsx`
- **Execution Roadmap**: Guides users through the stages of development:
  1. Discovery & Strategy
  2. Design & Prototyping
  3. Agile Development
  4. Quality Assurance
  5. Launch & Evolution
- **Layout Rhythm**: Employs staggered offset alignments in alternating grid modules that animate dynamically when sliding into the active viewport threshold.

### Enhanced Filterable Case Studies Hub
- **Code Location**: `components/Portfolio.tsx`, `pages/PortfolioPage.tsx`
- **Granular Sorting**: Users can search and filter case studies on demand using both general category folders and specific technology tags.
- **Project Demos**: Features a completely customizable, interactive custom video player layer supporting video demonstration tracks and captions fallback rules.
- **Social Sharing**: Interactive share controllers for LinkedIn and Twitter are embedded directly within the project overview modal to simplify resource sharing.

### Reusable Keyboard-Navigable Accordions & FAQs
- **Code Location**: `components/ui/Accordion.tsx`, `pages/AboutPage.tsx`
- **Compliance Rules**: Designed to align with WCAG standard protocols. Supports:
  - Complete keyboard interaction (handling `Enter` and Spacebar inputs).
  - Explicit compliance indicators via correct `aria-expanded` and `aria-controls` bindings.
  - Generous target widths and layout spacing.

### Form Ingestion & Transmission Engine
- **Code Location**: `components/Contact.tsx`
- **Validation Constraints**: Strict validation triggers check for valid email styling and form details before any submission pipeline opens.
- **Interaction Feedback**: Interactive circular loaders and background overlays update users on submission progress.

---

## 3. Intelligent Assistant Core (Gemini SDK)

The platform hosts an interactive corporate AI advisor inside `components/AiAssistant.tsx`. It interfaces directly with standard Google Generative AI endpoints.

### Client-Side SDK Initialization
Communicating safely via Vite-compiled environments:
```ts
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
```

### System Prompting & Context Adaptation
The AI model adapts dynamically depending on user input context:
- **Default State**: Focuses on structured software consulting guidelines (technologies, system architectures).
- **Proactive Contact Trimming**: Directs interested users to OITS Dhaka's request forms when it detects expressions of active commercial interest.

### Fault-Tolerance Lifecycle
Whenever network exceptions or coordinate blocks happen, the widget renders localized, safe error prompts with a retry button to keep conversations responsive.

---

## 4. Developer's Guide & Directory Blueprint

### Active Tech Stack
- **Foundation**: React 18+, TypeScript (Target ESNext module resolution), Vite
- **Styling framework**: Tailwind CSS, PostCSS configuration, Lucide React
- **Fluid transitions**: Framer Motion/Motion (`motion/react`)
- **Intelligence layer**: `@google/genai` TypeScript client kit

### File Tree & System Coordinates
The system's clear division of labor separates assets, static constants, page configurations, and core components:
```
├── src/
│   ├── App.tsx                   # System Router & global theme state controller
│   ├── main.tsx                  # Web container entry mount point
│   ├── index.css                 # Master styles (includes responsive scrollbar definitions)
│   ├── types.ts                  # Shared TypeScript models and interfaces
│   ├── constants.ts              # System-wide static copy, portfolio datasets, pricing parameters
│   │
│   ├── components/               # High-fidelity visual system components
│   │   ├── ui/                   # Reusable atomic buttons, layouts, and accordion widgets
│   │   │   ├── Button.tsx        # Standard button variations
│   │   │   ├── Accordion.tsx     # Keyboard-friendly accessible FAQ widget
│   │   │   └── ScrollReveal.tsx  # Dynamic scroll indicator wrappers
│   │   │
│   │   ├── Header.tsx            # Sticky navigation structure & theme switchers
│   │   ├── Footer.tsx            # Full sitemap generation & dynamic newsletter capture
│   │   └── AiAssistant.tsx       # Embedded voice-compatible Gemini client
│   │
│   └── pages/                    # Explicit template views matched to Router configurations
│       ├── Home.tsx              # Homepage (Includes carousels, testimonials, works summary)
│       ├── ServicesPage.tsx      # Advanced services capabilities matrix & deep-dives
│       ├── PortfolioPage.tsx     # Case-study center with complex tag filtering
│       ├── AboutPage.tsx         # Our values, timeline story center & accessible FAQs
│       └── ContactPage.tsx       # Enterprise scheduling options and coordinate indicators
```

---

## 5. Standard Modification Playbooks

### Adding a Case Study / Portfolio Piece
To publish a new successful case study, append a standard item to the `PROJECTS` array in `src/constants.ts`:
```ts
{
  id: '7',
  title: 'Next-Gen FinTech Suite',
  category: 'Enterprise Software',
  imageUrl: 'https://images.unsplash.com/...',
  description: 'A brief description of the project outcome.',
  fullDescription: 'In-depth implementation details and project results...',
  technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
  demoVideoUrl: 'https://commondatastorage.googleapis.com/...',
  captionsUrl: 'https://storage.googleapis.com/...'
}
```

### Registering a New Career Opening
To add an active opening, append an item to the vacancy list inside your target state, or modify values inside your careers configuration pages in `src/pages/CareersPage.tsx` or matching constants inside `src/constants.ts`.

### Adding System-Wide Constants
To modify overall system emails, phone details, addresses, or metadata, update the constant values declared at the top of `src/constants.ts`:
```ts
export const CONTACT_EMAIL = "hq@oitsdhaka.com";
export const ADDRESS = "Updated Office Address, Dhaka, Bangladesh";
```
These changes propagate instantly dynamically across the footer, AI models, contact panels, and dynamic search listings.

---
*Created & maintained by the OITS Dhaka Team.*
