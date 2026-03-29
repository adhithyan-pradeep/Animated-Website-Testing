const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, '_raw_frames');
const outputDir = path.join(__dirname, 'public', 'sequence');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function processImages() {
  const files = fs.readdirSync(inputDir)
    .filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.jpeg'))
    .sort();

  const selectedFiles = files.slice(0, 120);
  console.log(`Found ${files.length} images. Processing ${selectedFiles.length}...`);

  let count = 0;
  for (let i = 0; i < selectedFiles.length; i++) {
    const file = selectedFiles[i];
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, `frame_${i}.webp`);

    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath);
    
    count++;
    if (count % 20 === 0) {
      console.log(`Processed ${count} / ${selectedFiles.length} images.`);
    }
  }
  console.log('Finished processing all images.');
}

processImages().catch(err => {
  console.error('Error processing images:', err);
  process.exit(1);
});
