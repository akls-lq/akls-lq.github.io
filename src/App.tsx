import {
  Component,
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedinIn,
  faInstagram,
  faTiktok,
  faYoutube,
  faSnapchat,
  faPython,
  faGitAlt,
} from "@fortawesome/free-brands-svg-icons";

import {
  education,
  experience,
  facets,
  projects,
  text,
  type Copy,
  type Lang,
} from "./content";
const Scene = lazy(() => import("./Scene"));
const Arrow = () => (
  <svg
    className="arrow-icon"
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
const reduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function supportsWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}
class SceneBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
function Fallback({ printing, lang }: { printing: boolean; lang: Lang }) {
  return (
    <div
      className={`fallback-scene ${printing ? "printing" : ""}`}
      aria-hidden="true"
    >
      <div className="f-star">✦</div>
      <div className="f-cushion" />
      <div className="f-computer">
        <div className="f-screen">
          <small>AKILIS_OS</small>
          <b>
            Hello,
            <br />
            {lang === "fr" ? "bienvenue." : "welcome."}
          </b>
          <span>CODE · FINANCE · IDEAS</span>
        </div>
        <div className="f-controls">
          ●<br />●<br />●
        </div>
        <div className="f-note" />
      </div>
      <div className="f-stem" />
      <div className="f-printer">
        <small>{lang === "fr" ? "VOIR MON CV" : "VIEW RÉSUMÉ"}</small>
        <div className="f-slot">
          <div className="f-paper">
            <b>
              AKILIS
              <br />
              LE QUELLEC
            </b>
            <hr />
            <p>TECH / DEV / IA</p>
            <p>BUSINESS / FINANCE</p>
            <p>PUBLIC SPEAKING</p>
            <small>42 Paris × ICN</small>
          </div>
        </div>
      </div>
      <div className="f-mug">◉◉</div>
      <div className="f-ball" />
      <div className="f-plinth" />
    </div>
  );
}
function Modal({
  children,
  label,
  close,
}: {
  children: ReactNode;
  label: string;
  close: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    ref.current?.showModal();
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = before;
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="modal"
      aria-label={label}
      onCancel={close}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <button className="modal-close round" onClick={close} aria-label={label}>
        ×
      </button>
      {children}
    </dialog>
  );
}
export default function App() {
  const [lang, setLang] = useState<Lang>("fr");
  const [phase, setPhase] = useState<
    "idle" | "printing" | "revealing" | "done"
  >("idle");
  const [started, setStarted] = useState<number | null>(null);
  const [replay, setReplay] = useState(0);
  const [facet, setFacet] = useState(0);
  const [project, setProject] = useState<number | null>(null);
  const [certificate, setCertificate] = useState<number | null>(null);
  const [certZoom, setCertZoom] = useState(false);
  const [flipped, setFlipped] = useState([false, false]);
  const [menu, setMenu] = useState(false);
  const [webgl] = useState(supportsWebGL);
  const [readyCV, setReadyCV] = useState(false);
  const introRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLHeadingElement>(null);
  const t = (v: Copy) => v[lang === "fr" ? 0 : 1];
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title =
      lang === "fr"
        ? "Akilis Le Quellec — Code, finance & idées"
        : "Akilis Le Quellec — Code, finance & ideas";
  }, [lang]);
  useEffect(() => {
    document.body.style.overflow = phase === "done" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);
  useEffect(() => {
    if (started === null) return;
    const a = setTimeout(() => setPhase("revealing"), reduced() ? 0 : 1100);
    const b = setTimeout(
      () => {
        setPhase("done");
        heroRef.current?.focus({ preventScroll: true });
      },
      reduced() ? 80 : 3300,
    );
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [started]);
  useEffect(() => {
    let active = true;
    fetch("/cv/Akilis_Le_Quellec_CV_Public.pdf", { method: "HEAD" })
      .then((r) => {
        if (active)
          setReadyCV(
            r.ok &&
              !!r.headers.get("content-type")?.includes("application/pdf"),
          );
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);
  useEffect(() => {
    if (phase !== "done") return;
    const observer = new IntersectionObserver(
      (items) =>
        items.forEach((i) => {
          if (i.isIntersecting) {
            i.target.classList.add("in-view");
            observer.unobserve(i.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, [phase]);
  function start() {
    if (phase !== "idle") return;
    setStarted(performance.now());
    setPhase("printing");
  }
  function skip() {
    setStarted(null);
    setPhase("done");
    setTimeout(() => heroRef.current?.focus(), 0);
  }
  function restart() {
    window.scrollTo({ top: 0, behavior: "instant" });
    setStarted(null);
    setPhase("idle");
    setReplay((r) => r + 1);
    setTimeout(() => introRef.current?.focus(), 50);
  }
  const nav = [
    [text.navFacets, "#facets"],
    [text.navProjects, "#projects"],
    [text.navJourney, "#journey"],
  ] as const;
  const certs = [
    {
      name: "Financial Markets",
      org: "Yale University",
      mark: "Yale",
      date: "2026-10-11",
      type: text.yaleType,
      img: "yale",
      url: "https://coursera.org/verify/Z2IX6VKNSQ48",
    },
    {
      name: "Data Skills for Excel Professionals",
      org: "Corporate Finance Institute",
      mark: "CFI",
      date: "2026-09-24",
      type: text.cfiType,
      img: "cfi",
      url: "https://coursera.org/verify/specialization/3RF9BTGAFSVJ",
    },
  ];
  return (
    <>
      <button
        className={`language ${phase !== "done" ? "on-blue" : ""}`}
        aria-label={lang === "fr" ? "Switch to English" : "Passer en français"}
        onClick={() => setLang((l) => (l === "fr" ? "en" : "fr"))}
      >
        <span className={lang === "fr" ? "selected" : ""}>FR</span>
        <span className="lang-divider">/</span>
        <span className={lang === "en" ? "selected" : ""}>EN</span>
      </button>
      {phase !== "done" && (
        <div
          key={replay}
          ref={introRef}
          className={`intro ${phase}`}
          role="button"
          tabIndex={0}
          aria-label={t(text.enter)}
          aria-busy={phase !== "idle"}
          data-testid="intro"
          data-phase={phase}
          data-paper-origin="printer-slot"
          onClick={start}
          onKeyDown={(e) => {
            if (
              e.target === e.currentTarget &&
              (e.key === "Enter" || e.key === " ")
            ) {
              e.preventDefault();
              start();
            }
          }}
        >
          <div className="intro-top">
            <span className="wordmark">
              AKILIS<span>®</span>
            </span>
            <span className="intro-edition">PORTFOLIO — 2026</span>
          </div>
          <div className="intro-heading">
            <p>{t(text.welcome)}</p>
            <h1>
              Akilis Le Quellec<span>✳</span>
            </h1>
            <p className="intro-subtitle">{t(text.introSub)}</p>
          </div>
          <div className="intro-backdrop" aria-hidden="true">
            HELLO, WORLD.
          </div>
          <div className="scene" data-testid="scene">
            {webgl && !reduced() ? (
              <SceneBoundary
                fallback={<Fallback printing={phase !== "idle"} lang={lang} />}
              >
                <Suspense
                  fallback={
                    <Fallback printing={phase !== "idle"} lang={lang} />
                  }
                >
                  <Scene started={started} lang={lang} />
                </Suspense>
              </SceneBoundary>
            ) : (
              <Fallback printing={phase !== "idle"} lang={lang} />
            )}
          </div>
          <div className="intro-bottom">
            <span className="intro-step">01 — 03</span>
            <div className="enter-hint">
              <span className="click-symbol" aria-hidden="true">
                ↓
              </span>
              <span aria-live="polite">
                {t(phase === "idle" ? text.enter : text.printing)}
              </span>
            </div>
            <span className="skip-spacer" aria-hidden="true" />
          </div>
        </div>
      )}
      {phase !== "done" && (
        <button className="skip intro-skip" onClick={skip}>
          {t(text.skip)} <Arrow />
        </button>
      )}
      <div
        className={`portfolio ${phase === "revealing" ? "is-revealing" : ""}`}
        inert={phase !== "done"}
        data-testid="portfolio"
      >
        <header className="header">
          <a className="wordmark" href="#home" aria-label="Akilis Le Quellec">
            AKILIS<span>®</span>
          </a>
          <nav
            className={menu ? "open" : ""}
            aria-label={
              lang === "fr" ? "Navigation principale" : "Main navigation"
            }
          >
            {nav.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenu(false)}>
                {t(label)}
              </a>
            ))}
            <a
              href="#contact"
              className="nav-contact"
              onClick={() => setMenu(false)}
            >
              {t(text.navContact)} <Arrow />
            </a>
          </nav>
          <button
            className="menu-toggle"
            aria-label={t(text.menu)}
            aria-expanded={menu}
            onClick={() => setMenu((v) => !v)}
          >
            {menu ? "×" : "☰"}
          </button>
        </header>
        <main id="home">
          <section className="hero section-wrap">
            <div className="hero-meta">
              <span>
                <i className="status-dot" />
                {t(text.status)}
              </span>
              <span>48°51′ N — 2°21′ E</span>
            </div>
            <div className="hero-grid">
              <div className="hero-copy">
                <p className="eyebrow">{t(text.role)}</p>
                <h1 ref={heroRef} tabIndex={-1}>
                  AKILIS
                  <br />
                  <span>LE QUELLEC</span>
                  <sup>®</sup>
                </h1>
                <div className="hero-position">
                  <span className="asterisk">✳</span>
                  <h2>
                    {t(text.heroA)}
                    <br />
                    {t(text.heroB)}
                  </h2>
                </div>
                <p className="hero-description">{t(text.heroDesc)}</p>
                <a href="#projects" className="pill dark">
                  {t(text.explore)} <Arrow />
                </a>
              </div>
              <div className="hero-visual">
                <div className="portrait-frame">
                  <img
                    src="/media/portrait.webp"
                    width="877"
                    height="884"
                    fetchPriority="high"
                    alt={t(text.portraitAlt)}
                  />
                  <span className="portrait-caption">AKL — 01 / PARIS</span>
                </div>
                <div className="portrait-sticker" aria-hidden="true">
                  {lang === "fr" ? (
                    <>
                      CODER.
                      <br />
                      RELIER.
                      <br />
                      CRÉER.
                    </>
                  ) : (
                    <>
                      CODE.
                      <br />
                      CONNECT.
                      <br />
                      CREATE.
                    </>
                  )}
                  <span>
                    <Arrow />
                  </span>
                </div>
                <span className="visual-caption">
                  {t(text.location)} <span>© 2026</span>
                </span>
              </div>
            </div>
            <div className="hero-bottom">
              <span>{t(text.scroll)} ↓</span>
              <div>
                <span>TECH & DATA</span>
                <span>BUSINESS & FINANCE</span>
                <span>
                  {lang === "fr" ? "PRISE DE PAROLE" : "PUBLIC SPEAKING"}
                </span>
              </div>
              <span>(01—07)</span>
            </div>
          </section>
          <div className="ticker" aria-hidden="true">
            <div>
              {lang === "fr" ? "CODE & CURIOSITÉ" : "CODE & CURIOSITY"}{" "}
              <span>✳</span>{" "}
              {lang === "fr" ? "FINANCE & IDÉES" : "FINANCE & IDEAS"}{" "}
              <span>✳</span>{" "}
              {lang === "fr" ? "COLLECTIF & ÉNERGIE" : "PEOPLE & ENERGY"}{" "}
              <span>✳</span>{" "}
              {lang === "fr" ? "CODE & CURIOSITÉ" : "CODE & CURIOSITY"}{" "}
              <span>✳</span>{" "}
              {lang === "fr" ? "FINANCE & IDÉES" : "FINANCE & IDEAS"}{" "}
              <span>✳</span>
            </div>
          </div>
          <section id="facets" className="section-wrap section facets reveal">
            <div className="section-label">
              <span>01 / {t(text.navFacets)}</span>
              <span>
                <Arrow />
              </span>
            </div>
            <div className="section-heading">
              <h2>
                {t(text.facetsTitle)}
                <br />
                <span className="muted">{t(text.facetsSub)}</span>
              </h2>
              <p>{t(text.facetsIntro)}</p>
            </div>
            <div
              className="facet-tabs"
              role="tablist"
              aria-label={t(text.navFacets)}
            >
              {facets.map((f, i) => (
                <button
                  role="tab"
                  id={`facet-tab-${i}`}
                  aria-controls={`facet-panel-${i}`}
                  aria-selected={facet === i}
                  tabIndex={facet === i ? 0 : -1}
                  key={i}
                  className={facet === i ? "active" : ""}
                  onClick={() => setFacet(i)}
                  onKeyDown={(e) => {
                    if (
                      ["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)
                    ) {
                      e.preventDefault();
                      const next =
                        e.key === "Home"
                          ? 0
                          : e.key === "End"
                            ? 2
                            : (i + (e.key === "ArrowRight" ? 1 : 2)) % 3;
                      setFacet(next);
                      document.getElementById(`facet-tab-${next}`)?.focus();
                    }
                  }}
                >
                  <span className="facet-number">0{i + 1}</span>
                  <span>{t(f.title)}</span>
                  <Arrow />
                </button>
              ))}
            </div>
            <div
              key={facet}
              id={`facet-panel-${facet}`}
              className={`facet-panel facet-${facet}`}
              role="tabpanel"
              aria-labelledby={`facet-tab-${facet}`}
            >
              <div className="facet-art" aria-hidden="true">
                {facet === 0 ? (
                  <>
                    <div className="code-window">
                      <span>
                        ● ● ● <i>hello_world.py</i>
                      </span>
                      <pre>
                        <em>def</em> build_ideas():
                        <br /> curiosity = <b>True</b>
                        <br /> <em>while</em> curiosity:
                        <br /> learn()
                        <br /> create()
                        <br /> <b>share()</b>
                        <br />
                        <br />
                        <span>▌</span>
                      </pre>
                    </div>
                    <span className="art-float">{"</>"}</span>
                  </>
                ) : facet === 1 ? (
                  <>
                    <div className="finance-paper">
                      <span>
                        {lang === "fr"
                          ? "LA VUE D’ENSEMBLE"
                          : "THE BIG PICTURE"}
                      </span>
                      <strong>
                        f(x) =<br />
                        insight.
                      </strong>
                      <div className="finance-bars">
                        {[28, 49, 40, 70, 60, 90].map((h, i) => (
                          <i key={i} style={{ height: h }} />
                        ))}
                      </div>
                      <small>
                        {lang === "fr"
                          ? "ANALYSE → DÉCISION"
                          : "ANALYSIS → DECISION"}
                      </small>
                    </div>
                    <span className="art-float">
                      <Arrow />
                    </span>
                  </>
                ) : (
                  <>
                    <img src="/media/solen.webp" alt="" loading="lazy" />
                    <span className="speaking-tag">
                      {lang === "fr" ? "PRENDRE LA PAROLE." : "LET’S TALK."}
                    </span>
                  </>
                )}
              </div>
              <div className="facet-copy">
                <span className="eyebrow">
                  0{facet + 1} / {t(facets[facet].title)}
                </span>
                <h3>{t(facets[facet].label)}</h3>
                <p>{t(facets[facet].body)}</p>
                <div className="tags">
                  {facets[facet].tags.map((tag) => (
                    <span key={tag}>
                      {tag.replace(
                        "Brésil / Brazil",
                        lang === "fr" ? "Brésil" : "Brazil",
                      )}
                    </span>
                  ))}
                </div>
                <a className="text-link" href={facets[facet].link}>
                  {t(facets[facet].related)} <Arrow />
                </a>
              </div>
            </div>
            <div className="tools">
              <span>{t(text.skills)}</span>
              <div>
                <span>
                  <Icon icon={faPython} /> Python
                </span>
                <span>
                  <img src="/media/c.svg" alt="" /> C
                </span>
                <span>
                  <img src="/media/gnubash.svg" alt="" /> Bash
                </span>
                <span>
                  <Icon icon={faGitAlt} /> Git
                </span>
                <span>
                  <img src="/media/microsoftexcel.svg" alt="" /> Excel / VBA
                </span>
                <span>
                  <img src="/media/powerbi.svg" alt="" /> Power BI
                </span>
              </div>
            </div>
          </section>
          <section
            id="projects"
            className="section-wrap section projects reveal"
          >
            <div className="section-label">
              <span>02 / {t(text.navProjects)}</span>
              <span>(02)</span>
            </div>
            <div className="section-heading">
              <h2>{t(text.projectsTitle)}</h2>
              <p>{t(text.projectsIntro)}</p>
            </div>
            <div className="project-grid">
              {projects.map((p, i) => (
                <button
                  className={`project-card project-${i}`}
                  key={p.name}
                  onClick={() => setProject(i)}
                  aria-label={`${t(text.viewProject)} — ${p.name}`}
                >
                  <div className="project-image">
                    {p.image ? (
                      <img
                        src={`/media/${p.image}.webp`}
                        width="1206"
                        height="1704"
                        loading="lazy"
                        alt={t(text.pitchAlt)}
                      />
                    ) : (
                      <div className="next-art">
                        <span className="next-kicker">
                          {lang === "fr"
                            ? "LE PROCHAIN MOUVEMENT."
                            : "THE NEXT MOVE."}
                        </span>
                        <div className="orbit one" />
                        <div className="orbit two" />
                        <strong>
                          N
                          <span>
                            <Arrow />
                          </span>
                        </strong>
                        <small>
                          {lang === "fr"
                            ? "STRATÉGIE / ANALYSE / DÉCISIONS"
                            : "STRATEGY / ANALYSIS / DECISIONS"}
                        </small>
                      </div>
                    )}
                    <span className="project-open round">
                      <Arrow />
                    </span>
                    <span className="project-index">
                      0{i + 1} / {p.date}
                    </span>
                  </div>
                  <div className="project-info">
                    <div>
                      <p className="eyebrow">{t(p.tag)}</p>
                      <h3>{p.name}</h3>
                      <p>{t(p.desc)}</p>
                    </div>
                    <span aria-hidden="true">
                      <Arrow />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>
          <section id="journey" className="journey section">
            <div className="section-wrap">
              <div className="section-label">
                <span>03 / {t(text.navJourney)}</span>
                <span>
                  <Arrow />
                </span>
              </div>
              <div className="section-heading reveal">
                <h2>{t(text.journeyTitle)}</h2>
                <p>{t(text.journeySub)}</p>
              </div>
              <div className="journey-grid">
                <div className="reveal">
                  <h3 className="eyebrow">{t(text.education)}</h3>
                  {education.map((e, i) => (
                    <article className="timeline-row" key={i}>
                      <span className="timeline-date">{t(e.date)}</span>
                      <div>
                        <h4>{e.name}</h4>
                        <p>{t(e.role)}</p>
                      </div>
                    </article>
                  ))}
                </div>
                <div className="reveal">
                  <h3 className="eyebrow">{t(text.experience)}</h3>
                  {experience.map((e, i) => (
                    <details className="timeline-row experience-row" key={i}>
                      <summary>
                        <span className="timeline-date">{t(e.date)}</span>
                        <h4>{e.name}</h4>
                        <p>{t(e.role)}</p>
                        <span className="details-plus">+</span>
                      </summary>
                      <p>{t(e.body)}</p>
                    </details>
                  ))}
                  <div className="journey-note">
                    <span>✳</span>
                    <p>
                      {lang === "fr"
                        ? "Apprendre dans un domaine. Faire des liens avec les autres."
                        : "Learn in one field. Connect it to the others."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section
            id="certifications"
            className="section-wrap section certificates reveal"
          >
            <div className="section-label">
              <span>
                04 / {lang === "fr" ? "Certifications" : "Certifications"}
              </span>
              <span>
                <Arrow />
              </span>
            </div>
            <div className="section-heading">
              <h2>{t(text.certificates)}</h2>
              <p>{t(text.certSub)}</p>
            </div>
            <div className="cert-grid">
              {certs.map((c, i) => (
                <article
                  className={`cert ${flipped[i] ? "flipped" : ""}`}
                  key={c.name}
                >
                  <div className="cert-turn">
                    <div
                      className="cert-front"
                      inert={flipped[i]}
                      aria-hidden={flipped[i]}
                    >
                      <div className={`cert-brand brand-${i}`}>
                        <img
                          src={`/media/${c.img}-mark.webp`}
                          alt={c.org}
                          width={i === 0 ? 124 : 95}
                          height={i === 0 ? 63 : 70}
                        />
                      </div>
                      <span className="eyebrow">{c.org}</span>
                      <h3>{c.name}</h3>
                      <time dateTime={c.date}>
                        {new Intl.DateTimeFormat(
                          lang === "fr" ? "fr-FR" : "en-GB",
                          { dateStyle: "long", timeZone: "UTC" },
                        ).format(new Date(c.date))}
                      </time>
                      <button
                        className="cert-flip"
                        aria-label={`${t(text.flip)} — ${c.name}`}
                        aria-pressed={flipped[i]}
                        onClick={() =>
                          setFlipped((a) => a.map((v, j) => (j === i ? !v : v)))
                        }
                      >
                        {t(text.flip)} <span>↻</span>
                      </button>
                    </div>
                    <div
                      className="cert-back"
                      inert={!flipped[i]}
                      aria-hidden={!flipped[i]}
                    >
                      <span className="eyebrow">
                        COURSERA / {i === 0 ? "YALE" : "CFI"}
                      </span>
                      <h3>{c.name}</h3>
                      <p>{t(c.type)}</p>
                      <button
                        className="pill dark"
                        onClick={() => {
                          setCertZoom(false);
                          setCertificate(i);
                        }}
                      >
                        {t(text.viewCert)} <Arrow />
                      </button>
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-link"
                      >
                        {t(text.verify)} <Arrow />
                      </a>
                      <button
                        className="cert-unflip"
                        aria-label={t(text.flip)}
                        onClick={() =>
                          setFlipped((a) =>
                            a.map((v, j) => (j === i ? false : v)),
                          )
                        }
                      >
                        ↶
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section id="beyond" className="section-wrap section beyond reveal">
            <div className="section-label">
              <span>05 / {t(text.outside)}</span>
              <span>✳</span>
            </div>
            <div className="section-heading">
              <h2>{t(text.outside)}</h2>
              <p>{t(text.outsideSub)}</p>
            </div>
            <div className="gallery">
              <figure>
                <div className="gallery-image">
                  <img
                    src="/media/solen.webp"
                    width="1206"
                    height="1704"
                    loading="lazy"
                    alt={t(text.pitchAlt)}
                  />
                  <span>01 / {lang === "fr" ? "PAROLE" : "VOICE"}</span>
                </div>
                <figcaption>
                  {t(text.pitch)} <span>2026</span>
                </figcaption>
              </figure>
              <figure>
                <div className="gallery-image">
                  <img
                    src="/media/podium.webp"
                    width="1200"
                    height="1600"
                    loading="lazy"
                    alt={t(text.podiumAlt)}
                  />
                  <span>02 / {lang === "fr" ? "DÉPASSEMENT" : "DRIVE"}</span>
                </div>
                <figcaption>
                  {t(text.podium)} <span>BR</span>
                </figcaption>
              </figure>
            </div>
            <div className="community">
              <h3>{t(text.community)}</h3>
              <div>
                <article>
                  <h4>{t(text.animate)}</h4>
                  <p>{t(text.animateBody)}</p>
                </article>
                <article>
                  <h4>{t(text.restos)}</h4>
                  <p>{t(text.restosBody)}</p>
                </article>
              </div>
            </div>
          </section>
          <section id="contact" className="contact">
            <div className="section-wrap">
              <div className="section-label">
                <span>06 / CONTACT</span>
                <span>{t(text.location)}</span>
              </div>
              <div className="contact-main reveal">
                <p className="eyebrow">{t(text.contactSub)}</p>
                <h2>{t(text.contactTitle)}</h2>
                <a className="contact-mail" href="mailto:akilis.leq@gmail.com">
                  <img src="/media/gmail.svg" alt="Gmail" />
                  akilis.leq@gmail.com <Arrow />
                </a>
                <div className="contact-links">
                  <a
                    href="https://www.linkedin.com/in/akilis-le-quellec/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon icon={faLinkedinIn} /> LinkedIn <Arrow />
                  </a>
                  <a
                    href="https://github.com/akls-lq"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon icon={faGithub} /> GitHub <Arrow />
                  </a>
                  {readyCV ? (
                    <a href="/cv/Akilis_Le_Quellec_CV_Public.pdf" download>
                      CV PDF ↓
                    </a>
                  ) : (
                    <span
                      className="cv-coming"
                      title={t(text.cvNote)}
                      aria-disabled="true"
                    >
                      {t(text.cv)} <Arrow />
                    </span>
                  )}
                </div>
              </div>
              <div className="social-row">
                <p>{t(text.future)}</p>
                <div>
                  {[
                    [faInstagram, "Instagram"],
                    [faTiktok, "TikTok"],
                    [faYoutube, "YouTube"],
                    [faSnapchat, "Snapchat"],
                  ].map(([icon, name]) => (
                    <span
                      className="future-social"
                      key={String(name)}
                      aria-label={`${name} — ${t(text.soon)}`}
                    >
                      <Icon icon={icon as typeof faInstagram} />
                      <span>
                        {String(name)}
                        <small>{t(text.soon)}</small>
                      </span>
                    </span>
                  ))}
                </div>
              </div>
              <footer>
                <span>© 2026 AKILIS LE QUELLEC</span>
                <span>{t(text.footer)}</span>
                <button onClick={restart}>{t(text.replay)} ↻</button>
                <a href="#home" aria-label={t(text.top)}>
                  ↑
                </a>
              </footer>
            </div>
          </section>
        </main>
      </div>
      {project !== null && (
        <Modal close={() => setProject(null)} label={t(text.close)}>
          <div className="project-modal">
            <span className="eyebrow">{t(projects[project].tag)} / 2026</span>
            <h2>{projects[project].name}</h2>
            <p>{t(projects[project].body)}</p>
            {project === 0 && (
              <>
                <img src="/media/solen.webp" alt={t(text.pitchAlt)} />
                <div className="modal-links">
                  <a
                    className="pill dark"
                    href="https://solen-demo.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t(text.demo)} <Arrow />
                  </a>
                  <a
                    className="text-link"
                    href="https://github.com/akls-lq/Solen"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon icon={faGithub} /> {t(text.source)} <Arrow />
                  </a>
                </div>
              </>
            )}
          </div>
        </Modal>
      )}
      {certificate !== null && (
        <Modal close={() => setCertificate(null)} label={t(text.close)}>
          <div className="certificate-modal">
            <h2>{certs[certificate].name}</h2>
            <p>{t(certs[certificate].type)}</p>
            <button
              className={`certificate-zoom ${certZoom ? "zoomed" : ""}`}
              aria-label={
                lang === "fr"
                  ? certZoom
                    ? "Réduire le certificat"
                    : "Agrandir le certificat"
                  : certZoom
                    ? "Zoom out of certificate"
                    : "Zoom into certificate"
              }
              aria-pressed={certZoom}
              onClick={() => setCertZoom((v) => !v)}
            >
              <img
                src={`/media/${certs[certificate].img}.webp`}
                alt={`${t(text.certAlt)} — ${certs[certificate].name}`}
              />
              <span aria-hidden="true">{certZoom ? "−" : "+"}</span>
            </button>
            <a
              className="text-link"
              href={certs[certificate].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t(text.verify)} <Arrow />
            </a>
          </div>
        </Modal>
      )}
    </>
  );
}
