export type Lang = "fr" | "en";
export type Copy = readonly [string, string];
export const text = {
  enter: [
    "Clique n’importe où pour découvrir mon univers",
    "Click anywhere to enter",
  ],
  skip: ["Passer l’intro", "Skip intro"],
  replay: ["Revoir l’intro", "Replay intro"],
  printing: [
    "Un instant, les idées prennent forme…",
    "One moment, ideas are taking shape…",
  ],
  welcome: ["Bienvenue dans mon univers.", "Welcome to my world."],
  introSub: [
    "Du code. Des idées. Et un peu d’audace.",
    "Code. Ideas. And a little audacity.",
  ],
  navFacets: ["Les facettes", "The facets"],
  navProjects: ["Projets", "Projects"],
  navJourney: ["Parcours", "Journey"],
  navContact: ["Parlons-nous", "Let’s talk"],
  role: ["42 Paris × ICN Business School", "42 Paris × ICN Business School"],
  heroA: ["Curieux de nature.", "Curious by nature."],
  heroB: ["Hybride par choix.", "Hybrid by choice."],
  heroDesc: [
    "J’explore les liens entre technologie, finance et communication. Et je transforme cette curiosité en projets concrets.",
    "I explore the connections between technology, finance and communication. And turn that curiosity into real projects.",
  ],
  explore: ["Explorer mes projets", "Explore my projects"],
  scroll: ["Défiler pour découvrir", "Scroll to discover"],
  location: ["Paris, France", "Paris, France"],
  status: [
    "Étudiant. Toujours en mouvement.",
    "Student. Always moving forward.",
  ],
  facetsTitle: ["Trois facettes.", "Three facets."],
  facetsSub: ["Un même élan.", "One shared drive."],
  facetsIntro: [
    "La technique pour construire. L’analyse pour comprendre. La parole pour partager.",
    "Technology to build. Analysis to understand. A voice to share.",
  ],
  detail: ["Explorer cette facette", "Explore this facet"],
  related: ["Sur le terrain", "In practice"],
  skills: ["Langages & outils", "Languages & tools"],
  interests: ["Domaines de pratique & d’intérêt", "Practice & interests"],
  projectsTitle: ["Des idées à l’action.", "From ideas to action."],
  projectsIntro: [
    "Deux terrains de jeu. Une même envie de faire.",
    "Two playgrounds. One desire to make things happen.",
  ],
  viewProject: ["Découvrir le projet", "Explore the project"],
  close: ["Fermer", "Close"],
  demo: ["Voir la démo", "View demo"],
  source: ["Code source", "Source code"],
  journeyTitle: ["Le chemin se construit.", "A path in the making."],
  journeySub: [
    "Entre lignes de code, lignes de chiffres et rencontres.",
    "Between lines of code, numbers and the people I meet.",
  ],
  education: ["Formation", "Education"],
  experience: ["Expériences", "Experience"],
  certificates: ["Apprendre, puis aller plus loin.", "Learn, then go further."],
  certSub: [
    "Deux certifications. Des acquis qui se croisent.",
    "Two certifications. Connected skills.",
  ],
  flip: ["Retourner la carte", "Flip the card"],
  viewCert: ["Voir le certificat", "View certificate"],
  verify: ["Vérifier sur Coursera", "Verify on Coursera"],
  yaleType: [
    "MOOC proposé par Yale sur Coursera — pas un diplôme universitaire.",
    "Online course offered by Yale on Coursera — not a university degree.",
  ],
  cfiType: [
    "Spécialisation Coursera proposée par Corporate Finance Institute.",
    "Coursera specialization offered by Corporate Finance Institute.",
  ],
  outside: ["Au-delà de l’écran.", "Beyond the screen."],
  outsideSub: [
    "Prendre la parole. Se dépasser. Faire ensemble.",
    "Speak up. Push further. Work together.",
  ],
  pitch: ["Présenter SOLEN, en équipe.", "Presenting SOLEN, as a team."],
  podium: [
    "1re place · Championnat du Sud du Brésil · CBJJE",
    "1st place · South Brazil championship · CBJJE",
  ],
  community: ["L’énergie du collectif.", "The energy of a team."],
  animate: ["Vice-président · ANIMATE ICN", "Vice President · ANIMATE ICN"],
  animateBody: [
    "Sept. 2024 — juil. 2025. Coordination Paris/Nancy, événements et engagement associatif.",
    "Sep 2024 — Jul 2025. Paris/Nancy coordination, events and community engagement.",
  ],
  restos: ["Bénévole · Les Restos du Cœur", "Volunteer · Les Restos du Cœur"],
  restosBody: [
    "Nov. 2023 — oct. 2024. Un engagement dans l’aide humanitaire.",
    "Nov 2023 — Oct 2024. A commitment to humanitarian support.",
  ],
  contactTitle: ["Et si on échangeait ?", "Let’s start a conversation."],
  contactSub: [
    "Un projet, une idée, une rencontre. Ma boîte mail est ouverte.",
    "A project, an idea, a new connection. My inbox is open.",
  ],
  soon: ["Bientôt", "Coming soon"],
  future: [
    "La suite se prépare aussi ici.",
    "The next chapter is taking shape here, too.",
  ],
  cv: ["CV public bientôt disponible", "Public résumé coming soon"],
  cvNote: [
    "Le PDF public sera ajouté ici. En attendant, faisons connaissance.",
    "The public PDF will be added here. In the meantime, let’s connect.",
  ],
  top: ["Retour en haut", "Back to top"],
  footer: [
    "Pensé avec curiosité. Construit avec soin.",
    "Thought with curiosity. Built with care.",
  ],
  portraitAlt: [
    "Portrait d’Akilis Le Quellec en costume, devant une fenêtre",
    "Portrait of Akilis Le Quellec in a suit, by a window",
  ],
  pitchAlt: [
    "Akilis présentant SOLEN au micro pendant le hackathon",
    "Akilis presenting SOLEN with a microphone during the hackathon",
  ],
  podiumAlt: [
    "Akilis sur le podium du championnat de jiu-jitsu brésilien",
    "Akilis on the podium at the Brazilian jiu-jitsu championship",
  ],
  certAlt: ["Certificat original", "Original certificate"],
  menu: ["Ouvrir la navigation", "Open navigation"],
} satisfies Record<string, Copy>;
export const facets: {
  title: Copy;
  label: Copy;
  body: Copy;
  tags: string[];
  related: Copy;
  link: string;
}[] = [
  {
    title: ["Tech, dev & IA", "Tech, dev & AI"],
    label: ["Construire.", "Build."],
    body: [
      "À 42 Paris, j’apprends à résoudre, tester et recommencer. C, Python, Shell et Git sont mes outils ; la data et l’IA, mes terrains d’exploration.",
      "At 42 Paris, I learn to solve, test and try again. C, Python, Shell and Git are my tools; data and AI are my areas of exploration.",
    ],
    tags: ["C", "Python", "Shell / Bash", "Git"],
    related: [
      "SOLEN · prototypage, tests et pitch en équipe",
      "SOLEN · prototyping, testing and team pitch",
    ],
    link: "#projects",
  },
  {
    title: ["Business & finance", "Business & finance"],
    label: ["Comprendre.", "Understand."],
    body: [
      "À ICN, je relie analyse financière et compréhension du terrain. Du pilotage de fonds européens aux admissions, j’aime rendre l’information utile à la décision.",
      "At ICN, I connect financial analysis with real-world understanding. From European funds to admissions, I like making information useful for decisions.",
    ],
    tags: ["Excel / VBA", "Power BI", "Power Query", "Finance"],
    related: [
      "Next Challenge · gestion de portefeuille",
      "Next Challenge · portfolio management",
    ],
    link: "#projects",
  },
  {
    title: ["Image & prise de parole", "Identity & public speaking"],
    label: ["Partager.", "Share."],
    body: [
      "Un pitch au micro, un podium de jiu-jitsu, un projet associatif : autant de façons de sortir de ma zone de confort. La création de contenu sera la prochaine.",
      "A pitch on stage, a jiu-jitsu podium, a community project: different ways to step outside my comfort zone. Content creation will be next.",
    ],
    tags: ["Pitch", "JJB", "ANIMATE ICN", "Brésil / Brazil"],
    related: ["Moments forts & engagement", "Highlights & community"],
    link: "#beyond",
  },
];
export const projects = [
  {
    name: "SOLEN",
    tag: ["TECH / IA · PROJET D’ÉQUIPE", "TECH / AI · TEAM PROJECT"] as Copy,
    date: "2026",
    desc: [
      "La vigilance commence par un e-mail.",
      "Awareness starts with an email.",
    ] as Copy,
    body: [
      "Prototype d’assistance à la détection de fraude par e-mail et de demandes de virements suspects. Co-création, tests et présentation avec mon équipe au hackathon FINAXYS × Mistral AI, en octobre 2026.",
      "A prototype to assist with identifying fraudulent emails and suspicious transfer requests. Co-created, tested and presented with my team at the FINAXYS × Mistral AI hackathon in October 2026.",
    ] as Copy,
    tags: ["Python", "IA / AI", "Hackathon"],
    image: "solen",
  },
  {
    name: "Next Challenge",
    tag: [
      "FINANCE · GESTION DE PORTEFEUILLE",
      "FINANCE · PORTFOLIO MANAGEMENT",
    ] as Copy,
    date: "2026",
    desc: [
      "Analyser. Choisir. Prendre du recul.",
      "Analyse. Decide. Step back.",
    ] as Copy,
    body: [
      "Un challenge de gestion de portefeuille, en octobre 2026, pour mettre en pratique l’analyse financière et la prise de décision. Un projet finance : aucun résultat de performance non vérifié n’est revendiqué.",
      "A portfolio management challenge in October 2026, putting financial analysis and decision-making into practice. A finance project, with no unverified performance claims.",
    ] as Copy,
    tags: ["Finance", "Analyse / Analysis", "Portfolio"],
    image: null,
  },
];
export const education: { date: Copy; name: string; role: Copy }[] = [
  {
    date: ["2026 — 2028", "2026 — 2028"],
    name: "ICN Business School",
    role: [
      "Programme Grande École · Finance & Contrôle",
      "Master in Management · Finance & Control",
    ],
  },
  {
    date: ["Depuis août 2026", "Since August 2026"],
    name: "42 Paris",
    role: [
      "Informatique · C, Shell, algorithmique. Top 10 % à l’examen d’entrée.",
      "Computer science · C, Shell, algorithms. Top 10% in the entrance exam.",
    ],
  },
  {
    date: ["Juil. — déc. 2025", "Jul — Dec 2025"],
    name: "PUCPR · Curitiba, Brasil",
    role: [
      "Échange universitaire · Stratégie, innovation, entrepreneuriat et portugais.",
      "Academic exchange · Strategy, innovation, entrepreneurship and Portuguese.",
    ],
  },
  {
    date: ["2023 — 2026", "2023 — 2026"],
    name: "ICN Business School",
    role: [
      "Bachelor en Management · English Track · spécialisation finance",
      "Bachelor in Management · English Track · finance specialization",
    ],
  },
];
export const experience: {
  date: Copy;
  name: string;
  role: Copy;
  body: Copy;
}[] = [
  {
    date: ["Avr. — août 2026", "Apr — Aug 2026"],
    name: "Région Île-de-France",
    role: [
      "Assistant pilotage financier · Fonds européens",
      "Financial Steering Assistant · European Funds",
    ],
    body: [
      "Stage à Saint-Ouen. Suivi budgétaire, prévisions et automatisation Excel/VBA du traitement des CSF.",
      "Internship in Saint-Ouen. Budget monitoring, forecasting and Excel/VBA automation of CSF processing.",
    ],
  },
  {
    date: ["Mai — juil. 2025", "May — Jul 2025"],
    name: "IFFP",
    role: ["Assistant admissions", "Admissions Assistant"],
    body: [
      "Stage à Nanterre. Entretiens nationaux et internationaux, attestations d’inscription et tableaux de bord.",
      "Internship in Nanterre. National and international interviews, enrollment certificates and dashboards.",
    ],
  },
];
