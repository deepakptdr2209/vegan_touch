import fs from "fs";
import path from "path";
import Photo from "@/components/Photo";
import Logo from "@/components/Logo";
import { BRAND } from "@/lib/brand";
import { whatsappLink } from "@/lib/whatsapp";

// Image files live in /public/images. Items whose image file is missing are hidden automatically.
const belts = [
  { file: "belt-1.jpg", name: "Circle Buckle Belts" },
  { file: "belt-2.jpg", name: "U-Buckle Textured Belt" },
  { file: "belt-3.jpg", name: "Matte Black Buckle Belt" },
  { file: "belt-4.jpg", name: "Classic Pin-Style Belt" },
];
const wallets = [
  { file: "wallet-1.jpg", name: "Charcoal Canvas Wallet" },
  { file: "wallet-2.jpg", name: "Black Textured Wallet" },
  { file: "wallet-3.jpg", name: "Olive Striped Wallet" },
];
const cardHolders = [1, 2, 3, 4].map((n) => ({ file: `cardholder-${n}.jpg`, name: `Card Holder ${n}` }));
const combos = [
  { file: "combo-1.jpg", name: "Black Gift Box — Belt + Wallet" },
  { file: "combo-2.jpg", name: "Orange Gift Box — Belt + Wallet" },
  { file: "combo-3.jpg", name: "Brown Gift Box — Belt + Wallet" },
];

const hasImage = (f: string) => fs.existsSync(path.join(process.cwd(), "public", "images", f));

const why = [
  { t: "100% Non-Leather", d: "No animal-derived materials, ever." },
  { t: "Animal-Friendly", d: "Cruelty-free from design to delivery." },
  { t: "Premium Designs", d: "Clean finish, built for daily use." },
  { t: "Multiple Colours & Styles", d: "Pick what suits you." },
  { t: "Customisation Available", d: "Belt, buckle and wallet colours." },
  { t: "Pan-India Delivery", d: "Shipped to your doorstep." },
];

const occasions = ["Birthday", "Anniversary", "Wedding", "Corporate"];

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 2a8 8 0 1 1-4.2 14.800l-.4-.2-2.600.7.7-2.500-.3-.4A8 8 0 0 1 12 4Zm-3 3.500c-.3 0-.6.1-.8.4-.4.5-1 1.200-.8 2.300.3 1.300 1.500 3 3.200 4.300 1.800 1.300 3.100 1.700 4.200 1.500.8-.1 1.600-.8 1.800-1.500.1-.3 0-.5-.2-.6l-1.800-.9c-.3-.1-.5 0-.6.200l-.6.800c-.2.200-.4.200-.6.100-1-.4-2-1.200-2.600-2.300-.1-.2-.1-.4 0-.5l.5-.6c.1-.2.2-.4.100-.6L9.700 7.800c-.1-.2-.4-.3-.7-.3Z" />
    </svg>
  );
}

function WaButton({ message, children, variant = "solid" }: { message: string; children: React.ReactNode; variant?: "solid" | "line" }) {
  return (
    <a className={`btn btn-${variant}`} href={whatsappLink(message)} target="_blank" rel="noopener noreferrer">
      <WhatsAppIcon /> {children}
    </a>
  );
}

function ProductGrid({
  items,
  kind,
  ratio = "square",
}: {
  items: { file: string; name: string }[];
  kind: string;
  ratio?: "square" | "portrait";
}) {
  const shown = items.filter((p) => hasImage(p.file));
  if (shown.length === 0) {
    return (
      <div className="soon">
        <p>{kind} photos coming soon — message us for the latest designs.</p>
        <WaButton variant="line" message={`Hi Shree Rajendra Creation (Vegan Touch), I'd like to see your ${kind} designs.`}>
          Ask on WhatsApp
        </WaButton>
      </div>
    );
  }
  return (
    <div className={`grid ${shown.length < 4 ? "grid-3" : ""}`}>
      {shown.map((p) => (
        <article key={p.file} className="card">
          <Photo name={p.file} label={p.name} ratio={ratio} />
          <h3>{p.name}</h3>
          <WaButton variant="line" message={`Hi Shree Rajendra Creation (Vegan Touch), I'd like to order: ${p.name} (${kind}).`}>
            Order on WhatsApp
          </WaButton>
        </article>
      ))}
    </div>
  );
}

