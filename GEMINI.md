# OITS Dhaka - Gemini Developer Instructions & Coding Rules

This document outlines the strict engineering standards, styling protocols, aesthetic guidelines, and coding practices required when working with the **OITS Dhaka** workspace. Always align code additions, refactorings, or documentation updates with these definitions.

---

## 1. Current Engineering Standards

- **Aesthetic**: Swiss-Modern editorial layout (High contrast, precise margins, generous negative space).
- **Tech Stack Categorization**: When building or documenting features, use the specific categories defined in `constants.ts`: "Frontend", "Backend", "Infrastructure", "Specialized" (AI/ML, IoT, AR/VR, Blockchain/Web-3/DApp, Intelligent Features, Cross-Platform, PWA).
- **Header Navigation Rules**:
    - **Logo**: Use full custom SVGs.
    - **Nav**: Must include `Home` icon and active links. Do NOT include "Request Demo" in the header navigation.
    - **Buttons**: "Get a Quote" text and arrow MUST be aligned horizontally on the same line.

---

## 2. Aesthetic Vision & Design Standards

- **Theme States**: 
  - **Light Mode**: High-density clean Slate-White canvases with rich charcoal text highlights.
  - **Dark Mode**: High-contrast atmospheric obsidian and space-gray canvases with soft blue text highlights. No overly loud saturated neon colors.
- **Typography Pairing**:
  - Headings & Large Displays: Clean tracking, `font-sans` (Inter) or custom space/display typography.
  - Controls, Badges, & Tab Metrics: High-performance monospaced typography (`font-mono` / JetBrains Mono).
- **Smooth Interaction (Motion)**:
  - All page transitions and list entry animations must use Framer Motion / Motion features (`motion/react`).
  - Standard duration sets should range between `500ms` and `700ms` to feel intentional and modern.
  - Favor lightweight CSS transitions for standard hover effects (e.g., scale-ups, subtle rotates).

---

## 3. Core Development & TypeScript Guidelines

### Strict Type Safety
- All data models, routes, state parameters, and properties must have explicit TypeScript declarations.
- Define shared interfaces inside the global `/types.ts` coordinate early rather than declaring inline on multiple files.
- **Type Imports constraint**: 
  - ALWAYS use top-level named imports for types.
  - NEVER use `import type` statement modifiers for dynamic Enum values.
- **Enumerables**: Always use standard, explicit TypeScript `enum` blocks. NEVER use `const enum`.

### Modularity & Code Splitting
- Do NOT aggregate extensive UI segments or full sub-views inside massive monolithic components (like `/App.tsx`).
- Segment layout zones into dedicated atomic items inside `/components/` and `/components/ui/` directories.
- Move extensive static configuration datasets, dictionaries, or lists out of files into `/constants.ts` to keep render engines lightweight.

### React Hooks and State Safety
- **State Updates**: Avoid updating state variables directly inside component render cycles to prevent infinite re-render loop errors.
- **`useEffect` Dependencies**: Ensure dependency arrays are strictly monitored. Never pass un-memoized object instances or function handles. Rely on scalar primitives (such as strings, integers, or booleans) where feasible to maintain render loops in check.

---

## 4. Keyboard Accessibility (Accessibility & WCAG Compliance)

- **Target Elements**: Anchor elements, navigation links, sliders, buttons, and custom triggers require clear focus rings (`focus-visible:ring-2 focus-visible:ring-blue-500`) to guarantee accessibility.
- **Aria Tags**: Provide clear `aria-expanded`, `aria-controls`, and `aria-label` metrics to allow frictionless screen reader parsing.
- **Keyboard Navigation**: Any custom collapsible elements, dropdowns, modal windows, or accordions must support Standard Keyboard triggers (e.g., listening to `Enter` and standard spacebar keyboard code points).

---

## 5. Assets & Web Performance Optimizations

### High-Performance Image Optimization
- All images pulled from external services must append performance optimizations URL query strings directly:
  - `auto=format`, `fit=crop`, `fm=webp` or equivalent next-gen wrappers.
  - Lazy load all non-critical components (`loading="lazy"` attribute).

### Scroll & Passive Interaction Handlers
- Implement passive scroll tracking handlers: `window.addEventListener('scroll', handleScroll, { passive: true });`.
- Wrap heavy interactive translations with standard `window.requestAnimationFrame` schedulers to avoid screen tearing or framerate drops.

---

## 6. Floating AI Consultant (Gemini API Integration)

### Google GenAI Library Implementation
- Use Google's latest official `@google/genai` SDK package. 
- Initialize client engines safely from process environments:
  ```ts
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  ```

### Responsive Prompt Design
- The system instructions must enforce Professional, encouraging, high-speed, concise replies (2-4 sentences) and redirect to contact pipelines for commercial interest.

### Fault Tolerance
- Prevent overall app exceptions if the Gemini API encounters rate limits or invalid keys; always catch exceptions gracefully with manual retry options.

---

## 7. Workflow, Git, and Enhancement Suggestions

### Git Integration
- When finalizing a task, propose a **comprehensive**, conventional commit message that accurately reflects the scope of technical changes (e.g., `feat: [description]`, `fix: [description]`, `refactor: [description]`).
- Ensure the message clearly describes *what* changed and *why*, highlighting any significant functional refinements or additions made.
- After verification, propose pushing the changes to the GitHub repository using the proposed commit message.

### Enhancement Suggestions
- After completing a requested feature, proactively analyze the component worked on.
- Offer 1-2 constructive, high-impact suggestions for further refinement (performance, accessibility, UI micro-interactions).
- Keep suggestions brief and actionable.

---
*Follow these instructions closely to craft the absolute best, most modern digital experience.*
