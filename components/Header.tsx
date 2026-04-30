"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  Compass,
  Crown,
  Fan,
  Fish,
  Gauge,
  Menu,
  Mountain,
  Plane,
  PlaneLanding,
  PlaneTakeoff,
  Sailboat,
  Ship,
  Sun,
  Waves,
  Wind,
  Zap,
  type LucideIcon,
} from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SearchOverlay from "@/components/SearchOverlay";
import { whatsappLink, whatsappMessages } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type DeptItem = {
  label: string;
  href: string;
  description: string;
  icon: LucideIcon;
};
type DeptFeatured = {
  href: string;
  name: string;
  meta: string;
  rate: string;
  image: string;
};
type Department = {
  href: string;
  pathPrefix: string;
  label: string;
  eyebrow: string;
  tagline: string;
  items: DeptItem[];
  cta: string;
  featured: DeptFeatured;
};

const departments: Department[] = [
  {
    href: "/fleet",
    pathPrefix: "/fleet",
    label: "Fleet",
    eyebrow: "By Road",
    tagline: "85 vehicles · grouped by marque · sortable by price.",
    items: [
      { label: "Lamborghini", description: "V10 & V12 Italian icons", icon: Zap, href: "/fleet#brand-lamborghini" },
      { label: "Ferrari", description: "Maranello mid-engine", icon: Gauge, href: "/fleet#brand-ferrari" },
      { label: "McLaren", description: "Woking carbon-fiber", icon: Wind, href: "/fleet#brand-mclaren" },
      { label: "Rolls-Royce", description: "Goodwood luxury", icon: Crown, href: "/fleet#brand-rolls-royce" },
      { label: "Bentley", description: "Crewe-built grand tourers", icon: Crown, href: "/fleet#brand-bentley" },
      { label: "Mercedes-AMG", description: "Affalterbach performance", icon: Gauge, href: "/fleet#brand-mercedes-amg" },
      { label: "Maybach", description: "Chauffeur-grade", icon: Crown, href: "/fleet#brand-mercedes-maybach" },
      { label: "Porsche", description: "Stuttgart heritage", icon: Mountain, href: "/fleet#brand-porsche" },
      { label: "Bugatti", description: "Hypercar apex", icon: Zap, href: "/fleet#brand-bugatti" },
      { label: "Cadillac", description: "American luxury SUVs", icon: Briefcase, href: "/fleet#brand-cadillac" },
    ],
    cta: "View Full Fleet",
    featured: {
      href: "/fleet/ferrari-296-gtb",
      name: "Ferrari 296 GTB",
      meta: "Supercar · 2024 · Miami",
      rate: "From $2,495 / day",
      image:
        "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=1200&q=80",
    },
  },
  {
    href: "/yachts",
    pathPrefix: "/yachts",
    label: "Yachts",
    eyebrow: "By Sea",
    tagline: "Riva · Sunseeker · Princess · Pershing · Lagoon.",
    items: [
      { label: "Day Boats", description: "Under 50 ft · day on the bay", icon: Sun, href: "/yachts#tier-day" },
      { label: "50–69 ft", description: "Mid-size · most-booked tier", icon: Sailboat, href: "/yachts#tier-mid" },
      { label: "70–99 ft", description: "Large cruisers · full crew", icon: Ship, href: "/yachts#tier-large" },
      { label: "100–149 ft", description: "Mega-yachts · multi-deck", icon: Waves, href: "/yachts#tier-mega" },
      { label: "150 ft+", description: "Superyachts · charter-week", icon: Compass, href: "/yachts#tier-super" },
    ],
    cta: "View Full Marina",
    featured: {
      href: "/yachts/riva-aquariva-super-33",
      name: "Riva Aquariva Super",
      meta: "Day Boat · 33 ft · Miami Beach",
      rate: "From $4,500 / day",
      image:
        "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1200&q=80",
    },
  },
  {
    href: "/aviation",
    pathPrefix: "/aviation",
    label: "Aviation",
    eyebrow: "By Air",
    tagline: "Gulfstream · Bombardier · Cessna · Pilatus · Bell.",
    items: [
      { label: "Heavy Jets", description: "Transcontinental, 13–16 pax", icon: Plane, href: "/aviation#cat-heavy-jet" },
      { label: "Mid-Size Jets", description: "Cross-country, 8–9 pax", icon: PlaneTakeoff, href: "/aviation#cat-mid-jet" },
      { label: "Light Jets", description: "Regional, 5–8 pax", icon: PlaneLanding, href: "/aviation#cat-light-jet" },
    ],
    cta: "View Full Hangar",
    featured: {
      href: "/aviation/gulfstream-g450",
      name: "Gulfstream G450",
      meta: "Heavy Jet · 14 pax · KOPF",
      rate: "From $14,500 / hr",
      image:
        "https://images.unsplash.com/photo-1583416750470-965b2707b355?w=1200&q=80",
    },
  },
];

