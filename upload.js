// upload.js
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

// Use CLOUDINARY_URL env var (set before running)
// Example CLOUDINARY_URL: cloudinary://API_KEY:API_SECRET@CLOUD_NAME
if (!process.env.CLOUDINARY_URL) {
  console.error("ERROR: Please set CLOUDINARY_URL in your environment first.");
  process.exit(1);
}
cloudinary.config({ cloudinary_url: process.env.CLOUDINARY_URL });

// ---- SETTINGS ----
const LOCAL_FOLDER = "public/to_upload";   // local folder to scan
const CLOUDINARY_FOLDER = "my_repo_images"; // top-level folder in Cloudinary
const OUTPUT_JSON = "cloudinary_map.json";  // output mapping file
// -------------------

let mapping = {}; // "/path/from/public/to_upload": secure_url

function getRelativeKey(fullLocalPath) {
  const rel = path.relative(LOCAL_FOLDER, fullLocalPath);
  return "/" + rel.replace(/\\/g, "/"); // leading slash, forward slashes
}

async function uploadFolder(localPath, cloudPath) {
  const items = fs.readdirSync(localPath);
  for (const item of items) {
    const fullLocalPath = path.join(localPath, item);
    const stats = fs.statSync(fullLocalPath);

    if (stats.isDirectory()) {
      await uploadFolder(fullLocalPath, `${cloudPath}/${item}`);
    } else {
      if (/\.(png|jpg|jpeg|webp|gif|svg)$/i.test(item)) {
        console.log("Uploading:", fullLocalPath);
        const result = await cloudinary.uploader.upload(fullLocalPath, {
          folder: cloudPath,
        });
        const key = getRelativeKey(fullLocalPath); // "/icons/logo.svg"
        mapping[key] = result.secure_url;
      }
    }
  }
}

(async () => {
  try {
    if (!fs.existsSync(LOCAL_FOLDER)) {
      console.error(`ERROR: Local folder "${LOCAL_FOLDER}" not found.`);
      process.exit(1);
    }

    await uploadFolder(LOCAL_FOLDER, CLOUDINARY_FOLDER);

    fs.writeFileSync(OUTPUT_JSON, JSON.stringify(mapping, null, 2), "utf8");
    console.log(`✔ Upload complete. Mapping saved to ${OUTPUT_JSON}`);
  } catch (err) {
    console.error("❌ Upload failed:", err);
    process.exit(1);
  }
})();
