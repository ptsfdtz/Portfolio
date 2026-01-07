import { MetadataRoute } from "next";

const WEBSITE_HOST_URL = process.env.SITE_URL ?? "http://localhost:3000";

type changeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const changeFrequency = "daily" as changeFrequency;
  const routes = ["", "/resume"].map((route) => ({
    url: `${WEBSITE_HOST_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency,
  }));

  return routes;
}
