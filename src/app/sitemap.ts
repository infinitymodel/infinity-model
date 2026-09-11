import type { MetadataRoute } from "next";

import { products } from "@/data/products";
import { services } from "@/data/services";
import { trainingCourses } from "@/data/training";

import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["ar", "en"];

  const routes = [
    "",
    "/services",
    "/shop",
    "/training",
    "/projects",
    "/about",
    "/contact",
  ];
  const projectCategories = [
    "engineering",
    "prototypes",
    "figures",
    "creative",
    "pcb",
    "custom",
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${SITE_URL}/${locale}${route}`,
        changeFrequency:
          route === ""
            ? "weekly"
            : "monthly",
        priority:
          route === ""
            ? 1
            : 0.8,
      });
    }

    for (const service of services) {
      entries.push({
        url: `${SITE_URL}/${locale}/services/${service.slug}`,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }

    for (const course of trainingCourses) {
      entries.push({
        url: `${SITE_URL}/${locale}/training/${course.slug}`,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }

    for (const product of products) {
      entries.push({
        url: `${SITE_URL}/${locale}/shop/${product.id}`,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }

    for (const category of projectCategories) {
      entries.push({
        url: `${SITE_URL}/${locale}/projects/${category}`,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
