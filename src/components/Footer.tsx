import Link from 'next/link';

const footerLinks = [
  { href: '/blog', label: 'Blog' },
  { href: '/course', label: 'Course' },
  { href: '/free-lesson', label: 'Free Lesson' },
];

const socialLinks = [
  { href: 'https://www.instagram.com/carmeloareyes/', label: 'Instagram' },
  { href: 'https://www.tiktok.com/@carmeloreyes', label: 'TikTok' },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#262626] bg-[#0A0A0A]">
      {/* CTA banner */}
      <div className="max-w-6xl mx-auto px-6 py-8 border-b border-[#262626]">
        <a
          href="https://www.esimlaunch.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-secondary hover:text-accent transition-colors text-sm font-medium"
        >
          Start your eSIM business today &rarr;
        </a>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Left: Logo + location */}
          <div className="flex flex-col gap-3">
            <span className="text-lg font-bold tracking-wide">
              CARMELO REYES
            </span>
            <span className="text-sm text-text-muted">Miami, FL</span>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase text-text-muted tracking-wider">
                Pages
              </span>
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-secondary hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase text-text-muted tracking-wider">
                Social
              </span>
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-[#262626] text-sm text-text-muted">
          &copy; 2026 Carmelo Reyes. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
