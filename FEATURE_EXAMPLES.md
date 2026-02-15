# 🎯 Feature Examples & Walkthroughs

## Example 1: Register for an Event

### Scenario
User **John** logs in and wants to register for the "React Advanced Workshop"

### Step-by-Step

1. **Login**
   ```
   Email: john@example.com
   Password: password123
   Click "Login"
   ```

2. **Browse Events Page**
   - Click "🎫 Discover Events" in navbar
   - Page loads with event cards showing:
     - Event name, organizer, date, location
     - Category badge
     - "Register Now" button

3. **Search/Filter Example**
   ```
   Search: "react"
   Category: "Technology"
   Location: "San Francisco"
   Page: 1
   
   URL shows: /events?search=react&category=Technology&location=San%20Francisco&page=1
   ```

4. **Find Event Card** - "React Advanced Workshop"
   ```
   Name: React Advanced Workshop
   Organizer: Tech Academy
   Date: 2024-12-25
   Location: San Francisco
   Category: Technology
   Capacity: 50/50 registered
   Available Spots: 0 (FULL)
   ```

5. **Try to Register**
   - Click "Register Now" button
   - Event shows "Event full" error (capacity reached)

   **Alternative:** Find event with available spots
   ```
   Name: Web Development Bootcamp
   Capacity: 30/20 registered
   Available: 10 spots
   ```

6. **Click "Register Now"**
   - Button shows "Registering..." (loading state)
   - Success page shows: "Successfully registered for the event!"
   - Button changes to: "Cancel Registration"
   - Capacity bar updates: 30/20 → 30/21 registered
   - Navbar shows: "Dashboard" link available

---

## Example 2: View Dashboard with Registrations

### Scenario
After registering, John visits his dashboard

### Step-by-Step

1. **Navigate to Dashboard**
   - Click "Welcome, John!" → dropdown → "Dashboard"
   - Or click "Dashboard" in navbar

2. **Dashboard Page Shows**
   ```
   Header: "Welcome, John!"
   Subtitle: "Manage your event registrations"
   
   Stats Cards:
   ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
   │        2        │  │        1        │  │        3        │
   │ Upcoming Events │  │  Past Events    │  │ Total Registered│
   └─────────────────┘  └─────────────────┘  └─────────────────┘
   ```

3. **Upcoming Events Section**
   ```
   🔔 Upcoming Events (with Cancel buttons)
   
   ┌────────────────────────────────────────┐
   │ Web Development Bootcamp               │
   │ By: Tech Academy                       │
   │ Location: San Francisco               │
   │ Date: December 25, 2024               │
   │ Registered: January 10, 2024          │
   │                  [Cancel Registration]│
   └────────────────────────────────────────┘
   
   ┌────────────────────────────────────────┐
   │ Advanced JavaScript Masterclass       │
   │ By: Code Masters                      │
   │ Location: New York                    │
   │ Date: December 28, 2024               │
   │ Registered: January 12, 2024          │
   │                  [Cancel Registration]│
   └────────────────────────────────────────┘
   ```

4. **Past Events Section**
   ```
   ✓ Past Events (No Cancel button - event already happened)
   
   ┌────────────────────────────────────────┐
   │ Introduction to Python                │
   │ By: Learning Hub                      │
   │ Location: Austin                      │
   │ Date: November 15, 2023               │
   │ Registered: November 1, 2023          │
   │                          [✓ Completed]│
   └────────────────────────────────────────┘
   ```

5. **Features Shown**
   - ✅ Upcoming events have "Cancel Registration" button
   - ✅ Past events show "Completed" badge (no cancel option)
   - ✅ Total counts at top update dynamically
   - ✅ Events sorted by date (upcoming first)

---

## Example 3: Cancel Registration & Verify Capacity

### Scenario
John changes his mind about "Web Development Bootcamp" and cancels

### Step-by-Step

1. **On Dashboard - Upcoming Events**
   - Current event: "Web Development Bootcamp"
   - Capacity before cancel: 30/21 (21 registered out of 30)
   - Shows: "9 spots available"

