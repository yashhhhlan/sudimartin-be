# 🎨 PRO FAMILY TREE COMPONENTS - Visual Reference Guide

## 📺 Layout Variants Showcase

### 1️⃣ SINGLE MEMBER LAYOUT

```
┌──────────────────┐
│   Gen 1 Badge    │
│                  │
│    [Avatar]      │
│  ♂ (gender)      │
│   John Doe       │
│   📅 1970-01-15  │
│                  │
│  [Edit] [Delete] │
│  [+ Spouse]      │
│  [+ Child]       │
└──────────────────┘

Colors:
- Avatar: Blue gradient + border-blue-400
- Badge: blue-100 bg, blue-700 text
- Name: gray-800
- Gender: ♂ symbol
- Buttons: Edit=Blue, Delete=Red, Add=Green
```

---

### 2️⃣ COUPLE LAYOUT (1 Spouse)

```
┌────────────────────────────────┐
│      Gen 1 Badge               │
│                                │
│  [Avatar]  ♥  [Avatar]         │
│    ♂             ♀             │
│ John Doe    Siti Rahman        │
│                                │
│  [Edit] [Delete] [+ Child]     │
└────────────────────────────────┘

Colors:
- Heart: text-red-400
- Avatars: Blue gradient
- Layout: Horizontal centered
```

---

### 3️⃣ MULTI-SPOUSE LAYOUT (2+ Spouses)

```
┌────────────────────────────────────────────┐
│             Gen 1 Badge                    │
│                                            │
│ [Avatar] ♥ [Avatar] ♥ [Avatar] ♥ [Avatar] │
│  Wife 1   Husband    Wife 2    Wife 3      │
│  (Fatma)  (Ahmad)    (Siti)    (Nur)       │
│                                            │
│   [Edit] [Delete] [+ Child] [+ Spouse]    │
└────────────────────────────────────────────┘

Colors:
- Multiple hearts: text-red-400
- All avatars: Blue gradient
- Balanced layout: Husband in middle
```

---

## 🎯 Button Styling Reference

### Edit Button (Blue)

```
Background: gradient from-blue-400 to-blue-600
Hover: from-blue-500 to-blue-700
Size: 40x40px (sidebar), 32x32px (card)
Icon: <Edit2 size={16-18} />
Shadow: shadow-xl on hover
Transform: hover:scale-110
```

### Delete Button (Red)

```
Background: gradient from-red-400 to-red-600
Hover: from-red-500 to-red-700
Size: 40x40px (sidebar), 32x32px (card)
Icon: <Trash2 size={16-18} />
Shadow: shadow-xl on hover
Transform: hover:scale-110
```

### Add Spouse Button (Pink)

```
Background: gradient from-pink-400 to-pink-600
Hover: from-pink-500 to-pink-700
Size: 40x40px (sidebar), 32x32px (card)
Icon: <Heart size={16-18} />
Shadow: shadow-xl on hover
Transform: hover:scale-110
Visibility: Only for single males
```

### Add Child Button (Green)

```
Background: gradient from-green-400 to-green-600
Hover: from-green-500 to-green-700
Size: 40x40px (sidebar), 32x32px (card)
Icon: <Plus size={16-18} />
Shadow: shadow-xl on hover
Transform: hover:scale-110
Visibility: Always visible
```

---

## 🔗 Connector Lines Visualization

### Parent to Single Child

```
        [Parent]
            |
            |
            ↓
        [Child]
```

### Parent to Multiple Children (Same Mother)

```
        [Parent]
            |
            |
    ├───────┼───────┐
    ↓       ↓       ↓
 [Child1] [Child2] [Child3]
```

### Multi-Spouse with Children Groups

```
[Wife1] ♥ [Husband] ♥ [Wife2]
           |              |
       [Children      [Children
        from Wife1]    from Wife2]
```

**Line Style:**

- Color: #3b82f6 (blue-500)
- Width: 3px
- Opacity: 0.7
- Cap: round
- Arrow at child: solid #1e40af

---

## 📱 Responsive Breakpoints

### 📱 Mobile (< 768px)

```
Full width: 100vw
Padding: 1rem
Card layout: Stack
Gap between cards: 1rem (gap-4)
Avatar size: medium
Sidebar: Hidden, buttons at bottom
Button size: 32x32px
```

### 📱 Tablet (768px - 1024px)

```
Width: 90% centered
Padding: 1.5rem
Cards per row: 2-3 flexible
Gap: 1.5rem (gap-6)
Avatar size: large
Sidebar: Visible on hover
Button size: 40x40px
```

### 🖥️ Desktop (> 1024px)

```
Width: 95% centered
Padding: 2rem
Cards per row: 3-4+
Gap: 2rem (gap-8)
Avatar size: large
Sidebar: Always visible on hover
Button size: 40x40px
```

---

## 🎨 Color Reference

### Primary Colors

```
Blue (Edit):        #3b82f6 → #2563eb
Red (Delete):       #ef4444 → #dc2626
Pink (Spouse):      #ec4899 → #be185d
Green (Child):      #10b981 → #059669
```

### Neutral Colors

```
White:              #ffffff
Gray-100:           #f3f4f6
Gray-200:           #e5e7eb
Gray-400:           #9ca3af
Gray-600:           #4b5563
Gray-700:           #374151
Gray-800:           #1f2937
```

### Status Colors

