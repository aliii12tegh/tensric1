# Design System Specification: High-Performance Visual Synthesis

## 1. Overview & Creative North Star
### Creative North Star: "The Obsidian Lens"
This design system is built to feel like a high-end optical instrument—precise, powerful, and disappearing into the background to let the user's imagery take center stage. We move beyond the "generic SaaS" look by embracing **Cinematic Depth**. 

Instead of a flat grid, we use intentional asymmetry and "The Obsidian Lens" philosophy: the UI is a dark, multi-layered environment where the only light comes from the primary accent (Electric Blue) and the user's own content. We avoid the "template" look by using exaggerated typography scales (Display-LG) against ultra-minimalist functional controls.

---

## 2. Colors: The Tonal Hierarchy
The palette is rooted in deep blacks and charcols to minimize eye strain and maximize the "pop" of upscaled images.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to section off the UI. Containers must be defined solely by background shifts. Use `surface-container-low` for large sections sitting on a `surface` background. This creates a sophisticated, "molded" look rather than a "boxed" one.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of obsidian glass.
- **Base Layer:** `surface` (#0e0e0e)
- **Sectional Layer:** `surface-container-low` (#131313)
- **Component Layer:** `surface-container` (#1a1a1a)
- **Active/Elevated Layer:** `surface-container-highest` (#262626)

### The "Glass & Gradient" Rule
For floating panels or high-level upscale settings, use **Glassmorphism**. 
- **Recipe:** Background `primary-container` at 10% opacity + `backdrop-blur: 20px`.
- **Signature Textures:** For primary CTAs, use a linear gradient from `primary` (#84adff) to `primary-dim` (#0070ea) at a 135-degree angle. This adds "soul" and depth that a flat hex code lacks.

---

## 3. Typography: Editorial Authority
We pair **Manrope** (Display/Headlines) with **Inter** (UI/Body) to create a balance between technical precision and high-end editorial style.

- **Display-LG (3.5rem):** Use for hero moments (e.g., "4X Clarity. Zero Artifacts.").
- **Headline-SM (1.5rem):** Use for section headers. Set these with tight letter-spacing (-0.02em) for a "locked-in" professional feel.
- **Body-MD (0.875rem):** The workhorse for all metadata and upscale settings. Use `on-surface-variant` (#adaaaa) for secondary descriptions to maintain high-contrast hierarchy without visual noise.

---

## 4. Elevation & Depth: Tonal Layering
We reject traditional drop shadows in favor of **Ambient Luminance**.

- **The Layering Principle:** To lift a card, place a `surface-container-highest` element on top of a `surface-dim` background. The shift in hex value provides all the "lift" required.
- **Ambient Shadows:** For floating modals only. Use `0px 24px 48px rgba(0, 0, 0, 0.5)`. Never use grey shadows; if the background is tinted, the shadow must be a darker version of that tint.
- **The "Ghost Border" Fallback:** If a separator is required for accessibility, use the `outline-variant` token at **15% opacity**. It should be felt, not seen.
- **Interaction Depth:** When a user interacts with a segmented control or card, transition the background color rather than adding a stroke.

---

## 5. Components: Precision Instruments

### The Upload Zone (The Hero)
- **Style:** A massive `surface-container-low` area. No dashed borders. 
- **State:** On drag-over, the background shifts to `primary-container` at 20% opacity with a `primary` "Ghost Border."
- **Typography:** Centered `title-lg` in `on-surface`.

### Segmented Controls (Upscale Settings)
- **Container:** `surface-container-highest` with `rounded-md` (0.375rem).
- **Indicator:** The active state is a `primary-fixed` pill that physically slides behind the text. Use `on-primary-fixed` (Black) for the text color on the active state to ensure maximum contrast.

### Modern Image Cards
- **Construction:** No dividers. Use `spacing-4` (1rem) to separate the image from the metadata.
- **Metadata:** Use `label-md` for technical specs (e.g., "3000 x 4500px") in `secondary` (#7e98ff) to distinguish it from functional UI text.

### Buttons
- **Primary:** Gradient fill (`primary` to `primary-dim`). `rounded-md`. No border.
- **Secondary:** Transparent background with a "Ghost Border" (15% `outline-variant`).
- **Tertiary:** Pure text using `primary` color. Used for "Cancel" or "Reset" actions.

---

## 6. Do’s and Don’ts

### Do
- **Do** use `surface-bright` (#2c2c2c) for hover states on dark buttons to create a "glow" effect.
- **Do** use the Spacing Scale religiously. Consistent gaps (e.g., `spacing-12` between major sections) define the premium feel more than any color.
- **Do** use `primary` sparingly. It is a laser, not a paint brush. Use it only for the final "Upscale" button or active toggles.

### Don't
- **Don't** use 1px lines to separate list items. Use a `0.5px` background shift or simply white space.
- **Don't** use pure white (#FFFFFF) for long-form body text. Use `on-surface-variant` to reduce "vibration" against the black background.
- **Don't** use standard "drop shadows" on cards. If a card doesn't pop, the background color isn't dark enough.