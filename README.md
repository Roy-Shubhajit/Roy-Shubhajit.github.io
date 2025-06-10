# Shubhajit Roy - Academic Portfolio Website

A modern, multi-page academic portfolio website built with HTML, CSS, and JavaScript. Features a professional Apple-inspired design with dark mode support and responsive layout.

## 🚀 Features

- **Multi-page Architecture**: Separate pages for Home, Publications, Projects, Roles, Blogs, and CV
- **Apple-inspired Design**: Clean, minimalist interface with professional typography
- **Dark/Light Mode**: Automatic system preference detection with manual toggle
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Social Media Integration**: LinkedIn, GitHub, Twitter, Google Scholar, and Email links
- **Profile Photo**: Professional headshot prominently displayed above social links
- **Recent Updates System**: Dynamic homepage showcasing latest achievements

## 📁 File Structure

```
portfolio/
├── index.html          # Home page with profile photo and recent updates
├── publications.html   # Research publications
├── projects.html       # Academic projects  
├── roles.html          # Teaching and service roles
├── blogs.html          # Academic blog posts
├── cv.html             # Complete curriculum vitae
├── style.css           # Styling and themes
├── script.js           # Functionality and data
├── profile-photo.jpg   # Your profile image (to be added)
└── README.md           # This file
```

## 🎨 Color Scheme

The website uses a consistent blue color palette:
- **Primary Color**: #2A5CAA (Blue)
- **Hover States**: #1E4580 (Darker Blue)
- **Active States**: #15325C (Darkest Blue)

## 🛠️ Deployment to GitHub Pages

### Step 1: Create Repository
1. Go to GitHub and create a new repository
2. Name it `yourusername.github.io` (replace with your GitHub username)
3. Make sure it's public and initialize with README

### Step 2: Upload Files
1. Upload all website files to the repository
2. Ensure `index.html` is in the root directory
3. Add your profile photo as `profile-photo.jpg`

### Step 3: Enable GitHub Pages
1. Go to repository Settings
2. Scroll to "Pages" section
3. Select "Deploy from a branch"
4. Choose "main" branch and "/ (root)"
5. Click Save

Your website will be available at `https://yourusername.github.io`

## 📷 Adding Your Profile Photo

1. **Prepare Your Photo**:
   - Use a square image (recommended: 400x400 pixels)
   - Save as JPG or PNG format
   - Keep file size under 1MB for fast loading
   - Ensure good lighting and professional appearance

2. **Upload to Repository**:
   - Name your photo file exactly `profile-photo.jpg`
   - Upload to the root directory (same location as index.html)
   - The website will automatically detect and display your photo

3. **Fallback System**:
   - If no photo is provided, a camera icon placeholder will show
   - Photo will be automatically cropped to circular shape
   - Border color matches website theme (#2A5CAA blue)

## 📧 Updating Your Email Address

To change the email address in the social media links:

1. Open `index.html`
2. Find this line in the social links section:
   ```html
   <a href="mailto:shubhajit.roy@iitgn.ac.in" class="social-link email" title="Email">
   ```
3. Replace `shubhajit.roy@iitgn.ac.in` with your email address
4. Save the file

## 🔄 Adding Recent Updates

Recent updates appear prominently on the home page. To add new updates:

1. Open `script.js`
2. Find the `recentUpdates` array
3. Add new update objects following this format:

```javascript
{
    title: "Your Achievement Title",
    description: "Brief description of the achievement",
    date: "2024-MM-DD", // Use YYYY-MM-DD format
    type: "publication", // Options: publication, teaching, service, event, award, certificate
    link: "relevant-page.html", // Link to relevant section
    icon: "📄" // Relevant emoji icon
}
```

### Update Types and Icons:
- **Publications**: 📄 (type: "publication")
- **Teaching**: 🎓 (type: "teaching") 
- **Service**: 🤝 (type: "service")
- **Events**: 🧠 (type: "event")
- **Awards**: 🏆 (type: "award")
- **Certificates**: 📜 (type: "certificate")

## 🎯 Customizing Social Media Links

Update your social media profiles in `index.html`:

```html
<!-- Email -->
<a href="mailto:your.email@domain.com" class="social-link email" title="Email">

<!-- LinkedIn -->
<a href="https://linkedin.com/in/your-profile" target="_blank" class="social-link linkedin" title="LinkedIn">

<!-- GitHub -->
<a href="https://github.com/your-username" target="_blank" class="social-link github" title="GitHub">

<!-- Twitter -->
<a href="https://twitter.com/your-handle" target="_blank" class="social-link twitter" title="Twitter">

<!-- Google Scholar -->
<a href="https://scholar.google.com/citations?user=your-id" target="_blank" class="social-link scholar" title="Google Scholar">
```

## 🎨 Customizing Design

### Changing Colors
Edit CSS variables in `style.css`:
```css
:root {
  --color-primary: #2A5CAA; /* Your preferred color */
  --color-primary-hover: #1E4580;
  --color-primary-active: #15325C;
}
```

### Modifying Layout
- Profile photo size: Adjust `.profile-photo-container` width/height
- Social link spacing: Modify `.social-links` gap property
- Button styles: Update `.btn` classes

## 📱 Mobile Optimization

The website is fully responsive with:
- Collapsible navigation menu on mobile
- Optimized profile photo sizing
- Touch-friendly social media buttons
- Readable typography across all devices

## 🌙 Dark Mode

The website includes automatic dark mode with:
- System preference detection
- Manual toggle button
- Persistent theme selection
- Smooth transitions between themes

## 🚀 Performance Features

- Optimized CSS with minimal dependencies
- Efficient JavaScript with error handling
- Responsive images with fallback system
- Fast loading times
- SEO-optimized markup

## 🔧 Maintenance

### Regular Updates
1. Add new publications to `publications.html`
2. Update recent achievements in `script.js`
3. Refresh project status in `projects.html`
4. Maintain current CV information

### Best Practices
- Keep content current and accurate
- Optimize images for web
- Test across different devices
- Monitor loading performance
- Update social media links as needed

## 📞 Support

For technical issues or customization help:
1. Check browser console for error messages
2. Verify all files are properly uploaded
3. Ensure proper file naming (especially `profile-photo.jpg`)
4. Test in different browsers for compatibility

## 📄 License

This portfolio template is open source and available under the MIT License. Feel free to use and modify for your academic portfolio needs.

---

**Created for**: Shubhajit Roy, PhD Student at IIT Gandhinagar  
**Specialization**: Graph Neural Networks  
**Last Updated**: June 2025
