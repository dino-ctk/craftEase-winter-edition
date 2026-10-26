import { Link, useNavigate } from "@tanstack/react-router";
import { useState, useSyncExternalStore, type ReactNode } from "react";
import { Bookmark, Check, ChevronDown, Clock, ExternalLink, ImagePlus, Menu, Moon, Play, Plus, Search, Sun, ThumbsDown, ThumbsUp, Trash2, Upload, UserRound, Video, X } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import logo from "../../../images/logo.png";
import imgShelf from "@/assets/p-shelf.jpg";
import imgPaint from "@/assets/p-paint.jpg";
import imgFloating from "@/assets/p-floating.jpg";
import imgPlanter from "@/assets/p-planter.jpg";
import imgRepair from "@/assets/p-repair.jpg";
import imgDrill from "@/assets/p-drill.jpg";
import imgC1 from "@/assets/c-1.jpg";
import imgC2 from "@/assets/c-2.jpg";

export type Role = "user" | "employee" | "admin";
export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
export const difficulties: Difficulty[] = ["Beginner", "Intermediate", "Advanced"];

const nav: Record<Role, { label: string; screen: string }[]> = {
  user: [
    { label: "Discover / Home", screen: "discover" }, { label: "My dashboard", screen: "dashboard" },
    { label: "Saved / My projects", screen: "saved" }, { label: "My submissions", screen: "submissions" },
    { label: "Profile", screen: "profile" },
  ],
  employee: [
    { label: "Dashboard", screen: "dashboard" }, { label: "Project management", screen: "projects" },
  ],
  admin: [
    { label: "Dashboard", screen: "dashboard" }, { label: "Users", screen: "users" },
    { label: "Content management", screen: "content" }, { label: "Moderation", screen: "moderation" },
  ],
};

const roleNames: Record<Role, string> = { user: "User", employee: "Employer", admin: "Admin" };

