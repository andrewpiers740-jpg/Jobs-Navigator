import { MetadataRoute } from 'next';
import { INITIAL_JOBS } from '@/lib/data/jobs';
import { SITE } from '@/src/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url || 'https://jobsnavigator.com.au';

  // Core static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/jobs/`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sectors/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/employers/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/how-it-works/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Dynamic job listing URLs (up to 2,500 items in sitemap)
  const jobPages: MetadataRoute.Sitemap = INITIAL_JOBS.slice(0, 2500).map((job) => ({
    url: `${baseUrl}/jobs/${job.slug || job.id}/`,
    lastModified: new Date(),
    changeFrequency: job.status === 'FILLED' ? 'monthly' : 'weekly',
    priority: job.featured ? 0.9 : 0.7,
  }));

  return [...staticPages, ...jobPages];
}
