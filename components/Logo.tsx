import fs from "fs";
import path from "path";
import { BRAND } from "@/lib/brand";

/** Uses public/logo.png (or .jpg) if present, otherwise a text wordmark. */
export default function Logo({ light = false }: { light?: boolean }) {
  const dir = path.join(process.cwd(), "public");
  const file = ["logo.png", "logo.jpg", "logo.jpeg"].find((f) => fs.existsSync(path.join(dir, f)));
  return (
    <a href="#top" className="brand">
      {file && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`/${file}`} alt={`${BRAND.company} logo`} className="brand-img" />
      )}
      <span className="brand-text">
        <span className="logo">{BRAND.company}</span>
        <span className="brand-sub">{BRAND.sub}</span>
      </span>
    </a>
  );
}
