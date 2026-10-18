// ─────────────────────────────────────────────────────────────
// All the words on your site live in this one file.
// Edit anything here, save, and the site updates.
// Text in [square brackets] is a placeholder to replace.
// ─────────────────────────────────────────────────────────────

export type Link = { label: string; href: string };

export type CaseStudy = {
  title: string;
  org: string;
  year: string;
  role: string;
  summary: string;
  did: string[];
  results: { value: string; label: string }[];
  link?: Link;
};

export type WritingSample = {
  title: string;
  outlet: string;
  year: string;
  kind: string;
  href: string;
};

export type Job = {
  role: string;
  org: string;
  start: string;
  end: string;
  summary: string;
};

export type Testimonial = { quote: string; name: string; title: string };

export const site = {
  name: "Aishat Muhammed",
  initials: "AM",
  role: "Content Marketer",
  location: "[City, Country]",
  // Shown above your name with a green "live" dot. Set to "" to hide it.
  status: "Open to new roles",
  // Optional headshot: put a square photo in /public (e.g. /me.jpg) and set it here.
  // While it's empty, your initials show in the circle instead.
  photo: "",
  email: "[you@example.com]",
  // Put your resume PDF in the /public folder with this exact name.
  resumeFile: "/resume.pdf",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/[your-handle]" },
    { label: "X", href: "https://x.com/[your-handle]" },
    { label: "Substack", href: "https://[your-handle].substack.com" },
  ] as Link[],

  // Used by Google and when your link is shared.
  seo: {
    title: "Aishat Muhammed, Content Marketer",
    description:
      "Aishat Muhammed writes content that turns audiences into customers. See selected work, writing samples and experience.",
  },

  hero: {
    // One phrase from your body text to highlight in the accent colour. Must match exactly, or leave "".
    emphasis: "",
    body: "[Two or three sentences about you: who you help, the kind of companies you've worked with, and what you care about. Keep it warm and specific.]",
  },

  // Short headline for each section, shown under its small label.
  headings: {
    work: "Programs and campaigns that moved the numbers.",
    writing: "Words that brought people in.",
    experience: "[X] years in content and community.",
    testimonials: "From people I've worked with.",
  },

  // Three short wins. They appear as numbered cards under your intro.
  highlights: [
    { channel: "community", text: "[Grew the member community from 400 to 12,000 in 18 months]" },
    { channel: "content", text: "[Took the newsletter from 2k to 25k subscribers with a 48% open rate]" },
    { channel: "events", text: "[Ran 40+ virtual and in-person events across 6 cities]" },
  ],

  work: [
    {
      title: "[Launching an ambassador program from scratch]",
      org: "[Company A]",
      year: "[2025]",
      role: "[Community Lead]",
      summary:
        "[One or two sentences on the situation: what the company needed and why it mattered.]",
      did: [
        "[Designed the program structure, perks and application flow]",
        "[Recruited and onboarded the first cohort of 30 ambassadors]",
        "[Built a monthly content kit ambassadors could share]",
      ],
      results: [
        { value: "[3.2×]", label: "[member referrals]" },
        { value: "[120]", label: "[ambassador-led events]" },
      ],
      link: { label: "Read the case study", href: "#" },
    },
    {
      title: "[Rebuilding the content engine around SEO]",
      org: "[Company B]",
      year: "[2023]",
      role: "[Content Marketing Manager]",
      summary:
        "[The blog was publishing often but not ranking. Explain the problem in plain terms.]",
      did: [
        "[Audited 200 posts and consolidated overlapping topics]",
        "[Set up an editorial calendar and brief template for freelancers]",
        "[Wrote the cornerstone guides myself]",
      ],
      results: [
        { value: "[+180%]", label: "[organic traffic in 9 months]" },
        { value: "[14]", label: "[first-page rankings]" },
      ],
    },
    {
      title: "[Turning a quiet Slack group into a daily habit]",
      org: "[Company C]",
      year: "[2022]",
      role: "[Community Manager]",
      summary:
        "[Members joined but rarely posted. What did you notice, and what did you change?]",
      did: [
        "[Introduced weekly rituals: wins threads, office hours, AMAs]",
        "[Recruited 12 volunteer moderators]",
      ],
      results: [
        { value: "[4×]", label: "[weekly active members]" },
        { value: "[62%]", label: "[of questions answered by peers]" },
      ],
    },
  ] as CaseStudy[],

  writing: [
    { title: "[How we doubled event attendance without a bigger budget]", outlet: "[Company blog]", year: "[2025]", kind: "Article", href: "#" },
    { title: "[The community manager's guide to onboarding]", outlet: "[Newsletter name]", year: "[2024]", kind: "Guide", href: "#" },
    { title: "[Why your community needs rituals, not more channels]", outlet: "[Publication]", year: "[2024]", kind: "Essay", href: "#" },
    { title: "[Launch email sequence for a product release]", outlet: "[Company A]", year: "[2023]", kind: "Email", href: "#" },
  ] as WritingSample[],

  experience: [
    { role: "[Community Lead]", org: "[Company A]", start: "[2024]", end: "Now", summary: "[One line on scope: team size, channels you owned, who you reported to.]" },
    { role: "[Content Marketing Manager]", org: "[Company B]", start: "[2022]", end: "[2024]", summary: "[One line on scope and your biggest responsibility.]" },
    { role: "[Community Manager]", org: "[Company C]", start: "[2020]", end: "[2022]", summary: "[One line on scope and your biggest responsibility.]" },
  ] as Job[],

  skills: [
    { group: "Content", items: ["Editorial strategy", "SEO writing", "Newsletters", "Social media", "Copy editing"] },
    { group: "Community", items: ["Programs & rituals", "Moderation", "Ambassador programs", "Events", "Member research"] },
    { group: "Tools", items: ["[Notion]", "[Discord]", "[Slack]", "[HubSpot]", "[Canva]", "[Google Analytics]"] },
  ],

  // Add real quotes from managers or clients. The section stays hidden while this is empty.
  testimonials: [] as Testimonial[],

  contact: {
    heading: "Let's build something people show up for.",
    body: "I'm looking for my next role in community or content. If you're building something people should gather around, I'd love to hear about it.",
  },
};

// Links in the top bar, in order. The id must match the section on the page.
export const nav = [
  { id: "work", label: "Work" },
  { id: "writing", label: "Writing" },
  { id: "experience", label: "Experience" },
  { id: "say-hello", label: "Contact" },
];
