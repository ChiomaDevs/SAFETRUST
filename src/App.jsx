import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Download, Mail, Phone, Menu, Target, Users2, BookOpen, Rocket, ShieldCheck, Waypoints, Workflow, Layers3, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import jamesImg  from '@/assets/team/james.jpeg';
import idrisImg  from '@/assets/team/idris.jpeg';
import austinImg from '@/assets/team/austin.jpeg';
import obinnaImg from '@/assets/team/obinna.jpeg';
import yusufImg  from '@/assets/team/yusuf.jpeg';
import landingHero from '@/assets/hero/landing.jpg';


// const asset = (rel) => new URL(rel, import.meta.env.BASE_URL).toString();
// ...existing code...
//const asset = (rel) => `/${rel.replace(/^\/+/, "")}`;
// ...existing code...

const asset = (rel) => {
  const base = import.meta.env.BASE_URL || "/";
  return `${base.replace(/\/$/, "")}/${String(rel).replace(/^\//, "")}`;
};

/**
 * Behavioral Training & Learning Solutions — Single-file React site
 * - Modern, responsive, mobile-first
 * - Sticky nav + smooth scrolling
 * - Clear sections: Home, About, Training Solutions, Course Details, Recommended, Methodology, Contact
 * - Hover team bios, accordion course details, horizontally scrollable recommendations
 * - TailwindCSS + shadcn/ui + lucide-react
 *
 * HOW TO USE
 * 1) Drop this file into a React/Vite project with Tailwind + shadcn/ui configured.
 * 2) Ensure shadcn components in imports exist; adjust aliases if needed.
 * 3) Replace placeholder images in the team section with your photos.
 * 4) Update the brochure href if you deploy the file elsewhere.
 */

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "solutions", label: "Training Solutions" },
  { id: "courses", label: "Course Details" },
  { id: "recommended", label: "Recommended" },
  { id: "methodology", label: "Methodology" },
  { id: "contact", label: "Contact" },
];

const BRAND = {
  name: "Safetrust Consulting",
  tagline: "Technology. Strategy. People.",
  colors: {
    primary: "#0F766E", // Teal — Strategy/Trust
    secondary: "#1D4ED8", // Indigo — Technology
    accent: "#F59E0B", // Amber — People/Energy
  },
};



const VISION = "To become the benchmark for unparalleled quality consulting solutions in our chosen industry.";
const MISSION = "Leveraging our expertise, technology and best practices to provide strategic solutions to our clients, facilitating business transformation and optimal returns to clients and stakeholders.";
const VALUES = ["Collaboration", "Integrity", "Continuous Improvement", "Client-Driven", "Adaptability"];

const TRAINING_OVERVIEW = {
  title: "Mastering Behavioral Skills for Personal Impact & Workplace Excellence",
  summary:
    "A high-impact behavioral training designed to reshape how employees engage at all levels. It emphasizes professional conduct, emotional intelligence, and self-leadership to build a positive personal brand and a values-driven culture.",
  audience: ["Junior", "Mid-level", "Senior"],
  outcomes: [
    "Embody personal branding and self-leadership in daily roles",
    "Build strong, trust-based working relationships",
    "Apply empathy to improve team interactions and reduce friction",
    "Navigate difficult conversations with constructive feedback",
    "Demonstrate professionalism and etiquette across communication, punctuality, dress, and conduct",
  ],
};

const MODULES = [
  {
    id: "personal-branding",
    title: "Personal Branding & Self-Leadership",
    icon: <Target className="w-5 h-5" />,
    synopsis:
      "Understand how presence, communication, and mindset shape reputation and influence at work.",
  },
  {
    id: "professionalism-etiquette",
    title: "Professionalism & Office Etiquette",
    icon: <ShieldCheck className="w-5 h-5" />,
    synopsis:
      "Reinforce workplace standards around communication, punctuality, dress code, boundaries, digital conduct, and collaboration.",
  },
  {
    id: "strong-relationships",
    title: "Developing Strong Working Relationships",
    icon: <Users2 className="w-5 h-5" />,
    synopsis:
      "Master interpersonal skills to build trust, respect, and mutual support across teams and departments.",
  },
  {
    id: "empathy",
    title: "Working with Empathy",
    icon: <HeartIcon />,
    synopsis:
      "Cultivate emotional intelligence and empathy to improve collaboration and create inclusive team dynamics.",
  },
  {
    id: "difficult-conversations",
    title: "Managing Difficult Conversations",
    icon: <Workflow className="w-5 h-5" />,
    synopsis:
      "Learn practical frameworks for approaching high-stakes or uncomfortable discussions with confidence and clarity.",
  },
  {
    id: "team-player",
    title: "Becoming a Team Player",
    icon: <Layers3 className="w-5 h-5" />,
    synopsis:
      "Explore the attitudes and behaviors that make individuals valued contributors to any team or project.",
  },
  {
    id: "resilience",
    title: "Resilience & Adaptability in the Workplace",
    icon: <Rocket className="w-5 h-5" />,
    synopsis:
      "Equip participants with techniques to manage stress, embrace change, and thrive in high-pressure environments.",
  },
];

