import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Replace with the production domain of your coaching platform
  const baseUrl = 'https://matrixpulse.com';
  const lastModified = new Date();

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  const zones = ['soul', 'spiritual', 'material', 'karma', 'comfort'];

  // Programmatically generate 22 Hubs and 110 Spokes
  for (let arcana = 1; arcana <= 22; arcana++) {
    // Arcana Hub Page (e.g., /meaning/15)
    routes.push({
      url: `${baseUrl}/meaning/${arcana}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    });

    // Arcana Zone Spokes (e.g., /meaning/15/material)
    for (const zone of zones) {
      routes.push({
        url: `${baseUrl}/meaning/${arcana}/${zone}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  return routes;
}
