import Image from "next/image";
import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="Future Minds homepage">
        <Image
          src="/branding/fm-logo.png"
          alt=""
          width={54}
          height={54}
          className="brand-icon"
        />

        <span className="brand-wordmark">
          <strong>
            FUTURE <em>MINDS</em>
          </strong>
          <small>COACHING CENTER</small>
        </span>
      </Link>

      <nav className="nav-links" aria-label="Main navigation">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/programmes">Programmes</Link>
        <Link href="/#approach">Our Approach</Link>
        <Link href="/contact">Contact</Link>
      </nav>

      <Link href="/admissions" className="nav-cta">
        Enquire now <span aria-hidden="true">↗</span>
      </Link>
    </header>
  );
}
