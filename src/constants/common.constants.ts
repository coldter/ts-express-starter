export const ACCOUNT_TYPE = {
  USER: 'USER',
} as const;

export const ACCOUNT_STATUS = {
  ACTIVE: 1,
  BLOCKED: 2,
} as const;

export const FILE_MIME_TYPES = {
  IMAGE_JPEG: 'image/jpeg',
  IMAGE_PNG: 'image/png',
  IMAGE_GIF: 'image/gif',
  IMAGE_SVG: 'image/svg+xml',
  IMAGE_WEBP: 'image/webp',
  CSV: 'text/csv',
} as const;

export const MAX_UPLOAD_FILE_SIZE_IN_MB = 50;