const RECOMMENDED = [
  {
    title: "Personal Effectiveness & Productivity",
    objectives: ["Prioritization", "Focus systems", "Outcome-based execution"],
  },
  {
    title: "Unlocking Leadership Potential",
    objectives: ["Growth mindset", "Innovation", "Coaching for performance"],
  },
  {
    title: "Driving a Risk Management Culture",
    objectives: ["Risk awareness", "Controls & ownership", "Continuous monitoring"],
  },
  {
    title: "Leveraging Data for Strategic Decision Making",
    objectives: ["Data literacy", "Insight to action", "KPIs & dashboards"],
  },
  {
    title: "Cybersecurity Awareness & Best Practices",
    objectives: ["Threat hygiene", "Phishing defense", "Secure habits"],
  },
  {
    title: "Effective Communication & Collaboration",
    objectives: ["Clarity", "Active listening", "Stakeholder alignment"],
  },
  {
    title: "Working with Emotional Intelligence",
    objectives: ["Self-awareness", "Empathy", "Relationship management"],
  },
  {
    title: "Driving Sustainable Business Operations",
    objectives: ["ESG basics", "Resource efficiency", "Culture & accountability"],
  },
];

const METHODOLOGY = [
  {
    icon: <BookOpen className="w-5 h-5" />,
    title: "Blended Learning (Instructor-led)",
    points: [
      "Interactive, practice-based sessions",
      "Case studies, videos, discussions, and exercises",
      "Expert-led presentations with high engagement",
    ],
  },
  {
    icon: <Waypoints className="w-5 h-5" />,
    title: "Digital Learning (Online & Virtual)",
    points: ["Cost-effective", "Reliable", "Engaging content for ROI"],
  },
  {
    icon: <Workflow className="w-5 h-5" />,
    title: "Delivery Style & Feedback",
    points: [
      "Video-based and case-based learning",
      "Group practicals & role plays aligned to objectives",
      "Assessments with actionable feedback",
    ],
  },
];









const TEAM = [
  {
    name: "James Okarimia",
    title: "Governance, Risk & Financial Solutions (25+ yrs)",
    bio:
      "Ex-Citi Bank UK, ABN AMRO, Delta Lloyd, Fortis Bank; ex-KPMG NL, IBM GBS Benelux, Grant Thornton. MSc Financial Studies (Strathclyde). IIA (UK/USA), IMA (USA), GARP.",
    photo: jamesImg
  },
  {
    name: "Idris Oko-osi",
    title: "Head, Enterprise Risk Management, Africa Prudential",
    bio:
      "22+ yrs in banking & consulting. MBA (Leicester). ERMCP, Certified Basel II Professional. Member, CIBN ERM Community of Practice.",
    photo: idrisImg 
  },
  {
    name: "Austin Agwaraonye",
    title: "Leadership & Human Capital Consultant (22+ yrs)",
    bio:
      "Ex-Diamond Bank; facilitator for First Bank, Union Bank, NNPC, Total. CIPM (Nig.), Certified Management Trainer (CIBN).",
    photo: austinImg
  },
  {
    name: "Obinna Opara",
    title: "Organizational Development & Learning Design",
    bio:
      "14+ yrs across financial services, consulting, oil & gas, telecom. FMC, CMS (London Graduate School). MBA; B.Sc. Computer Science.",
    photo: obinnaImg
  },
  {
    name: "Ezekiel Yusuf",
    title: "Leadership, Management & Strategy Coach",
    bio:
      "13+ yrs consulting & training across sectors. Trained by Cambridge University. CIPM. BSc Accounting & Finance; Masters International HR (Rome).",
    photo: yusufImg
  },
];

function HeartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.417 3 13.229 3 10.5 3 8.015 4.99 6 7.5 6c1.357 0 2.637.56 3.545 1.464L12 8.414l.955-.95A4.96 4.96 0 0116.5 6C19.01 6 21 8.015 21 10.5c0 2.729-1.688 4.917-3.989 6.997a25.18 25.18 0 01-4.244 3.17 15.247 15.247 0 01-.383.218l-.022.012-.007.003a.75.75 0 01-.684 0z"/>
    </svg>
  );
}

const Section = ({ id, className = "", children }) => (
  <section id={id} className={`scroll-mt-24 ${className}`}>{children}</section>
);

