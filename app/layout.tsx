import type { Metadata } from "next";
import Link from "next/link";
import {
  Home,
  FileText,
  Download,
  Laptop,
  ArrowRight,
  Trophy as TrophyIcon,
  MapPin,
  Lock,
} from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "MINDMORY — Where Memories Whisper Loud | Nationwide Academic Competition Pakistan",
    template: "%s | MINDMORY Pakistan",
  },
  description:
    "MINDMORY — Where Memories Whisper Loud. Official nationwide academic competition and school examination portal for Class 1 to Grade 10 & O Levels across Pakistan.",
  keywords: [
    "MINDMORY",
    "Where Memories Whisper Loud",
    "Mindmory Pakistan",
    "School Competition Pakistan",
    "Academic Olympiad Pakistan",
    "General Knowledge Competition",
    "Art and Creative Expression Competition",
  ],
  authors: [{ name: "MINDMORY Secretariat" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    siteName: "MINDMORY",
    title: "MINDMORY — Where Memories Whisper Loud",
    description:
      "Institutional enrollments, grade-wise syllabus, model papers, and online assessment portal for Class 1 to Grade 10 & O Levels.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MINDMORY — Where Memories Whisper Loud",
    description:
      "Standard cognitive benchmarks and academic recognition for school students across Pakistan.",
  },
};

