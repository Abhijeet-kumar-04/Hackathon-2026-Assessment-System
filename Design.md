# 🎨 Hackathon Management System UI Design

> Production-Level UI Blueprint

---

# Design Theme

* Light Theme First
* Inspired by Devfolio, Linear, Stripe, and Vercel
* Soft Glassmorphism + Beautiful Gradients
* Smooth Animations (Framer Motion)
* Clean, Modern, and Attractive UI

### Colors

```css
Background: #F8FAFC
Section Background: #EEF2FF
Card: #FFFFFF
Primary: #4F46E5
Secondary: #7C3AED
Accent: #06B6D4
Success: #10B981
Danger: #EF4444
Text: #0F172A
Muted Text: #64748B
Border: #E2E8F0
```

---

# Public Pages

```
/
├── Home
├── Explore Hackathons
├── Hackathon Details
├── Sponsors
├── About
├── Contact
├── FAQ
└── Privacy Policy
```

---

# User Pages

```
/dashboard
/explore
/hackathon/[id]
/teams
/team/[id]
/project
/submission
/leaderboard
/notifications
/profile
/settings
```

---

# Admin Pages

```
/admin/dashboard
/admin/hackathons
/admin/create-hackathon
/admin/users
/admin/teams
/admin/submissions
/admin/judges
/admin/analytics
/admin/certificates
/admin/settings
```

---

# Judge Pages

```
/judge/dashboard
/judge/assigned-teams
/judge/evaluate/[teamId]
```

---

# Navbar

Glassmorphism Navbar with Blur Effect

```
Logo

Explore
Hackathons
Teams
Leaderboard

Search

Notifications

Profile
```

---

# Home Page

## Hero Section

Beautiful gradient background

```
-------------------------------------------------

Hack. Build. Win.

India's Modern Hackathon Platform

[ Explore Hackathons ]
[ Create Team ]

40+ Events
15K+ Students
500+ Projects

-------------------------------------------------
```

Gradient Colors

* Indigo → Purple → Cyan
* Floating cards with soft shadows
* Animated counters

---

## Featured Hackathons

Rounded Cards

```
Banner

AI Hackathon 2026

Prize Pool ₹1,00,000

200 Teams

[ View Details ]
```

Hover Effect

* Lift card slightly
* Soft shadow
* Gradient border

---

## Timeline

```
Registration
↓

Team Formation
↓

Round 1
↓

Round 2
↓

Finals
↓

Winners
```

---

# Dashboard

## Sidebar

```
Dashboard
Hackathons
Teams
Projects
Notifications
Leaderboard
Profile
Settings
```

---

## Main Dashboard

Greeting

```
Good Evening 👋
```

---

### Statistics Cards

Rounded cards with colorful icons

```
Registered Hackathons

4
```

```
Active Teams

2
```

```
Pending Submission

1
```

```
Current Rank

#21
```

---

### Sections

* Upcoming Deadlines
* Recent Activity
* Team Invitations
* Announcements
* Calendar

---

# Explore Hackathons

Search Bar

```
Search hackathons...
```

Filters

```
Online
Offline
AI
ML
Web
Cybersecurity
Blockchain
```

Grid Layout

```
Banner

HackFest 2026

₹50,000 Prize Pool

Online

250 Teams

[ View ]
```

Card Style

* White background
* Rounded corners
* Soft shadow
* Hover animation

---

# Hackathon Details Page

Tabs

```
Overview
Timeline
Tracks
Rules
FAQs
Teams
Leaderboard
```

---

## Overview

Hero Banner

Title

Prize Pool

Countdown Timer

Register Button

---

## Timeline

```
Registration Opens

Registration Ends

Round 1

Round 2

Finals
```

---

## Prize Cards

```
🥇 ₹50,000

🥈 ₹30,000

🥉 ₹20,000
```

Gold, Silver, and Bronze gradient cards

---

# Team Page

Header

```
Code Warriors

4 Members

Registered in 3 Hackathons
```

---

## Team Members

Leader Card

```
Avatar

Name

Role
```

Member Cards

```
Avatar

Name

Skills

Github
```

---

Buttons

```
Invite Member

Transfer Leadership

Leave Team
```

---

## Team Chat

Discord-style chat

Realtime using Socket.io

---

# Project Workspace

Cards

```
Project Title

Tech Stack

Github Link

Demo Link

Progress
```

---

Milestones

```
Idea

Development

Testing

Submission
```

Progress bars with gradient colors

---

# Submission Page

Stepper

```
Step 1

Github Repository
```

↓

```
Step 2

Demo Video
```

↓

```
Step 3

Presentation
```

↓

```
Step 4

Description
```

↓

```
Submit
```

---

# Leaderboard

Top 3 Cards

```
🥇 Code Warriors

98 Points
```

```
🥈 Debuggers

95 Points
```

```
🥉 Stack Overflow

92 Points
```

---

Table

```
Rank

Team

Score

Feedback
```

---

# Notifications

Right Drawer

```
Team Invitation

Submission Accepted

Round Qualified

Announcement Posted
```

---

# Profile Page

Left Section

```
Avatar

Bio

Github

LinkedIn

College

Branch
```

---

Right Section

Tabs

```
Projects

Teams

Achievements

Hackathons
```

---

Contribution Graph

Badges

Certificates

---

# Admin Dashboard

Sidebar

```
Dashboard
Hackathons
Users
Teams
Submissions
Judges
Analytics
Certificates
Settings
```

---

## Dashboard Cards

```
Users

2450
```

```
Teams

800
```

```
Hackathons

18
```

```
Submissions

650
```

---

Charts

* Registrations
* Active Users
* Participation Trends
* Submission Trends

---

# Create Hackathon

Multi Step Form

```
Basic Info

↓

Timeline

↓

Tracks

↓

Rules

↓

Prizes

↓

Sponsors

↓

FAQs

↓

Publish
```

Progress indicator with gradient colors

---

# Judge Panel

Assigned Teams

Project Details

Github

Demo Video

PPT

Scoring

```
Innovation

Technical Complexity

UI/UX

Impact

Presentation
```

Feedback Box

Submit Score

---

# Mobile Bottom Navigation

```
Home

Hackathons

Teams

Notifications

Profile
```

---

# Animation Ideas

* Floating cards
* Aurora gradient background
* Cursor glow effect
* Scroll reveal animations
* Gradient borders
* Animated counters
* Framer Motion page transitions
* Shiny buttons
* Loading skeletons
* Hover lift effects

---

# Component Library

* shadcn/ui
* Aceternity UI
* Magic UI
* Framer Motion
* Lucide Icons

---

# Fonts

Headings

```
Sora
```

Body

```
Inter
```

Code

```
JetBrains Mono
```

---

# Overall Style

Devfolio × Linear × Stripe × Framer × Vercel

Modern Light Theme with colorful gradients, rounded cards, soft shadows, and smooth animations for a premium and attractive user experience.
