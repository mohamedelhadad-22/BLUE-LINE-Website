# Image Optimization Guide

This guide explains how to optimize images in your Vue.js project.

## 🎯 What We've Set Up

1. **Automatic Image Compression** - Images are automatically compressed during build
2. **WebP Conversion Script** - Convert PNG/JPG images to WebP format
3. **Lazy Loading Component** - Load images only when they're visible
4. **Code Splitting** - Separate vendor and app code for faster loading

---

## 📦 1. Convert Images to WebP Format

### Why WebP?
- **60-80% smaller** file sizes compared to PNG/JPG
- Better quality at smaller sizes
- Supported by all modern browsers

### How to Convert:

```bash
npm run convert-images
```

This will:
- Find all PNG, JPG, JPEG files in `src/assets/`
- Create WebP versions alongside originals
- Show you the file size savings
- Keep original files intact

**Example output:**
```
✓ Converted: saudiBranche_image.png
  Original: 4.40MB
  WebP: 1.20MB
  Saved: 72.73%
```

### Using WebP Images in Your Code:

**Before:**
```vue
<img src="@/assets/saudiBranche_image.png" alt="Saudi Branch" />
```

**After:**
```vue
<img src="@/assets/saudiBranche_image.webp" alt="Saudi Branch" />
```

Or use the `<picture>` tag for fallback support:
```vue
<picture>
  <source srcset="@/assets/saudiBranche_image.webp" type="image/webp">
  <img src="@/assets/saudiBranche_image.png" alt="Saudi Branch" />
</picture>
```

---

## 🚀 2. Automatic Image Compression

Images are **automatically compressed** when you run:

```bash
npm run build
```

The build process will:
- Compress PNG files to 80% quality
- Compress JPG files to 80% quality
- Compress WebP files to 80% quality
- Cache results for faster subsequent builds

You don't need to do anything - it just works!

---

## 🔄 3. Lazy Loading Images

### Using the LazyImage Component

Instead of using regular `<img>` tags, use our `<LazyImage>` component:

**Import the component:**
```vue
<script>
import LazyImage from '@/components/common/LazyImage.vue';

export default {
  components: {
    LazyImage
  }
}
</script>
```

**Use it in your template:**
```vue
<LazyImage
  src="@/assets/saudiBranche_image.webp"
  alt="Saudi Branch"
  aspect-ratio="16/9"
/>
```

### Props:

- `src` (required) - Image source URL
- `alt` (optional) - Alt text for accessibility
- `aspect-ratio` (optional) - Aspect ratio to prevent layout shift (e.g., "16/9", "4/3", "1/1")
- `placeholder` (optional) - Placeholder image while loading

### Benefits:

- ✅ Images load only when they're about to appear on screen
- ✅ Reduces initial page load time
- ✅ Saves bandwidth
- ✅ Smooth fade-in animation
- ✅ Loading spinner while image loads
- ✅ Prevents layout shift with aspect ratio

---

## 🎨 Example: Converting a Page to Use Optimized Images

### Before:
```vue
<template>
  <div class="branch-image">
    <img src="@/assets/saudiBranche_image.png" alt="Saudi Branch" />
  </div>
</template>
```

### After:
```vue
<script>
import LazyImage from '@/components/common/LazyImage.vue';

export default {
  components: {
    LazyImage
  }
}
</script>

<template>
  <div class="branch-image">
    <LazyImage
      src="@/assets/saudiBranche_image.webp"
      alt="Saudi Branch"
      aspect-ratio="584/389"
    />
  </div>
</template>
```

---

## 📊 Expected File Size Reductions

Based on your current images:

| Image | Original Size | WebP Size (Est.) | Savings |
|-------|--------------|------------------|---------|
| saudiBranche_image.png | 4.4MB | ~1.2MB | 73% |
| Furniture-Houseware._bgpng.png | 3.0MB | ~0.8MB | 73% |
| about_image.png | 2.3MB | ~0.6MB | 74% |
| EgyptBranche_image.png | 1.2MB | ~0.3MB | 75% |

**Total savings: ~70-75% reduction in image size!**

---

## 🛠️ Step-by-Step Guide

### Step 1: Convert All Images to WebP
```bash
npm run convert-images
```

### Step 2: Update Your Components

Replace large images with the LazyImage component. Priority images to update:

1. **ContactView.vue** - Branch images (lines 375, 426)
2. **AboutSection.vue** - About image
3. **HomeView.vue** - Hero and section images

### Step 3: Build and Test
```bash
npm run build
npm run preview
```

### Step 4: Check Browser DevTools
- Open Network tab
- Reload the page
- Verify images are loading as WebP
- Check that images load only when scrolling

---

## 🎯 Pro Tips

1. **Always provide aspect-ratio** to prevent layout shift
2. **Use WebP for large images** (>100KB)
3. **Keep PNG for small icons** (<10KB) - not worth converting
4. **Test on slow 3G** to verify lazy loading works
5. **Don't delete originals** until you verify WebP works everywhere

---

## 🐛 Troubleshooting

### Images not loading?
- Make sure the file path is correct
- Check browser console for errors
- Verify WebP files were created

### Build failing?
```bash
npm install
npm run build
```

### Convert script not working?
Make sure Sharp is installed:
```bash
npm install --save-dev sharp
```

---

## 📈 Performance Metrics

After optimization, you should see:

- ✅ **70-80% reduction** in image file sizes
- ✅ **50-60% faster** initial page load
- ✅ **Better Lighthouse scores** (Performance: 90+)
- ✅ **Lower bandwidth usage** for users
- ✅ **Faster loading** on mobile networks

---

## 🔗 Resources

- [WebP Image Format](https://developers.google.com/speed/webp)
- [Lazy Loading Images](https://web.dev/lazy-loading-images/)
- [Sharp Image Processing](https://sharp.pixelplumbing.com/)
- [Vite Image Optimizer](https://github.com/FatehAK/vite-plugin-image-optimizer)

---

Need help? Check the console output or contact the development team.
