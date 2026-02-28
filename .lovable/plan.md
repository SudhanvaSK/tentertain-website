

## Plan: Brand Wordplay, Content Refinement, and Vision Section

### 1. Header Brand Wordplay Animation

**What changes:** The brand name in the header will react to which wing is hovered on the landing page.

- Lift `hoveredSide` state from `ButterflyLanding` up to `Index.tsx`, pass it down to both `Header` and `ButterflyLanding`
- In the Header, animate the brand name using `motion.span`:
  - **Green Room hover (left wing):** "Tent" highlights in green -- the viewer reads "Tent"
  - **Box Office hover (right wing):** "entertain" (the full word, starting from the 'e') highlights in crimson -- the viewer reads "Entertain"
  - **Default:** Neutral foreground color for the full name
- The `.com` stays in primary color always

### 2. Center Logo (Remove Brand Name from Center)

- Remove the `h1` brand name text ("Tent" + "ertain" + ".com") from the center of the butterfly wings
- Keep only the logo icon in a circular container at the center, plus the tagline "The Show Starts Here" and the hover hint
- The brand name lives solely in the header now -- single, clean placement

### 3. Remove Jargon from About Us

Update the four cards in the About section:
- **"Two Wings, One Vision"** card: Remove "The world's first Butterfly Platform" -- replace with: "One space to prepare, one space to perform. Built for everyone who makes the stage come alive."
- Keep the other three cards as-is (they read well without jargon)

### 4. Refine How It Works Subtitle

- Change "Two wings. One stage. Choose your side, and let us handle the rest." to a cleaner line: "A seamless way to prepare, perform, and experience India's stage."

### 5. Replace "Success-Based Growth" with Vision/Motto

Replace the current transactional-sounding block (lines 301-322) with an elegant vision section:
- Remove the "Success-Based Growth" title and payment-model text
- Replace with a "Our Promise" or simply an untitled vision block
- Content focuses on being the digital backbone of Indian performing arts
- Keep the blockquote but refine it: "We are the digital backbone of the Indian stage. One elegant interface replacing a thousand frantic phone calls. Welcome to the stage, reimagined."
- Style it as a wider, more prominent statement -- feels aspirational, not transactional

---

### Technical Details

**Files modified:**

1. **`src/pages/Index.tsx`**
   - Add `useState` for `hoveredSide`
   - Pass `hoveredSide` and `setHoveredSide` as props to `ButterflyLanding`
   - Pass `hoveredSide` as prop to `Header` (rendered inside ButterflyLanding, so will restructure slightly -- either lift Header out or pass through)

2. **`src/components/Header.tsx`**
   - Accept `hoveredSide` prop (`"none" | "left" | "right"`)
   - Replace static brand name with animated `motion.span` elements:
     - Split text: `T` | `ent` | `ertain` | `.com`
     - On left hover: `T` + `ent` both highlight green (reads "Tent")
     - On right hover: `ent` + `ertain` both highlight crimson (reads "entertain")
     - Default: all in neutral foreground

3. **`src/components/ButterflyLanding.tsx`**
   - Accept `hoveredSide` and `onHoverChange` props instead of owning the state
   - Remove brand name `h1` from center overlay (lines 37-57), keep logo icon + tagline only
   - Update "Two Wings, One Vision" card text (line 214)
   - Update How It Works subtitle (line 259)
   - Replace "Success-Based Growth" block (lines 301-322) with vision/motto section

**No new files or dependencies needed.**

