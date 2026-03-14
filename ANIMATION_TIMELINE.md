# Animation Timeline Documentation

## Overview
This document outlines the animation timeline specifications for the portfolio website. All animations are designed to be smooth, performant, and easily configurable.

## Animation Timeline Structure

### 1. Hero Section Animations

#### 1.1 Text Fade-in Animation
- **Start Time**: 0s
- **Duration**: 1.5s
- **Hold Duration**: 3s
- **Easing**: ease-out
- **Total Timeline**: 4.5s

#### 1.2 3D Model Animation
- **Start Time**: 0.5s (delayed for stagger effect)
- **Duration**: 2s
- **Hold Duration**: 3s
- **Rotation**: 360° continuous
- **Easing**: linear
- **Total Timeline**: 5.5s


#### 1.3 Background Particles
- **Start Time**: 0s
- **Duration**: 5s
- **Hold Duration**: Continuous
- **Particle Count**: 50
- **Movement Speed**: Variable (0.5x - 2x)
- **Total Timeline**: Infinite

### 2. Navigation Animations

#### 2.1 Navbar Slide-in
- **Start Time**: 0s
- **Duration**: 0.8s
- **Hold Duration**: Permanent
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1)
- **Total Timeline**: 0.8s

#### 2.2 Menu Items Stagger
- **Start Time**: 0.2s
- **Duration**: 0.4s per item
- **Stagger Delay**: 0.1s between items
- **Hold Duration**: Permanent
- **Total Timeline**: 1.2s (for 3 items)

### 3. Section Transition Animations

#### 3.1 About Section
- **Start Time**: Scroll trigger
- **Duration**: 1.2s
- **Hold Duration**: Permanent
- **Animation Type**: Slide-in from left
- **Easing**: ease-out
- **Total Timeline**: 1.2s

#### 3.2 Skills Section
- **Start Time**: Scroll trigger
- **Duration**: 1s
- **Hold Duration**: Permanent
- **Animation Type**: Scale and fade
- **Easing**: ease-out
- **Total Timeline**: 1s

#### 3.3 Projects Section
- **Start Time**: Scroll trigger
- **Duration**: 1.5s
- **Hold Duration**: Permanent
- **Animation Type**: Slide-up with stagger
- **Stagger Delay**: 0.2s per project
- **Easing**: ease-out
- **Total Timeline**: 2.5s (for 4 projects)

### 4. Interactive Hover Animations

#### 4.1 Button Hover Effects
- **Start Time**: Hover trigger
- **Duration**: 0.3s
- **Hold Duration**: While hovering
- **Animation Type**: Scale + Shadow
- **Easing**: ease-in-out
- **Total Timeline**: 0.3s

#### 4.2 Card Hover Effects
- **Start Time**: Hover trigger
- **Duration**: 0.4s
- **Hold Duration**: While hovering
- **Animation Type**: Lift + Glow
- **Easing**: ease-out
- **Total Timeline**: 0.4s

### 5. Loading Animations

#### 5.1 Initial Page Load
- **Start Time**: 0s
- **Duration**: 2s
- **Hold Duration**: Until content loads
- **Animation Type**: Fade-out
- **Easing**: ease-in-out
- **Total Timeline**: 2s

#### 5.2 Component Loading States
- **Start Time**: Component mount
- **Duration**: 0.8s
- **Hold Duration**: Until data loads
- **Animation Type**: Pulse
- **Easing**: ease-in-out
- **Total Timeline**: 0.8s

## Timeline Configuration

### Current Total Animation Duration: 5.5s
### Recommended Minimum Hold Duration: 3s
### Recommended Maximum Total Duration: 8s
## Quick Reference

| Animation Type | Duration | Hold | Total | Priority |
|---------------|-----------|------|-------|----------|
| Hero Text | 1.5s | 3s | 4.5s | High |
| 3D Model | 2s | 3s | 5.5s | High |
| Navbar | 0.8s | Permanent | 0.8s | Medium |
| Section Transitions | 1.2s | Permanent | 1.2s | Medium |
| Hover Effects | 0.3s | While hovering | 0.3s | Low |
| Loading | 2s | Until load | 2s | High |

---

**Last Updated**: [Current Date]
**Version**: 1.0
**Maintainer**: [Your Name]
