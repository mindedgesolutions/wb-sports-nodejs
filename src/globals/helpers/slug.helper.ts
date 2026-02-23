import slugify from 'slugify';

export default function generateSlug(value: string): string {
  const slug = slugify(value, {
    lower: true,
    strict: true,
    trim: true,
  });
  return slug;
}
