import { readdir, stat } from 'fs/promises'
import { fileURLToPath } from 'url'
import path from 'path'
import sharp from 'sharp'

const framesDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../public/image-sequence/frames'
)

async function convert() {
  const files = (await readdir(framesDir))
    .filter(f => f.endsWith('.png'))
    .sort()

  console.log(`Found ${files.length} PNG frames. Converting to WebP quality 80…`)

  let totalPng = 0
  let totalWebp = 0

  for (const file of files) {
    const pngPath = path.join(framesDir, file)
    const webpPath = path.join(framesDir, file.replace('.png', '.webp'))

    const pngSize = (await stat(pngPath)).size
    totalPng += pngSize

    await sharp(pngPath)
      .webp({ quality: 80, effort: 4 })
      .toFile(webpPath)

    const webpSize = (await stat(webpPath)).size
    totalWebp += webpSize

    const pct = Math.round((1 - webpSize / pngSize) * 100)
    process.stdout.write(`  ${file} → ${file.replace('.png', '.webp')}  (${(pngSize/1024).toFixed(0)}KB → ${(webpSize/1024).toFixed(0)}KB, -${pct}%)\n`)
  }

  const totalPngMB = (totalPng / 1024 / 1024).toFixed(1)
  const totalWebpMB = (totalWebp / 1024 / 1024).toFixed(1)
  const savedPct = Math.round((1 - totalWebp / totalPng) * 100)

  console.log('')
  console.log(`PNG total:  ${totalPngMB} MB`)
  console.log(`WebP total: ${totalWebpMB} MB  (saved ${savedPct}%)`)

  if (totalWebp > 25 * 1024 * 1024) {
    console.log('\n⚠️  Result > 25 MB — consider running with --sample flag to keep every 2nd frame.')
  } else {
    console.log('\n✅ Under 25 MB — full 58-frame sequence looks good.')
  }
}

convert().catch(err => { console.error(err); process.exit(1) })
