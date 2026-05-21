# Skill Registry for Plum Uruguay MVP

## Project Standards (auto-resolved)

**Tech Stack:**
- Framework: Next.js 16.2.4 (App Router)
- Language: TypeScript 5.x
- Style: Tailwind CSS v4.0.0 + PostCSS
- UI Components: shadcn/ui v2.0 (configured with CSS custom properties under @theme in Tailwind v4)
- State Management: Lightweight react state / signals (Zustand optional) for Cart
- Formats: Given/When/Then scenarios for specs, RFC 2119 keywords

**Architecture:**
- **Screaming / Feature Architecture**: All business capabilities (Catalog, Cart) are encapsulated inside `src/modules/{feature_name}`.
- Folder Structure:
  - `src/app/`: Next.js App Router (strictly for route definitions and thin layouts/pages).
  - `src/modules/`: Self-contained features.
    - `{feature_name}/components/`: Local components for that feature.
    - `{feature_name}/hooks/`: Local hooks.
    - `{feature_name}/types.ts`: Local type definitions.
  - `src/modules/shared/`: Shared layout, wrapper, and global UI components (including `src/modules/shared/components/ui/` for shadcn components).
- **Against Immediacy & Monoliths**: Zero ad-hoc layout utilities outside established modular units.
- **Aesthetic Principles (Tweakcn + React Bits)**: Cozy craft feeling. HSL color tokens for paper/kraft textures. Use dynamic micro-animations (from React Bits) for interactive cards, page transitions, and the shopping cart sidebar.
- **Checkout Design**: E-commerce cart simulated order creation -> client-side stateful cart with complete item manipulation (add, remove, change quantities, duplicate items) -> checkout simulation showing custom mock receipt and order success state. Individual product profile pages showcasing mock descriptions, pricing, and shipping details.


## Project Skills
- None defined yet.

## User Skills
- branch-pr
- fusalabs-internal-comms
- fusalabs-notion-action
- fusalabs-notion-interpretation
- fusalabs-work-log
- go-testing
- issue-creation
- judgment-day
- sdd-apply
- sdd-archive
- sdd-design
- sdd-explore
- sdd-init
- sdd-propose
- sdd-spec
- sdd-tasks
- sdd-verify
- skill-creator
