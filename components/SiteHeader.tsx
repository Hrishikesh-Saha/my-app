"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Logo from "@/public/Logo.jpg";

const nav = [
  { href: "/", label: "হোম" },
  { href: "/tracker", label: "পিরিয়ড ট্র্যাকার" },
  { href: "/pregnancy", label: "গর্ভাবস্থা" },
  { href: "/health", label: "স্বাস্থ্য" },
  { href: "/advice", label: "AI পরামর্শ" },
  { href: "/booking", label: "অ্যাপয়েন্টমেন্ট" },
  { href: "/emergency", label: "নিরাপত্তা" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[rgba(255,248,244,0.9)] backdrop-blur">
      <div className="container-shell flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#471C26] overflow-hidden text-lg font-bold text-white">
            <Image src={Logo} alt="শক্তি" className="content-center" />
          </span>
          <span className="font-display text-2xl font-bold leading-none">শক্তি</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition hover:text-[var(--primary)] ${
                  active ? "font-semibold text-[var(--primary)]" : "text-[var(--muted)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/advice"
            style={{"color" : "white"}}
            className="focus-ring rounded-full bg-[var(--primary)] px-5 py-2 text-sm font-semibold shadow-sm transition hover:bg-[var(--primary-dark)]"
          >
            শুরু করুন
          </Link>
        </nav>

        <button
          className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] text-[var(--foreground)] lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="মেনু"
          type="button"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--border)] bg-[var(--background)] lg:hidden">
          <nav className="container-shell grid gap-1 py-3">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-md px-3 py-2 text-sm ${
                    active
                      ? "bg-[var(--primary-soft)] font-semibold text-[var(--primary)]"
                      : "text-[var(--muted)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-[var(--border)] bg-[#fff0e9]">
      <div className="container-shell py-10 text-center text-sm text-[var(--muted)]">
        <p className="font-display text-xl font-bold text-[var(--foreground)]">শক্তি</p>
        <p className="mt-2">নারীর স্বাস্থ্য, নারীর ভাষায়।</p>
        <p className="mt-4 text-xs">© 2026 Shakti. সমস্ত অধিকার সংরক্ষিত।</p>
      </div>
    </footer>
  );
}
