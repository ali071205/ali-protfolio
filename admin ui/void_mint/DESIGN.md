---
name: Void & Mint
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#b9cbbd'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#849589'
  outline-variant: '#3a4a40'
  surface-tint: '#00e296'
  primary: '#f6fff6'
  on-primary: '#003822'
  primary-container: '#00ffaa'
  on-primary-container: '#007149'
  inverse-primary: '#006c46'
  secondary: '#9ecfd1'
  on-secondary: '#003739'
  secondary-container: '#1a4e50'
  on-secondary-container: '#8dbec0'
  tertiary: '#fffcfb'
  on-tertiary: '#313030'
  tertiary-container: '#e2dfdf'
  on-tertiary-container: '#636262'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#4dffb1'
  primary-fixed-dim: '#00e296'
  on-primary-fixed: '#002112'
  on-primary-fixed-variant: '#005233'
  secondary-fixed: '#b9ecee'
  secondary-fixed-dim: '#9ecfd1'
  on-secondary-fixed: '#002021'
  on-secondary-fixed-variant: '#1a4e50'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474746'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Libre Caslon Text
    fontSize: 64px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Libre Caslon Text
    fontSize: 40px
    fontWeight: '400'
    lineHeight: '1.1'
  headline-md:
    fontFamily: Libre Caslon Text
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-padding-mobile: 20px
  container-padding-desktop: 40px
  gutter: 16px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

The design system is a sophisticated fusion of high-contrast editorial aesthetics and futuristic glassmorphism, tailored for a high-end admin dashboard experience. It evokes a sense of technical precision and premium exclusivity through a "dark mode by default" philosophy.

The visual language balances the "Void"—a deep, expansive charcoal foundation—with the "Mint"—vibrant, electric sparks of color that guide the user's eye to critical actions and data insights. The style utilizes translucent layers and subtle gradients to create a sense of three-dimensional space without the clutter of traditional shadows. It is designed for elite professionals who demand a workspace that is both highly functional and visually arresting.

## Colors

The palette is anchored in **#0a0a0a**, providing a bottomless canvas that minimizes eye strain and maximizes the "pop" of UI elements.

- **Primary (Mint):** Used for primary calls to action, active states, and critical success indicators. It should be used sparingly to maintain its high-impact nature.
- **Secondary (Sage):** A muted, calming counterpoint to the Mint. Used for secondary data visualizations, informational badges, and less urgent accents.
- **Neutral/Surface:** Various shades of charcoal and deep gray are used to differentiate container levels.
- **Glass Effects:** Interactive surfaces use a semi-transparent white overlay at 3-5% opacity with a heavy backdrop blur (20px+) to create the glassmorphism effect.

## Typography

This design system employs a high-contrast typographic pairing to bridge the gap between editorial luxury and technical utility.

- **Display & Large Headlines:** We use **Libre Caslon Text**. This serif face provides an authoritative, sophisticated character that breaks the monotony of typical SaaS dashboards. It should be used for page titles and hero metrics.
- **UI & Body Text:** **Inter** is the workhorse font for all functional elements. Its high x-height and neutral character ensure legibility in data-dense environments.
- **Micro-copy:** Use `label-caps` for table headers, section dividers, and small badges to create a structured, architectural feel.

## Layout & Spacing

The layout follows a **fluid-to-fixed** model. On mobile, we use a single-column stack with 20px side margins. On desktop, the system transitions to a 12-column grid with a maximum content width of 1440px.

- **Vertical Rhythm:** Spacing is strictly based on an 8px scale.
- **Density:** While the branding is "sleek," the admin nature requires efficient use of space. We use "breathable density"—tight internal padding within components but generous margins between major sections to maintain the premium feel.
- **Mobile-First:** Navigation is hidden behind a translucent bottom bar or a full-screen glass overlay to maximize vertical space for data.

## Elevation & Depth

Depth in this design system is achieved through **translucency and refraction** rather than traditional dropshadows.

1.  **Level 0 (Canvas):** The #0a0a0a background.
2.  **Level 1 (Card/Container):** A glass effect with a 1px border of `rgba(255, 255, 255, 0.1)`. This creates a "cut" into the darkness.
3.  **Level 2 (Hover/Active):** An increased backdrop blur and a faint inner glow (0.5px white at 10% opacity) on the top edge.
4.  **Accent Depth:** For primary elements, use a "Mint Glow"—a very soft, blurred outer glow using the primary color at 15% opacity to simulate light emitting from the component.

## Shapes

The shape language is precise and architectural. We use a **Soft (0.25rem)** base roundedness to maintain a modern, technical feel without appearing overly "bubbly."

- **Small Components (Buttons, Inputs):** 4px (0.25rem) radius.
- **Large Containers (Cards, Modals):** 12px (0.75rem) radius.
- **Status Pills:** Fully rounded (pill-shaped) to distinguish them from interactive buttons.
- **Borders:** Always 1px. Use high-contrast Mint borders only for active input focus or primary selection states.

## Components

- **Buttons:** Primary buttons use a solid Mint background with black text. Secondary buttons are ghost-style with a Mint 1px border. All buttons have a transition effect that increases backdrop blur on hover.
- **Inputs:** Input fields are dark with a 1px `border_subtle`. On focus, the border transitions to Primary Mint, and a subtle Mint glow is applied.
- **Cards:** Use the glassmorphism treatment. Headers within cards should use the `label-caps` typography style.
- **Chips/Badges:** Small, pill-shaped elements. Sage is the default for informational chips; Mint is reserved for "Online" or "Success" states.
- **Lists:** Clean rows separated by 1px `border_subtle` lines. Hovering over a list item should apply a subtle white tint (2% opacity) to the background.
- **Data Visualization:** Use Mint for the primary data series and Sage for secondary or historical data. Grid lines in charts should be kept at 5% white opacity to remain nearly invisible.