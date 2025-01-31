import { MetadataRoute } from "next";
import { getBlogPosts } from "@/app/lib/posts";
import { metaData } from "@/app/[locale]/config";

const BaseUrl = metaData.baseUrl.endsWith("/")
  ? metaData.baseUrl
  : `${metaData.baseUrl}/`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogs = getBlogPosts().map((post) => ({
    url: `${BaseUrl}blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  let routes = ["", "blog", "projects", "photos"].map((route) => ({
    url: `${BaseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
