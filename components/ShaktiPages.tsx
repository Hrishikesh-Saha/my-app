"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  AlertCircle,
  Apple,
  Baby,
  Brain,
  Calendar,
  CalendarCheck,
  CheckCircle,
  Clock,
  Copy,
  Droplet,
  Dumbbell,
  Heart,
  Hospital,
  MapPin,
  MessageCircle,
  Moon,
  Navigation,
  Phone,
  Send,
  Shield,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type IconComponent = typeof Heart;

const primary = "var(--primary)";
const todayIso = "2026-06-07";

const featureCards: Array<{
  href: string;
  icon: IconComponent;
  title: string;
  text: string;
}> = [
  {
    href: "/tracker",
    icon: Calendar,
    title: "পিরিয়ড ট্র্যাকার",
    text: "নীরবতায় নয়, দৃঢ়তায় নারীর পরিচয়। আপনার মাসিক চক্রের প্রতিটি পর্যায়ে নির্ভরযোগ্য তথ্য ও সহায়তা।",
  },
  {
    href: "/pregnancy",
    icon: Baby,
    title: "গর্ভাবস্থা যাত্রা",
    text: "সপ্তাহভিত্তিক তথ্য, শিশুর আকার এবং প্রয়োজনীয় পরামর্শ।",
  },
  {
    href: "/advice",
    icon: MessageCircle,
    title: "AI স্বাস্থ্য পরামর্শ",
    text: "বাংলায় সাধারণ স্বাস্থ্য প্রশ্নের দ্রুত, সহায়ক উত্তর।",
  },
  {
    href: "/health",
    icon: Heart,
    title: "সম্পূর্ণ স্বাস্থ্যসেবা",
    text: "পুষ্টি, মানসিক স্বাস্থ্য, ঘুম, ফিটনেস ও প্রজনন স্বাস্থ্য।",
  },
  {
    href: "/booking",
    icon: CalendarCheck,
    title: "সহজ অ্যাপয়েন্টমেন্ট",
    text: "পরিবার নির্বাচন, তারিখ ও সময় বেছে বুকিং সম্পন্ন করুন।",
  },
  {
    href: "/emergency",
    icon: Shield,
    title: "নিরাপত্তা ও জরুরি",
    text: "হাসপাতাল, থানা, ফার্মেসি ও সহায়তা কেন্দ্রের তথ্য।",
  },
];

const healthCards = [
  {
    icon: Apple,
    title: "পুষ্টি ও খাদ্য",
    text: "চক্রের প্রতিটি পর্যায়ে সুষম খাবার এবং পুষ্টিগুণের তালিকা।",
  },
  {
    icon: Brain,
    title: "মানসিক স্বাস্থ্য",
    text: "চাপ, উদ্বেগ এবং মেজাজ পরিবর্তন সামলানোর সহজ উপায়।",
  },
  {
    icon: Dumbbell,
    title: "ফিটনেস ও যোগ",
    text: "ঘরে বসে করা যায় এমন ব্যায়াম, শ্বাসপ্রশ্বাস ও স্ট্রেচিং।",
  },
  {
    icon: Moon,
    title: "ঘুম ও বিশ্রাম",
    text: "ভালো ঘুমের অভ্যাস গড়ে তোলার ব্যবহারিক পরামর্শ।",
  },
  {
    icon: Heart,
    title: "প্রজনন স্বাস্থ্য",
    text: "গর্ভধারণ, গর্ভনিরোধ ও মাসিক সম্পর্কিত নির্দেশনা।",
  },
  {
    icon: Activity,
    title: "মেনোপজ",
    text: "জীবনের নতুন অধ্যায়ে লক্ষণ, প্রস্তুতি ও যত্নের নির্দেশিকা।",
  },
];

const serviceOptions = [
  "সাধারণ স্বাস্থ্য পরামর্শ",
  "মাসিক ও হরমোন কনসাল্ট",
  "PCOS / PCOD",
  "গর্ভাবস্থা ও প্রসব-পরবর্তী",
  "পুষ্টি ও খাদ্যাভ্যাস",
  "মানসিক স্বাস্থ্য",
];

const timeOptions = [
  "সকাল ৯:০০",
  "সকাল ৯:৩০",
  "সকাল ১০:০০",
  "সকাল ১০:৩০",
  "সকাল ১১:০০",
  "সকাল ১১:৩০",
  "দুপুর ২:০০",
  "দুপুর ২:৩০",
  "দুপুর ৩:০০",
  "দুপুর ৩:৩০",
  "দুপুর ৪:০০",
  "দুপুর ৪:৩০",
  "সন্ধ্যা ৬:০০",
  "সন্ধ্যা ৬:৩০",
  "সন্ধ্যা ৭:০০",
  "সন্ধ্যা ৭:৩০",
];

const emergencySections = [
  {
    title: "নিকটস্থ হাসপাতাল",
    icon: Hospital,
    items: [
      [
        "ঢাকা মেডিকেল কলেজ হাসপাতাল",
        "বকশীবাজার, ঢাকা",
        "০১৭২৬-০০০০০০",
        "২৪ ঘণ্টা",
      ],
      ["স্কয়ার হাসপাতাল", "১৮ পান্থপথ, ঢাকা", "০১৭৩০-০০০০০০", "২৪ ঘণ্টা"],
      [
        "স্যার সলিমুল্লাহ মেডিকেল কলেজ হাসপাতাল",
        "১০০ মিটফোর্ড, ঢাকা",
        "০১৭৩৫-০০০০০০",
        "২৪ ঘণ্টা",
      ],
    ],
  },
  {
    title: "নিকটস্থ থানা",
    icon: Shield,
    items: [
      [
        "ধানমন্ডি থানা",
        "ধানমন্ডি ৭, ঢাকা",
        "০১৭৫৫-০০০০০০",
        "নারী ও শিশু ডেস্ক আছে",
      ],
      ["রমনা থানা", "রমনা, ঢাকা", "০১৭৪৪-০০০০০০", "নারী ও শিশু ডেস্ক আছে"],
      [
        "মিরপুর মডেল থানা",
        "মিরপুর ১০, ঢাকা",
        "০১৭৬৬-০০০০০০",
        "নারী ও শিশু ডেস্ক আছে",
      ],
    ],
  },
  {
    title: "নিকটস্থ ফার্মেসি",
    icon: Stethoscope,
    items: [
      ["আশরাফ ফার্মেসি", "মগবাজার, ঢাকা", "০১৭১১-০০০০০০", "২৪ ঘণ্টা"],
      [
        "ল্যাবএইড ফার্মেসি",
        "ধানমন্ডি, ঢাকা",
        "০১৭১২-০০০০০০",
        "সকাল ৮টা - রাত ১০টা",
      ],
      ["সেবা ফার্মেসি", "গুলশান, ঢাকা", "০১৭১৩-০০০০০০", "২৪ ঘণ্টা"],
    ],
  },
  {
    title: "নারী সহায়তা কেন্দ্র",
    icon: Heart,
    items: [
      [
        "জাতীয় নারী নির্যাতন প্রতিরোধ সেবা",
        "ঢাকা",
        "১০৯",
        "কাউন্সেলিং ও আইনি সহায়তা",
      ],
      [
        "আইন ও সালিশ কেন্দ্র",
        "লালমাটিয়া, ঢাকা",
        "০১৭১৪-০০০০০০",
        "নারী অধিকার ও আইনি সহায়তা",
      ],
      [
        "বাংলাদেশ মহিলা পরিষদ",
        "সেগুনবাগিচা, ঢাকা",
        "০১৭১৫-০০০০০০",
        "জরুরি আশ্রয় ও পরামর্শ",
      ],
      ["কর্তব্য - জরুরি হেল্পলাইন", "টোলফ্রি", "১০৯", "জরুরি সেবা সহায়তা"],
    ],
  },
];