export default function Home() {
  const hasVideo = fs.existsSync(path.join(process.cwd(), "public", "images", "hero.mp4"));
  const hasHero = fs.existsSync(path.join(process.cwd(), "public", "images", "hero.jpg"));

  return (
    <>
      <header className="header">
        <div className="container header-in">
          <Logo />
          <nav className="nav">
            <a href="#belts">Belts</a>
            <a href="#wallets">Wallets</a>
            <a href="#card-holders">Card Holders</a>
            <a href="#combos">Combos</a>
            <a href="#about">About</a>
          </nav>
          <WaButton message="Hi Shree Rajendra Creation (Vegan Touch), I have an enquiry.">Enquire</WaButton>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="hero container">
          <div className="hero-text">
            <p className="eyebrow">{BRAND.sub} by {BRAND.company}</p>
            <h1>100% Non-Leather Belts &amp; Wallets</h1>
            <p className="lead">
              Stylish, durable accessories made without any animal-derived materials — for people who
              choose kindness without compromising on style.
            </p>
            <div className="btn-row">
              <a className="btn btn-solid" href="#belts">Shop Belts</a>
              <a className="btn btn-solid" href="#wallets">Shop Wallets</a>
              <a className="btn btn-solid" href="#combos">Shop Combos</a>
            </div>
            <div className="btn-row">
              <WaButton variant="line" message="Hi Shree Rajendra Creation (Vegan Touch), I'd like to enquire / place an order.">
                Chat on WhatsApp
              </WaButton>
            </div>
          </div>
          <div className="hero-media">
            {hasVideo ? (
              <video src="/images/hero.mp4" autoPlay muted loop playsInline poster={hasHero ? "/images/hero.jpg" : undefined} />
            ) : (
              <Photo name="hero.jpg" label="Hero image or video" ratio="portrait" />
            )}
          </div>
        </section>

        {/* Belts */}
        <section id="belts" className="section container">
          <div className="section-head">
            <h2>Belts</h2>
            <p>Available in sizes up to <strong>60 inches</strong> wherever applicable.</p>
          </div>
          <ProductGrid items={belts} kind="Belt" />
        </section>

        {/* Wallets */}
        <section id="wallets" className="section alt">
          <div className="container">
            <div className="section-head">
              <h2>Wallets</h2>
              <p>Slim, practical and entirely animal-free.</p>
            </div>
            <ProductGrid items={wallets} kind="Wallet" ratio="portrait" />
          </div>
        </section>

        {/* Card holders */}
        <section id="card-holders" className="section container">
          <div className="section-head">
            <h2>Card Holders</h2>
            <p>Compact everyday carry for your cards and cash.</p>
          </div>
          <ProductGrid items={cardHolders} kind="Card Holder" />
        </section>

        {/* Combos */}
        <section id="combos" className="section alt">
          <div className="container">
            <div className="section-head">
              <h2>Gift &amp; Combo Boxes</h2>
              <p>Premium gifting, thoughtfully put together.</p>
            </div>
            <div className="combo-info">
              <ul className="ticks">
                <li>Belt + Wallet combinations</li>
                <li>Customisable belt, buckle and wallet colour options</li>
                <li>Different combo box colours</li>
              </ul>
              <div>
                <p className="small-label">Perfect for</p>
                <div className="chips">
                  {occasions.map((o) => (
                    <span key={o} className="chip">{o}</span>
                  ))}
                  <span className="chip">Gifting</span>
                </div>
              </div>
            </div>
            <div className="grid grid-3">
              {combos.filter((p) => hasImage(p.file)).map((p) => (
                <article key={p.file} className="card">
                  <Photo name={p.file} label={p.name} ratio="portrait" />
                  <h3>{p.name}</h3>
                </article>
              ))}
            </div>
            <div className="center">
              <WaButton message="Hi Shree Rajendra Creation (Vegan Touch), I'd like to customise a gift combo box.">Customise Your Gift</WaButton>
              <WaButton variant="line" message="Hi Shree Rajendra Creation (Vegan Touch), I'd like to order a gift combo box.">Order on WhatsApp</WaButton>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="section container narrow">
          <h2>About Vegan Touch</h2>
          <p className="about">
            Vegan Touch is a brand dedicated to creating stylish, practical and premium non-leather
            accessories. Our collection includes belts, wallets, combo boxes and more, designed for
            people who choose to stay away from animal-derived materials without compromising on style
            or everyday functionality.
          </p>
          <p className="about about-co">
            {BRAND.sub} is a sub-brand of <strong>{BRAND.company}</strong>. {BRAND.description}
          </p>
        </section>

        {/* Why */}
        <section className="section alt">
          <div className="container">
            <div className="section-head center-text">
              <h2>Why Vegan Touch?</h2>
            </div>
            <div className="why">
              {why.map((w, i) => (
                <div key={w.t} className="why-item">
                  <span className="why-num">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{w.t}</h3>
                  <p>{w.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-in">
          <div>
            <strong className="logo">{BRAND.company}</strong>
            <p className="brand-sub">{BRAND.sub}</p>
            <p className="foot-desc">{BRAND.description}</p>
          </div>
          <address className="foot-contact">
            {BRAND.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
            <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
          </address>
          <WaButton message="Hi Shree Rajendra Creation (Vegan Touch), I have an enquiry.">Chat on WhatsApp</WaButton>
        </div>
        <p className="copy">© {new Date().getFullYear()} {BRAND.company}. All rights reserved.</p>
      </footer>

      <a className="wa-float" aria-label="Chat on WhatsApp" href={whatsappLink("Hi Shree Rajendra Creation (Vegan Touch), I have an enquiry.")} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon />
      </a>
    </>
  );
}