const flatLinks: { href: string; label: string }[] = [
  { href: "/concierge", label: "Concierge" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname() ?? "/";
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (prefix: string) =>
    prefix === "/"
      ? pathname === "/"
      : pathname === prefix || pathname.startsWith(prefix + "/");

  return (
    <header className="sticky top-0 z-40 border-b border-ink-700/60 bg-ink-950/85 backdrop-blur-md">
      <div className="mx-auto max-w-content px-6 lg:px-12">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="group flex flex-col leading-none shrink-0">
            <span className="font-mono text-[10px] uppercase tracking-widest2 text-bronze-300">
              {"— "}MMXXVI
            </span>
            <span className="font-display text-xl tracking-tightest text-bone group-hover:text-bronze-300 transition-colors duration-500 ease-luxury">
              Exotica <span className="italic">Voyage</span>
            </span>
          </Link>

          {/* Desktop NavigationMenu */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {departments.map((dept) => (
                <NavigationMenuItem key={dept.href}>
                  <NavigationMenuTrigger
                    data-active={isActive(dept.pathPrefix) ? "" : undefined}
                  >
                    {dept.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <DeptMegaMenu dept={dept} />
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}

              <span className="mx-2 h-4 w-px bg-ink-700" aria-hidden />

              {flatLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={link.href}
                      className={cn(
                        "inline-flex h-20 items-center px-3 xl:px-4 font-mono text-[11px] uppercase tracking-widest2 transition-colors duration-300 ease-luxury",
                        isActive(link.href)
                          ? "text-bronze-300"
                          : "text-bone/70 hover:text-bronze-300",
                      )}
                    >
                      {link.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop right cluster: search + WhatsApp */}
          <div className="hidden lg:flex shrink-0 items-center gap-2">
            <SearchOverlay />
            <Link
              href={whatsappLink(whatsappMessages.generic())}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-3 px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest2 border border-ink-700 text-bone hover:border-bronze-300 hover:text-bronze-300 transition-colors duration-300 ease-luxury"
            >
              WhatsApp
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>

          {/* Mobile right cluster: search */}
          <div className="lg:hidden flex items-center gap-2">
            <SearchOverlay />
          </div>

          {/* Mobile sheet trigger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="lg:hidden inline-flex items-center justify-center w-10 h-10 border border-ink-700 hover:border-bronze-300 hover:text-bronze-300 text-bone/80 transition-colors duration-300 ease-luxury"
              >
                <Menu className="h-4 w-4" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="p-0 flex flex-col">
              <MobileMenu pathname={pathname} onNavigate={() => setMobileOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

// ============================================================
// Desktop mega menu content
// ============================================================
function DeptMegaMenu({ dept }: { dept: Department }) {
  return (
    <div className="w-[560px]">
      <div className="p-5">
        <div className="flex items-baseline justify-between px-3 mb-3">
          <p className="font-mono text-[10px] uppercase tracking-widest2 text-bronze-300">
            {"— "}{dept.eyebrow}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest2 text-bone/40">
            {dept.items.length.toString().padStart(2, "0")} Classes
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-1">
          {dept.items.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <NavigationMenuLink asChild>
                  <Link
                    href={item.href}
                    className="flex items-start gap-3 p-3 hover:bg-ink-800/60 transition-colors duration-200 ease-luxury group/i border border-transparent hover:border-bronze-300/30"
                  >
                    <span className="shrink-0 inline-flex items-center justify-center w-9 h-9 border border-ink-700 bg-ink-950 text-bronze-300 group-hover/i:border-bronze-300 group-hover/i:bg-bronze-300/10 transition-colors duration-200">
                      <Icon className="w-4 h-4" strokeWidth={1.5} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[11px] uppercase tracking-widest2 text-bone group-hover/i:text-bronze-300 transition-colors whitespace-nowrap overflow-hidden text-ellipsis">
                        {item.label}
                      </p>
                      <p className="mt-1 text-[12px] leading-snug text-bone/50 group-hover/i:text-bone/75 transition-colors">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
            );
          })}
        </ul>

        {/* Bottom CTA */}
        <NavigationMenuLink asChild>
          <Link
            href={dept.href}
            className="mt-3 mx-3 flex items-center justify-between gap-4 border-t border-ink-700 pt-4 font-mono text-[11px] uppercase tracking-widest2 text-bronze-300 hover:text-bronze-200 transition-colors duration-200 ease-luxury whitespace-nowrap"
          >
            <span>{dept.cta}</span>
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </Link>
        </NavigationMenuLink>
      </div>
    </div>
  );
}

// ============================================================
// Mobile menu (sheet content)
// ============================================================
function MobileMenu({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <div className="flex flex-col h-full bg-ink-950">
      {/* Header strip */}
      <div className="border-b border-ink-700 px-6 py-5">
        <p className="font-mono text-[10px] uppercase tracking-widest2 text-bronze-300">
          {"— "}MMXXVI
        </p>
        <p className="mt-1 font-display text-xl tracking-tightest text-bone">
          Exotica <span className="italic">Voyage</span>
        </p>
      </div>

      {/* Content (scrollable) */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <Accordion type="single" collapsible className="w-full">
          {departments.map((dept) => (
            <AccordionItem key={dept.href} value={dept.href}>
              <AccordionTrigger>
                <div className="flex flex-col items-start text-left gap-1">
                  <span className="font-mono text-[10px] uppercase tracking-widest2 text-bronze-300 not-italic">
                    {"— "}{dept.eyebrow}
                  </span>
                  <span>{dept.label}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-1">
                <ul className="border-l border-ink-700 pl-4 space-y-1">
                  {dept.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onNavigate}
                        className="block py-2 font-mono text-[11px] uppercase tracking-widest2 text-bone/55 hover:text-bronze-300 transition-colors duration-200"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href={dept.href}
                      onClick={onNavigate}
                      className="block py-2 mt-2 font-mono text-[11px] uppercase tracking-widest2 text-bronze-300 hover:text-bronze-200 transition-colors duration-200"
                    >
                      {dept.cta} &rarr;
                    </Link>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-6 space-y-1">
          {flatLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className={cn(
                "block py-3 font-display text-2xl tracking-tightest border-b border-ink-700 hover:text-bronze-300 transition-colors duration-300",
                pathname === link.href ? "text-bronze-300" : "text-bone",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="border-t border-ink-700 bg-ink-900/40 p-6">
        <p className="font-mono text-[10px] uppercase tracking-widest2 text-bronze-300">
          {"— "}Concierge
        </p>
        <p className="mt-2 font-display text-2xl tracking-tightest text-bone">
          +1 (954) 770-2500
        </p>
        <p className="mt-1 text-[12px] text-bone/50 leading-relaxed">
          Daily 8 AM &ndash; 11 PM ET
        </p>
        <Link
          href={whatsappLink(whatsappMessages.generic())}
          target="_blank"
          rel="noopener"
          onClick={onNavigate}
          className="mt-5 w-full inline-flex items-center justify-center gap-3 px-6 py-4 font-mono text-[11px] uppercase tracking-widest2 bg-bronze-300 text-ink-950 hover:bg-bronze-200 transition-colors duration-300 ease-luxury"
        >
          Begin a Reservation
          <span aria-hidden>&rarr;</span>
        </Link>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          {["MIA", "FLL", "PBI"].map((code) => (
            <div
              key={code}
              className="border border-ink-700 py-2.5 font-mono text-[10px] uppercase tracking-widest2 text-bone/60"
            >
              {code}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
