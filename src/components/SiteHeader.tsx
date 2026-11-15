import Image from "next/image";
import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="fm-premium-header">
      <div className="fm-premium-header-inner">
        <Link
          href="/"
          className="fm-premium-brand"
          aria-label="Future Minds home"
        >
          <Image
            src="/branding/fm-logo.png"
            alt=""
            width={40}
            height={40}
          />

          <span>
            <strong>Future Minds</strong>
            <small>COACHING CENTER</small>
          </span>
        </Link>

        <nav
          className="fm-premium-nav"
          aria-label="Primary navigation"
        >
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/programmes">Programmes</Link>
          <Link href="/admissions">Admissions</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <Link
          href="/login"
          className="fm-premium-login"
        >
          Account login
        </Link>
      </div>
    </header>
  );
}
