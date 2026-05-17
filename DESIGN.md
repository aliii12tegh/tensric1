---
name: Obsidian Cinematic
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#20201f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e5e2e1'
  on-surface-variant: '#cbc3d7'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#958ea0'
  outline-variant: '#494454'
  surface-tint: '#d0bcff'
  primary: '#d0bcff'
  on-primary: '#3c0091'
  primary-container: '#a078ff'
  on-primary-container: '#340080'
  inverse-primary: '#6d3bd7'
  secondary: '#5de6ff'
  on-secondary: '#00363e'
  secondary-container: '#00cbe6'
  on-secondary-container: '#00515d'
  tertiary: '#d3bbff'
  on-tertiary: '#3f0689'
  tertiary-container: '#a37af1'
  on-tertiary-container: '#37007c'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#d0bcff'
  on-primary-fixed: '#23005c'
  on-primary-fixed-variant: '#5516be'
  secondary-fixed: '#a2eeff'
  secondary-fixed-dim: '#2fd9f4'
  on-secondary-fixed: '#001f25'
  on-secondary-fixed-variant: '#004e5a'
  tertiary-fixed: '#ebdcff'
  tertiary-fixed-dim: '#d3bbff'
  on-tertiary-fixed: '#260059'
  on-tertiary-fixed-variant: '#572ba0'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353535'
typography:
  display-xl:
    fontFamily: sora
    fontSize: 80px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: sora
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: sora
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: jetbrainsMono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1440px
  gutter: 24px
---

## Brand & Style

This design system is built on the concept of **Obsidian Luxury**—a dark-mode-first aesthetic that blends the technical precision of high-end SaaS with the immersive depth of modern cinema. The visual narrative is defined by "The Void," where deep, light-absorbing blacks provide a canvas for high-energy accents of electric violet and holographic cyan.

The design style is a sophisticated mix of **Glassmorphism** and **Technical Minimalism**. It utilizes translucent layers, subtle noise textures to emulate film grain, and "bloom" lighting effects that make UI elements feel like they are floating in a three-dimensional space. The goal is to evoke a sense of professional-grade power, making the act of AI image upscaling feel like a premium, transformative experience.

## Colors

The palette is anchored by the deep blacks of the **Obsidian Core** (#050505), ensuring maximum contrast for the AI-generated imagery. 

- **Primary (Electric Violet):** Used for primary actions and "state of power" indicators. It represents the AI engine's energy.
- **Secondary (Holographic Cyan):** Reserved for technical accents, progress bars, and subtle highlights to provide a "chromatic" shift.
- **Surface Tones:** Graphite grays (#1A1A1A) are used for glass containers, providing just enough separation from the background without breaking the dark immersion.
- **Gradients:** Use a "Mesh Glow" approach. Avoid linear transitions; instead, use radial blurs of Deep Indigo (#4C1D95) behind surfaces to create ambient lighting.

## Typography

Typography in this design system emphasizes clarity and a futuristic, technical edge. 

- **Display & Headlines:** **Sora** is utilized for its wide, geometric stance. Large headers should use tight letter spacing and heavy weights to create a "cinematic" presence.
- **Body & UI:** **Geist** provides the professional, technical utility required for a SaaS platform. It is highly readable at small sizes and maintains a neutral, precise character.
- **Technical Labels:** **JetBrains Mono** is used for metadata, resolution specs, and AI processing details, reinforcing the "developer-grade" power of the tool.
- **Contrast:** Always pair oversized, bold headlines with significantly smaller, spacious body text to create a high-fashion editorial hierarchy.

## Layout & Spacing

The layout philosophy follows a **Fixed-Fluid Hybrid** model. Content is contained within a 1440px max-width grid, but background elements, mesh glows, and glass panels should bleed to the edges of the viewport to maintain an immersive feel.

- **Grid:** A 12-column system with 24px gutters. For the image editor interface, use a "Dashboard" layout with a fixed left-rail sidebar (280px) and a fluid center canvas.
- **Rhythm:** Utilize generous vertical padding (80px+) between sections on landing pages to allow the "Obsidian" aesthetic to breathe.
- **Mobile:** Reflow to a single-column stack. Increase margins to 24px to ensure UI elements do not feel cramped against the screen edges.

## Elevation & Depth

Hierarchy is established through **Luminance and Blur** rather than traditional shadows.

- **Surface Layers:** Base level is #050505. Containers use #1A1A1A with a 60% opacity and a 20px backdrop blur (Glassmorphism).
- **Borders:** Instead of heavy shadows, use a 1px "Metallic" border. This is achieved with a linear gradient (top-left to bottom-right) using #FFFFFF (10% opacity) to #FFFFFF (2% opacity).
- **Ambient Lighting:** High-priority elements (like the active upscaling card) should have a soft "Neon Bloom"—a 64px radial blur of Electric Violet at 15% opacity positioned behind the component.
- **Chrome Reflections:** Buttons and active states should feature a subtle top-edge highlight (0.5px white inner stroke) to simulate a light source reflecting off a physical glass edge.

## Shapes

The shape language is **Refined & Intentional**. 

We use a "Standard Rounded" (0.5rem) approach for most UI components like inputs and buttons to maintain a modern SaaS feel. However, large "Feature Cards" or "Image Previews" should scale up to `rounded-xl` (1.5rem) to soften the cinematic visuals. 

Avoid fully rounded pills except for status indicators (chips). Sharp 90-degree corners are reserved for the outer edges of the primary viewport or dividers to maintain a structural, architectural integrity.

## Components

- **Primary Button:** High-contrast Electric Violet background. Use a subtle top-to-bottom gradient. On hover, apply a `box-shadow` using the Violet color with a high blur (20px) to create a "bloom" effect.
- **Glass Cards:** Semi-transparent Graphite background with a 1px metallic border. Incorporate a subtle noise texture (SVG filter) at 3% opacity to give the surface a tactile, filmic feel.
- **Input Fields:** Darker than the surface (#000000), 1px border. On focus, the border glows with Holographic Cyan.
- **Chips/Badges:** Use JetBrains Mono. Small, uppercase, with a 1px border and a subtle background tint of the accent color.
- **AI Progress Bar:** A thin (4px) track in Graphite with a "charging" Holographic Cyan fill that features a 10px outer glow.
- **Image Comparison Slider:** A vertical "Chrome" handle with a high-contrast white line, allowing users to swipe between the "Before" (Low Res) and "After" (Tensric AI) states.