import multer from 'multer';

/**
 * In-memory upload handling for event images. Files are kept in memory (no disk
 * writes — Render's free tier has an ephemeral filesystem) and converted to a
 * base64 data URL stored alongside the event, consistent with the rest of the
 * in-memory store.
 */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

/** Accepts an optional single `image` file field on the request. */
export const uploadEventImage = upload.single('image');

/** Convert an uploaded file to a `data:` URL for inline storage/serving. */
export function fileToDataUrl(file: Express.Multer.File): string {
  return `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
}
