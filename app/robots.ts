import { MetadataRoute } from 'next';
import { SITE } from '@/src/config/site';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE.url || 'https://jobsnavigator.com.au';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'Google-Extended', 'Anthropic-AI', 'PerplexityBot'],
        allow: ['/', '/jobs/', '/sectors/'],
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