export function BrandLogo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5 group select-none">
      <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
        <div className="absolute inset-0 bg-orange-500/20 rounded-2xl blur-md group-hover:bg-red-500/30 transition-all duration-300" />
        <div className="relative w-full h-full bg-neutral-950 border border-neutral-800 group-hover:border-red-600 rounded-2xl flex items-center justify-center shadow-inner p-1">
          <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full group-hover:scale-105 transition-transform duration-300"
            aria-hidden="true"
          >
            {/* Left Orange Brain */}
            <path
              d="M30 12C24.5 12 20 15.8 20 21C17.8 22 16.5 24.2 16.5 26.8C16.5 29.8 18.4 32.3 21.1 33.2C22.2 35.8 24.8 37.5 27.8 37.5H30V12Z"
              fill="#F97316"
            />
            <circle cx="23.5" cy="21.5" r="1.6" fill="#0A0A0A" />
            <circle cx="25.5" cy="28" r="1.6" fill="#0A0A0A" />
            <path d="M21 25.5H27" stroke="#0A0A0A" strokeWidth="1.8" strokeLinecap="round" />

            {/* Right Digital Brain */}
            <path
              d="M34 12C39.5 12 44 15.8 44 21C46.2 22 47.5 24.2 47.5 26.8C47.5 29.8 45.6 32.3 42.9 33.2C41.8 35.8 39.2 37.5 36.2 37.5H34V12Z"
              fill="#38BDF8"
            />
            <rect x="37" y="16" width="3" height="3" rx="0.5" fill="#0A0A0A" />
            <rect x="41" y="21" width="3" height="3" rx="0.5" fill="#0A0A0A" />
            <rect x="37" y="26" width="3" height="3" rx="0.5" fill="#0A0A0A" />
            <rect x="44" y="13" width="2.5" height="2.5" fill="#F97316" />
            <rect x="17" y="13" width="2.5" height="2.5" fill="#38BDF8" />

            {/* Open Book Base */}
            <path
              d="M10 24L30 39V52L10 43V24Z"
              fill="#F97316"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M54 24L34 39V52L54 43V24Z"
              fill="#1E3A8A"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M8 29V46L30 55M56 29V46L34 55"
              stroke="#F97316"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="text-left leading-tight">
        <div className="font-black tracking-normal text-white text-base sm:text-lg flex items-center font-sans">
          <span>MIND</span>
          <span className="text-red-500 font-extrabold">MORY</span>
        </div>
        <span className="text-[9px] sm:text-[10px] italic tracking-wide text-amber-400/90 block font-medium">
          Where Memories Whisper Loud
        </span>
      </div>
    </Link>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-neutral-100 min-h-screen flex flex-col justify-between font-sans selection:bg-red-600 selection:text-white">
        {/* GLOBAL NAVBAR ON ALL PAGES */}
        <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-neutral-900 px-4 sm:px-6 lg:px-8 py-2.5">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <BrandLogo />

            {/* DESKTOP MENU (INCLUDING HOME ON ALL PAGES) */}
            <nav className="hidden xl:flex items-center gap-1 text-xs font-bold">
              <Link
                href="/"
                className="px-3 py-1.5 rounded-lg text-neutral-200 hover:text-white hover:bg-neutral-900 transition flex items-center gap-1"
              >
                <Home className="w-3.5 h-3.5 text-red-500" />
                <span>Home</span>
              </Link>
              <Link
                href="/syllabus"
                className="px-3 py-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-900 transition"
              >
                Syllabus
              </Link>
              <Link
                href="/paper-pattern"
                className="px-3 py-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-900 transition flex items-center gap-1"
              >
                <FileText className="w-3.5 h-3.5 text-neutral-400" />
                <span>Model Papers</span>
              </Link>
              <Link
                href="/downloads"
                className="px-3 py-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-900 transition flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5 text-neutral-400" />
                <span>Downloads</span>
              </Link>
              <Link
                href="/gallery"
                className="px-3 py-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-900 transition"
              >
                Gallery
              </Link>
              <Link
                href="/about"
                className="px-3 py-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-900 transition"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="px-3 py-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-900 transition"
              >
                Contact
              </Link>
              <Link
                href="/results"
                className="px-3 py-1.5 rounded-lg text-amber-400 hover:text-amber-300 hover:bg-neutral-900 transition flex items-center gap-1"
              >
                <TrophyIcon className="w-3.5 h-3.5 text-amber-500" />
                <span>Results</span>
              </Link>
              <Link
                href="/student-login"
                className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-100 hover:text-white transition flex items-center gap-1.5 ml-1"
              >
                <Laptop className="w-3.5 h-3.5 text-red-500" />
                <span>Candidate Desk</span>
              </Link>
              <Link
                href="/register"
                className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition flex items-center gap-1 shadow-md shadow-red-600/30 ml-1"
              >
                <span>Register</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </nav>

            {/* MOBILE / TABLET ACTION BUTTONS */}
            <div className="flex items-center gap-2 xl:hidden">
              <Link
                href="/student-login"
                className="px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 text-neutral-200 text-xs font-bold rounded-lg"
              >
                Desk
              </Link>
              <Link
                href="/register"
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg shadow-sm"
              >
                Register
              </Link>
            </div>
          </div>

          {/* MOBILE / TABLET SCROLLABLE NAV STRIP */}
          <nav className="xl:hidden flex items-center gap-3 overflow-x-auto pt-2.5 mt-2 border-t border-neutral-900 text-xs font-bold text-neutral-300 whitespace-nowrap">
            <Link href="/" className="text-white hover:text-red-400">Home</Link>
            <Link href="/syllabus" className="hover:text-red-400">Syllabus</Link>
            <Link href="/paper-pattern" className="hover:text-red-400">Model Papers</Link>
            <Link href="/downloads" className="hover:text-red-400">Downloads</Link>
            <Link href="/gallery" className="hover:text-red-400">Gallery</Link>
            <Link href="/results" className="text-amber-400">Results</Link>
            <Link href="/about" className="hover:text-red-400">About</Link>
            <Link href="/contact" className="hover:text-red-400">Contact</Link>
          </nav>
        </header>

        {/* PAGE CONTENT */}
        <div className="flex-grow">{children}</div>

        {/* GLOBAL FOOTER ON ALL PAGES */}
        <footer className="border-t border-neutral-900 bg-neutral-950/90 pt-14 pb-10 text-neutral-400 text-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-10 border-b border-neutral-900 text-left">
              <div className="lg:col-span-2 space-y-4">
                <BrandLogo />
                <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
                  MINDMORY Central Secretariat administers certified nationwide academic competitions for registered schools and institutions across Pakistan.
                </p>
                <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                  <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span>Central Examination Directorate • Karachi, Sindh, Pakistan</span>
                </div>

                {/* SOCIAL MEDIA ICONS */}
                <div className="flex items-center gap-2.5 pt-1">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="MINDMORY Facebook"
                    className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-red-600 hover:bg-red-600 text-neutral-300 hover:text-white flex items-center justify-center transition"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="MINDMORY Instagram"
                    className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-red-600 hover:bg-red-600 text-neutral-300 hover:text-white flex items-center justify-center transition"
                  >
                    <svg
                      className="w-3.5 h-3.5 stroke-current"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>
                  <a
                    href="https://wa.me/923333400000"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="MINDMORY WhatsApp"
                    className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-red-600 hover:bg-red-600 text-neutral-300 hover:text-white flex items-center justify-center transition"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.5 0 .16 5.34.16 11.91c0 2.1.55 4.15 1.59 5.95L0 24l6.33-1.66a11.87 11.87 0 0 0 5.74 1.46h.01c6.57 0 11.91-5.34 11.91-11.91 0-3.18-1.24-6.17-3.47-8.41zM12.08 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.76.99 1-3.66-.24-.38a9.85 9.85 0 0 1-1.51-5.24c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.13 1.03 7 2.9a9.83 9.83 0 0 1 2.89 7c0 5.45-4.44 9.87-9.88 9.87zm5.43-7.41c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" />
                    </svg>
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="MINDMORY YouTube"
                    className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-red-600 hover:bg-red-600 text-neutral-300 hover:text-white flex items-center justify-center transition"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">Competitions</h4>
                <ul className="space-y-2 text-neutral-400">
                  <li><Link href="/" className="hover:text-red-400 transition">Home</Link></li>
                  <li><Link href="/paper-pattern" className="hover:text-red-400 transition">Model Papers (Grades 1-10)</Link></li>
                  <li><Link href="/downloads" className="hover:text-red-400 transition">Direct PDF Downloads</Link></li>
                  <li><Link href="/results" className="hover:text-red-400 transition">Results &amp; Marksheet</Link></li>
                  <li><Link href="/register" className="hover:text-red-400 transition">Institutional Enrollment</Link></li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">Disciplines</h4>
                <ul className="space-y-2 text-neutral-400">
                  <li><Link href="/paper-pattern" className="hover:text-neutral-200 transition">General Knowledge</Link></li>
                  <li><Link href="/syllabus" className="hover:text-neutral-200 transition">Art &amp; Creative Expression</Link></li>
                  <li><Link href="/syllabus" className="hover:text-neutral-200 transition">Grade-Wise Syllabus</Link></li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">Candidate Desk</h4>
                <ul className="space-y-2 text-neutral-400">
                  <li><Link href="/student-login" className="hover:text-red-400 transition flex items-center gap-1.5"><Laptop className="w-3.5 h-3.5 text-red-500" /><span>Candidate Portal</span></Link></li>
                  <li><Link href="/results" className="hover:text-red-400 transition">Roll No Gazette</Link></li>
                  <li><Link href="/register" className="hover:text-red-400 transition">Register School Candidates</Link></li>
                  <li><Link href="/contact" className="hover:text-red-400 transition">Secretariat Helpdesk</Link></li>
                </ul>
              </div>
            </div>

            {/* SHORT CLEAN COPYRIGHT WITH MINDMORY (NO SPACE, NO TYPO) */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
              <div>
                © 2026 <span className="font-bold text-white">MIND</span>
                <span className="font-bold text-red-500">MORY</span>. All rights reserved.
              </div>
              <div className="flex items-center gap-6">
                <Link href="/admin" className="text-neutral-600 hover:text-red-400 flex items-center gap-1 transition">
                  <Lock className="w-3 h-3" />
                  <span>Admin Login</span>
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