2. **Click "Cancel Registration" Button**
   - Confirmation dialog appears:
   ```
   ⚠️  Are you sure?
   "Are you sure you want to cancel your registration 
    for 'Web Development Bootcamp'?"
   
   [Cancel]  [Confirm Cancel]
   ```

3. **Click "Confirm Cancel"**
   - Button text changes to: "Cancelling..."
   - API call: `DELETE /registrations/{eventId}`
   - Processing happens

4. **Success Message**
   ```
   ✓ Green banner appears:
   "Registration cancelled successfully"
   (Auto-disappears after 3 seconds)
   ```

5. **Event Removed from Dashboard**
   - "Web Development Bootcamp" disappears from Upcoming Events
   - Stat card updates: "Upcoming Events: 2 → 1"
   - Total: "3 → 2"

6. **Verify Capacity Updated**
   - Go back to **Events** page
   - Search for "Web Development Bootcamp"
   - Capacity now shows: 30/20 (was 21, now 20)
   - Available spots: 10 → 11
   - Capacity bar updates

7. **Atomic Update Confirmed**
   - Without John's registration:
     ```
     Before: 21/30 registered (9 available)
     After:  20/30 registered (10 available)
     Action: Decremented by -1 atomically
     ```

---

## Example 4: Re-register After Cancellation

### Scenario
John changes his mind again and wants to re-register

### Step-by-Step

1. **Navigate to Event Details**
   - Go to Events page
   - Find "Web Development Bootcamp"
   - Click event card

2. **Event Details Page Shows**
   ```
   Name: Web Development Bootcamp
   
   Registration Card:
   ┌──────────────────────────┐
   │      Registration        │
   │                          │
   │ [████████░░░░░] 20/30   │
   │ 20 / 30 registered       │
   │ 10 spots available       │
   │                          │
   │ [   Register Now   ]     │ ← Button active (not "Cancel Registration")
   └──────────────────────────┘
   ```

3. **Click "Register Now"**
   - Same workflow as Example 1
   - Success message: "Successfully registered for the event!"
   - Capacity updates: 20/30 → 21/30
   - Button changes to: "Cancel Registration"

4. **Dashboard Reflects Change**
   - Go to Dashboard
   - "Web Development Bootcamp" appears again in Upcoming Events
   - Stat updates: 1 → 2 upcoming events

---

## Example 5: Multiple Users - Capacity Collision

### Scenario
Two events with limited capacity, testing concurrent registrations

### Event A: "Networking Mixer"
```
Initial: 15/15 (FULL)
Capacity: 15
```

### Event B: "Product Launch"
```
Initial: 24/25
Capacity: 25
Available: 1 spot
```

### Workflow

1. **John registers for Event B (1 spot available)**
   - Capacity: 24/25 → 25/25 (FULL)
   - Button: "Register Now" → "Cancel Registration"

2. **Jane tries to register for Event B**
   - Error: "Event full"
   - Button: "Register Now" (disabled)
   - Message: "This event is sold out"

3. **John cancels Event B**
   - Capacity: 25/25 → 24/25
   - Available: 0 → 1 spot

4. **Jane tries again**
   - Now succeeds! (1 spot available)
   - Capacity: 24/25 → 25/25 (FULL again)

---

## Example 6: Pagination & State Persistence

### Scenario
User navigates events with search/filter/pagination

### Step-by-Step

1. **Initial Load**
   ```
   URL: /events
   Display: Page 1 of N, 8 events
   Button states: [← Previous (disabled)]  [Next →]
   ```

2. **Apply Search Filter**
   ```
   Type: "tech"
   URL updates: /events?search=tech&page=1
   Events filtered by name/description containing "tech"
   Page resets to 1
   ```

3. **Add Category Filter**
   ```
   Select: "Technology"
   URL updates: /events?search=tech&category=Technology&page=1
   Further filtered by category
   ```

