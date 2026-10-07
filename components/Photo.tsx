import fs from "fs";
import path from "path";

type Props = {
  /** File name inside /public/images, e.g. "belt-1.jpg" */
  name: string;
  label: string;
  ratio?: "square" | "portrait" | "wide";
};

/**
 * Shows /public/images/<name> if it exists, otherwise a neat placeholder
 * telling you which file to drop in.
 */
export default function Photo({ name, label, ratio = "square" }: Props) {
  const exists = fs.existsSync(path.join(process.cwd(), "public", "images", name));
  return (
    <div className={`photo photo-${ratio}`}>
      {exists ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`/images/${name}`} alt={label} loading="lazy" />
      ) : (
        <div className="photo-empty">
          <span>{label}</span>
          <small>public/images/{name}</small>
        </div>
      )}
    </div>
  );
}