type LocationPoint = {
  lat: number;
  lng: number;
};

type NearbyFacility = {
  address: string;
  category: "hospital" | "police" | "pharmacy" | "help";
  categoryLabel: string;
  hours: string;
  icon: IconComponent;
  lat: number;
  lng: number;
  name: string;
  phone: string;
};

const defaultDhakaLocation: LocationPoint = {
  lat: 23.7465,
  lng: 90.376,
};

const nearbyFacilities: NearbyFacility[] = [
  {
    category: "hospital",
    categoryLabel: "হাসপাতাল",
    icon: Hospital,
    name: "ঢাকা মেডিকেল কলেজ হাসপাতাল",
    address: "বকশীবাজার, ঢাকা",
    phone: "০১৭২৬-০০০০০০",
    hours: "২৪ ঘণ্টা",
    lat: 23.7257,
    lng: 90.3976,
  },
  {
    category: "hospital",
    categoryLabel: "হাসপাতাল",
    icon: Hospital,
    name: "স্কয়ার হাসপাতাল",
    address: "১৮ পান্থপথ, ঢাকা",
    phone: "০১৭৩০-০০০০০০",
    hours: "২৪ ঘণ্টা",
    lat: 23.7527,
    lng: 90.3813,
  },
  {
    category: "police",
    categoryLabel: "থানা",
    icon: Shield,
    name: "ধানমন্ডি থানা",
    address: "ধানমন্ডি ৭, ঢাকা",
    phone: "০১৭৫৫-০০০০০০",
    hours: "নারী ও শিশু ডেস্ক আছে",
    lat: 23.7459,
    lng: 90.3741,
  },
  {
    category: "police",
    categoryLabel: "থানা",
    icon: Shield,
    name: "রমনা থানা",
    address: "রমনা, ঢাকা",
    phone: "০১৭৪৪-০০০০০০",
    hours: "নারী ও শিশু ডেস্ক আছে",
    lat: 23.7419,
    lng: 90.4073,
  },
  {
    category: "pharmacy",
    categoryLabel: "ফার্মেসি",
    icon: Stethoscope,
    name: "ল্যাবএইড ফার্মেসি",
    address: "ধানমন্ডি, ঢাকা",
    phone: "০১৭১২-০০০০০০",
    hours: "সকাল ৮টা - রাত ১০টা",
    lat: 23.7463,
    lng: 90.3755,
  },
  {
    category: "pharmacy",
    categoryLabel: "ফার্মেসি",
    icon: Stethoscope,
    name: "আশরাফ ফার্মেসি",
    address: "মগবাজার, ঢাকা",
    phone: "০১৭১১-০০০০০০",
    hours: "২৪ ঘণ্টা",
    lat: 23.7508,
    lng: 90.4094,
  },
  {
    category: "help",
    categoryLabel: "সহায়তা কেন্দ্র",
    icon: Heart,
    name: "জাতীয় নারী নির্যাতন প্রতিরোধ সেবা",
    address: "ঢাকা",
    phone: "১০৯",
    hours: "কাউন্সেলিং ও আইনি সহায়তা",
    lat: 23.7376,
    lng: 90.3947,
  },
  {
    category: "help",
    categoryLabel: "সহায়তা কেন্দ্র",
    icon: Heart,
    name: "আইন ও সালিশ কেন্দ্র",
    address: "লালমাটিয়া, ঢাকা",
    phone: "০১৭১৪-০০০০০০",
    hours: "নারী অধিকার ও আইনি সহায়তা",
    lat: 23.7524,
    lng: 90.3668,
  },
];