4. **Add Location Filter**
   ```
   Select: "San Francisco"
   URL updates: /events?search=tech&category=Technology&location=San%20Francisco&page=1
   Combined filters applied
   ```

5. **Navigate Pages**
   ```
   Click [Next →]
   URL updates: /events?search=tech&category=Technology&location=San%20Francisco&page=2
   Shows events 9-16
   Page indicator: "Page 2 of 3"
   [← Previous (active)]  [Next → (active)]
   ```

6. **Browser Back Button**
   ```
   Click browser back button
   URL reverts: /events?search=tech&category=Technology&location=San%20Francisco&page=1
   Same filters applied automatically
   React re-renders with Page 1 data
   ```

7. **Bookmark URL**
   ```
   Save in browser: 
   http://localhost:3000/events?search=tech&category=Technology&location=San%20Francisco&page=2
   
   Later click bookmark:
   Loads Page 2 with exact same filters ✓
   ```

---

## Example 7: Error Scenarios

### Duplicate Registration Attempt
```
User tries to register for same event twice:
→ POST /registrations/{eventId}
→ Error: "Already registered"
→ Button stays "Cancel Registration"
```

### Event Does Not Exist
```
User goes to non-existent event:
/event/invalid-id
→ Error: "Event not found"
→ Button: "Back to Events" link shown
```

### Unauthorized (No Token)
```
User localStorage token deleted/expired
→ Tries to register
→ Error: "Unauthorized"
→ Redirected to login page
```

### Network Error
```
Backend server down
→ Click "Register Now"
→ Loading... (spinner shows)
→ After timeout:
→ Error: "Registration failed"
→ Button returns to "Register Now" state
```

---

## Example 8: Real-Time Capacity Example

### Web Development Bootcamp Progress
```
Time: 10:00 AM
Capacity: 30 spots
Current: 15 registered (50%)
Available: 15 spots
Capacity Bar: [███████░░░░░░]

--- John registers ---
Time: 10:05 AM
Current: 16 registered (53%)
Available: 14 spots
Capacity Bar: [███████░░░░░]

--- Jane registers ---
Time: 10:10 AM
Current: 17 registered (56%)
Available: 13 spots
Capacity Bar: [████████░░░░]

--- 10 more users register ---
Time: 10:30 AM
Current: 27 registered (90%)
Available: 3 spots
Capacity Bar: [███████████░]

--- Last 3 users register ---
Time: 10:45 AM
Current: 30 registered (100%)
Available: 0 spots
Status: SOLD OUT ❌
Capacity Bar: [█████████████]
Button: "Register Now" (disabled)
Message: "This event is sold out"

--- John cancels ---
Time: 11:00 AM
Current: 29 registered (96%)
Available: 1 spot
Capacity Bar: [███████████░]
Button: "Register Now" (re-enabled)
Message: "1 spot available"

--- Mike registers ---
Time: 11:05 AM
Current: 30 registered (100%)
Available: 0 spots
SOLD OUT ❌ again
```

---

## 📋 Testing Checklist

**After implementing all examples, verify:**

- [ ] Can register for events
- [ ] Capacity counter increments on registration
- [ ] Dashboard shows upcoming and past events separately
- [ ] Can cancel registration from Dashboard
- [ ] Can cancel registration from EventDetails page
- [ ] Capacity counter decrements on cancellation
- [ ] Confirmation dialog appears before cancellation
- [ ] Success/error messages display correctly
- [ ] Button states change (Register Now ↔ Cancel Registration)
- [ ] Pagination navigation works
- [ ] URL parameters persist on back button
- [ ] Bookmarkable URLs work correctly
- [ ] Filter changes reset page to 1
- [ ] Duplicate registration prevented
- [ ] Event full status handled correctly
- [ ] Upcoming events show cancel button
- [ ] Past events don't show cancel button
- [ ] Stats cards update dynamically
- [ ] Smooth scroll to top on page navigation

---

**All examples demonstrate 100% of the implemented features! 🎉**
