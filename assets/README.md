# Assets Directory

This directory contains media assets for the portfolio website.

## Directory Structure

```
assets/
├── images/
│   ├── profile-photo.jpg      (Replace with your professional headshot - recommended: 400x400px minimum, square crop)
│   ├── favicon-32x32.png      (Favicon 32x32)
│   ├── favicon-16x16.png      (Favicon 16x16)
│   ├── apple-touch-icon.png   (Apple Touch Icon 180x180)
│   └── og-image.jpg           (Open Graph social sharing image - recommended: 1200x630px)
```

## Profile Photo Instructions

1. Replace `profile-photo.jpg` with your professional headshot
2. In `index.html`, find the profile-placeholder div in the Hero Section
3. Replace it with:
```html
<img src="assets/images/profile-photo.jpg"
     alt="Le Quoc Hai"
     class="profile-photo">
```

## Favicon Generation

Use a tool like https://realfavicongenerator.net/ to generate all favicon sizes from your logo/headshot image.
