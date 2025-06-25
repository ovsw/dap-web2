# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Nuxt.js 2 static site for DelGrosso's Amusement Park & Laguna Splash Water Park. The site is built with:

- **Framework**: Nuxt.js 2.15.4 (static generation)
- **Styling**: Tailwind CSS with JIT mode
- **CMS**: Sanity.io headless CMS
- **Search**: Algolia with Vue InstantSearch
- **Fonts**: Google Fonts (Overpass, Open Sans, Raleway)
- **Deployment**: Static generation for Netlify

## Development Commands

```bash
# Install dependencies
npm install

# Development server with hot reload at localhost:3000
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Generate static site
npm run generate
```

## Architecture

### Content Management
- **Primary CMS**: Sanity.io (project ID: zjwbgj71, production dataset)
- **Content Types**: pages, attractions, events, news items
- **Dynamic Routes**: Generated from Sanity content during build
- **Navigation**: Static JSON structure in `assets/nav2.json`

### Site Structure
- **Pages**: Dynamic routing with `_page/_subpage.vue` pattern
- **Attractions**: Separated into amusement park rides and water park attractions
- **Events & News**: Dynamic content from Sanity
- **Components**: Modular Vue components in `/components/` with section-based organization

### Styling System
- **Framework**: Tailwind CSS with custom design tokens
- **Fonts**: 
  - Display: Raleway (headings, display text)
  - Body: Overpass (body text)
  - Additional: Open Sans
- **Colors**: Custom brand palette (green: #2D8262, red: #DB3232, blue: #057EA6, yellow: #ffcc00)

### Key Features
- **SEO**: Comprehensive meta tags, Google Analytics, sitemap generation
- **Search**: Algolia integration with InstantSearch
- **Images**: Sanity image optimization with custom builder plugin
- **Icons**: SVG sprite system with custom icons
- **Accessibility**: Axe-core integration (disabled in production)

### Build Process
- **Target**: Static generation
- **Routes**: Dynamically generated from Sanity CMS data
- **Redirects**: Extensive redirect rules for URL migration (355+ redirects)
- **Optimization**: Lazy loading, font optimization, SVG sprites

### Important Files
- `nuxt.config.js`: Main configuration with Sanity integration and redirect rules
- `tailwind.config.js`: Custom design system configuration
- `assets/nav2.json`: Navigation structure
- `sanityFragments/sectionQueries.js`: Sanity query fragments for content sections

## Content Editing

Content is managed through Sanity Studio. The site uses a section-based content structure where pages are composed of reusable content sections (Cards, CTA, FAQ, etc.).

## Deployment

Site generates as static HTML/CSS/JS for hosting on Netlify. The `generate` command fetches all content from Sanity and creates static routes.