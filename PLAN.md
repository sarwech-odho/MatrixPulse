Project: MatrixPulse - Destiny Matrix Coaching Platform

1. Goal
Build a high-performance, mobile-first SaaS platform for Destiny Matrix calculations and personalized coaching. The goal is to move beyond static numerology and offer a high-end, AI-powered transformation engine.

2. Design Language: "Liquid Glass Minimalism"
Background: Deep obsidian/charcoal with slow-moving aurora gradients.
Components: Frost-glass containers (backdrop-filter: blur(20px)), high-contrast text, and refined typography (Serif headers/Sans-Serif body).
Interactions: Magnetic-snap animations for charts; all UI must be interactive and touch-friendly for mobile.

3. Tech Stack
Framework: Next.js (App Router).
Styling: Tailwind CSS + Framer Motion.
Charts: Recharts (for Canvas-based radar/matrix visualizations).
Content Strategy: Programmatic SEO structure (Hub and Spoke model).

4. Execution Milestones (The "Act" Phase)
Phase 1: Foundation & Math Engine
[ ] Create lib/matrix-math.js: Implement Modulo-22 logic for the 5 main nodes (Left, Top, Right, Bottom, Center).
[ ] Implement utility functions for node reduction (e.g., reduceTo22).
[ ] Verify logic with test cases provided by the user.

Phase 2: UI/UX (Liquid Glass Implementation)
[ ] Build components/Hero.tsx: Implement the conversation-first DOB input field.
[ ] Build components/MatrixChart.tsx: Use Canvas/Recharts to animate the matrix generation.
[ ] Implement components/ShadowToggle.tsx: A toggle component that swaps between "Shadow State" (Challenge) and "Light State" (Solution).

Phase 3: Programmatic SEO Architecture
[ ] Set up the data folder (/data/arcana-definitions.json).
[ ] Define the template for dynamic pages: pages/meaning/[arcana]/[zone].tsx.
[ ] Ensure canonical tags and SEO-optimized meta tags are handled per-page.

Phase 4: Validation & Launch
[ ] Implement a "Recently Calculated" ticker to drive social proof.
[ ] Setup Google Search Console integration instructions.
[ ] Perform a "Data Depth" audit: Ensure every programmatic page has at least 5-7 unique data points before indexing.

5. Rules for the Agent
Tone: Blunt, directive, and tech-forward. Avoid all "mystical" fluff.
Safety: Always validate math results. If a calculation is ambiguous, flag it in the logs rather than failing silently.
SEO: Every generated page must have a unique H1, clear meta-description, and an internal link back to the core calculator.
