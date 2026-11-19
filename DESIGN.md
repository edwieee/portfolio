---
name: Edwin Biju Portfolio
description: A restrained, typography-led introduction for an independent AI engineer.
colors:
  canvas: "#0a0a0a"
  body: "#a8a8a8"
  strong: "#f2f2f2"
  muted: "#7c7c7c"
  accent: "#4da3ff"
  accent-hover: "#78b9ff"
  control: "#171717"
  control-border: "#2b2b2b"
typography:
  body:
    fontFamily: "Helvetica Neue, Helvetica, Arial, system-ui, -apple-system, sans-serif"
    fontSize: "19px"
    fontWeight: 550
    lineHeight: 1.38
    letterSpacing: "-0.018em"
  label:
    fontFamily: "Helvetica Neue, Helvetica, Arial, system-ui, -apple-system, sans-serif"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.01em"
rounded:
  image: "13px"
  control: "14px"
spacing:
  text-gap: "22px"
  action-gap: "14px"
  page-gutter: "24px"
components:
  button-primary:
    backgroundColor: "{colors.strong}"
    textColor: "{colors.canvas}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "56px"
  button-secondary:
    backgroundColor: "{colors.control}"
    textColor: "{colors.body}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "56px"
---

# Design System: Edwin Biju Portfolio

## Overview

**Creative North Star: "The Quiet Introduction"**

The system behaves like a considered personal note rather than a conventional portfolio. Typography, spacing, and a single portrait carry the page; every element is functional and nothing competes with the biography.

**Key Characteristics:**
- Near-black, flat canvas
- Narrow centered reading column
- Restrained white emphasis within gray prose
- One blue interaction accent
- Compact, gently rounded controls and imagery

## Colors

The palette keeps the page subdued while preserving clear hierarchy and accessible interaction states.

### Primary
- **Clear Signal:** Reserved for interactive link feedback rather than decoration.

### Neutral
- **Ink Canvas:** The uninterrupted page ground.
- **Reading Gray:** Default biography text.
- **Direct White:** Brand, emphasis, email, and primary action surfaces.
- **Quiet Gray:** Secondary navigation that remains AA-legible.

**The Rarity Rule.** Blue appears only when a text interaction needs to announce itself.

## Typography

**Body Font:** Helvetica Neue with Helvetica, Arial, and platform sans-serif fallbacks.

**Character:** Neutral and highly legible, with hierarchy created through controlled weight changes rather than a separate display face.

### Hierarchy
- **Body** (550, 19px, 1.38): Biography copy with a maximum measure of 74 characters.
- **Emphasis** (650): Key technical phrases and direct contact details.
- **Label** (600, 18px, 1): Navigation and action controls.

**The Single Voice Rule.** Use one sans-serif family throughout; create distinction through weight, color, and spacing.

## Layout

The page uses one centered column capped at 850px with 24px desktop gutters. Navigation sits near the top, followed by a 66–92px pause before the introduction. Paragraphs use a 22px rhythm and actions sit 36px below the biography. At 600px, gutters reduce to 20px, copy becomes 17px, and spacing contracts without changing the reading order.

## Elevation & Depth

The system is entirely flat. Depth comes from tonal contrast and borders; shadows, glow, blur, and gradients are not part of the language.

## Shapes

The portrait uses a compact 13px radius. Buttons use a related 14px radius and thin borders. Corners should feel softened, not pill-shaped.

## Components

### Buttons
- **Shape:** Compact rounded rectangle with a 56px desktop height.
- **Primary:** Direct-white surface with dark text.
- **Secondary:** Dark control surface with a subtle neutral border.
- **Hover / Focus:** Small tonal shifts on hover and a visible blue focus outline for keyboard users.

### Navigation
- The wordmark is white and semibold. The social destination is quiet gray, right-aligned, and turns white on hover. Mobile preserves the same two-point composition.

### Profile Image
- A small square crop precedes the biography and uses the same gentle corner language as the controls.

## Do's and Don'ts

### Do:
- **Do** preserve generous empty space around the single reading column.
- **Do** reserve white for identity, emphasis, and direct actions.
- **Do** keep all interaction states subtle but visibly keyboard-accessible.

### Don't:
- **Don't** add cards, shadows, gradients, decorative technology motifs, or ambient animation.
- **Don't** introduce extra portfolio sections into the introduction surface.
- **Don't** widen body copy beyond its comfortable reading measure.
