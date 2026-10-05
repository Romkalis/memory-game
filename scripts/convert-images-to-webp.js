import { readdir } from 'node:fs/promises'
import { extname, join, parse } from 'node:path'
import sharp from 'sharp'

const outputDirectory = join(process.cwd(), 'dist')
const rasterExtensions = new Set(['.jpg', '.jpeg', '.png', '.gif', '.tif', '.tiff', '.avif'])

async function findRasterImages(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const nestedFiles = await Promise.all(
    entries.map(async (entry) => {
      const filePath = join(directory, entry.name)

      if (entry.isDirectory()) {
        return findRasterImages(filePath)
      }

      return rasterExtensions.has(extname(entry.name).toLowerCase()) ? [filePath] : []
    }),
  )

  return nestedFiles.flat()
}

const imageFiles = await findRasterImages(outputDirectory)

for (const imagePath of imageFiles) {
  const image = parse(imagePath)
  const webpPath = join(image.dir, `${image.name}${image.ext}.webp`)

  await sharp(imagePath, { animated: image.ext.toLowerCase() === '.gif' })
    .webp({ quality: 82, effort: 5 })
    .toFile(webpPath)
}

console.log(`Создано WebP-файлов: ${imageFiles.length}`)