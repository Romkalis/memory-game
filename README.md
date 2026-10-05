# RS Memory Game

Vanilla JavaScript, HTML and CSS project built with Vite.

## Commands

- `npm install` installs dependencies.
- `npm run dev` starts the development server.
- `npm run lint` checks JavaScript with ESLint.
- `npm run build` optimizes image assets and creates production files in `dist/`.
- `npm run preview` serves the production build locally.

During a production build, raster images (JPEG, PNG, GIF, TIFF and AVIF) are
optimized and converted to WebP. Generated files keep the source extension in
their name, for example `photo.jpg.webp`, to avoid collisions. SVG files are
optimized as SVG and are not rasterized.