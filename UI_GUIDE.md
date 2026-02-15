# 🎨 Visual User Interface Guide

## Navigation Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    Bellcorp Events                      │
│  Home  |  🎫 Events  |  Dashboard  |  Welcome, John! ▼  │
└─────────────────────────────────────────────────────────┘
        ↓              ↓                  ↓
    Landing    Event Browsing      User Dashboard
    Page        & Discovery         & Registrations
    ├─ Hero       ├─ Search/Filter   ├─ Stats
    ├─ Features   ├─ Pagination      ├─ Upcoming Events
    └─ CTA        └─ Event Cards     │  └─ Cancel buttons
                      ├─ Click Event │
                      ↓              └─ Past Events
                  Event Details
                  ├─ Details
                  ├─ Capacity Bar
                  └─ Register/Cancel
```

---

## 1. Events Page Layout

```
╔════════════════════════════════════════════════════════════════════╗
║                    🎫 Discover Events                             ║
║              Find and register for amazing events near you        ║
╠════════════════════════════════════════════════════════════════════╣
║                                                                    ║
║  ┌──────────────────────────────────────────────────────────────┐ ║
║  │ 🔍 Search events...                                          │ ║
║  └──────────────────────────────────────────────────────────────┘ ║
║                                                                    ║
║  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐      ║
║  │ All Categories │  │ All Locations  │  │ [Apply Filters]│      ║
║  └────────────────┘  └────────────────┘  └────────────────┘      ║
║                                                                    ║
║  Showing 8 of 20 events                                           ║
║                                                                    ║
║  ┌──────────────────────┐  ┌──────────────────────┐               ║
║  │ React Advanced       │  │ Web Development      │               ║
║  │ Workshop            │  │ Bootcamp            │               ║
║  │ Tech Academy        │  │ Code Academy        │               ║
║  │ San Francisco       │  │ New York            │               ║
║  │ Dec 25, 2024        │  │ Dec 28, 2024        │               ║
║  │ 🏷️ Technology        │  │ 🏷️ Technology        │               ║
║  │                      │  │                      │               ║
║  │ 50/50 registered    │  │ 30/21 registered    │               ║
║  │ Event Full ❌        │  │ 9 spots available   │               ║
║  │ [Register Now]      │  │ [Register Now]      │               ║
║  └──────────────────────┘  └──────────────────────┘               ║
║                                                                    ║
║  ┌──────────────────────┐  ┌──────────────────────┐               ║
║  │ AI & Machine Learning│  │ UX Design Workshop  │               ║
║  │ ... (4 more events)  │  │ ... (4 more events) │               ║
║  └──────────────────────┘  └──────────────────────┘               ║
║                                                                    ║
║  ╔═══════════════════════ PAGINATION ═══════════════════════╗    ║
║  ║  [← Previous]    Page 1 of 3     [Next →]               ║    ║
║  ╚═════════════════════════════════════════════════════════╝    ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝
```

---

## 2. Event Details Page Layout

```
╔════════════════════════════════════════════════════════════════════╗
║  ← Back to Events                                                  ║
╠════════════════════════════════════════════════════════════════════╣
║                                                                    ║
║  ╔──────────────────────────────────────────────────────────────╗ ║
║  ║ Web Development Bootcamp                  [🏷️ Technology]  ║ ║
║  ╚──────────────────────────────────────────────────────────────╝ ║
║                                                                    ║
║  ┌──────────────────────────────┐  ┌──────────────────────────┐   ║
║  │ Event Information            │  │  Registration Card       │   ║
║  │                              │  │                          │   ║
║  │ Organizer: Code Academy      │  │  Registration            │   ║
║  │ Location: New York           │  │                          │   ║
║  │ Date: December 28, 2024      │  │  [████████░░░] 21/30    │   ║
║  │       2:00 PM                │  │  21 / 30 registered      │   ║
║  │ Category: Technology         │  │  9 spots available       │   ║
║  │                              │  │                          │   ║
║  │ Description                  │  │  ✓ Registered!          │   ║
║  │ ──────────────────────────   │  │  @Everyone is here!     │   ║
║  │ Learn modern web development │  │                          │   ║
║  │ with React, Node.js, and     │  │  ┌─────────────────────┐│   ║
║  │ MongoDB. This bootcamp       │  │  │ Cancel Registration ││   ║
║  │ covers:                      │  │  └─────────────────────┘│   ║
║  │                              │  │                          │   ║
║  │ • Frontend Development       │  └──────────────────────────┘   ║
║  │ • Backend APIs               │                                 ║
║  │ • Database Design            │                                 ║
║  │ • Deployment & DevOps        │                                 ║
║  │                              │                                 ║
║  │ Perfect for beginners to     │                                 ║
║  │ intermediate developers!     │                                 ║
║  └──────────────────────────────┘                                 ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝
```

---

## 3. Dashboard Page Layout

```
╔════════════════════════════════════════════════════════════════════╗
║                    Welcome, John!                                 ║
║              Manage your event registrations                      ║
╠════════════════════════════════════════════════════════════════════╣
║                                                                    ║
║  ╔──────────────╗  ╔──────────────╗  ╔──────────────╗             ║
║  ║      2       ║  ║      1       ║  ║      3       ║             ║
║  ║ Upcoming     ║  ║ Past Events  ║  ║ Total        ║             ║
║  ║ Events       ║  ║              ║  ║ Registered   ║             ║
║  ╚──────────────╝  ╚──────────────╝  ╚──────────────╝             ║
║                                                                    ║
║  ──────────────────────────────────────────────────────────────   ║
║  🔔 Upcoming Events                                                ║
║  ──────────────────────────────────────────────────────────────   ║
║                                                                    ║
║  ┌────────────────────────────────────────────────────────────┐   ║
║  │ Web Development Bootcamp                                   │   ║
║  │ By: Code Academy                                           │   ║
║  │ Location: New York                                         │   ║
║  │ Date: December 28, 2024                                    │   ║
║  │ Registered: January 12, 2024                               │   ║
║  │                                      [Cancel Registration] │   ║
║  └────────────────────────────────────────────────────────────┘   ║
║                                                                    ║
║  ┌────────────────────────────────────────────────────────────┐   ║
║  │ Advanced JavaScript Masterclass                            │   ║
║  │ By: JavaScript Pro                                         │   ║
║  │ Location: Los Angeles                                      │   ║
║  │ Date: January 5, 2025                                      │   ║
║  │ Registered: January 8, 2024                                │   ║
║  │                                      [Cancel Registration] │   ║
║  └────────────────────────────────────────────────────────────┘   ║
║                                                                    ║
║  ──────────────────────────────────────────────────────────────   ║
║  ✓ Past Events                                                     ║
║  ──────────────────────────────────────────────────────────────   ║
║                                                                    ║
║  ┌────────────────────────────────────────────────────────────┐   ║
║  │ Introduction to Python                                     │   ║
║  │ By: Learning Hub                                           │   ║
║  │ Location: Austin                                           │   ║
║  │ Date: November 15, 2023                                    │   ║
║  │ Registered: November 1, 2023                               │   ║
║  │                                          [✓ Completed]     │   ║
║  └────────────────────────────────────────────────────────────┘   ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝
```

---

## 4. Registration Workflow - State Changes

### Button State Transitions

```
BEFORE REGISTRATION:
┌──────────────────┐
│  Register Now    │ ← Active button
│  (Blue gradient) │
└──────────────────┘
         ↓ (Click)

