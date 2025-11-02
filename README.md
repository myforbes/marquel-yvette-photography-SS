<div align="center">

# Marquel Yvette Photography - Website

<img src="Marquel Yvette Photography/images/logos/MarquelYvette_Gold+Dk+Grey+Logo+11-3-24.png" alt="Marquel Yvette Photography Logo" width="400"/>

### Professional headshot photography serving the Washington DC Metro area and Loudoun County, VA

[![Live Website](https://img.shields.io/badge/Live%20Site-www.marquelyvette.com-gold?style=for-the-badge)](https://www.marquelyvette.com)

</div>

---

## 📸 About

This repository contains the website for **Marquel Yvette Photography**, a premium headshot photography service specializing in:

- **Corporate Headshots** - Professional business portraits
- **Actor Headshots** - Performance and casting headshots
- **LinkedIn Profiles** - Professional social media headshots
- **Team Headshots** - Company and organization group photos
- **Executive Portraits** - C-suite and leadership photography
- **Realtor Headshots** - Real estate professional portraits
- **Medical/ERAS Headshots** - Healthcare professional headshots

## 🎨 Design Preview

<div align="center">

### Portfolio Examples

<table>
  <tr>
    <td align="center" width="25%">
      <img src="Marquel Yvette Photography/images/portfolio/Leonard_Taylor_331-MarquelYvette0050+500px.jpg" alt="Corporate Headshot Example" width="200"/>
      <br />
      <em>Corporate Professional</em>
    </td>
    <td align="center" width="25%">
      <img src="Marquel Yvette Photography/images/portfolio/Sireesha-Ganti-0103-(500px).jpg" alt="Professional Headshot" width="200"/>
      <br />
      <em>Medical Professional</em>
    </td>
    <td align="center" width="25%">
      <img src="Marquel Yvette Photography/images/portfolio/Nancy+(200px).jpg" alt="Business Portrait" width="200"/>
      <br />
      <em>Executive Portrait</em>
    </td>
    <td align="center" width="25%">
      <img src="Marquel Yvette Photography/images/portfolio/Kahni+(200px).jpg" alt="LinkedIn Headshot" width="200"/>
      <br />
      <em>LinkedIn Profile</em>
    </td>
  </tr>
</table>

### Process Icons

<table>
  <tr>
    <td align="center" width="33%">
      <img src="Marquel Yvette Photography/images/backgrounds/4365245_date_schedule_calendar_event_icon.png" alt="Schedule" width="80"/>
      <br />
      <strong>1. Schedule</strong>
      <br />
      <em>Book your session</em>
    </td>
    <td align="center" width="33%">
      <img src="Marquel Yvette Photography/images/backgrounds/2622595_female_photographer_icon.png" alt="Shoot" width="80"/>
      <br />
      <strong>2. Shoot</strong>
      <br />
      <em>One-hour session</em>
    </td>
    <td align="center" width="33%">
      <img src="Marquel Yvette Photography/images/backgrounds/7680845_desktop_monitor_download_screen_device_icon.png" alt="Download" width="80"/>
      <br />
      <strong>3. Download</strong>
      <br />
      <em>Receive your images</em>
    </td>
  </tr>
</table>

</div>

---

## 📁 Project Structure

```
Marquel Yvette Photography/
├── index.html                 # Main website file
├── css/                       # Stylesheets
│   ├── site.css              # Main site styles (1.5MB)
│   ├── static.css            # Static styles (439KB)
│   ├── all.min.css           # Font Awesome icons
│   └── [other stylesheets]   # Additional CSS files
├── js/                        # JavaScript files
│   ├── site-bundle.js        # Main site functionality
│   ├── analytics.js          # Google Analytics
│   ├── external-tracking.js  # Tracking scripts
│   └── [framework scripts]   # Squarespace framework scripts
├── images/                    # Image assets
│   ├── logos/                # Brand logos (2 files)
│   │   ├── MarquelYvette_Gold+Dk+Grey+Logo+11-3-24.png
│   │   └── MarquelYvette_Gold+White+Text+11-3-24.png
│   ├── backgrounds/          # Background images and icons (3 files)
│   │   ├── 4365245_date_schedule_calendar_event_icon.png
│   │   ├── 2622595_female_photographer_icon.png
│   │   └── 7680845_desktop_monitor_download_screen_device_icon.png
│   └── portfolio/            # Client headshot examples (24+ images)
│       ├── Leonard_Taylor_331-MarquelYvette0050+500px.jpg
│       ├── Sireesha-Ganti-0103-(500px).jpg
│       └── [20+ more portfolio images]
└── other assets/             # Additional resources
```

## ✨ Features

- **Responsive Design** - Mobile-optimized for all devices
- **Image Gallery** - Portfolio showcase with client examples
- **Reviews Section** - Client testimonials and success stories
- **Contact Information** - Easy booking and inquiry forms
- **Analytics Integration** - Google Analytics, Facebook Pixel (optimized)
- **SEO Optimized** - Schema markup for local business and professional services

## ⚡ Performance Optimizations

This repository includes significant performance improvements over the original Squarespace export:

### Image Optimization
- **63% reduction** in total image size (19MB → 7.1MB)
- All portfolio images resized to 2000px max (optimal for web + Retina displays)
- 85% JPEG quality compression (no visible quality loss)
- PNG photos converted to JPEG for better compression
- **Key improvements:**
  - `Hovis_Catherine_403...jpg`: 6.6MB → 858KB (87% reduction)
  - `Studio.jpg`: 4.8MB → 848KB (82% reduction)
  - `LinkVisum.png → .jpg`: 1.4MB → 411KB (71% reduction)
  - `VOF.png → .jpg`: 2.0MB → 464KB (77% reduction)

### CSS & JavaScript Optimization
- **440ms render-blocking CSS eliminated**
- Site CSS (1.5MB) and static CSS (429KB) deferred with media="print" technique
- Google Fonts optimized with `display=swap` for immediate text rendering
- Removed unnecessary tracking scripts (Hotjar, Metricool)
- Font loading optimized to match live site appearance

### Performance Metrics
- **Original PageSpeed Score:** ~27%
- **Expected Score (Squarespace):** 60-70% (with image optimization)
- **Expected Score (AWS hosting):** 90-95% (with full optimizations)

### Backups
- Original high-resolution images: `images-original-backup/`
- Original HTML versions: `index.html.backup`, `index.html.css-backup`

## 🚀 Getting Started

### Prerequisites

- A web browser (Chrome, Firefox, Safari, etc.)
- Python 3 (for local development server)
- Git (for version control)

### Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/myforbes/marquel-yvette-photography-SS.git
   cd marquel-yvette-photography-SS
   ```

2. **Navigate to the website directory:**
   ```bash
   cd "Marquel Yvette Photography"
   ```

3. **Start a local web server:**
   ```bash
   python3 -m http.server 8000
   ```

4. **Open your browser:**
   - Visit: `http://localhost:8000`

### Making Changes

1. **Edit files** as needed (HTML, CSS, images, etc.)

2. **Test locally** by viewing in your browser

3. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

4. **Push to GitHub:**
   ```bash
   git push origin main
   ```

## 🎨 Design Details

### Color Palette

- **Primary:** Dark gray/charcoal (`#2c2c2c`, `#1a1a1a`)
- **Accent:** Gold (`#f4ca78`, `#b9914d`)
- **Backgrounds:** White, Black, Gray options
- **Text:** White and light gray on dark backgrounds

### Typography

- **Font Family:** Arial (sans-serif)
- **Design Philosophy:** Premium, professional aesthetic
- **Framework:** Squarespace 7.1 template base

### Website Sections

The main `index.html` file contains:

1. **Meta & SEO** - Comprehensive meta tags and schema markup
2. **Navigation Header** - Fixed header with logo and CTA button
3. **Hero Section** - Portfolio slider with testimonials
4. **Service Categories** - Showcasing different headshot types
5. **Process Section** - Three-step process (Schedule → Shoot → Download)
6. **About Section** - Photographer introduction and philosophy
7. **FAQ Accordion** - Common questions and answers
8. **Contact Section** - Phone, email, location details
9. **Footer** - Social media links, business hours, service area

## 📊 Image Assets

### Logos (2 files)
- Gold & Dark Grey Logo (primary)
- Gold & White Text Logo (footer)

### Background Assets (3 files)
- Calendar icon (scheduling)
- Photographer icon (session)
- Download icon (delivery)

### Portfolio Images (24+ files)
Client headshot examples showcasing:
- Corporate professionals
- Medical professionals (ERAS)
- Business executives
- LinkedIn profiles
- Actor headshots
- Real estate professionals

## 📞 Contact Information

<div align="center">

**Marquel Yvette Photography**

📍 42570 Unbridleds Song Place, South Riding, VA 20152
📞 (703) 957-0643
📧 marquel@marquelyvette.com
🌐 [www.marquelyvette.com](https://www.marquelyvette.com)

**Service Area:** Loudoun County, VA | Washington DC Metro

</div>

## 🌐 Social Media

<div align="center">

[![Instagram](https://img.shields.io/badge/Instagram-%40marquelyvettephoto-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/marquelyvettephoto)
[![Facebook](https://img.shields.io/badge/Facebook-Marquel%20Yvette%20Photography-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/marquelyvettephotography)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Marquel%20Forbes-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/marquelforbes/)

</div>

## 🛠️ Technical Stack

| Category | Technology |
|----------|-----------|
| **CMS** | Squarespace (exported as static HTML) |
| **Analytics** | Google Analytics, Hotjar, Facebook Pixel, LinkedIn Insights |
| **Fonts** | Google Fonts (custom typography) |
| **Icons** | Font Awesome |
| **Forms** | Squarespace Forms API |
| **CDN** | Squarespace CDN for some assets |
| **Framework** | Squarespace 7.1 Template |

## 📦 Version Control

This repository uses Git for version control. The main branch (`main`) contains the production-ready code.

### Branch Strategy

- `main` - Production code (always deployable)
- Feature branches - Create for new features or major changes

### Commit Guidelines

- Use descriptive commit messages
- Reference issues when applicable
- Keep commits focused and atomic

## 🚀 Deployment

Currently, the production site is hosted on Squarespace at [www.marquelyvette.com](https://www.marquelyvette.com).

### Deployment Workflow

1. Test changes locally
2. Commit to repository
3. Upload to Squarespace or migrate to alternative hosting
4. Verify live site functionality

## 📄 License

© 2025 Marquel Yvette Photography. All rights reserved.

All photography work and content is protected by copyright. Unauthorized use, reproduction, or distribution is prohibited.

## 🙏 Acknowledgments

- Website originally built on Squarespace 7.1
- Static export and optimization completed with Claude Code
- Photography by Marquel Yvette
- All client images used with permission

---

<div align="center">

**Last Updated:** November 2025

Made with 📸 by Marquel Yvette Photography

</div>
