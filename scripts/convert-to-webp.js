import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ASSETS_DIR = join(__dirname, '../src/assets');
const QUALITY = 80;

async function convertImageToWebP(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    const inputStats = await stat(inputPath);
    const outputStats = await stat(outputPath);
    const savings = ((inputStats.size - outputStats.size) / inputStats.size * 100).toFixed(2);

    console.log(`✓ Converted: ${basename(inputPath)}`);
    console.log(`  Original: ${(inputStats.size / 1024 / 1024).toFixed(2)}MB`);
    console.log(`  WebP: ${(outputStats.size / 1024 / 1024).toFixed(2)}MB`);
    console.log(`  Saved: ${savings}%\n`);
  } catch (error) {
    console.error(`✗ Failed to convert ${basename(inputPath)}:`, error.message);
  }
}

async function processDirectory(directory) {
  const files = await readdir(directory);

  for (const file of files) {
    const filePath = join(directory, file);
    const fileStat = await stat(filePath);

    if (fileStat.isDirectory()) {
      await processDirectory(filePath);
    } else {
      const ext = extname(file).toLowerCase();

      // Convert PNG, JPG, JPEG to WebP
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        const outputPath = filePath.replace(ext, '.webp');
        await convertImageToWebP(filePath, outputPath);
      }
    }
  }
}

console.log('🚀 Starting image conversion to WebP...\n');
console.log(`📁 Processing directory: ${ASSETS_DIR}\n`);

processDirectory(ASSETS_DIR)
  .then(() => {
    console.log('✅ All images converted successfully!');
  })
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  });