DURING REGISTRATION (Loading):
┌──────────────────┐
│  Registering...  │ ← Disabled, shows spinner
│  (Gray, dimmed)  │
└──────────────────┘
         ↓ (Success)

AFTER REGISTRATION:
┌─────────────────────┐
│ Cancel Registration │ ← Red button, clickable
│  (Red gradient)     │
└─────────────────────┘
         ↓ (Click + Confirm)

DURING CANCELLATION:
┌─────────────────────┐
│    Cancelling...    │ ← Disabled, shows spinner
│  (Gray, dimmed)     │
└─────────────────────┘
         ↓ (Success)

AFTER CANCELLATION:
┌──────────────────┐
│  Register Now    │ ← Back to active state
│  (Blue gradient) │
└──────────────────┘
```

---

## 5. Capacity Bar Animation

```
EVENT: React Advanced Workshop

Initial State (50% full):
Name: React Advanced Workshop
┌──────────────────────────────────┐
│ [████████████░░░░░░░░░░░░░░░░░░] │  25/50 registered
│                                  │  25 spots available
└──────────────────────────────────┘

After 5 registrations:
┌──────────────────────────────────┐
│ [███████████████░░░░░░░░░░░░░░░░] │  30/50 registered
│                                  │  20 spots available
└──────────────────────────────────┘