export function Meta(title: string, description: string) {
  return { meta: [
    { title: `${title} — CraftEase` }, { name: "description", content: description },
    { property: "og:title", content: `${title} — CraftEase` },
    { property: "og:description", content: description }, { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] };
}

/* ---------- Data ---------- */

type Project = { title: string; slug: string; category: string; description: string; level: Difficulty; time: string; likes: number; author: string; status: string; image: string; steps: { title: string; text: string; image: string }[]; products: { name: string; url: string; price: string }[] };

const store = "https://www.craftease-store.example";
export const projects: Project[] = [
  { title: "Build a wooden shelf", slug: "build-a-wooden-shelf", category: "Woodworking", description: "Build and mount a simple pine shelf for books or small objects.", level: "Beginner", time: "2 hours", likes: 248, author: "CraftEase Store Team", status: "Published", image: imgShelf,
    steps: [
      { title: "Measure and mark the wall", text: "Pick the height, then use a spirit level to draw a straight pencil line. Mark the bracket positions 15 cm from each end.", image: imgFloating },
      { title: "Prepare the wooden board", text: "Sand all edges with 120 grit, then 180 grit, until smooth. Wipe off the dust with a damp cloth.", image: imgShelf },
      { title: "Drill and fix the brackets", text: "Drill 6 mm holes on your marks, insert wall plugs and screw the brackets on firmly.", image: imgDrill },
      { title: "Mount and check the shelf", text: "Place the board, screw it to the brackets from below and check that it is level.", image: imgC1 },
    ],
    products: [
      { name: "Pine board 80 × 20 cm", url: `${store}/pine-board`, price: "€9.90" },
      { name: "Steel shelf brackets (2 pcs)", url: `${store}/shelf-brackets`, price: "€6.50" },
      { name: "Wall plugs & screws set", url: `${store}/wall-plugs`, price: "€3.20" },
      { name: "Cordless drill 18V", url: `${store}/cordless-drill`, price: "€89.00" },
    ] },
  { title: "Paint a wall", slug: "paint-a-wall", category: "Painting", description: "Prepare, edge and paint an interior wall with an even finish.", level: "Beginner", time: "3 hours", likes: 184, author: "Marta K. · Store team", status: "Published", image: imgPaint,
    steps: [
      { title: "Protect the room", text: "Cover the floor with a drop cloth and tape skirting boards and window frames.", image: imgPaint },
      { title: "Cut in the edges", text: "Use a brush to paint a 5 cm strip along the corners and ceiling line.", image: imgPaint },
      { title: "Roll the wall", text: "Roll in a W pattern, then fill in with straight vertical strokes.", image: imgPaint },
    ],
    products: [{ name: "Interior wall paint 2.5 L", url: `${store}/wall-paint`, price: "€24.90" }, { name: "Roller & tray set", url: `${store}/roller-set`, price: "€11.50" }] },
  { title: "Install a floating shelf", slug: "install-a-floating-shelf", category: "Home Repair", description: "Find safe fixing points and install a level floating shelf.", level: "Intermediate", time: "90 min", likes: 136, author: "CraftEase Store Team", status: "Draft", image: imgFloating,
    steps: [
      { title: "Find the fixing points", text: "Use a detector to avoid cables and pipes, then mark the rail holes.", image: imgFloating },
      { title: "Fix the hidden rail", text: "Drill, plug and screw the rail, checking level at every screw.", image: imgDrill },
      { title: "Slide on the shelf", text: "Push the shelf onto the rods and secure it with the grub screws.", image: imgFloating },
    ],
    products: [{ name: "Oak floating shelf 60 cm", url: `${store}/floating-shelf`, price: "€34.90" }, { name: "Spirit level 60 cm", url: `${store}/spirit-level`, price: "€12.90" }] },
  { title: "Build a small planter", slug: "build-a-small-planter", category: "Garden", description: "Make a compact timber planter for herbs or seasonal flowers.", level: "Beginner", time: "2 hours", likes: 211, author: "Ivan P. · Store team", status: "Published", image: imgPlanter,
    steps: [
      { title: "Cut the boards", text: "Cut two long sides, two short sides and a base from cedar boards.", image: imgPlanter },
      { title: "Assemble the box", text: "Glue and screw the sides together, then attach the base and feet.", image: imgPlanter },
      { title: "Line and plant", text: "Add a liner and drainage holes, fill with soil and plant your herbs.", image: imgPlanter },
    ],
    products: [{ name: "Cedar boards (pack of 4)", url: `${store}/cedar-boards`, price: "€19.90" }, { name: "Outdoor wood oil", url: `${store}/wood-oil`, price: "€14.50" }] },
  { title: "Repair a damaged wall", slug: "repair-a-damaged-wall", category: "Home Repair", description: "Patch a hole in drywall and prepare the repaired area for painting.", level: "Advanced", time: "3 hours", likes: 97, author: "CraftEase Store Team", status: "Review", image: imgRepair,
    steps: [
      { title: "Clean up the hole", text: "Cut away loose material to leave clean, firm edges.", image: imgRepair },
      { title: "Apply the filler", text: "Press filler in with a putty knife, slightly overfilling the hole.", image: imgRepair },
      { title: "Sand and prime", text: "Sand flush once dry, then prime before painting.", image: imgPaint },
    ],
    products: [{ name: "Ready-mixed wall filler", url: `${store}/wall-filler`, price: "€7.90" }, { name: "Putty knife set", url: `${store}/putty-knife`, price: "€8.40" }] },
  { title: "Choose and use a power drill", slug: "use-a-power-drill", category: "Tools", description: "Learn the basic drill settings, bits and safe handling techniques.", level: "Beginner", time: "45 min", likes: 302, author: "Lena M. · Store team", status: "Published", image: imgDrill,
    steps: [
      { title: "Pick the right bit", text: "Wood, metal and masonry each need a different bit — check the tip shape.", image: imgDrill },
      { title: "Set torque and speed", text: "Use low speed for screws and high speed for drilling holes.", image: imgDrill },
    ],
    products: [{ name: "Cordless drill 18V", url: `${store}/cordless-drill`, price: "€89.00" }, { name: "Drill bit set (15 pcs)", url: `${store}/drill-bits`, price: "€16.90" }] },
];

export function findProject(slug: string) { return projects.find(p => p.slug === slug) ?? projects[0]!; }
const community = [
  { image: imgC1, by: "Mia N.", note: "Reclaimed wood version for the kitchen" },
  { image: imgC2, by: "Sam L.", note: "Dark stain, three shelves" },
  { image: imgShelf, by: "Alex M.", note: "Pine with two brackets" },
  { image: imgFloating, by: "Jordan P.", note: "Oak finish in the hallway" },
];
const categories = ["Woodworking", "Painting", "Home Repair", "Garden", "Tools", "Beginner Projects"];
let selectedSlug = projects[0]!.slug;

/* ---------- Snackbar store ---------- */

let snack: string | null = null; let snackTimer: ReturnType<typeof setTimeout> | undefined;
const listeners = new Set<() => void>();
export function showSnackbar(message: string) {
  snack = message; listeners.forEach(l => l());
  clearTimeout(snackTimer); snackTimer = setTimeout(() => { snack = null; listeners.forEach(l => l()); }, 4000);
}
function Snackbar() {
  const message = useSyncExternalStore(cb => { listeners.add(cb); return () => listeners.delete(cb); }, () => snack, () => null);
  if (!message) return null;
  return <div role="status" className="fixed inset-x-4 bottom-24 z-50 mx-auto flex max-w-md items-center justify-between gap-4 rounded-sm bg-inverse-surface px-4 py-3 text-inverse-on-surface elev-3 sm:bottom-6"><span className="body-m">{message}</span><button aria-label="Dismiss" className="grid size-10 place-items-center rounded-full" onClick={() => { snack = null; listeners.forEach(l => l()); }}><X className="size-5" /></button></div>;
}

/* ---------- M3 primitives ---------- */

type BtnVariant = "filled" | "tonal" | "outlined" | "text" | "elevated";
export function btn(variant: BtnVariant = "filled", extra = "") {
  const v = {
    filled: "bg-primary text-on-primary hover:elev-1",
    tonal: "bg-secondary-container text-on-secondary-container hover:elev-1",
    outlined: "border border-outline text-primary hover:bg-primary/8",
    text: "text-primary hover:bg-primary/8 px-3",
    elevated: "bg-surface-container-low text-primary elev-1 hover:elev-2",
  }[variant];
  return `touch-target inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full px-6 label-l transition-shadow disabled:opacity-40 [&_svg]:size-[18px] ${v} ${extra}`;
}
function LinkBtn({ to, params, variant = "filled", className = "", children }: { to: string; params?: Record<string, string>; variant?: BtnVariant; className?: string; children: ReactNode }) {
  return <Link to={to as "/"} params={params as never} className={btn(variant, className)}>{children}</Link>;
}
function PathButton({ role, screen, children, variant = "filled" }: { role: Role; screen: string; children: ReactNode; variant?: BtnVariant }) {
  return <LinkBtn to={`/${role}/$screen`} params={{ screen }} variant={variant}>{children}</LinkBtn>;
}
function Chip({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: ReactNode }) {
  return <button type="button" aria-pressed={selected} onClick={onClick} className={`touch-target inline-flex h-8 items-center gap-2 rounded-md px-4 label-l ${selected ? "bg-secondary-container pl-2 text-on-secondary-container" : "border border-outline text-on-surface-variant hover:bg-on-surface/5"}`}>{selected && <Check className="size-[18px]" />}{children}</button>;
}
export function DifficultyBadge({ level }: { level: Difficulty }) {
  const cls = { Beginner: "bg-beginner text-on-beginner", Intermediate: "bg-intermediate text-on-intermediate", Advanced: "bg-advanced text-on-advanced" }[level];
  return <span className={`inline-flex h-6 items-center rounded-md px-2 label-s ${cls}`}>{level}</span>;
}
function TextField({ label, defaultValue, type = "text", multiline = false, value, onChange }: { label: string; defaultValue?: string | undefined; type?: string; multiline?: boolean; value?: string; onChange?: (v: string) => void }) {
  const base = "peer w-full rounded-t-sm border-b border-on-surface-variant bg-surface-container-high px-4 pb-2 pt-6 body-l outline-none focus:border-b-2 focus:border-primary";
  const ctrl = value !== undefined ? { value, onChange: (e: { target: { value: string } }) => onChange?.(e.target.value) } : { defaultValue };
  return <label className="relative mt-4 block">
    {multiline ? <textarea placeholder=" " rows={3} className={`${base} resize-y`} {...ctrl} /> : <input type={type} placeholder=" " className={`${base} h-14`} {...ctrl} />}
    <span className="pointer-events-none absolute left-4 top-1.5 text-xs leading-4 text-on-surface-variant transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-primary">{label}</span>
  </label>;
}
function SelectField({ label, options, value, onChange, compact = false }: { label: string; options: string[]; value: string; onChange: (v: string) => void; compact?: boolean }) {
  return <label className={`relative block ${compact ? "" : "mt-4"}`}><select aria-label={label} value={value} onChange={e => onChange(e.target.value)} className={`w-full appearance-none rounded-t-sm border-b border-on-surface-variant bg-surface-container-high px-4 pr-10 body-l outline-none focus:border-b-2 focus:border-primary ${compact ? "h-12" : "h-14 pt-5"}`}>{options.map(o => <option key={o}>{o}</option>)}</select>{!compact && <span className="pointer-events-none absolute left-4 top-1.5 text-xs text-on-surface-variant">{label}</span>}<ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-on-surface-variant" /></label>;
}
function Card({ children, className = "", variant = "elevated" }: { children: ReactNode; className?: string; variant?: "elevated" | "filled" | "outlined" }) {
  const v = { elevated: "bg-surface-container-low elev-1", filled: "bg-surface-container-high", outlined: "border border-outline-variant bg-surface" }[variant];
  return <div className={`rounded-lg p-4 ${v} ${className}`}>{children}</div>;
}
function Stat({ value, label }: { value: string; label: string }) { return <Card variant="filled"><strong className="headline-l text-primary">{value}</strong><p className="mt-1 body-m text-on-surface-variant">{label}</p></Card>; }
function Header({ eyebrow, title, action }: { eyebrow: string; title: string; action?: ReactNode }) {
  return <div className="mb-6 flex flex-wrap items-end justify-between gap-4"><div><p className="label-l text-on-surface-variant">{eyebrow}</p><h1 className="mt-1 headline-l">{title}</h1></div>{action}</div>;
}
function Photo({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return <img src={src} alt={alt} loading="lazy" width={1024} height={640} className={`w-full object-cover ${className}`} />;
}
function VideoPlayer({ src, label }: { src: string; label: string }) {
  return <div className="relative overflow-hidden rounded-lg bg-inverse-surface"><img src={src} alt={label} width={1024} height={640} className="aspect-video w-full object-cover opacity-90" /><button aria-label={`Play ${label}`} className="absolute inset-0 m-auto grid size-16 place-items-center rounded-xl bg-primary-container text-on-primary-container elev-3"><Play className="size-7 fill-current" /></button><span className="absolute bottom-3 left-3 rounded-md bg-scrim px-2 py-1 label-s text-inverse-on-surface">TUTORIAL VIDEO · 12:40</span></div>;
}

/* ---------- Top app bar ---------- */

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  return <button aria-label={dark ? "Switch to light theme" : "Switch to dark theme"} onClick={() => { const next = !dark; setDark(next); document.documentElement.classList.toggle("dark", next); }} className="grid size-12 place-items-center rounded-full text-on-surface-variant hover:bg-on-surface/8">{dark ? <Sun className="size-5" /> : <Moon className="size-5" />}</button>;
}

function TopAppBar({ role, onMenu }: { role?: Role | undefined; onMenu?: () => void }) {
  const name = role === "employee" ? "Taylor Reed" : role === "admin" ? "Jordan Admin" : "Alex Morgan";
  return <header className="sticky top-0 z-30 bg-surface-container">
    <div className="relative mx-auto flex min-h-16 max-w-[1200px] flex-wrap items-center gap-2 px-4 py-2 md:px-6">
      {onMenu && <button aria-label="Open navigation" onClick={onMenu} className="grid size-12 place-items-center rounded-full md:hidden"><Menu className="size-6" /></button>}
      <Link to="/" aria-label="CraftEase home" className="mr-auto flex h-12 items-center"><img src={logo} alt="CraftEase" width={152} height={38} className="h-[38px] w-[152px] object-contain" /></Link>
      <label className="order-3 flex h-12 w-full items-center gap-3 rounded-full bg-surface-container-high px-4 sm:order-none sm:w-auto sm:flex-1 sm:max-w-md md:absolute md:left-1/2 md:top-1/2 md:w-[min(448px,45vw)] md:max-w-none md:flex-none md:-translate-x-1/2 md:-translate-y-1/2"><Search className="size-5 text-on-surface-variant" /><span className="sr-only">Search projects</span><input aria-label="Search projects" placeholder="Search DIY projects" className="min-w-0 flex-1 bg-transparent body-l outline-none placeholder:text-on-surface-variant" /></label>
      {role === "employee" && <LinkBtn to="/employee/$screen" params={{ screen: "upload" }} variant="tonal"><Upload />Upload tutorial</LinkBtn>}
      <ThemeToggle />
      {role ? <details className="relative">
        <summary className="flex h-12 cursor-pointer list-none items-center gap-2 rounded-full pl-1 pr-3 hover:bg-on-surface/8"><span className="grid size-10 place-items-center rounded-full bg-primary-container text-on-primary-container"><UserRound className="size-5" /></span><span className="hidden label-l sm:inline">{name}</span><ChevronDown className="size-4" /></summary>
        <div className="absolute right-0 z-40 mt-2 grid w-56 rounded-sm bg-surface-container py-2 elev-2">
          <p className="px-4 py-2 label-s text-on-surface-variant">{roleNames[role].toUpperCase()}</p>
          {role === "user" && <><Link to="/user/$screen" params={{ screen: "dashboard" }} className="flex h-12 items-center px-4 body-l hover:bg-on-surface/8">My dashboard</Link><Link to="/user/$screen" params={{ screen: "profile" }} className="flex h-12 items-center px-4 body-l hover:bg-on-surface/8">Profile / account</Link></>}
          {role !== "user" && <Link to={`/${role}/$screen`} params={{ screen: "dashboard" }} className="flex h-12 items-center px-4 body-l hover:bg-on-surface/8">Dashboard</Link>}
          <Link to="/" className="flex h-12 items-center px-4 body-l hover:bg-on-surface/8">Log out</Link>
        </div>
      </details> : <div className="flex items-center gap-2"><LinkBtn to="/login" variant="text">Log in</LinkBtn><LinkBtn to="/register">Register</LinkBtn></div>}
    </div>
  </header>;
}
export function PublicHeader({ authenticated = false }: { authenticated?: boolean }) { return <TopAppBar role={authenticated ? "user" : undefined} />; }

/* ---------- Public pages ---------- */

export function PublicPage({ mode }: { mode: "login" | "register" }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Role>("user");
  const isLogin = mode === "login";
  return <main className="min-h-screen bg-surface"><TopAppBar />
    <section className="mx-auto grid max-w-[1200px] place-items-center px-4 py-10">
      <Card className="w-full max-w-md rounded-2xl p-6 sm:p-8" variant="filled">
        <h1 className="headline-m">{isLogin ? "Log in" : "Create account"}</h1>
        <p className="mt-2 body-m text-on-surface-variant">{isLogin ? "Choose a demo role to explore its flow." : "Demo form — no account data is saved."}</p>
        {!isLogin && <TextField label="Full name" />}
        <TextField label="Email" type="email" />
        <TextField label="Password" type="password" />
        {isLogin && <fieldset className="mt-6"><legend className="mb-2 title-m">Demo role</legend><div className="flex flex-wrap gap-2">{(Object.keys(roleNames) as Role[]).map(role => <Chip key={role} selected={selected === role} onClick={() => setSelected(role)}>{roleNames[role]}</Chip>)}</div></fieldset>}
        <button className={btn("filled", "mt-8 w-full")} onClick={() => navigate({ to: isLogin ? `/${selected}/dashboard` : "/login" })}>{isLogin ? "Log in" : "Register"}</button>
        <p className="mt-4 text-center body-m">{isLogin ? "Need an account?" : "Already registered?"} <Link to={isLogin ? "/register" : "/login"} className="label-l text-primary underline">{isLogin ? "Register" : "Log in"}</Link></p>
      </Card>
    </section><Snackbar /></main>;
}

function ProjectCard({ project, authenticated }: { project: Project; authenticated: boolean }) {
  const inner = <><Photo src={project.image} alt={project.title} className="aspect-[16/10] rounded-t-lg" /><div className="flex flex-1 flex-col p-4"><div className="flex items-center justify-between gap-2"><span className="label-s text-on-surface-variant">{project.category.toUpperCase()}</span><DifficultyBadge level={project.level} /></div><h3 className="mt-2 title-l">{project.title}</h3><p className="mt-1 flex-1 body-m text-on-surface-variant">{project.description}</p><div className="mt-4 flex items-center gap-4 body-m text-on-surface-variant"><span className="flex items-center gap-1"><Clock className="size-4" />{project.time}</span><span className="flex items-center gap-1"><ThumbsUp className="size-4" />{project.likes}</span><span className="ml-auto truncate text-xs">{project.author}</span></div></div></>;
  const cls = "group flex h-full flex-col overflow-hidden rounded-lg bg-surface-container-low elev-1 transition-shadow hover:elev-2";
  return authenticated
    ? <Link to="/user/$screen" params={{ screen: "project" }} onClick={() => { selectedSlug = project.slug; }} className={cls}>{inner}</Link>
    : <Link to="/projects/$slug" params={{ slug: project.slug }} className={cls}>{inner}</Link>;
}

export function PublicDiscover({ authenticated = false, embedded = false }: { authenticated?: boolean; embedded?: boolean }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState<"All" | Difficulty>("All");
  const [sort, setSort] = useState("Most liked");
  const visible = projects.filter(p => (category === "All" || (category === "Beginner Projects" ? p.level === "Beginner" : p.category === category)) && (difficulty === "All" || p.level === difficulty) && p.title.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => sort === "Most liked" ? b.likes - a.likes : sort === "Shortest" ? parseInt(a.time) * (a.time.includes("min") ? 1 : 60) - parseInt(b.time) * (b.time.includes("min") ? 1 : 60) : a.title.localeCompare(b.title));
  const content = <div className={embedded ? "" : "mx-auto max-w-[1200px] px-4 py-6 md:px-6"}>
    <section className="overflow-hidden rounded-2xl bg-primary-container text-on-primary-container md:grid md:grid-cols-[1.1fr_1fr]">
      <div className="p-6 md:p-10"><p className="label-l">PROJECT LIBRARY</p><h1 className="mt-2 headline-l md:display-l">Learn it. Build it. Love it.</h1><p className="mt-3 max-w-lg body-l">Step-by-step DIY tutorials from our store experts — browse freely, start when you are ready.</p>
        <label className="mt-6 flex h-14 items-center gap-3 rounded-full bg-surface-container-lowest px-4 text-on-surface"><Search className="size-5 text-on-surface-variant" /><span className="sr-only">Search project titles</span><input value={query} onChange={e => setQuery(e.target.value)} aria-label="Search project titles" placeholder="Search project titles" className="min-w-0 flex-1 bg-transparent body-l outline-none placeholder:text-on-surface-variant" /></label></div>
      <img src={imgShelf} alt="Handmade wooden shelf with books and plant" width={1024} height={640} className="hidden h-full w-full object-cover md:block" />
    </section>
    <section id="categories" className="mt-6 grid gap-3">
      <div className="flex flex-wrap items-center gap-2"><span className="w-24 label-l text-on-surface-variant">Category</span>{["All", ...categories].map(c => <Chip key={c} selected={category === c} onClick={() => setCategory(c)}>{c}</Chip>)}</div>
      <div className="flex flex-wrap items-center gap-2"><span className="w-24 label-l text-on-surface-variant">Difficulty</span>{(["All", ...difficulties] as const).map(d => <Chip key={d} selected={difficulty === d} onClick={() => setDifficulty(d)}>{d}</Chip>)}</div>
      <div className="flex flex-wrap items-center gap-2"><span className="w-24 label-l text-on-surface-variant">Sort by</span>{["Most liked", "Shortest", "Title A–Z"].map(s => <Chip key={s} selected={sort === s} onClick={() => setSort(s)}>{s}</Chip>)}</div>
    </section>
    <section className="mt-8"><div className="mb-4 flex items-end justify-between"><h2 className="headline-m">Featured projects</h2><span className="body-m text-on-surface-variant">{visible.length} projects</span></div><div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">{visible.slice(0, 3).map(p => <ProjectCard key={p.slug} project={p} authenticated={authenticated} />)}</div></section>
    <section className="mt-10"><h2 className="mb-4 headline-m">All projects</h2>{visible.length ? <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">{visible.map(p => <ProjectCard key={p.slug} project={p} authenticated={authenticated} />)}</div> : <Card variant="filled"><h3 className="title-m">No matching projects</h3><p className="mt-1 body-m text-on-surface-variant">Try another search term or filter.</p></Card>}</section>
  </div>;
  return embedded ? content : <main className="min-h-screen bg-surface"><TopAppBar role={authenticated ? "user" : undefined} />{content}<Snackbar /></main>;
}

function ProjectDetailBody({ project, authenticated }: { project: Project; authenticated: boolean }) {
  const [prompt, setPrompt] = useState(false);
  const [reaction, setReaction] = useState<"up" | "down" | null>(null);
  const [saved, setSaved] = useState(false);
  const gate = (fn: () => void) => () => authenticated ? fn() : setPrompt(true);
  return <div>
    <header><div className="flex flex-wrap items-center gap-2 body-m text-on-surface-variant"><span className="label-l text-primary">{project.category}</span><span>·</span><DifficultyBadge level={project.level} /><span>·</span><span className="flex items-center gap-1"><Clock className="size-4" />{project.time}</span></div><h1 className="mt-2 headline-l">{project.title}</h1><p className="mt-1 body-l text-on-surface-variant">{project.description} · By {project.author}</p></header>
    <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div className="min-w-0"><VideoPlayer src={project.image} label={`${project.title} tutorial`} /></div>
      <Card variant="filled"><h2 className="title-m">Used elements</h2><ul className="mt-3 grid gap-3">{project.products.map(product => <li key={product.name} className="border-t border-outline-variant pt-3 first:border-0 first:pt-0"><a href={product.url} target="_blank" rel="noopener noreferrer" className="title-m text-primary hover:underline">{product.name}</a><p className="mt-1 body-m text-on-surface-variant">{product.price}</p></li>)}</ul></Card>
    </div>
    <div className="mt-4 flex flex-wrap gap-2">
      <button className={btn(reaction === "up" ? "tonal" : "outlined")} aria-pressed={reaction === "up"} onClick={gate(() => setReaction(r => r === "up" ? null : "up"))}><ThumbsUp />Like · {project.likes + (reaction === "up" ? 1 : 0)}</button>
      <button className={btn(reaction === "down" ? "tonal" : "outlined")} aria-pressed={reaction === "down"} onClick={gate(() => setReaction(r => r === "down" ? null : "down"))}><ThumbsDown />Dislike</button>
      <button className={btn(saved ? "tonal" : "outlined")} aria-pressed={saved} onClick={gate(() => { setSaved(s => !s); showSnackbar(saved ? "Removed from saved projects" : "Project saved"); })}><Bookmark className={saved ? "fill-current" : ""} />{saved ? "Saved" : "Save project"}</button>
    </div>
    <section className="mt-10"><h2 className="headline-m">Step-by-step instructions</h2><ol className="mt-4 grid gap-4">{project.steps.map((s, i) => <li key={s.title}><Card className="grid gap-4 sm:grid-cols-[240px_1fr]"><Photo src={s.image} alt={s.title} className="aspect-[4/3] rounded-md" /><div><span className="label-s text-on-surface-variant">STEP {i + 1} OF {project.steps.length}</span><h3 className="mt-1 title-l">{s.title}</h3><p className="mt-2 body-l text-on-surface-variant">{s.text}</p></div></Card></li>)}</ol></section>
    <section className="mt-10"><div className="flex items-end justify-between gap-4"><h2 className="headline-m">Made by the community</h2><span className="body-m text-on-surface-variant">{community.length} submissions</span></div><div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">{community.map(c => <figure key={c.by} className="overflow-hidden rounded-lg bg-surface-container-low elev-1"><Photo src={c.image} alt={c.note} className="aspect-square" /><figcaption className="p-3"><p className="label-l">{c.by}</p><p className="body-m text-on-surface-variant">{c.note}</p></figcaption></figure>)}</div></section>
    {prompt && <div role="dialog" aria-modal="true" aria-label="Account required" className="fixed inset-0 z-40 grid place-items-center bg-scrim p-4"><div className="w-full max-w-sm rounded-2xl bg-surface-container-high p-6 elev-3"><h2 className="headline-m">Log in to continue</h2><p className="mt-3 body-m text-on-surface-variant">You can browse every project without an account. Log in or register to like, dislike and save projects.</p><div className="mt-6 flex justify-end gap-2"><button className={btn("text")} onClick={() => setPrompt(false)}>Cancel</button><LinkBtn to="/register" variant="tonal">Register</LinkBtn><LinkBtn to="/login">Log in</LinkBtn></div></div></div>}
  </div>;
}

export function PublicProjectDetail({ slug }: { slug: string }) {
  const project = findProject(slug);
  return <main className="min-h-screen bg-surface"><TopAppBar /><div className="mx-auto max-w-[1200px] px-4 py-6 md:px-6"><Link to="/" className={btn("text", "-ml-3 mb-4")}>← Back to Discover</Link><ProjectDetailBody key={project.slug} project={project} authenticated={false} /></div><Snackbar /></main>;
}

/* ---------- App shell ---------- */

export function AppShell({ role, screen }: { role: Role; screen: string }) {
  const [open, setOpen] = useState(false);
  return <div className="min-h-screen bg-surface">
    <TopAppBar role={role} onMenu={() => setOpen(v => !v)} />
    <div className="mx-auto flex max-w-[1200px]">
      {open && <button aria-label="Close navigation" className="fixed inset-0 z-20 bg-scrim md:hidden" onClick={() => setOpen(false)} />}
      <aside className={`${open ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-30 w-72 rounded-r-2xl bg-surface-container-low p-3 transition-transform md:sticky md:top-16 md:z-0 md:h-[calc(100vh-4rem)] md:w-64 md:translate-x-0 md:rounded-none md:bg-transparent`}>
        <p className="px-4 py-4 title-m text-on-surface-variant">{roleNames[role]}</p>
        <nav className="grid gap-1">{nav[role].map(item => <Link key={item.screen} to={`/${role}/$screen`} params={{ screen: item.screen }} onClick={() => setOpen(false)} className={`flex h-14 items-center rounded-full px-4 label-l ${screen === item.screen ? "bg-secondary-container text-on-secondary-container" : "text-on-surface-variant hover:bg-on-surface/8"}`}>{item.label}</Link>)}</nav>
      </aside>
      <main className="min-w-0 flex-1 p-4 pb-32 md:p-6"><RoleScreen role={role} screen={screen} /></main>
    </div>
    <Snackbar />
  </div>;
}

function RoleScreen({ role, screen }: { role: Role; screen: string }) {
  if (role === "user") return <UserScreen screen={screen} />;
  if (role === "employee") return <EmployeeScreen screen={screen} />;
  return <AdminScreen screen={screen} />;
}

/* ---------- User ---------- */

function UserScreen({ screen }: { screen: string }) {
  const [done, setDone] = useState([true, false, false, false]);
  const [submissions, setSubmissions] = useState([
    { project: "Build a small planter", submitted: "24 Sep 2026", status: "REVIEWED" },
    { project: "Build a wooden shelf", submitted: "28 Sep 2026", status: "AWAITING" },
  ]);
  const [submissionToDelete, setSubmissionToDelete] = useState<(typeof submissions)[number] | null>(null);
  const shelf = projects[0]!;
  if (screen === "dashboard") return <><Header eyebrow="MY CRAFTEASE" title="My dashboard" />
    <section><h2 className="title-l">Continue learning</h2><Card className="mt-3 grid gap-5 sm:grid-cols-[220px_1fr]"><Photo src={shelf.image} alt={shelf.title} className="aspect-[4/3] rounded-md" /><div><p className="label-s text-on-surface-variant">IN PROGRESS · STEP 2 OF 4</p><h3 className="mt-1 headline-m">{shelf.title}</h3><div className="my-4 h-1 rounded-full bg-surface-container-high"><div className="h-full w-1/2 rounded-full bg-primary" /></div><PathButton role="user" screen="tutorial">Continue tutorial</PathButton></div></Card></section>
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      <MiniSection title="My saved projects" action={<PathButton role="user" screen="saved" variant="text">View all</PathButton>} project={projects[3]!} meta="Saved 3 days ago" />
      <MiniSection title="Recently viewed" project={projects[4]!} meta="Viewed yesterday" />
      <section><div className="flex items-center justify-between"><h2 className="title-l">My submissions</h2><PathButton role="user" screen="submissions" variant="text">View all</PathButton></div><Card className="mt-3"><p className="label-s text-success">REVIEWED · 24 SEP 2026</p><h3 className="mt-1 title-m">Build a small planter</h3><p className="mt-1 body-m text-on-surface-variant">Grade: 8 / 10</p></Card></section>
      <section><h2 className="title-l">Recent feedback</h2><Card className="mt-3"><p className="label-s text-on-surface-variant">STORE FEEDBACK</p><h3 className="mt-1 title-m">Strong construction and careful finishing</h3><div className="mt-3"><PathButton role="user" screen="feedback" variant="tonal">Read feedback</PathButton></div></Card></section>
    </div>
    <section className="mt-8"><h2 className="title-l">Completed projects</h2><div className="mt-3 grid gap-4 sm:grid-cols-3"><Stat value="3" label="Projects completed" /><Stat value="2" label="Projects in progress" /><Stat value="1" label="New feedback item" /></div></section></>;
  if (screen === "discover" || screen === "projects") return <PublicDiscover authenticated embedded />;
  if (screen === "saved") return <><Header eyebrow="MY LEARNING" title="Saved / My projects" /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{projects.slice(0, 3).map(p => <ProjectCard key={p.slug} project={p} authenticated />)}</div></>;
  if (screen === "project") { const p = findProject(selectedSlug); return <ProjectDetailBody key={p.slug} project={p} authenticated />; }
  if (screen === "tutorial") return <><Header eyebrow="LEARNING VIEW" title={shelf.title} action={<span className="label-l text-on-surface-variant">{done.filter(Boolean).length} / 4 complete</span>} />
    <div className="grid gap-6 md:grid-cols-[280px_1fr]"><Card variant="filled"><h2 className="title-m">Steps</h2><div className="mt-3 grid gap-2">{shelf.steps.map((s, i) => <button key={s.title} onClick={() => setDone(d => d.map((v, x) => x === i ? !v : v))} className="flex min-h-12 items-center gap-3 rounded-md p-2 text-left body-m hover:bg-on-surface/8"><span className={`grid size-6 shrink-0 place-items-center rounded-full border-2 ${done[i] ? "border-primary bg-primary text-on-primary" : "border-outline"}`}>{done[i] && <Check className="size-4" />}</span>{i + 1}. {s.title}</button>)}</div></Card>
      <div><VideoPlayer src={shelf.steps[1]!.image} label="Step 2 video" /><h2 className="mt-5 headline-m">Step 2: {shelf.steps[1]!.title}</h2><p className="mt-2 body-l text-on-surface-variant">{shelf.steps[1]!.text}</p><div className="mt-6 flex justify-end"><PathButton role="user" screen="submit">Finish & upload work</PathButton></div></div></div></>;
  if (screen === "submit") return <><Header eyebrow="PROJECT COMPLETION" title="Submit completed project" /><Card variant="outlined" className="max-w-[720px] p-6"><h2 className="title-l">{shelf.title}</h2><Dropzone icon={<Upload />} label="Upload photos or video" /><TextField label="Notes about your work" multiline /><button className={btn("filled", "mt-6")} onClick={() => showSnackbar("Submission sent")}>Submit completed work</button></Card></>;
  if (screen === "submissions") return <><Header eyebrow="MY LEARNING" title="My submissions" /><Card className="overflow-x-auto p-0"><table><thead><tr><th>Project</th><th>Submitted</th><th>Status</th><th>Actions</th></tr></thead><tbody>{submissions.map(submission => <tr key={submission.project}><td className="font-bold">{submission.project}</td><td>{submission.submitted}</td><td><span className={`label-s ${submission.status === "REVIEWED" ? "text-success" : "text-on-surface-variant"}`}>{submission.status}</span></td><td><button type="button" className={btn("outlined", "!border-error !text-error hover:!bg-error/10")} onClick={() => setSubmissionToDelete(submission)}><Trash2 />Delete</button></td></tr>)}</tbody></table></Card>
    <AlertDialog open={submissionToDelete !== null} onOpenChange={open => { if (!open) setSubmissionToDelete(null); }}>
      <AlertDialogContent className="border-outline-variant bg-surface-container-high text-on-surface">
        <AlertDialogHeader>
          <AlertDialogTitle className="headline-m">Are you sure you want to delete this submission?</AlertDialogTitle>
          <AlertDialogDescription className="body-m text-on-surface-variant">{submissionToDelete?.project ?? ""} will be removed from your submissions.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className={btn("outlined")}>Cancel</AlertDialogCancel>
          <AlertDialogAction className={btn("filled", "bg-error text-on-primary hover:bg-error/90")} onClick={() => {
            if (submissionToDelete) {
              setSubmissions(current => current.filter(submission => submission.project !== submissionToDelete.project));
              showSnackbar("Submission deleted");
              setSubmissionToDelete(null);
            }
          }}>Delete submission</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </>;
  if (screen === "feedback") return <><Header eyebrow="SUBMISSION DETAILS" title="Build a small planter" /><div className="grid gap-6 md:grid-cols-[1.3fr_1fr]"><div><Photo src={imgPlanter} alt="Submitted planter" className="aspect-video rounded-lg" /><h2 className="mt-5 title-l">Your notes</h2><p className="mt-2 body-l text-on-surface-variant">I used reclaimed pine and applied two coats of outdoor finish.</p></div><Card variant="filled"><p className="label-s text-success">REVIEW COMPLETE</p><p className="my-4 display-l text-primary">8/10</p><h2 className="title-m">Feedback</h2><p className="mt-2 body-m text-on-surface-variant">Strong construction and careful finishing. Next time, sand once more between finish coats.</p><div className="mt-4"><PathButton role="user" screen="discover" variant="tonal">Browse another project</PathButton></div></Card></div></>;
  return <><Header eyebrow="ACCOUNT" title="Profile" /><Card variant="outlined" className="max-w-[720px] p-6"><TextField label="Display name" defaultValue="Alex Morgan" /><TextField label="Email" type="email" defaultValue="alex@example.com" /><button className={btn("filled", "mt-6")} onClick={() => showSnackbar("Profile saved (demo only)")}>Save changes</button></Card></>;
}
function MiniSection({ title, action, project, meta }: { title: string; action?: ReactNode; project: Project; meta: string }) {
  return <section><div className="flex items-center justify-between"><h2 className="title-l">{title}</h2>{action}</div><Card className="mt-3 flex gap-4"><Photo src={project.image} alt={project.title} className="aspect-square !w-20 rounded-md" /><div><DifficultyBadge level={project.level} /><h3 className="mt-1 title-m">{project.title}</h3><p className="body-m text-on-surface-variant">{meta} · {project.time}</p></div></Card></section>;
}
function Dropzone({ icon, label, hint = "Drag and drop or browse" }: { icon: ReactNode; label: string; hint?: string }) {
  return <label className="mt-4 grid min-h-40 cursor-pointer place-items-center rounded-lg border-2 border-dashed border-outline bg-surface-container-low p-4 text-center hover:bg-surface-container"><input type="file" multiple className="sr-only" /><span className="grid justify-items-center gap-1 text-on-surface-variant [&_svg]:size-8">{icon}<b className="title-m text-on-surface">{label}</b><small className="body-m">{hint}</small></span></label>;
}

/* ---------- Employer ---------- */

function UploadTutorial({ edit = false }: { edit?: boolean }) {
  const navigate = useNavigate();
  const [cats, setCats] = useState<string[]>(edit ? ["Woodworking"] : []);
  const [level, setLevel] = useState<Difficulty>("Beginner");
  const [steps, setSteps] = useState(edit ? projects[0]!.steps.map(s => ({ title: s.title, text: s.text })) : [{ title: "", text: "" }]);
  const [products, setProducts] = useState(edit ? projects[0]!.products.slice(0, 2).map(p => ({ name: p.name, url: p.url })) : [{ name: "", url: "" }]);
  const section = (n: number, title: string, children: ReactNode) => <Card variant="outlined" className="p-6"><p className="label-s text-on-surface-variant">SECTION {n}</p><h2 className="mt-1 title-l">{title}</h2>{children}</Card>;
  return <div className="mx-auto max-w-[720px]">
    <Header eyebrow="EMPLOYER" title={edit ? "Edit tutorial" : "Upload tutorial"} />
    <div className="grid gap-4">
      {section(1, "Basics", <>
        <TextField label="Title" defaultValue={edit ? "Build a wooden shelf" : undefined} />
        <TextField label="Short description" multiline defaultValue={edit ? projects[0]!.description : undefined} />
        <p className="mt-6 label-l">Category</p><div className="mt-2 flex flex-wrap gap-2">{categories.filter(c => c !== "Beginner Projects").map(c => <Chip key={c} selected={cats.includes(c)} onClick={() => setCats(x => x.includes(c) ? x.filter(y => y !== c) : [...x, c])}>{c}</Chip>)}</div>
        <p className="mt-6 label-l">Difficulty</p><div className="mt-2 flex flex-wrap gap-2">{difficulties.map(d => <Chip key={d} selected={level === d} onClick={() => setLevel(d)}>{d}</Chip>)}</div>
        <TextField label="Duration (e.g. 2 hours)" defaultValue={edit ? "2 hours" : undefined} />
      </>)}
      {section(2, "Video & thumbnail", <div className="grid gap-4 sm:grid-cols-[2fr_1fr]"><Dropzone icon={<Video />} label="Upload tutorial video" hint="MP4 or MOV, up to 2 GB" /><Dropzone icon={<ImagePlus />} label="Thumbnail" hint="16:9 JPG or PNG" /></div>)}
      {section(3, "Steps", <><ol className="mt-2 grid gap-4">{steps.map((s, i) => <li key={i} className="rounded-lg bg-surface-container-low p-4"><div className="flex items-center justify-between"><span className="title-m">Step {i + 1}</span>{steps.length > 1 && <button aria-label={`Remove step ${i + 1}`} className="grid size-12 place-items-center rounded-full text-on-surface-variant hover:bg-on-surface/8" onClick={() => setSteps(x => x.filter((_, j) => j !== i))}><Trash2 className="size-5" /></button>}</div><TextField label="Step title" value={s.title} onChange={v => setSteps(x => x.map((y, j) => j === i ? { ...y, title: v } : y))} /><TextField label="Description" multiline value={s.text} onChange={v => setSteps(x => x.map((y, j) => j === i ? { ...y, text: v } : y))} /><Dropzone icon={<ImagePlus />} label="Step photos" /></li>)}</ol><button className={btn("text", "mt-3 -ml-3")} onClick={() => setSteps(x => [...x, { title: "", text: "" }])}><Plus />Add step</button></>)}
      {section(4, "Linked products", <><div className="grid gap-2">{products.map((p, i) => <div key={i} className="grid items-end gap-2 sm:grid-cols-[1fr_1.4fr_auto]"><TextField label="Product name" value={p.name} onChange={v => setProducts(x => x.map((y, j) => j === i ? { ...y, name: v } : y))} /><TextField label="Store URL" type="url" value={p.url} onChange={v => setProducts(x => x.map((y, j) => j === i ? { ...y, url: v } : y))} /><button aria-label={`Remove product ${i + 1}`} className="grid size-12 place-items-center rounded-full text-on-surface-variant hover:bg-on-surface/8" onClick={() => setProducts(x => x.filter((_, j) => j !== i))}><Trash2 className="size-5" /></button></div>)}</div><button className={btn("text", "mt-3 -ml-3")} onClick={() => setProducts(x => [...x, { name: "", url: "" }])}><Plus />Add product</button></>)}
    </div>
    <div className="sticky bottom-0 z-10 -mx-4 mt-6 flex flex-wrap justify-end gap-2 bg-surface-container px-4 py-3 elev-2 sm:mx-0 sm:rounded-lg">
      <button className={btn("text")} onClick={() => navigate({ to: "/employee/$screen", params: { screen: "projects" } })}>Cancel</button>
      <button className={btn("tonal")} onClick={() => showSnackbar("Draft saved")}>Save draft</button>
      <button className={btn("filled")} onClick={() => showSnackbar("Tutorial published")}>Publish</button>
    </div>
  </div>;
}

function EmployeeScreen({ screen }: { screen: string }) {
  if (screen === "dashboard") return <><Header eyebrow="EMPLOYER" title="Dashboard" /><div className="grid gap-4 sm:grid-cols-3"><Stat value="12" label="Published tutorials" /><Stat value="3" label="Draft tutorials" /><Stat value="1,180" label="Likes this month" /></div><Card className="mt-6 grid gap-4 sm:grid-cols-[200px_1fr]"><Photo src={imgFloating} alt="Install a floating shelf" className="aspect-[4/3] rounded-md" /><div><p className="label-s text-on-surface-variant">DRAFT</p><h2 className="mt-1 title-l">Continue editing “Install a floating shelf”</h2><p className="mt-1 body-m text-on-surface-variant">Last edited 2 days ago</p><div className="mt-4"><PathButton role="employee" screen="edit" variant="tonal">Edit draft</PathButton></div></div></Card></>;
  if (screen === "projects") return <><Header eyebrow="EDUCATIONAL CONTENT" title="Project management" /><Card className="overflow-x-auto p-0"><table><thead><tr><th>Project</th><th>Difficulty</th><th>Status</th><th>Updated</th><th /></tr></thead><tbody>{projects.map(p => <tr key={p.slug}><td className="font-bold">{p.title}</td><td><DifficultyBadge level={p.level} /></td><td>{p.status}</td><td>26 Sep 2026</td><td><PathButton role="employee" screen="edit" variant="text">Edit</PathButton></td></tr>)}</tbody></table></Card></>;
  if (screen === "upload" || screen === "create") return <UploadTutorial />;
  if (screen === "edit") return <UploadTutorial edit />;
  return <><Header eyebrow="PREVIEW" title="Tutorial preview" action={<PathButton role="employee" screen="edit" variant="outlined">Back to edit</PathButton>} /><ProjectDetailBody project={projects[0]!} authenticated /></>;
}

/* ---------- Admin ---------- */

const userRoles = ["User", "Employer", "Admin"];
function AdminScreen({ screen }: { screen: string }) {
  const [users, setUsers] = useState([
    { name: "Alex Morgan", email: "alex@example.com", role: "User" },
    { name: "Mia Novak", email: "mia@example.com", role: "User" },
    { name: "Taylor Reed", email: "t.reed@store.test", role: "Employer" },
    { name: "Jordan Admin", email: "jordan@craftease.test", role: "Admin" },
  ]);
  const [userToDelete, setUserToDelete] = useState<(typeof users)[number] | null>(null);
  if (screen === "dashboard") return <><Header eyebrow="ADMIN" title="Dashboard" /><div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4"><Stat value="1,248" label="Users" /><Stat value="34" label="Employers" /><Stat value="86" label="Published projects" /><Stat value="5" label="Moderation items" /></div><h2 className="mt-8 title-l">Administration areas</h2><div className="mt-4 grid gap-4 sm:grid-cols-2">{nav.admin.slice(1).map(i => <Card key={i.screen}><h3 className="title-m">{i.label}</h3><p className="my-2 body-m text-on-surface-variant">Open {i.label.toLowerCase()} controls and records.</p><PathButton role="admin" screen={i.screen} variant="tonal">Open</PathButton></Card>)}</div></>;
  if (screen === "users") return <><Header eyebrow="ADMIN" title="Users" /><Card className="overflow-x-auto p-0"><table><thead><tr><th>Name</th><th>Email</th><th>User role</th><th>Actions</th></tr></thead><tbody>{users.map((u, i) => <tr key={u.email}><td className="font-bold">{u.name}</td><td>{u.email}</td><td className="w-48"><SelectField compact label={`User role for ${u.name}`} options={userRoles} value={u.role} onChange={v => { setUsers(x => x.map((y, j) => j === i ? { ...y, role: v } : y)); showSnackbar(`${u.name} is now ${v}`); }} /></td><td><button type="button" className={btn("outlined", "!border-error !text-error hover:!bg-error/10")} onClick={() => setUserToDelete(u)}><Trash2 />Delete</button></td></tr>)}</tbody></table></Card>
    <AlertDialog open={userToDelete !== null} onOpenChange={open => { if (!open) setUserToDelete(null); }}>
      <AlertDialogContent className="border-outline-variant bg-surface-container-high text-on-surface">
        <AlertDialogHeader>
          <AlertDialogTitle className="headline-m">Are you sure you want to delete this user?</AlertDialogTitle>
          <AlertDialogDescription className="body-m text-on-surface-variant">{userToDelete ? `${userToDelete.name} (${userToDelete.email}) will be removed from this list.` : ""}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className={btn("outlined")}>Cancel</AlertDialogCancel>
          <AlertDialogAction className={btn("filled", "bg-error text-on-primary hover:bg-error/90")} onClick={() => {
            if (userToDelete) {
              setUsers(current => current.filter(user => user.email !== userToDelete.email));
              showSnackbar(`${userToDelete.name} deleted`);
              setUserToDelete(null);
            }
          }}>Delete user</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </>;
  if (screen === "content") return <><Header eyebrow="ADMIN" title="Content management" /><Card className="overflow-x-auto p-0"><table><thead><tr><th>Title</th><th>Owner</th><th>Difficulty</th><th>Status</th><th /></tr></thead><tbody>{projects.map(p => <tr key={p.slug}><td className="font-bold">{p.title}</td><td>{p.author}</td><td><DifficultyBadge level={p.level} /></td><td>{p.status}</td><td><div className="flex gap-1"><button className={btn("text")} onClick={() => showSnackbar(`“${p.title}” approved`)}>Approve</button><button className={btn("text")} onClick={() => showSnackbar(`“${p.title}” moved to draft`)}>Move to draft</button></div></td></tr>)}</tbody></table></Card></>;
  return <><Header eyebrow="ADMIN" title="Moderation" /><div className="grid gap-4">{["Inappropriate comment reported on ‘Paint a wall’", "Submission image flagged for review", "Duplicate tutorial: ‘Repair a damaged wall’"].map((item, i) => <Card key={item} className="flex flex-wrap items-center justify-between gap-4"><div><span className={`label-s ${i === 0 ? "text-error" : "text-on-surface-variant"}`}>{i === 0 ? "HIGH PRIORITY" : "OPEN"}</span><h2 className="mt-1 title-m">{item}</h2><p className="body-m text-on-surface-variant">Reported {i + 1} day ago</p></div><div className="flex gap-2"><button className={btn("text")} onClick={() => showSnackbar("Item dismissed")}>Dismiss</button><button className={btn("tonal")} onClick={() => showSnackbar("Item removed")}>Remove</button></div></Card>)}</div></>;
}
