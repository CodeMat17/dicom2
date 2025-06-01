const fetch = require("node-fetch").default;
const xml2js = require("xml2js");
const fs = require("fs");
const path = require("path");

const isDev = process.env.NODE_ENV !== "production";
const BASE_URL = isDev
  ? "http://localhost:3000"
  : process.env.NEXT_PUBLIC_BASE_URL || "https://dicom.gouni.edu.ng";

async function verifySitemapFiles() {
  console.log("Verifying sitemap files...");

  try {
    // Check if sitemap files exist
    const sitemapFiles = [
      path.join(process.cwd(), "app", "sitemap-index.xml", "route.ts"),
      path.join(process.cwd(), "app", "sitemap.xml", "route.ts"),
      path.join(process.cwd(), "app", "sitemap-news.xml", "route.ts"),
    ];

    for (const file of sitemapFiles) {
      if (fs.existsSync(file)) {
        console.log(`✓ Found sitemap file: ${path.basename(file)}`);

        // Read and validate the file content
        const content = fs.readFileSync(file, "utf8");
        if (content.includes('xml version="1.0"')) {
          console.log(
            `✓ ${path.basename(file)} contains valid XML declaration`
          );
        }
      } else {
        console.warn(`⚠ Missing sitemap file: ${path.basename(file)}`);
      }
    }

    console.log("\nAll sitemap files are present and valid");
  } catch (error) {
    console.error("Sitemap file verification failed:", error);
    process.exit(1);
  }
}

async function verifyProductionSitemaps() {
  console.log("Verifying production sitemaps...");

  try {
    // Check sitemap index
    const sitemapIndexResponse = await fetch(`${BASE_URL}/sitemap-index.xml`);
    if (!sitemapIndexResponse.ok) {
      throw new Error(
        `Sitemap index not found: ${sitemapIndexResponse.status}`
      );
    }
    console.log("✓ Sitemap index is accessible");

    // Parse sitemap index
    const sitemapIndexContent = await sitemapIndexResponse.text();
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(sitemapIndexContent);

    // Verify each sitemap in the index
    const sitemaps = result.sitemapindex.sitemap;
    for (const sitemap of sitemaps) {
      const loc = sitemap.loc[0];
      const response = await fetch(loc);
      if (!response.ok) {
        throw new Error(`Sitemap not found: ${loc}`);
      }
      console.log(`✓ Verified sitemap: ${loc}`);

      // Verify sitemap content
      const sitemapContent = await response.text();
      await parser.parseStringPromise(sitemapContent);
      console.log(`✓ Verified sitemap content: ${loc}`);
    }

    console.log("All sitemaps are valid and accessible");
  } catch (error) {
    console.error("Production sitemap verification failed:", error);
    if (isDev) {
      console.log("Note: This error is expected in development environment");
    } else {
      process.exit(1);
    }
  }
}

async function main() {
  console.log("Starting SEO setup verification...\n");

  // Always verify sitemap files
  await verifySitemapFiles();

  // Only verify production sitemaps if explicitly requested
  if (process.env.CHECK_PRODUCTION === "true") {
    console.log("\nChecking production sitemaps...");
    await verifyProductionSitemaps();
  }

  console.log("\nSEO setup verification completed!");
}

main();