```
Deceased Red:       #ef4444 (red-500)
Success Green:      #10b981 (green-500)
Badge Blue:         #3b82f6 (blue-500)
```

---

## 🎯 Spacing Reference

### Card Spacing

```
Padding: 1rem (md:1.25rem)
Border-radius: rounded-2xl (24px)
Border-width: 2px
Gap between cards: 1rem (mobile) → 2rem (desktop)
Space between generations: 3rem (mobile) → 4rem (desktop)
```

### Button Spacing

```
Sidebar buttons: gap-2 vertical
Card buttons: gap-2 horizontal
Button to avatar: margin-top-4
```

### Avatar Spacing

```
Border-width: 3-4px (size-dependent)
Gender badge: -bottom-1 -right-1
Deceased badge: absolute inset-0
```

---

## ✨ Animation Reference

### Hover Transitions

```
All transitions: transition-all duration-300 ease-in-out

Card hover:
  - Scale: 100% → 105%
  - Shadow: shadow-lg → shadow-2xl
  - Border: border-gray-200 → border-blue-400

Button hover:
  - Scale: 100% → 110%
  - Opacity: opacity-0 → opacity-100

Button active:
  - Scale: 100% → 95%
```

### SVG Lines

```
Animation: None (static SVG)
Opacity: 0.7 (for visibility)
Stroke-width: 3px
Stroke-linecap: round
```

---

## 🔤 Typography Reference

### Card Text

```
Generation Badge:
  - Size: text-xs
  - Weight: font-bold
  - Color: text-blue-700
  - Background: bg-blue-100

Member Name:
  - Size: text-sm
  - Weight: font-bold
  - Color: text-gray-800
  - Max-width: 150px (line-clamp-2)

Birth Date:
  - Size: text-xs
  - Weight: normal
  - Color: text-gray-600
  - Format: "📅 15 Jan 1970"

Deceased Badge:
  - Size: text-xs
  - Weight: font-semibold
  - Color: text-white
  - Background: bg-red-500
```

---

## 📊 Grid Reference

### Generation Container

```
Display: flex
Flex-wrap: wrap
Justify-content: center
Gap: 1rem (md:1.5rem) (lg:2rem)
Padding-x: 0.5rem (md:1rem) (lg:1.5rem)
```

### Card Container

```
Display: flex
Flex-direction: column
Align-items: center
Width: auto (responsive)
Min-width: 200px (approximate)
```

---

## 🔌 Component Integration Points

### Parent → ProFamilyTreeVisualization

```
Props:
- members: Array<Member>
- onEdit: (member: Member) => void
- onDelete: (member: Member) => void
- onAddSpouse: (member: Member) => void
- onAddChild: (member: Member) => void

Returns:
<div> Full diagram visualization </div>
```

### ProFamilyTreeVisualization → ProFamilyTreeCard

```
Props:
- member: Member
- spouses: Array<Member>
- generation: Number
- onEdit, onDelete, onAddSpouse, onAddChild

Returns:
<div> Individual member card </div>
```

### ProFamilyTreeCard → FamilyMemberAvatar

```
Props:
- member: Member
- size: 'small' | 'medium' | 'large' | 'xlarge'
- onClick: () => void

Returns:
<div> Avatar with decorations </div>
```

---

## 📐 Size Reference

### Avatar Sizes

```
small:    12x12 (w-12 h-12)
medium:   16x16 (w-16 h-16)
large:    20x20 (w-20 h-20)
xlarge:   24x24 (w-24 h-24)
```

### Button Sizes

```
Sidebar:  40x40 (w-10 h-10)
Card:     32x32 (w-8 h-8)
```

### Border Radius

```
Avatar:   rounded-full (50%)
Card:     rounded-2xl (24px)
Badge:    rounded-full (50%)
Button:   rounded-full (50%)
```

---

## 🎭 Deceased Member Styling

### Visual Changes

```
Avatar:
- Opacity: opacity-70 (reduced)
- Filter: grayscale (optional)
- Border: same blue

Card:
- Background: bg-gray-100 (instead of white)
- Border: border-gray-400 (instead of gray-200)
- Text opacity: opacity-70

Badge:
- Display: † symbol in red-500
- Position: Center of avatar
- Size: 28x28px
- Background: white with opacity

Name:
- Color: gray-600 (darker)
- Opacity: 70%
```

---

## 🚀 Performance Checklist

### Rendering

```
✅ SVG lines optimized
✅ No unnecessary re-renders
✅ useRef for DOM access
✅ useMemo for expensive calculations
✅ CSS transitions (not JS)
```

### Bundle Size

```
✅ Components only: ~50KB minified
✅ No heavy dependencies
✅ Uses only React + Tailwind
✅ lucide-react for icons (already in project)
```

### Browser Performance

```
✅ 60 FPS animations
✅ Smooth hover transitions
✅ No jank on resize
✅ Efficient SVG rendering
```

---

## 📋 Implementation Checklist

Using this visual guide:

- [ ] Study each layout variant
- [ ] Understand button color scheme
- [ ] Review responsive breakpoints
- [ ] Check spacing reference
- [ ] Verify animation specs
- [ ] Confirm color palette
- [ ] Validate integration points
- [ ] Test on different devices

---

**Use this guide for:**

- 🎨 Design validation
- 🔧 CSS customization
- 🐛 Styling debugging
- 📱 Responsive testing
- 🎯 Feature verification

**Created:** December 29, 2025