After 20 more registrations (90% full):
┌──────────────────────────────────┐
│ [██████████████████████████░░░░░░] │  45/50 registered
│                                  │  5 spots available
│                                  │  ⚠️ Only few spots left!
└──────────────────────────────────┘

When FULL (100%):
┌──────────────────────────────────┐
│ [██████████████████████████████░] │  50/50 registered
│                                  │  Event SOLD OUT ❌
│  [Register Now] Button DISABLED   │
└──────────────────────────────────┘
```

---

## 6. Confirmation Dialog for Cancellation

```
╔════════════════════════════════════════════════════════════╗
║                    ⚠️  Cancel Registration?                ║
╠════════════════════════════════════════════════════════════╣
║                                                            ║
║  Are you sure you want to cancel registration for          ║
║  "Web Development Bootcamp"?                               ║
║                                                            ║
║  ┌────────────────────────────────────────────────┐       ║
║  │ This action cannot be undone.                   │       ║
║  │ Your spot will be released for other users.    │       ║
║  └────────────────────────────────────────────────┘       ║
║                                                            ║
║           ┌──────────────┐    ┌──────────────┐            ║
║           │   No, Keep   │    │  Yes, Cancel │            ║
║           └──────────────┘    └──────────────┘            ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

---

## 7. Notification Messages

### Success Messages
```
✓ Green background, auto-dismiss after 3 seconds

┌─────────────────────────────────────────────────────────┐
│ ✓ Successfully registered for the event!                │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ ✓ Registration cancelled successfully                   │
└─────────────────────────────────────────────────────────┘
```

### Error Messages
```
✗ Red background, stays visible for user interaction

┌─────────────────────────────────────────────────────────┐
│ ✗ Event full                                            │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ ✗ Already registered for this event                     │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ ✗ Failed to load events                                 │
└─────────────────────────────────────────────────────────┘
```

---

## 8. URL State in Address Bar

```
Initial Load:
http://localhost:3000/events

After search:
http://localhost:3000/events?search=tech

After adding category filter:
http://localhost:3000/events?search=tech&category=Technology

After adding location filter:
http://localhost:3000/events?search=tech&category=Technology&location=San%20Francisco

After going to page 2:
http://localhost:3000/events?search=tech&category=Technology&location=San%20Francisco&page=2

Browser back button:
http://localhost:3000/events?search=tech&category=Technology&location=San%20Francisco&page=1

All filters restored automatically! ✓
```

---

## 9. Responsive Mobile Layout

### Mobile View (< 768px)

```
┌──────────────────────────────┐
│ Bellcorp ☰                   │  ← Mobile menu
├──────────────────────────────┤
│ 🎫 Discover Events           │
│                              │
│ ┌────────────────────────────┐│
│ │ Search...                  ││
│ └────────────────────────────┘│
│                              │
│ ┌────────────────────────────┐│
│ │ Categories ▼               ││
│ └────────────────────────────┘│
│ ┌────────────────────────────┐│
│ │ Locations ▼                ││
│ └────────────────────────────┘│
│                              │
│ ┌────────────────────────────┐│
│ │ React Workshop             ││
│ │ Tech Academy               ││
│ │ San Francisco              ││
│ │ Dec 25, 2024               ││
│ │ 50/50 registered           ││
│ │ [Register Now]             ││
│ └────────────────────────────┘│
│                              │
│ ┌────────────────────────────┐│
│ │ Web Development Bootcamp   ││
│ │ ...                        ││
│ └────────────────────────────┘│
│                              │
│ ┌────────────────────────────┐│
│ │[← Previous] Page 1 of 3    ││
│ │[    Next →]                ││
│ └────────────────────────────┘│
└──────────────────────────────┘
```

---

## 10. Loading States

```
Events Loading:
┌──────────────────────────────┐
│  🎫 Loading events...        │
│                              │
│  ⟳ (Spinner animation)       │
│                              │
└──────────────────────────────┘

Dashboard Loading:
┌──────────────────────────────┐
│  Welcome, John!              │
│  ⟳ Loading registrations...  │
└──────────────────────────────┘

Button Loading:
┌──────────────────────────────┐
│  ⟳ Registering...            │ ← Disabled with spinner
└──────────────────────────────┘
```

---

**All UI components are fully responsive and accessible! 🎉**
