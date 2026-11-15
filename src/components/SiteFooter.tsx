import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="fm-premium-footer">
      <div className="fm-premium-width">
        <div className="fm-premium-footer-grid">
          <div>
            <h2>Future Minds</h2>

            <p>
              A structured academic environment
              for school education, entrance
              preparation and engineering studies.
            </p>
          </div>

          <div>
            <h3>Discover</h3>

            <Link href="/about">About</Link>
            <Link href="/programmes">Programmes</Link>
            <Link href="/admissions">Admissions</Link>
          </div>

          <div>
            <h3>Support</h3>

            <Link href="/contact">Contact</Link>
            <Link href="/login">Account access</Link>
          </div>
        </div>

        <div className="fm-premium-footer-bottom">
          <span>
            © 2026 Future Minds Coaching Center
          </span>

          <span>
            Learning with clarity and purpose
          </span>
        </div>
      </div>
    </footer>
  );
}