const StickyNav = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl" style={{ background: `linear-gradient(135deg, ${BRAND.colors.secondary}, ${BRAND.colors.primary})` }} />
          <div className="leading-tight">
            <div className="font-semibold">{BRAND.name}</div>
            <div className="text-xs opacity-70">{BRAND.tagline}</div>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map(n => (
            <a key={n.id} href={`#${n.id}`} className="px-3 py-2 text-sm rounded-lg hover:bg-gray-100">
              {n.label}
            </a>
          ))}
          <a href="#contact"><Button size="sm">Get in Touch</Button></a>
        </nav>
        <Button variant="ghost" className="md:hidden" onClick={() => setOpen(v => !v)} aria-label="Toggle Menu">
          <Menu />
        </Button>
      </div>
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-2 grid">
            {NAV.map(n => (
              <a key={n.id} href={`#${n.id}`} className="py-2 text-sm" onClick={() => setOpen(false)}>
                {n.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Background image */}
      <img
        src={asset('hero/landing.jpg')}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        fetchpriority="high"
      />

      {/* Dark scrim + soft gradient for text contrast */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-28 md:py-44 text-white">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left: headline + actions */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
            >
              Transforming Performance with <span className="opacity-95">Behavioral Training</span>
            </motion.h1>

            <p className="mt-5 max-w-2xl text-base md:text-lg text-white/90">
              We partner with organizations to co-create practical learning experiences that deliver measurable
              outcomes and long-term cultural impact.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#courses" className="inline-block">
                <Button size="lg" className="shadow-lg shadow-black/20">
                  <ChevronRight className="mr-2 h-5 w-5" />
                  Explore Modules
                </Button>
              </a>

              <a
                href={asset('brochure/behavioral-training-brochure.pdf')}
                target="_blank"
                rel="noopener"
                download
                className="inline-block"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/10 backdrop-blur hover:bg-white/20 text-white border-white/40"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Course Brochure
                </Button>
              </a>
            </div>
          </div>

          {/* Right: strategic focus card (floats on image) */}
          <div className="md:justify-self-end">
            <Card className="rounded-2xl shadow-2xl bg-white/90 backdrop-blur border-white/60">
              <CardHeader>
                <CardTitle className="text-lg">Strategic Focus</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-3">
                <Pill label="Technology" />
                <Pill label="Strategy" />
                <Pill label="People" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

const Pill = ({ label }) => (
  <div className="rounded-xl px-3 py-2 text-sm font-medium border text-center">
    {label}
  </div>
);

const About = () => (
  <Section id="about" className="py-16">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-semibold">About Us</h2>
          <p className="mt-4 text-gray-600">
            We are a Management Consulting firm committed to transforming organizational performance through impact-driven content and exceptional delivery. Every engagement is customized to your context—with a long-term commitment to the growth and development of your people and your business.
          </p>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <Card>
              <CardHeader><CardTitle className="text-base">Vision</CardTitle></CardHeader>
              <CardContent><p className="text-gray-600">{VISION}</p></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-base">Mission</CardTitle></CardHeader>
              <CardContent><p className="text-gray-600">{MISSION}</p></CardContent>
            </Card>
          </div>
          <div className="mt-6">
            <h3 className="font-medium mb-2">Core Values</h3>
            <div className="flex flex-wrap gap-2">
              {VALUES.map(v => (
                <Badge key={v} variant="secondary">{v}</Badge>
              ))}
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Our Team</h3>
          <p className="mt-2 text-gray-600">Seasoned industry professionals and subject-matter experts.</p>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {TEAM.map((m) => (
              <motion.div key={m.name} whileHover={{ y: -4 }} className="rounded-2xl border overflow-hidden group bg-white">
                <div className="aspect-[4/3] bg-white overflow-hidden flex items-center justify-center"><img src={m.photo} alt={m.name}
                className="max-h-full max-w-full object-contain object-center transition"/>
                </div>

                <div className="p-4">
                  <div className="font-medium">{m.name}</div>
                  <div className="text-xs text-gray-500">{m.title}</div>
                  <Separator className="my-3"/>
                  <p className="text-sm text-gray-600 line-clamp-4 group-hover:line-clamp-none transition-all">{m.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </Section>
);

const Solutions = () => (
  <Section id="solutions" className="py-16 bg-gray-50">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold">Training Solutions</h2>
          <p className="mt-4 text-gray-600">{TRAINING_OVERVIEW.summary}</p>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {TRAINING_OVERVIEW.audience.map(a => (
              <Badge key={a}>{a}</Badge>
            ))}
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MODULES.map(mod => (
              <Card key={mod.id} className="hover:shadow-md transition">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {mod.icon}
                    <CardTitle className="text-base font-semibold">{mod.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{mod.synopsis}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div className="lg:sticky lg:top-24">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base">Expected Outcomes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                {TRAINING_OVERVIEW.outcomes.map((o, i) => <li key={i}>{o}</li>)}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </Section>
);

const CourseDetails = () => (
  <Section id="courses" className="py-16">
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold">Course Details</h2>
      <p className="mt-2 text-gray-600">Click to expand each module for a quick synopsis.</p>
      <Accordion type="single" collapsible className="mt-6">
        {MODULES.map((m, idx) => (
          <AccordionItem key={m.id} value={`item-${idx}`}>
            <AccordionTrigger className="text-left">{m.title}</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-gray-700">{m.synopsis}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </Section>
);

const Recommended = () => (
  <Section id="recommended" className="py-16 bg-gray-50">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Recommended Courses</h2>
        <div className="text-sm text-gray-500">Swipe or scroll</div>
      </div>
      <div className="mt-6 overflow-x-auto">
        <div className="flex gap-4 min-w-max pr-4">
          {RECOMMENDED.map((c) => (
            <Card key={c.title} className="w-80 shrink-0 hover:shadow-md transition">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2"><BookOpen className="w-4 h-4"/>{c.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                  {c.objectives.map((o) => (<li key={o}>{o}</li>))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </Section>
);

const Methodology = () => (
  <Section id="methodology" className="py-16">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold">Our Methodology</h2>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {METHODOLOGY.map((m) => (
          <Card key={m.title} className="hover:shadow-md transition">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">{m.icon}{m.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                {m.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </Section>
);

const Contact = () => {
  const CONTACTS = useMemo(() => ([
    { icon: <Mail className="w-4 h-4"/>, label: "info@safetrustconsulting.com", href: "mailto:info@safetrustconsulting.com" },
    { icon: <Mail className="w-4 h-4"/>, label: "mr.oparaobinna@gmail.com", href: "mailto:mr.oparaobinna@gmail.com" },
    { icon: <Phone className="w-4 h-4"/>, label: "+234 813 083 412" },
    { icon: <Phone className="w-4 h-4"/>, label: "+234 703 805 9794" },
  ]), []);

  function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Training Inquiry — ${fd.get("name")}`);
    const body = encodeURIComponent(
      `Name: ${fd.get("name")}\nEmail: ${fd.get("email")}\nPhone: ${fd.get("phone")}\n\nMessage:\n${fd.get("message")}`
    );
    window.location.href = `mailto:info@safetrustconsulting.com?subject=${subject}&body=${body}`;
  }

  return (
    <Section id="contact" className="py-16 bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-5 gap-8 items-start">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold">Contact Us</h2>
            <p className="mt-2 text-gray-600">We'd love to learn about your goals and design a solution tailored to your context.</p>
            <div className="mt-4 space-y-2">
              {CONTACTS.map((c, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  {c.icon}
                  {c.href ? <a href={c.href} className="hover:underline">{c.label}</a> : <span>{c.label}</span>}
                </div>
              ))}
            </div>
            <a href={asset('brochure/behavioral-training-brochure.pdf')}  target="_blank"   rel="noopener"  download
          className="inline-block mt-6"> <Button variant="outline"> <Download className="mr-2 h-4 w-4" /> Download Course Brochure
          </Button></a>
          </div>
          <div className="md:col-span-3">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-base">Send a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={onSubmit} className="grid gap-3">
                  <Input name="name" placeholder="Your name" required />
                  <Input name="email" type="email" placeholder="Your email" required />
                  <Input name="phone" placeholder="Phone (optional)" />
                  <Textarea name="message" placeholder="Tell us about your objectives…" required rows={6} />
                  <div className="flex justify-end">
                    <Button type="submit">Send</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default function BehavioralTrainingSite() {
  return (
    <div className="min-h-screen text-gray-900">
      <StickyNav />
      <main>
        <Section id="home">
          <Hero />
        </Section>
        <About />
        <Solutions />
        <CourseDetails />
        <Recommended />
        <Methodology />
        <Contact />
      </main>
      <footer className="mt-20 border-t">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 text-sm flex flex-col md:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</div>
          <div className="flex items-center gap-3 opacity-70">
            <span>Technology</span>
            <span>•</span>
            <span>Strategy</span>
            <span>•</span>
            <span>People</span>
          </div>
        </div>
      </footer>
      <style>{`
        html { scroll-behavior: smooth; }
        :root {
          --brand-primary: ${BRAND.colors.primary};
          --brand-secondary: ${BRAND.colors.secondary};
          --brand-accent: ${BRAND.colors.accent};
        }
        .brand-gradient { background: linear-gradient(135deg, var(--brand-secondary), var(--brand-primary)); }
        .accent { color: var(--brand-accent); }
      `}</style>
    </div>
  );
}
