import type { MetadataRoute } from 'next';
export default function sitemap():MetadataRoute.Sitemap{return ['', '/privacy', '/terms'].map(path=>({url:`https://opsilura.com${path}`,changeFrequency:'monthly',priority:path?0.3:1}))}