function distanceKm(from: LocationPoint, to: LocationPoint) {
  const radius = 6371;
  const dLat = ((to.lat - from.lat) * Math.PI) / 180;
  const dLng = ((to.lng - from.lng) * Math.PI) / 180;
  const lat1 = (from.lat * Math.PI) / 180;
  const lat2 = (to.lat * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return radius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function mapUrl(point: LocationPoint) {
  return `https://www.google.com/maps/search/?api=1&query=${point.lat},${point.lng}`;
}

function parseDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function isoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(date: Date, amount: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

function diffDays(start: Date, end: Date) {
  const ms =
    Date.UTC(end.getFullYear(), end.getMonth(), end.getDate()) -
    Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
  return Math.floor(ms / 86400000);
}

function bnNumber(value: number) {
  return new Intl.NumberFormat("bn-BD").format(value);
}

function bnDate(date: Date) {
  return new Intl.DateTimeFormat("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function SectionIntro({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      {eyebrow ? (
        <p className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-1 text-sm text-[var(--primary)]">
          <Sparkles size={15} />
          {eyebrow}
        </p>
      ) : null}
      <h1 className="font-display text-4xl font-bold leading-tight text-[var(--foreground)] md:text-6xl">
        {title}
      </h1>
      <p className="mt-4 text-base text-[var(--muted)] md:text-lg">
        {subtitle}
      </p>
    </div>
  );
}

function IconTile({
  icon: Icon,
  title,
  text,
}: {
  icon: IconComponent;
  title: string;
  text: string;
}) {
  return (
    <div className="soft-card rounded-lg p-7">
      <span className="mb-6 grid h-12 w-12 place-items-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary)]">
        <Icon size={22} />
      </span>
      <h3 className="font-display text-2xl font-bold">{title}</h3>
      <p className="mt-2 leading-7 text-[var(--muted)]">{text}</p>
    </div>
  );
}

export function HomePage() {
  return (
    <>
      <section className="container-shell grid min-h-[620px] items-center gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-[var(--border)] bg-white px-4 py-1 text-sm text-[var(--primary)]">
            ✦ নারীর স্বাস্থ্য, নারীর নিরাপত্তা, নারীর ভাষা
          </p>
          <h1 className="font-display max-w-2xl text-5xl font-bold leading-tight md:text-7xl">
            আপনার ভেতরের <span className="text-[var(--primary)]">শক্তি</span> কে
            জাগ্রত করুন
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            বাংলায় AI-চালিত স্বাস্থ্য পরামর্শ, পিরিয়ড ও গর্ভাবস্থা ট্র্যাকিং,
            ডাক্তারের অ্যাপয়েন্টমেন্ট এবং জরুরি সহায়তা।
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              style={{ "color": "white" }}
              className="focus-ring rounded-full bg-[var(--primary)] px-6 py-3 font-semibold shadow-sm transition hover:bg-[var(--primary-dark)]"
              href="/emergency"
            >
              সহায়তা চান
            </Link>
            <Link
              className="focus-ring rounded-full border border-[var(--border)] bg-white px-6 py-3 font-semibold text-[var(--foreground)] transition hover:border-[var(--primary)]"
              href="/tracker"
            >
              পিরিয়ড ট্র্যাক করুন
            </Link>
          </div>
          <div className="mt-7 flex flex-wrap gap-5 text-sm text-[var(--muted)]">
            <span>♡ ১০০% গোপনীয়</span>
            <span>⌘ AI চালিত</span>
            <span>বাংলায়</span>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[430px]">
          <Image
            src="/shakti-hero.jpg"
            alt="শক্তির ফুলেল নারীর স্বাস্থ্যচিত্র"
            width={520}
            height={520}
            priority
            className="aspect-square w-full rounded-2xl object-cover shadow-2xl shadow-rose-950/15"
          />
        </div>
      </section>

      <section className="container-shell py-12">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="font-display text-4xl font-bold">আপনার জন্য যা আছে</h2>
          <p className="mt-2 text-[var(--muted)]">
            প্রতিটি দিনের জন্য সহজ, নির্ভরযোগ্য বাংলা স্বাস্থ্য সহায়তা।
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featureCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group soft-card rounded-lg p-7 transition hover:-translate-y-1 hover:border-[var(--primary)]"
            >
              <span className="mb-6 grid h-12 w-12 place-items-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary)]">
                <card.icon size={21} />
              </span>
              <h3 className="font-display text-2xl font-bold">{card.title}</h3>
              <p className="mt-2 min-h-14 leading-7 text-[var(--muted)]">
                {card.text}
              </p>
              <span className="mt-5 inline-block text-sm font-semibold text-[var(--primary)]">
                আরও জানুন →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-shell py-12">
        <div className="mx-auto max-w-5xl rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[#cf6171] px-6 py-12 text-center text-white shadow-2xl shadow-rose-950/20">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            আজই শুরু হোক আপনার যাত্রা
          </h2>
          <p className="mt-3 text-white/90">
            আপনার প্রশ্ন, আপনার শরীর, আপনার সিদ্ধান্ত - সবকিছু বাংলায়।
          </p>
          <Link
            href="/advice"
            className="focus-ring mt-8 inline-flex rounded-full bg-white px-7 py-3 font-semibold "
          >
            <span className="text-[var(--muted)]">AI-এর সাথে কথা বলুন</span>
          </Link>
        </div>
      </section>
    </>
  );
}

export function TrackerPage() {
  const [lastPeriod, setLastPeriod] = useState(todayIso);
  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(6);

  const data = useMemo(() => {
    const start = parseDate(lastPeriod);
    const today = parseDate(todayIso);
    const dayInCycle =
      (((diffDays(start, today) % cycleLength) + cycleLength) % cycleLength) +
      1;
    const nextPeriod = addDays(start, cycleLength);
    const ovulation = addDays(start, cycleLength - 14);
    const fertileStart = addDays(ovulation, -5);
    const fertileEnd = addDays(ovulation, 1);
    const phase =
      dayInCycle <= periodLength
        ? "মাসিক পর্যায়"
        : dayInCycle >= cycleLength - 19 && dayInCycle <= cycleLength - 13
          ? "ফার্টাইল উইন্ডো"
          : dayInCycle > cycleLength - 13 && dayInCycle < cycleLength - 10
            ? "ওভুলেশন পর্যায়"
            : "লুটিয়াল পর্যায়";

    return {
      dayInCycle,
      nextPeriod,
      ovulation,
      fertileStart,
      fertileEnd,
      phase,
    };
  }, [cycleLength, lastPeriod, periodLength]);

  return (
    <section className="container-shell py-12">
      <SectionIntro
        title="পিরিয়ড ট্র্যাকার"
        subtitle="আপনার চক্র জানুন, আপনার শরীর বুঝুন।"
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="soft-card rounded-2xl p-8">
          <h2 className="font-display text-2xl font-bold">আপনার তথ্য দিন</h2>
          <label className="mt-7 block text-[var(--muted)]">
            শেষ মাসিকের প্রথম দিন
            <input
              className="focus-ring mt-2 w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[var(--foreground)]"
              type="date"
              value={lastPeriod}
              onChange={(event) => setLastPeriod(event.target.value)}
            />
          </label>

          <label className="mt-6 block text-[var(--muted)]">
            চক্রের দৈর্ঘ্য:{" "}
            <strong className="text-[var(--primary)]">
              {bnNumber(cycleLength)} দিন
            </strong>
            <input
              className="mt-3 w-full accent-[var(--primary)]"
              type="range"
              min="21"
              max="40"
              value={cycleLength}
              onChange={(event) => setCycleLength(Number(event.target.value))}
            />
          </label>

          <label className="mt-6 block text-[var(--muted)]">
            মাসিকের দৈর্ঘ্য:{" "}
            <strong className="text-[var(--primary)]">
              {bnNumber(periodLength)} দিন
            </strong>
            <input
              className="mt-3 w-full accent-[var(--primary)]"
              type="range"
              min="2"
              max="10"
              value={periodLength}
              onChange={(event) => setPeriodLength(Number(event.target.value))}
            />
          </label>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[#cf6171] p-8 text-white shadow-2xl shadow-rose-950/20">
          <p className="flex items-center gap-2 text-sm font-semibold text-white/90">
            <Sparkles size={18} /> বর্তমান অবস্থা
          </p>
          <h2 className="font-display mt-2 text-4xl font-bold">{data.phase}</h2>
          <p className="mt-1 text-white/85">
            চক্রের দিন {bnNumber(data.dayInCycle)}
          </p>
          <div className="mt-8 rounded-xl bg-white/18 p-6">
            <p className="text-white/85">পরবর্তী মাসিক</p>
            <p className="font-display mt-2 text-3xl font-bold">
              {bnDate(data.nextPeriod)}
            </p>
            <p className="mt-1 text-sm text-white/85">
              আরও{" "}
              {bnNumber(
                Math.max(diffDays(parseDate(todayIso), data.nextPeriod), 0),
              )}{" "}
              দিন বাকি
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <IconTile
          icon={Droplet}
          title="উর্বর সময়"
          text={`${bnDate(data.fertileStart)} – ${bnDate(data.fertileEnd)}`}
        />
        <IconTile icon={Heart} title="ওভুলেশন" text={bnDate(data.ovulation)} />
        <IconTile
          icon={Calendar}
          title="চক্র দৈর্ঘ্য"
          text={`${bnNumber(cycleLength)} দিন`}
        />
      </div>

      <p className="mt-8 rounded-2xl border border-[var(--border)] bg-[#fff0e9] p-5 leading-7 text-[var(--muted)]">
        <strong className="text-[var(--foreground)]">দ্রষ্টব্য:</strong> এই
        অনুমান সাধারণ গণনার উপর ভিত্তি করে। অনিয়মিত মাসিক, ব্যথা বা অতিরিক্ত
        রক্তপাত হলে চিকিৎসকের পরামর্শ নিন।
      </p>
    </section>
  );
}

export function PregnancyPage() {
  const [lmp, setLmp] = useState("2026-03-29");

  const pregnancy = useMemo(() => {
    const start = parseDate(lmp);
    const today = parseDate(todayIso);
    const days = Math.max(diffDays(start, today), 0);
    const week = Math.floor(days / 7);
    const day = days % 7;
    const edd = addDays(start, 280);
    const progress = Math.min((days / 280) * 100, 100);
    const size =
      week < 8
        ? "শিমের দানার সমান"
        : week < 12
          ? "বরই-এর সমান"
          : week < 20
            ? "আমের সমান"
            : week < 30
              ? "নারিকেলের সমান"
              : "তরমুজের সমান";
    const advice =
      week < 13
        ? "ফলিক অ্যাসিড, পানি ও বিশ্রামে মন দিন।"
        : week < 28
          ? "শিশুর নড়াচড়া, আয়রন ও ক্যালসিয়ামের দিকে খেয়াল রাখুন।"
          : "প্রসব পরিকল্পনা, হাসপাতাল ব্যাগ ও জরুরি যোগাযোগ প্রস্তুত রাখুন।";
    return { week, day, edd, progress, size, advice };
  }, [lmp]);

  return (
    <section className="container-shell py-12">
      <SectionIntro
        eyebrow="গর্ভাবস্থা ট্র্যাকার"
        title="আপনার গর্ভাবস্থার যাত্রা"
        subtitle="শেষ মাসিকের তারিখ দিন, প্রতি সপ্তাহের তথ্য জানুন।"
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="soft-card rounded-2xl p-8">
          <h2 className="font-display text-2xl font-bold">আপনার তথ্য</h2>
          <label className="mt-7 block text-[var(--muted)]">
            শেষ মাসিকের প্রথম দিন (LMP)
            <input
              className="focus-ring mt-2 w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[var(--foreground)]"
              type="date"
              value={lmp}
              onChange={(event) => setLmp(event.target.value)}
            />
          </label>
          <div className="mt-6 rounded-xl bg-[#fff0e9] p-5">
            <p className="text-[var(--muted)]">
              প্রত্যাশিত প্রসবের তারিখ (EDD)
            </p>
            <p className="font-display mt-2 text-3xl font-bold">
              {bnDate(pregnancy.edd)}
            </p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              আরও প্রায়{" "}
              {bnNumber(
                Math.max(diffDays(parseDate(todayIso), pregnancy.edd), 0),
              )}{" "}
              দিন বাকি
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[#cf6171] p-8 text-white shadow-2xl shadow-rose-950/20">
          <p className="flex items-center gap-2 text-sm font-semibold text-white/90">
            <Sparkles size={18} /> বর্তমান অবস্থা
          </p>
          <h2 className="font-display mt-2 text-4xl font-bold">
            সপ্তাহ {bnNumber(pregnancy.week)}
          </h2>
          <p className="mt-1 text-white/85">
            দিন {bnNumber(pregnancy.day)} · ট্রাইমেস্টার{" "}
            {bnNumber(pregnancy.week < 13 ? 1 : pregnancy.week < 28 ? 2 : 3)}
          </p>
          <div className="mt-7 h-2 overflow-hidden rounded-full bg-white/25">
            <span
              className="block h-full rounded-full bg-white"
              style={{ width: `${pregnancy.progress}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-white/85">
            {bnNumber(Math.round(pregnancy.progress))}% সম্পন্ন
          </p>
          <div className="mt-8 rounded-xl bg-white/18 p-5">
            <p className="flex items-center gap-2 text-white/85">
              <Baby size={18} /> শিশুর আকার
            </p>
            <p className="font-display mt-2 text-3xl font-bold">
              {pregnancy.size}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <IconTile icon={Baby} title="এই সপ্তাহে" text={pregnancy.size} />
        <IconTile icon={Heart} title="মায়ের জন্য" text={pregnancy.advice} />
        <IconTile
          icon={Calendar}
          title="পরামর্শ"
          text="নিয়মিত চেকআপ ও প্রয়োজনীয় টিকা নিয়ে চিকিৎসকের সাথে কথা বলুন।"
        />
      </div>

      <p className="mt-8 rounded-2xl border border-[var(--border)] bg-[#fff0e9] p-5 leading-7 text-[var(--muted)]">
        <strong className="text-[var(--foreground)]">দ্রষ্টব্য:</strong> এই পেজ
        LMP-এর উপর ভিত্তি করে আনুমানিক তথ্য দেয়। সঠিক তথ্যের জন্য চিকিৎসকের
        পরামর্শ নিন।
      </p>
    </section>
  );
}

export function HealthPage() {
  return (
    <section className="container-shell py-12">
      <SectionIntro
        title="সম্পূর্ণ স্বাস্থ্যসেবা"
        subtitle="শরীর ও মনের প্রতিটি দিকের জন্য বাংলায় তৈরি নির্দেশিকা।"
      />
      <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {healthCards.map((card) => (
          <IconTile
            key={card.title}
            icon={card.icon}
            title={card.title}
            text={card.text}
          />
        ))}
      </div>
    </section>
  );
}

function answerFor(question: string) {
  const q = question.toLowerCase();
  if (q.includes("pcos") || q.includes("pcod")) {
    return "PCOS/PCOD হলে অনিয়মিত মাসিক, ব্রণ, ওজন পরিবর্তন বা অতিরিক্ত লোম দেখা দিতে পারে। নিয়মিত খাবার, ঘুম, ব্যায়াম এবং গাইনি বিশেষজ্ঞের পরামর্শ খুব গুরুত্বপূর্ণ।";
  }
  if (q.includes("ব্যথা") || q.includes("cramp") || q.includes("মাসিক")) {
    return "মাসিকের ব্যথায় গরম সেঁক, পর্যাপ্ত পানি, হালকা স্ট্রেচিং এবং বিশ্রাম সাহায্য করতে পারে। ব্যথা খুব বেশি হলে, জ্বর থাকলে বা রক্তপাত অস্বাভাবিক হলে চিকিৎসকের সাথে কথা বলুন।";
  }
  if (q.includes("গর্ভ") || q.includes("preg")) {
    return "গর্ভাবস্থায় খাবারে আয়রন, ক্যালসিয়াম, প্রোটিন ও ফলিক অ্যাসিড রাখা ভালো। কাঁচা/অস্বাস্থ্যকর খাবার এড়িয়ে চলুন এবং নিয়মিত প্রসবপূর্ব চেকআপ করুন।";
  }
  if (q.includes("মন") || q.includes("stress") || q.includes("চাপ")) {
    return "চাপ কমাতে ধীরে শ্বাস নেওয়া, ঘুমের রুটিন, কাছের মানুষের সাথে কথা বলা এবং স্ক্রিন টাইম কমানো সাহায্য করতে পারে। দীর্ঘদিন মন খারাপ থাকলে কাউন্সেলর বা চিকিৎসকের সহায়তা নিন।";
  }
  return "আপনার প্রশ্নটি গুরুত্বপূর্ণ। সাধারণভাবে লক্ষণ, সময়কাল, ব্যথার মাত্রা এবং সাম্প্রতিক পরিবর্তন লিখে রাখুন। উপসর্গ তীব্র, দীর্ঘস্থায়ী বা অস্বাভাবিক হলে চিকিৎসকের পরামর্শ নিন।";
}

export function AdvicePage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "আদাব! আমি শক্তি - আপনার AI স্বাস্থ্য সঙ্গী। বাংলায় যেকোনো স্বাস্থ্য প্রশ্ন করুন, আমি সহায়তা করব।",
    },
  ]);
  const [question, setQuestion] = useState("");

  function submit(event?: FormEvent) {
    event?.preventDefault();
    const clean = question.trim();
    if (!clean) return;
    setMessages((items) => [
      ...items,
      { role: "user", text: clean },
      { role: "assistant", text: answerFor(clean) },
    ]);
    setQuestion("");
  }

  function askQuick(value: string) {
    setQuestion(value);
    setMessages((items) => [
      ...items,
      { role: "user", text: value },
      { role: "assistant", text: answerFor(value) },
    ]);
  }

  return (
    <section className="container-shell py-12">
      <SectionIntro
        eyebrow="AI চালিত · বাংলা"
        title="AI পরামর্শ"
        subtitle="আপনার প্রশ্ন গোপনীয়। নির্ভয়ে জিজ্ঞেস করুন।"
      />

      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
        <div className="max-h-[420px] space-y-4 overflow-y-auto p-5">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <p
                className={`max-w-[78%] rounded-2xl px-5 py-4 leading-7 ${message.role === "user" ? "bg-[var(--primary)] text-white" : "bg-[var(--primary-soft)] text-[var(--foreground)]"}`}
              >
                {message.text}
              </p>
            </div>
          ))}
        </div>
        <form
          onSubmit={submit}
          className="flex gap-3 border-t border-[var(--border)] p-4"
        >
          <input
            className="focus-ring min-w-0 flex-1 rounded-full border border-[var(--border)] bg-[var(--background)] px-5 py-3"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="আপনার প্রশ্ন লিখুন..."
          />
          <button
            className="focus-ring grid h-12 w-12 place-items-center rounded-full bg-[var(--primary)] text-white transition hover:bg-[var(--primary-dark)]"
            type="submit"
            aria-label="পাঠান"
          >
            <Send size={20} />
          </button>
        </form>
      </div>

      <div className="mx-auto mt-6 max-w-4xl">
        <p className="mb-3 text-sm text-[var(--muted)]">দ্রুত শুরু করুন:</p>
        <div className="flex flex-wrap gap-2">
          {[
            "মাসিকের সময় পেটে ব্যথা কমাবো কীভাবে?",
            "PCOS-এর লক্ষণ কী কী?",
            "গর্ভাবস্থায় কোন খাবার উপকারী?",
            "মানসিক চাপ কমানোর উপায়?",
          ].map((item) => (
            <button
              key={item}
              onClick={() => askQuick(item)}
              className="focus-ring rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm transition hover:border-[var(--primary)]"
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BookingPage() {
  const [service, setService] = useState(serviceOptions[0]);
  const [date, setDate] = useState(todayIso);
  const [time, setTime] = useState(timeOptions[0]);
  const [confirmed, setConfirmed] = useState("");

  const dateOptions = useMemo(
    () =>
      Array.from({ length: 10 }, (_, index) =>
        addDays(parseDate(todayIso), index),
      ),
    [],
  );

  function book(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "আপনি");
    setConfirmed(
      `${name}, আপনার ${service} বুকিং ${bnDate(parseDate(date))} ${time}-এ নিশ্চিত হয়েছে।`,
    );
  }

  return (
    <section className="container-shell py-12">
      <SectionIntro
        eyebrow="অনলাইন বুকিং"
        title="অ্যাপয়েন্টমেন্ট বুক করুন"
        subtitle="সময় বেছে দিন, বিশেষজ্ঞের পরামর্শ পান বাংলায়।"
      />

      <form
        onSubmit={book}
        className="soft-card mx-auto max-w-5xl rounded-2xl p-7 md:p-9"
      >
        <h2 className="mb-5 flex items-center gap-2 font-display text-2xl font-bold">
          <Stethoscope size={22} color={primary} /> পরিষেবা নির্বাচন করুন
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          {serviceOptions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setService(item)}
              className={`focus-ring rounded-xl border px-4 py-3 text-left transition ${
                service === item
                  ? "border-[var(--primary)] bg-white font-semibold text-[var(--primary)]"
                  : "border-[var(--border)] bg-[var(--background)]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <h2 className="mb-5 mt-9 flex items-center gap-2 font-display text-2xl font-bold">
          <Calendar size={22} color={primary} /> তারিখ বেছে নিন
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {dateOptions.map((item) => {
            const value = isoDate(item);
            return (
              <button
                key={value}
                type="button"
                onClick={() => setDate(value)}
                className={`focus-ring min-w-24 rounded-xl border px-4 py-3 text-center transition ${
                  date === value
                    ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                    : "border-[var(--border)] bg-[var(--background)]"
                }`}
              >
                <span className="block text-sm">
                  {new Intl.DateTimeFormat("bn-BD", {
                    weekday: "short",
                  }).format(item)}
                </span>
                <span className="block font-display text-2xl font-bold">
                  {bnNumber(item.getDate())}
                </span>
                <span className="block text-sm">
                  {new Intl.DateTimeFormat("bn-BD", { month: "short" }).format(
                    item,
                  )}
                </span>
              </button>
            );
          })}
        </div>

        <h2 className="mb-5 mt-9 flex items-center gap-2 font-display text-2xl font-bold">
          <Clock size={22} color={primary} /> সময় বেছে নিন
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {timeOptions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTime(item)}
              className={`focus-ring rounded-lg border px-4 py-3 transition ${
                time === item
                  ? "border-[var(--primary)] bg-[var(--primary-soft)] font-semibold text-[var(--primary)]"
                  : "border-[var(--border)] bg-[var(--background)]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-2">
          <label className="block text-sm text-[var(--muted)]">
            পূর্ণ নাম
            <input
              name="name"
              required
              className="focus-ring mt-2 w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[var(--foreground)]"
              placeholder="আপনার নাম"
            />
          </label>
          <label className="block text-sm text-[var(--muted)]">
            ফোন নম্বর
            <input
              name="phone"
              required
              className="focus-ring mt-2 w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[var(--foreground)]"
              placeholder="+৮৮০ ১XXX XXXXXX"
            />
          </label>
          <label className="block text-sm text-[var(--muted)] md:col-span-2">
            ইমেইল (ঐচ্ছিক)
            <input
              name="email"
              type="email"
              className="focus-ring mt-2 w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[var(--foreground)]"
              placeholder="you@example.com"
            />
          </label>
          <label className="block text-sm text-[var(--muted)] md:col-span-2">
            অতিরিক্ত তথ্য (ঐচ্ছিক)
            <textarea
              name="notes"
              className="focus-ring mt-2 min-h-28 w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[var(--foreground)]"
              placeholder="আপনার সমস্যা বা প্রশ্ন সংক্ষেপে লিখুন..."
            />
          </label>
        </div>

        <button
          className="focus-ring mt-8 w-full rounded-full bg-[var(--primary)] px-6 py-4 font-semibold text-white transition hover:bg-[var(--primary-dark)]"
          type="submit"
        >
          বুকিং নিশ্চিত করুন
        </button>
        {confirmed ? (
          <p className="mt-5 flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 p-4 leading-7 text-green-800">
            <CheckCircle className="mt-1 shrink-0" size={19} />
            {confirmed}
          </p>
        ) : null}
      </form>
    </section>
  );
}

export function EmergencyPage() {
  const [copied, setCopied] = useState("");
  const [sosOpen, setSosOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<LocationPoint | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [locationStatus, setLocationStatus] = useState(
    "আপনার বর্তমান অবস্থান অনুযায়ী নিকটস্থ থানা, হাসপাতাল ও ফার্মেসি খুঁজুন।",
  );
  const watchIdRef = useRef<number | null>(null);
  const sosPanelRef = useRef<HTMLDivElement | null>(null);

  const nearestFacilities = useMemo(() => {
    const origin = userLocation ?? defaultDhakaLocation;
    const categories: NearbyFacility["category"][] = [
      "hospital",
      "police",
      "help",
      "pharmacy",
    ];

    return categories
      .map(
        (category) =>
          nearbyFacilities
            .filter((facility) => facility.category === category)
            .map((facility) => ({
              ...facility,
              distance: distanceKm(origin, {
                lat: facility.lat,
                lng: facility.lng,
              }),
            }))
            .sort((a, b) => a.distance - b.distance)[0],
      )
      .filter(Boolean);
  }, [userLocation]);

  const mapPoints = useMemo(() => {
    const origin = userLocation ?? defaultDhakaLocation;
    const points = [
      ...nearestFacilities.map((facility) => ({
        ...facility,
        pointType: "facility" as const,
      })),
      {
        ...origin,
        category: "user" as const,
        categoryLabel: "আপনি",
        distance: 0,
        icon: Navigation,
        name: userLocation ? "আপনার লাইভ লোকেশন" : "আনুমানিক কেন্দ্র",
        pointType: "user" as const,
      },
    ];
    const lats = points.map((point) => point.lat);
    const lngs = points.map((point) => point.lng);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    const latSpan = Math.max(maxLat - minLat, 0.01);
    const lngSpan = Math.max(maxLng - minLng, 0.01);

    return points.map((point) => ({
      ...point,
      x: 10 + ((point.lng - minLng) / lngSpan) * 80,
      y: 90 - ((point.lat - minLat) / latSpan) * 80,
    }));
  }, [nearestFacilities, userLocation]);

  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null && "geolocation" in navigator) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  async function copyNumber(number: string) {
    try {
      await navigator.clipboard.writeText(number);
      setCopied(number);
      window.setTimeout(() => setCopied(""), 1600);
    } catch {
      setCopied("");
    }
  }

  function openSosPanel() {
    setSosOpen(true);
    window.setTimeout(
      () =>
        sosPanelRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        }),
      80,
    );
  }

  function startLocationTracking() {
    if (!("geolocation" in navigator)) {
      setLocationStatus("এই ব্রাউজারে লোকেশন সেবা পাওয়া যাচ্ছে না।");
      return;
    }

    setLocationStatus("লোকেশন নেওয়া হচ্ছে...");

    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setAccuracy(position.coords.accuracy);
        setLocationStatus(
          "লাইভ লোকেশন চালু আছে। কাছের সেবাগুলো আপনার অবস্থান অনুযায়ী সাজানো হয়েছে।",
        );
      },
      () => {
        setLocationStatus(
          "লোকেশন চালু করা যায়নি। ব্রাউজার থেকে লোকেশন অনুমতি দিন অথবা নিচের জরুরি নম্বরে কল করুন।",
        );
      },
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 15000,
      },
    );
  }

  function stopLocationTracking() {
    if (watchIdRef.current !== null && "geolocation" in navigator) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setLocationStatus(
      "লাইভ লোকেশন বন্ধ আছে। আবার চালু করলে কাছের সেবা আপডেট হবে।",
    );
  }

  return (
    <section className="container-shell py-12">
      <SectionIntro
        title="নিরাপত্তা ও জরুরি সেবা"
        subtitle="আপনার এলাকার হাসপাতাল, থানা, ফার্মেসি ও সহায়তা কেন্দ্রের তথ্য।"
      />

      <div className="relative mb-10 text-center">
        <div className="mb-4 flex flex-wrap justify-center gap-3 text-sm text-[var(--primary)]">
          <span className="rounded-full bg-[var(--primary-soft)] px-4 py-2">
            জাতীয় জরুরি সেবা: ৯৯৯
          </span>
          <span className="rounded-full bg-[var(--primary-soft)] px-4 py-2">
            নারী সহায়তা হটলাইন: ১০৯
          </span>
        </div>
        <button
          className="focus-ring mx-auto grid h-36 w-36 place-items-center rounded-full border-4 border-white bg-red-600 text-center font-bold text-white shadow-xl shadow-red-900/20 transition-colors hover:bg-red-700"
          type="button"
          onClick={openSosPanel}
          aria-expanded={sosOpen}
        >
          <span>
            <Phone className="mx-auto mb-1" size={26} />
            SOS
            <span className="block text-xs font-medium">জরুরি কল করুন</span>
          </span>
        </button>
      </div>

      {sosOpen ? (
        <div
          ref={sosPanelRef}
          className="mx-auto mb-10 max-w-3xl rounded-2xl border border-red-200 bg-red-50/70 p-5 shadow-xl shadow-red-950/10 sm:p-8"
        >
          <h2 className="text-center font-display text-3xl font-bold text-red-600">
            জরুরি নম্বর
          </h2>
          <div className="mt-6 grid gap-4">
            {[
              ["৯৯৯", "জাতীয় জরুরি সেবা"],
              ["১০৯", "কর্তব্য হেল্পলাইন"],
              ["১০৯২১", "নারী সহায়তা হটলাইন"],
              ["০১৭৫৫-০০০০০০", "নিকটস্থ থানা"],
            ].map(([number, label]) => (
              <a
                key={`${number}-${label}`}
                href={`tel:${number}`}
                className="red-action-link focus-ring flex min-h-14 items-center justify-center gap-3 rounded-xl bg-red-600 px-4 py-3 text-center text-lg font-bold shadow-lg shadow-red-900/15 transition hover:bg-red-700 sm:text-2xl"
                style={{ color: "#ffffff" }}
              >
                <Phone size={22} />
                <span>
                  {number} — {label}
                </span>
              </a>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-red-100 bg-white p-5">
            <h3 className="flex items-center gap-2 font-display text-2xl font-bold">
              <Navigation size={22} className="text-red-600" />
              আমার লোকেশন ব্যবহার করুন
            </h3>
            <p className="mt-2 leading-7 text-[var(--muted)]">
              {locationStatus}
            </p>
            {userLocation ? (
              <div className="mt-4 grid gap-2 rounded-xl bg-[#fff0e9] p-4 text-sm text-[var(--muted)] sm:grid-cols-2">
                <span>অক্ষাংশ: {userLocation.lat.toFixed(5)}</span>
                <span>দ্রাঘিমাংশ: {userLocation.lng.toFixed(5)}</span>
                <span className="sm:col-span-2">
                  নির্ভুলতা: প্রায় {bnNumber(Math.round(accuracy ?? 0))} মিটার
                </span>
              </div>
            ) : null}
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button
                className="focus-ring rounded-xl bg-[var(--primary)] px-5 py-3 font-semibold text-white transition hover:bg-[var(--primary-dark)]"
                type="button"
                onClick={startLocationTracking}
              >
                <Navigation className="mr-2 inline" size={18} />
                আমার লোকেশন ব্যবহার করুন
              </button>
              <button
                className="focus-ring rounded-xl border border-[var(--border)] bg-white px-5 py-3 font-semibold text-[var(--foreground)] transition hover:border-[var(--primary)]"
                type="button"
                onClick={stopLocationTracking}
              >
                লোকেশন বন্ধ করুন
              </button>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-red-100 bg-white">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-red-100 px-5 py-4">
              <div>
                <h3 className="font-display text-2xl font-bold">
                  লাইভ জরুরি ম্যাপ
                </h3>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {userLocation
                    ? "আপনার অবস্থান এবং কাছের সেবাগুলো দেখানো হচ্ছে।"
                    : "লোকেশন চালু না থাকলে আনুমানিক ঢাকা কেন্দ্র ধরে ম্যাপ দেখানো হচ্ছে।"}
                </p>
              </div>
              <a
                className="focus-ring rounded-full border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-sm font-semibold text-[var(--primary)]"
                href={mapUrl(userLocation ?? defaultDhakaLocation)}
                target="_blank"
                rel="noreferrer"
              >
                বড় ম্যাপে খুলুন
              </a>
            </div>
            <div className="relative min-h-[320px] overflow-hidden bg-[#f7dcd2]">
              <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(90deg,rgba(184,52,73,.16)_1px,transparent_1px),linear-gradient(rgba(184,52,73,.16)_1px,transparent_1px)] [background-size:42px_42px]" />
              <div className="absolute left-[8%] top-[24%] h-24 w-[78%] -rotate-6 rounded-full border-8 border-white/75" />
              <div className="absolute left-[22%] top-[55%] h-20 w-[62%] rotate-12 rounded-full border-8 border-white/75" />
              {mapPoints.map((point) => {
                const Icon = point.icon;
                const isUser = point.pointType === "user";

                return (
                  <a
                    key={`${point.pointType}-${point.category}-${point.name}`}
                    href={mapUrl({ lat: point.lat, lng: point.lng })}
                    target="_blank"
                    rel="noreferrer"
                    className={`focus-ring absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full px-3 py-2 text-xs font-bold shadow-lg ${
                      isUser
                        ? "red-action-link bg-red-600"
                        : "bg-white text-[var(--foreground)]"
                    }`}
                    style={{
                      color: isUser ? "#ffffff" : undefined,
                      left: `${point.x}%`,
                      top: `${point.y}%`,
                    }}
                    title={point.name}
                  >
                    <Icon size={15} />
                    <span className="max-w-28 truncate">
                      {isUser ? "আপনি" : point.categoryLabel}
                    </span>
                  </a>
                );
              })}
            </div>
            <div className="grid gap-3 border-t border-red-100 p-4 sm:grid-cols-2">
              {nearestFacilities.map((facility) => (
                <a
                  key={`map-link-${facility.category}-${facility.name}`}
                  className="focus-ring rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 text-sm transition hover:border-[var(--primary)]"
                  href={mapUrl({ lat: facility.lat, lng: facility.lng })}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="font-semibold text-[var(--primary)]">
                    {facility.categoryLabel}
                  </span>
                  <span className="mt-1 block font-semibold">
                    {facility.name}
                  </span>
                  <span className="mt-1 block text-[var(--muted)]">
                    ম্যাপে দেখুন · প্রায়{" "}
                    {bnNumber(Number(facility.distance.toFixed(1)))} কিমি
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-display text-2xl font-bold">
              নিকটস্থ জরুরি সেবা
            </h3>
            <p className="mt-1 text-sm text-[var(--muted)]">
              {userLocation
                ? "আপনার লাইভ লোকেশন অনুযায়ী সাজানো।"
                : "লোকেশন চালু না থাকলে ঢাকা কেন্দ্র ধরে আনুমানিক তালিকা দেখানো হচ্ছে।"}
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {nearestFacilities.map((facility) => (
                <div
                  key={`${facility.category}-${facility.name}`}
                  className="rounded-xl border border-[var(--border)] bg-white p-5"
                >
                  <div className="flex items-start gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary)]">
                      <facility.icon size={20} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[var(--primary)]">
                        {facility.categoryLabel}
                      </p>
                      <h4 className="font-semibold">{facility.name}</h4>
                    </div>
                  </div>
                  <p className="mt-3 flex items-center gap-2 text-sm text-[var(--muted)]">
                    <MapPin size={15} /> {facility.address}
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-[var(--muted)]">
                    <Clock size={15} /> {facility.hours}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[var(--primary)]">
                    দূরত্ব প্রায়{" "}
                    {bnNumber(Number(facility.distance.toFixed(1)))} কিমি
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a
                      className="red-action-link focus-ring rounded-full bg-red-600 px-4 py-2 text-sm font-semibold"
                      href={`tel:${facility.phone}`}
                      style={{ color: "#ffffff" }}
                    >
                      কল করুন
                    </a>
                    <a
                      className="focus-ring rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--primary)]"
                      href={mapUrl({ lat: facility.lat, lng: facility.lng })}
                      target="_blank"
                      rel="noreferrer"
                    >
                      ম্যাপে দেখুন
                    </a>
                    <button
                      className="focus-ring rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--primary)]"
                      type="button"
                      onClick={() => copyNumber(facility.phone)}
                    >
                      {copied === facility.phone ? "কপি হয়েছে" : "নম্বর কপি"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="focus-ring mx-auto mt-7 block rounded-full px-5 py-2 text-sm font-semibold text-[var(--muted)] underline-offset-4 hover:underline"
            type="button"
            onClick={() => setSosOpen(false)}
          >
            বন্ধ করুন
          </button>
        </div>
      ) : null}

      <div className="grid gap-7 lg:grid-cols-2">
        {emergencySections.map((section) => (
          <div key={section.title} className="soft-card rounded-lg p-7">
            <h2 className="mb-5 flex items-center gap-3 font-display text-2xl font-bold">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary)]">
                <section.icon size={20} />
              </span>
              {section.title}
            </h2>
            <div className="space-y-4">
              {section.items.map(([name, address, phone, hours]) => (
                <div
                  key={`${section.title}-${name}`}
                  className="rounded-lg border border-[var(--border)] bg-[#fff0e9] p-5"
                >
                  <h3 className="font-semibold">{name}</h3>
                  <p className="mt-2 flex items-center gap-2 text-sm text-[var(--muted)]">
                    <MapPin size={15} /> {address}
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-[var(--muted)]">
                    <Phone size={15} />{" "}
                    <a
                      className="underline-offset-4 hover:underline"
                      href={`tel:${phone}`}
                    >
                      {phone}
                    </a>
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-[var(--muted)]">
                    <Clock size={15} /> {hours}
                  </p>
                  <button
                    className="focus-ring mt-3 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--primary)]"
                    type="button"
                    onClick={() => copyNumber(phone)}
                  >
                    <Copy size={13} />{" "}
                    {copied === phone ? "কপি হয়েছে" : "নম্বর কপি"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-[#fff0e9] p-5 leading-7 text-[var(--muted)]">
        <AlertCircle
          className="mt-1 shrink-0 text-[var(--primary)]"
          size={20}
        />
        জীবনঝুঁকি, সহিংসতা বা গুরুতর অসুস্থতার ক্ষেত্রে অপেক্ষা না করে ৯৯৯-এ কল
        করুন।
      </p>
    </section>
  );
}
