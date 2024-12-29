// User-agent: *
// Disallow: /*
// Allow: /
// Sitemap: https://envmanager.yolosopher.site/sitemap.xml

import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/*"],
            },
        ],
        sitemap: "https://envmanager.yolosopher.site/favicon/sitemap.xml",
    };
}
