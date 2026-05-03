# Production Architecture Layout

This repository has been reorganized into a feature-first structure while preserving full runtime behavior.

## Source Structure

- `src/app`: Next.js App Router entry points and route-level composition
- `src/features`: Feature domains and business-facing UI modules
- `src/shared`: Shared primitives (UI, hooks, utilities)
- `src/ai`: AI/genkit-related flows and setup

## Portfolio Feature

- `src/features/portfolio/components`: Portfolio section components
- `src/features/portfolio/components/animations`: Portfolio motion/reveal modules

## Shared Layer

- `src/shared/ui`: Reusable UI primitives
- `src/shared/hooks`: Reusable hooks
- `src/shared/lib`: Shared utility and placeholder data modules

## Backward Compatibility

Legacy paths are preserved as lightweight re-export shims:

- `src/components/portfolio/*`
- `src/components/ui/*`
- `src/components/Animations&Motion/ScrollReveals/tsx/CinematicScroll.tsx`
- `src/hooks/*`
- `src/lib/*`

This enables incremental migration with no functional or visual regressions.
