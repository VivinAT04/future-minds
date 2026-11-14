import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="future-footer">
      <div className="future-footer-inner">

        <div className="future-footer-brand">
          <strong>FUTURE MINDS</strong>
          <span>COACHING CENTER</span>
          <p>Learn. Prepare. Achieve.</p>
        </div>

        <div className="future-footer-links">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/programmes">Programmes</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className="future-footer-bottom">
          © 2026 Future Minds. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
