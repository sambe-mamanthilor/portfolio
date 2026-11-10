/// <reference path="../pb_data/types.d.ts" />

/**
 * Migration : VERSION ANGLAISE des contenus.
 *
 * 1. Ajoute un champ anglais "_en" à côté de chaque texte affiché :
 *    projets (titre_en, resume_en, contexte_en…), étapes, expériences, catégories.
 *    Dans le back-office, chaque texte a donc sa version anglaise juste en dessous.
 * 2. Remplit ces champs avec la traduction des contenus actuels.
 *
 * Le site prend le champ "_en" sur les pages /en/… ; s'il est vide, il affiche
 * le français (une traduction oubliée ne casse jamais la page).
 * Les étapes sont retrouvées par projet + numéro d'ordre (leurs identifiants
 * changent d'un ordinateur à l'autre).
 */
const CHAMPS = {
  projets: [
    ["titre_en", "text", 160], ["titre_court_en", "text", 80], ["resume_en", "text", 300],
    ["role_en", "text", 400], ["couverture_alt_en", "text", 250],
    ["contexte_en", "editor"], ["objectifs_en", "editor"], ["resultat_en", "editor"],
    ["choix_techniques_en", "editor"], ["recul_en", "editor"], ["difficultes_en", "json"],
  ],
  etapes: [["titre_en", "text", 120], ["description_en", "editor"]],
  experiences: [
    ["poste_en", "text", 150], ["periode_en", "text", 80], ["structure_en", "text", 200],
    ["lieu_en", "text", 120], ["description_en", "editor"],
  ],
  categories: [["nom_en", "text", 60]],
};

const PROJETS = {
 "cielixir": {
  "resume": "A web app that recommends a drink based on real-time weather, the user’s cravings and profile.",
  "contexte": "<p>Semester team project of the BUT MMI degree, run in phases with a deliverable at each stage. The goal: build a smooth, personalised experience that queries an external weather API and filters a drinks database according to the user’s choices.</p>",
  "objectifs": "<ul><li>Recommend a drink suited to the weather and the user’s cravings</li><li>Offer a personalised experience (accounts, favourites, history)</li><li>Deliver a live app and a promotional landing page</li></ul>",
  "resultat": "<p>A live, working app: real-time weather, a 3-question quiz, a catalogue of 9 categories, user accounts, favourites and history, a landing page and complete legal pages.</p>",
  "role": "Project manager, working in a pair with Ruslana Budniak: coordination, deliverable planning and follow-up through to the final presentation. UX/UI design and development of the app, the landing page and the legal pages.",
  "choix_techniques": "<ul><li><strong>Astro</strong> for a fast, component-based site</li><li><strong>PocketBase</strong> for accounts, favourites and history</li><li><strong>Open-Meteo API</strong>, free and key-less, combined with geolocation and a city search</li><li><strong>Tailwind CSS</strong> for the interface</li></ul>",
  "recul": "<p>Being project manager taught me to break work down into deliverables and to anticipate delays rather than suffer them.</p><p>If I did it again, I would set up code reviews between the two of us earlier.</p>",
  "difficultes": [
   {
    "probleme": "Recommendations didn’t work when location access was denied",
    "cause": "Some browsers or visitors block geolocation",
    "solution": "A city search added as a fallback to geolocation"
   },
   {
    "probleme": "Favourites and history had to stay private",
    "cause": "Without rules, any account could read other users’ data",
    "solution": "PocketBase access rules: each user only sees their own records"
   },
   {
    "probleme": "Delivering at every phase as a pair",
    "cause": "Many parallel tasks and tight deadlines",
    "solution": "Work split into sprints and tasks tracked in Jira"
   }
  ]
 },
 "annees-chaudes": {
  "titre": "So, have hot years become the norm?",
  "titre_court": "Hot years – Data visualisation",
  "resume": "Data storytelling on how maximum temperatures have changed in Montbéliard and the Bourgogne-Franche-Comté region since 1959, based on Météo-France open data.",
  "contexte": "<p>Professional simulation project of the BUT MMI degree (SAÉ 303), “Climate change” challenge of the Open Data University. The question: have hot years become the norm in Montbéliard? Is this warming local or regional, and does it affect every season the same way?</p>",
  "objectifs": "<ul><li>Use reliable public data (Météo-France homogenised series)</li><li>Tell a clear story in 4 parts and 5 visualisations</li><li>Publish an accessible website and a reuse on data.gouv.fr</li></ul>",
  "resultat": "<p>A live website, an Observable notebook, a public GitHub repository and a reuse published on data.gouv.fr (the French government open data portal), <a href=\"https://www.data.gouv.fr/reuses/evolution-des-temperatures-maximales-a-montbeliard-et-en-bourgogne-franche-comte-depuis-1959\" target=\"_blank\" rel=\"noopener noreferrer\">“Évolution des températures maximales à Montbéliard et en Bourgogne-Franche-Comté depuis 1959”</a>. Key message: all 28 weather stations in the region have warmed (+1.19 to +1.58 °C), and summer and spring are warming about three times faster than autumn.</p>",
  "role": "In a pair with Ruslana Budniak: storytelling and visualisation design, Astro website development, deployment (Netlify, domain on Infomaniak) and publication of the reuse on data.gouv.fr.",
  "choix_techniques": "<ul><li><strong>Charts drawn at build time</strong> and delivered as SVG with no JavaScript, for performance; only the interactive chart is drawn in the browser</li><li><strong>Parameterised functions</strong>: each visualisation receives its data, and titles are computed from the data (no hand-typed figures)</li><li><strong>Accessibility</strong>: figure/figcaption, aria-label, keyboard-accessible tooltips, light and dark themes</li><li><strong>Problem solved</strong>: the gradient legend crashed on the server (JSDOM has no canvas); replaced with a clearer 4-class legend</li></ul>",
  "recul": "<p>Data doesn’t speak for itself: you have to choose a message, then build each chart to serve it.</p><p>I also got into the habit of computing every figure from the data instead of typing it by hand: the site stays correct if the data changes.</p>",
  "difficultes": [
   {
    "probleme": "The gradient legend crashed the site build",
    "cause": "Charts are drawn on the server with JSDOM, which has no canvas",
    "solution": "Replace the gradient with a clearer 4-class legend"
   },
   {
    "probleme": "Making the charts understandable without sight",
    "cause": "An SVG chart on its own isn’t read by screen readers",
    "solution": "Figure elements, aria-label descriptions and keyboard-accessible tooltips"
   }
  ],
  "couverture_alt": "Map of Bourgogne-Franche-Comté: change in average maximum temperature at 28 weather stations, from +1.19 to +1.58 °C between 1961-1990 and 1991-2020."
 },
 "olyvia": {
  "resume": "App concept supporting women through perimenopause and menopause: personalised tracking, reliable resources and a caring space to share.",
  "contexte": "<p>Professional simulation project (SAÉ 201-202) combining user research, communication strategy and digital creation, for an audience still rarely considered by digital tools.</p>",
  "objectifs": "<ul><li>Understand the target audience’s real needs through interviews</li><li>Design an identity and a website suited to this audience</li><li>Produce an advertorial video based on the testimonies collected</li></ul>",
  "resultat": "<p>A bilingual WordPress website, a complete user study (6 interviews, qualitative and quantitative analysis) and an advertorial built from real testimonies.</p>",
  "role": "Interviewer for the 6 user interviews, then creation, integration and hosting of the WordPress website.",
  "choix_techniques": "<ul><li><strong>WordPress</strong> hosted on Infomaniak, <strong>Astra</strong> theme for a clean interface</li><li><strong>Polylang</strong> for the French/English version</li><li><strong>Yoast SEO</strong> for search engines, <strong>WP Super Cache</strong> and <strong>Smush</strong> for performance</li><li><strong>Wordfence</strong> and <strong>Really Simple Security</strong> for security</li></ul>",
  "difficultes": [
   {
    "probleme": "Making the WordPress site bilingual",
    "cause": "The theme only handles one language by default",
    "solution": "Polylang plugin: translated pages and menus, language switcher"
   },
   {
    "probleme": "The site was slow to load",
    "cause": "Heavy images and pages generated on every visit",
    "solution": "Images optimised with Smush and caching with WP Super Cache"
   },
   {
    "probleme": "Protecting the people interviewed",
    "cause": "The interviews contained personal information",
    "solution": "Answers anonymised before analysis and publication"
   }
  ]
 },
 "la-cimade": {
  "titre": "La Cimade: visual identity redesign",
  "resume": "Redesign of the logo and visual identity of a French charity defending migrants’ rights: modernising its image while keeping its values of unity and solidarity.",
  "contexte": "<p>La Cimade had a strong activist identity, but dated graphics, inconsistent legibility across media and a limited graphic system. The goal: modernise its image without losing what makes it strong.</p>",
  "objectifs": "<ul><li>Keep the commitment and the human dimension</li><li>Avoid overly institutional graphics and clichéd symbols</li><li>Build a consistent graphic system</li></ul>",
  "resultat": "<p>A logo built on the idea of unity (joined hands at the heart of the name) and its brand guidelines, applied to an Instagram post and story, an A3 poster, a web banner and presentation slides.</p>",
  "role": "Full identity design: audit, benchmark, creative directions, logo, brand guidelines and applications.",
  "choix_techniques": "<ul><li><strong>Red #B22727</strong> for commitment and mobilisation, <strong>black</strong> for seriousness and stability</li><li><strong>Inter</strong> for optimal legibility on every medium</li><li>Legibility tests at small, medium and large sizes, and rules for prohibited uses</li></ul>",
  "difficultes": [
   {
    "probleme": "Choosing one direction among several ideas",
    "cause": "Two strong directions: unity and protest",
    "solution": "Benchmark, anti-direction and sketches to compare, then unity was chosen"
   },
   {
    "probleme": "The hands in the logo became illegible at small sizes",
    "cause": "Too much detail for an avatar or an icon",
    "solution": "Simplified shapes and legibility tests at several sizes"
   }
  ],
  "couverture_alt": "Final La Cimade logo: the word “Cimade” whose A is formed by four hands holding each other, a symbol of mutual aid, in black and red."
 },
 "elm-design": {
  "titre": "Elm Design: creating a design agency",
  "resume": "Full creation of a fictional graphic design and visual communication agency in Pontarlier, France, from positioning to visual identity and launch strategy.",
  "contexte": "<p>Professional simulation project (SAÉ 106): imagine a credible design company, from its positioning to its communication strategy, and present it in English to a jury.</p>",
  "objectifs": "<ul><li>Define a clear positioning: “Design, differently”</li><li>Create an elegant, simple, stable and modern visual identity</li><li>Build a realistic launch plan</li></ul>",
  "resultat": "<p>A complete identity applied to an Instagram post and story, Facebook and LinkedIn banners, a business card, a flyer and a poster, presented in English.</p>",
  "role": "Project Manager. Design of the logo, posters and the agency’s whole visual identity, with its social media and print applications.",
  "choix_techniques": "<ul><li><strong>Trello</strong> to organise the team and track deadlines</li><li><strong>SAS legal status</strong> for limited liability and flexible governance</li><li><strong>3-month strategy</strong>: visibility, engagement then conversion, with a “free logo” contest</li></ul>",
  "difficultes": [
   {
    "probleme": "Presenting the project in English",
    "cause": "Design and marketing vocabulary rarely practised orally",
    "solution": "A prepared glossary and team rehearsals of the presentation"
   },
   {
    "probleme": "Keeping a consistent identity across all media",
    "cause": "Many formats: social media, business card, flyer, poster",
    "solution": "Brand guidelines with rules for colours, fonts and margins"
   }
  ]
 },
 "festival-musique": {
  "titre": "Music festival: from audit to website",
  "resume": "From analysing an existing festival to creating a concept ranked among the class’s top 7, through to developing the La Fanfa’Comtoise website.",
  "contexte": "<p>A series of first-semester professional simulation projects (SAÉ) around a music festival in northern Franche-Comté, France: analyse, imagine, then build.</p>",
  "objectifs": "<ul><li>Analyse an existing festival’s communication</li><li>Create our own festival and its digital communication strategy</li><li>Design and develop a responsive website</li></ul>",
  "resultat": "<p>A festival concept ranked among the class’s top 7 projects, then a live responsive website for La Fanfa’Comtoise.</p>",
  "role": "Audit, creation of the “Les Rives du Territoire” concept and its communication strategy, then mockup, prototype and front-end integration of the La Fanfa’Comtoise website.",
  "choix_techniques": "<ul><li><strong>HTML, CSS and JavaScript</strong> with no framework</li><li>Accessible <strong>carousel</strong> and <strong>mobile menu</strong> (named navigation, labelled buttons)</li><li>Downloadable PDF programme</li></ul>",
  "difficultes": [
   {
    "probleme": "The menu didn’t fit on small screens",
    "cause": "Too many links for a single line on mobile",
    "solution": "A JavaScript burger menu, opened and closed on click"
   },
   {
    "probleme": "The carousel broke from one screen size to another",
    "cause": "Image widths set in pixels",
    "solution": "Percentage widths and responsive images"
   }
  ]
 },
 "empreintes-invisibles": {
  "titre": "The invisible footprints of science",
  "resume": "Educational website about Alice Recoque, a French pioneer of computing and AI, and about the Matilda effect.",
  "contexte": "<p>First individual semester project of the BUT MMI degree: bring a forgotten woman scientist into the spotlight and raise awareness of unequal recognition in science.</p>",
  "objectifs": "<ul><li>Mobile-first, bilingual French/English website</li><li>EcoIndex grade A</li><li>5 main content pieces and 8 secondary articles</li></ul>",
  "resultat": "<p>A live bilingual website (timeline of women scientists, film gallery, glossary, contact) and a complete communication report in French and English.</p>",
  "role": "Full design and build: research, bilingual communication report, mockup and website development.",
  "choix_techniques": "<ul><li><strong>HTML, CSS and JavaScript</strong>, mobile-first design</li><li>Digital sobriety: lightweight images and restrained animations</li><li>Documented approach: GANTT, SWOT, DEEPLIST, persona, sitemap, storyboard</li></ul>",
  "difficultes": [
   {
    "probleme": "Reaching an EcoIndex A grade",
    "cause": "Images too heavy for a lightweight page",
    "solution": "Compressed and resized images, no unnecessary framework"
   },
   {
    "probleme": "Offering the whole site in French and English",
    "cause": "Each page existed in one language only",
    "solution": "Separate /fr/ and /en/ pages, with a language switch button"
   }
  ]
 },
 "micro-trottoir": {
  "titre": "Vox pop: the Montbéliard Christmas market",
  "resume": "Bilingual video report filmed at the Montbéliard Christmas market: shooting, translation, dubbing and editing.",
  "contexte": "<p>Professional simulation project (SAÉ 104): produce a vox pop video around the question “What do you think of the Montbéliard Christmas market?”, with a bilingual version.</p>",
  "objectifs": "<ul><li>Master outdoor filming (framing, sound, light)</li><li>Respect image rights</li><li>Produce a bilingual French/English version</li></ul>",
  "resultat": "<p>A vox pop edited in two versions, French and English, with image-rights releases from everyone interviewed.</p>",
  "role": "Filming (framing, sound recording, image-rights releases), English translation and dubbing, French introduction and conclusion, written report.",
  "choix_techniques": "<ul><li>JVC camera, Rode Reporter handheld mic, XLR cable, headphones</li><li>Uncompressed PCM sound, white balance, manual focus</li><li>Editing and dubbing in <strong>DaVinci Resolve</strong></li></ul>",
  "difficultes": [
   {
    "probleme": "The sound was drowned out by the market noise",
    "cause": "Filming outdoors, in the middle of the crowd",
    "solution": "Rode Reporter mic held close to the person interviewed"
   },
   {
    "probleme": "The English dubbing didn’t match the footage",
    "cause": "A translated sentence isn’t the same length as in French",
    "solution": "Shortened translation to keep the rhythm of each answer"
   },
   {
    "probleme": "Filming passers-by while respecting their rights",
    "cause": "Image rights require their consent",
    "solution": "Permission asked before each take"
   }
  ]
 },
 "visages-de-montbeliard": {
  "titre": "The faces of Montbéliard",
  "resume": "A series of three vector-illustrated posters showcasing Montbéliard’s landmark buildings.",
  "contexte": "<p>Art culture coursework: depict Montbéliard’s landmark buildings in a poster series for the Pays de Montbéliard tourist office.</p>",
  "objectifs": "<ul><li>Illustrate real buildings in vector</li><li>Design a consistent series: one colour and one tagline per poster</li></ul>",
  "resultat": "<p>A series of three posters united by the subtitle “Les visages de Montbéliard” (The faces of Montbéliard):</p><ul><li><strong>L’héritage des hauteurs</strong> (The legacy of the heights): Montbéliard castle</li><li><strong>Entre pierre &amp; ciel</strong> (Between stone &amp; sky): the domed Art Nouveau “Lion Peugeot” building</li><li><strong>Mémoire de pierre</strong> (Memory in stone): the castle’s second building, at the back</li></ul>",
  "role": "Full design and illustration of the series.",
  "choix_techniques": "<ul><li>Vector illustration in <strong>Affinity</strong> from reference photos</li><li>Three taglines: “L’héritage des hauteurs”, “Entre pierre & ciel”, “Mémoire de pierre”</li></ul>",
  "difficultes": [
   {
    "probleme": "The buildings were too detailed to draw",
    "cause": "Façades rich in ornaments and windows",
    "solution": "Simplification into geometric vector shapes"
   },
   {
    "probleme": "Turning the 3 posters into a true series",
    "cause": "Each building has its own colours and proportions",
    "solution": "Shared palette, typography and layout across the three posters"
   }
  ],
  "couverture_alt": "“Entre pierre & ciel” poster: Montbéliard’s Art Nouveau tower with its green dome, against a blue sky."
 },
 "tiktak": {
  "titre": "TiK•TaK — watch configurator",
  "resume": "Online watch configurator: build your watch in 5 steps or describe it in one sentence to the AI, then save it and order it.",
  "contexte": "<p>Professional simulation project of the BUT MMI degree (SAÉ 301): “Design and develop a user experience”. The brief: create the online configurator of a fictional watch brand, TiK•TaK (made in France, minimalist style, aged 25-40 target), and involve users in creating their own model.</p>",
  "objectifs": "<ul><li>Build, customise, save and order a watch; find, edit and delete your creations; track your orders</li><li>Configure a watch in natural language using AI</li><li>Reach a 3% conversion rate within 6 months through 6 marketing nudges, each linked to a cognitive bias</li><li>Deploy the site on a server, with Google sign-in</li></ul>",
  "resultat": "<p>A live, bilingual site (French and English): 5-step configurator with live preview, “on the wrist” view, AI creation, Google or email accounts, “My watches”, orders and history, dark mode. Hosted on the university’s VPS over HTTPS, with automatic deployment on every push via GitHub Actions.</p>",
  "role": "From story map to launch: UX/UI design (Figma), database, full-stack development and deployment on a Linux server.",
  "choix_techniques": "<ul><li><strong>Journey before interface</strong>: story map, brand guidelines, then desktop and mobile Figma mockups</li><li><strong>AI rather than a quiz</strong>: an AI block with clickable examples replaces a three-screen quiz</li><li><strong>Constrained AI</strong>: its answer follows a JSON schema that only accepts real components from the database, so it can’t invent products</li><li><strong>Security</strong>: Zod validation, price recalculated by the server, IDOR protection, AI rate limiting</li><li><strong>SVG watch</strong> generated by a single function, on the server and in the browser, with unique IDs to display several watches on one page</li></ul>",
  "recul": "<p>Starting with the story map and the user journey saved me time on the interface: I knew what to build before opening Figma.</p><p>In 4 days, I learned to prioritise: core features and deployment first, polish second.</p>",
  "difficultes": [
   {
    "probleme": "Watches on the same page “stole” each other’s colours and gradients",
    "cause": "The provided SVG reuses the same classes and IDs in every copy",
    "solution": "Rename classes and IDs for each watch so every SVG is independent"
   },
   {
    "probleme": "The AI could suggest components that don’t exist",
    "cause": "Free-text answer",
    "solution": "A JSON schema that only accepts database IDs, plus a fallback"
   },
   {
    "probleme": "The site redirected to another of my projects, with a certificate error",
    "cause": "The Apache server used another site’s configuration",
    "solution": "A dedicated virtual host for the project, then an HTTPS certificate"
   },
   {
    "probleme": "The service wouldn’t start",
    "cause": "Wrong Bun path in the systemd file",
    "solution": "Fix the path and reload the service"
   },
   {
    "probleme": "Dark mode was “all black”",
    "cause": "Nearly identical backgrounds, black watches invisible",
    "solution": "A multi-level charcoal-brown palette and a glow around the watches"
   },
   {
    "probleme": "The on-the-wrist view wasn’t convincing",
    "cause": "A plain colour band for the arm",
    "solution": "A hand drawn in SVG, skin tones, strap cut at the edges of the wrist"
   }
  ],
  "couverture_alt": "TiK•TaK home page: the headline “Time, in your image.” next to a black watch with a round dial, on a cream background."
 }
};

const ETAPES = [
 {
  "projet": "la-cimade",
  "ordre": 1,
  "titre": "Audit",
  "description": "<p>Analysis of the existing logo: strengths, weaknesses, colours and typography.</p>"
 },
 {
  "projet": "la-cimade",
  "ordre": 2,
  "titre": "Benchmark",
  "description": "<p>Study of the identities of France Terre d’Asile and Amnesty International.</p>"
 },
 {
  "projet": "la-cimade",
  "ordre": 3,
  "titre": "Creative directions",
  "description": "<p>Two directions, Unity and Protest, and an anti-direction: cold institutional communication.</p>"
 },
 {
  "projet": "la-cimade",
  "ordre": 4,
  "titre": "Research",
  "description": "<p>Hand sketches, then digital explorations.</p>"
 },
 {
  "projet": "la-cimade",
  "ordre": 5,
  "titre": "Logo and guidelines",
  "description": "<p>Unity direction chosen, final logo, colours, typography, usage rules and applications.</p>"
 },
 {
  "projet": "elm-design",
  "ordre": 1,
  "titre": "Positioning",
  "description": "<p>The agency’s services, values and tagline.</p>"
 },
 {
  "projet": "elm-design",
  "ordre": 2,
  "titre": "Visual identity",
  "description": "<p>Logo, colours and applications built around four words: elegance, simplicity, stability, modernity.</p>"
 },
 {
  "projet": "elm-design",
  "ordre": 3,
  "titre": "Organisation",
  "description": "<p>Project management in Trello, workflow, budget and choice of legal status.</p>"
 },
 {
  "projet": "elm-design",
  "ordre": 4,
  "titre": "Launch strategy",
  "description": "<p>3-month communication plan and presentation in English.</p>"
 },
 {
  "projet": "festival-musique",
  "ordre": 1,
  "titre": "Audit",
  "description": "<p>Analysis of an existing festival’s web communication (SAÉ 101).</p>"
 },
 {
  "projet": "festival-musique",
  "ordre": 2,
  "titre": "Strategy",
  "description": "<p>Creation of the “Les Rives du Territoire” festival: positioning, target audience and digital communication plan (SAÉ 102).</p>"
 },
 {
  "projet": "festival-musique",
  "ordre": 3,
  "titre": "Selection",
  "description": "<p>Concept ranked among the class’s top 7 projects.</p>"
 },
 {
  "projet": "festival-musique",
  "ordre": 4,
  "titre": "Mockup and prototype",
  "description": "<p>Design of the La Fanfa’Comtoise website, another selected concept.</p>"
 },
 {
  "projet": "festival-musique",
  "ordre": 5,
  "titre": "Development",
  "description": "<p>Responsive website integration: carousel, mobile menu and downloadable programme.</p>"
 },
 {
  "projet": "cielixir",
  "ordre": 1,
  "titre": "Concept",
  "description": "<p>Market and needs analysis, and concept definition: drink recommendations based on weather and geolocation.</p>"
 },
 {
  "projet": "cielixir",
  "ordre": 2,
  "titre": "Concept presentation",
  "description": "<p>Presentation and defence of the concept to the jury.</p>"
 },
 {
  "projet": "cielixir",
  "ordre": 3,
  "titre": "Research and mockups",
  "description": "<p>Sitemap, wireframes and interactive Figma prototype: weather detection, drink cards, filters, favourites and history.</p>"
 },
 {
  "projet": "cielixir",
  "ordre": 4,
  "titre": "Mockup presentation",
  "description": "<p>Defence of the UX/UI choices and integration of the jury’s feedback.</p>"
 },
 {
  "projet": "cielixir",
  "ordre": 5,
  "titre": "Development",
  "description": "<p>Responsive web app: real-time weather API, geolocation, filters, favourites and history stored in PocketBase.</p>"
 },
 {
  "projet": "cielixir",
  "ordre": 6,
  "titre": "Final presentation",
  "description": "<p>Live demo of the app and project management review.</p>"
 },
 {
  "projet": "micro-trottoir",
  "ordre": 1,
  "titre": "Preparation",
  "description": "<p>Equipment booking and settings: PCM sound, white balance, focus.</p>"
 },
 {
  "projet": "micro-trottoir",
  "ordre": 2,
  "titre": "Filming",
  "description": "<p>Interviews with passers-by, putting them at ease, and signed image-rights releases.</p>"
 },
 {
  "projet": "micro-trottoir",
  "ordre": 3,
  "titre": "Post-production",
  "description": "<p>Transcription, English translation, dubbing and editing in DaVinci Resolve.</p>"
 },
 {
  "projet": "olyvia",
  "ordre": 1,
  "titre": "Desk research",
  "description": "<p>Analysis of the topic, the target audience and the competition.</p>"
 },
 {
  "projet": "olyvia",
  "ordre": 2,
  "titre": "User interviews",
  "description": "<p>6 interviews with women aged 42 to 74, conducted in a caring, anonymous setting.</p>"
 },
 {
  "projet": "olyvia",
  "ordre": 3,
  "titre": "Analysis",
  "description": "<p>Summary of needs: reliable information, practical advice, testimonies, simplicity and privacy.</p>"
 },
 {
  "projet": "olyvia",
  "ordre": 4,
  "titre": "Identity and mockups",
  "description": "<p>Visual identity, logo and Figma mockups.</p>"
 },
 {
  "projet": "olyvia",
  "ordre": 5,
  "titre": "Website and video",
  "description": "<p>Creation of the bilingual WordPress site and production of the advertorial video.</p>"
 },
 {
  "projet": "tiktak",
  "ordre": 1,
  "titre": "Story map",
  "description": "<p>The user’s steps, from discovery to order, and the tasks at each step.</p>"
 },
 {
  "projet": "tiktak",
  "ordre": 2,
  "titre": "Brand guidelines and mockup",
  "description": "<p>Powder-pink guidelines on a cream background, light and dark themes, desktop and mobile Figma mockups.</p>"
 },
 {
  "projet": "tiktak",
  "ordre": 3,
  "titre": "Marketing nudges",
  "description": "<p>SMART goal of a 3% conversion rate and 6 nudges linked to cognitive biases (IKEA effect, social proof…).</p>"
 },
 {
  "projet": "tiktak",
  "ordre": 4,
  "titre": "Database",
  "description": "<p>Conceptual and logical data models in Looping, SQLite database and 17 SQL queries.</p>"
 },
 {
  "projet": "tiktak",
  "ordre": 5,
  "titre": "Development",
  "description": "<p>Server-rendered Astro site with Bun: SVG configurator, AI, Google sign-in, orders, security.</p>"
 },
 {
  "projet": "tiktak",
  "ordre": 6,
  "titre": "Deployment",
  "description": "<p>Linux VPS, Apache, Let’s Encrypt HTTPS, systemd service and continuous deployment with GitHub Actions.</p>"
 },
 {
  "projet": "annees-chaudes",
  "ordre": 1,
  "titre": "Finding the data",
  "description": "<p>Search for reliable public climate datasets: Météo-France homogenised series (monthly temperatures and rainfall since 1959).</p>"
 },
 {
  "projet": "annees-chaudes",
  "ordre": 2,
  "titre": "Analysis and cleaning",
  "description": "<p>Data analysis, then cleaning: selecting reliable stations, periods and measurements, to compare like with like.</p>"
 },
 {
  "projet": "annees-chaudes",
  "ordre": 3,
  "titre": "Exploration and charts in Observable",
  "description": "<p>Data loaded into an Observable notebook to explore it, test hypotheses and build the charts with Observable Plot.</p>"
 },
 {
  "projet": "annees-chaudes",
  "ordre": 4,
  "titre": "Building the website",
  "description": "<p>An Astro website presenting the context, the method and the results: the charts and the map of the region’s 28 stations.</p>"
 },
 {
  "projet": "annees-chaudes",
  "ordre": 5,
  "titre": "Going live",
  "description": "<p>Deployed on Netlify, on my own domain name (maman-sambe.fr).</p>"
 },
 {
  "projet": "annees-chaudes",
  "ordre": 6,
  "titre": "Publication on data.gouv.fr",
  "description": "<p>The site was published as an official reuse of the data on data.gouv.fr, the French government open data portal: <a href=\"https://www.data.gouv.fr/reuses/evolution-des-temperatures-maximales-a-montbeliard-et-en-bourgogne-franche-comte-depuis-1959\" target=\"_blank\" rel=\"noopener noreferrer\">“Évolution des températures maximales à Montbéliard et en Bourgogne-Franche-Comté depuis 1959”</a>, under our organisation “SAÉ 303 — Groupe 5”, set up with my partner, Ruslana Budniak.</p>"
 }
];

const EXPERIENCES = {
 "Association des Étudiants Sénégalais de Belfort-Montbéliard": {
  "poste": "Deputy communications officer",
  "periode": "Since October 2026",
  "structure": "Association of Senegalese Students of Belfort-Montbéliard (AESBM)",
  "description": "<ul><li>Designing and developing the association’s website (in progress)</li><li>Managing social media: Instagram and TikTok</li><li>Promoting events and partners, including BNP Paribas and the CROUS (student services)</li></ul>"
 },
 "Loum Consulting": {
  "poste": "Administrative assistant",
  "periode": "August 2025",
  "lieu": "Dakar, Senegal",
  "description": "<ul><li>Filing, entering and organising administrative documents</li><li>Managing and updating internal databases</li><li>Keeping a structured, organised working environment</li></ul>"
 },
 "Proco Confection": {
  "poste": "General assistant (summer fixed-term contract)",
  "periode": "Summer 2024",
  "lieu": "Dakar, Senegal",
  "description": "<ul><li>Labelling, counting and packing textile items</li><li>Screen printing</li><li>Applying quality standards and hygiene rules on the production line</li></ul>"
 }
};

const CATEGORIES = {
 "Développement web": "Web development",
 "Design & UX": "Design & UX",
 "Audiovisuel": "Video",
 "Communication digitale": "Digital communication"
};

function ajouterChamps(app) {
  for (const [nomCollection, champs] of Object.entries(CHAMPS)) {
    const collection = app.findCollectionByNameOrId(nomCollection);
    for (const [nom, type, max] of champs) {
      if (collection.fields.getByName(nom)) continue;
      if (type === "text") collection.fields.add(new TextField({ name: nom, max }));
      if (type === "editor") collection.fields.add(new EditorField({ name: nom, convertURLs: false }));
      if (type === "json") collection.fields.add(new JSONField({ name: nom, maxSize: 20000 }));
    }
    app.save(collection);
  }
}

function remplir(app) {
  for (const [slug, champs] of Object.entries(PROJETS)) {
    try {
      const p = app.findFirstRecordByData("projets", "slug", slug);
      for (const [champ, valeur] of Object.entries(champs)) p.set(`${champ}_en`, valeur);
      app.save(p);
    } catch (e) {}
  }
  for (const e of ETAPES) {
    try {
      const projet = app.findFirstRecordByData("projets", "slug", e.projet);
      const etape = app.findFirstRecordByFilter("etapes", "projet = {:id} && ordre = {:ordre}", { id: projet.id, ordre: e.ordre });
      etape.set("titre_en", e.titre);
      etape.set("description_en", e.description);
      app.save(etape);
    } catch (err) {}
  }
  for (const [structure, champs] of Object.entries(EXPERIENCES)) {
    try {
      const xp = app.findFirstRecordByData("experiences", "structure", structure);
      for (const [champ, valeur] of Object.entries(champs)) xp.set(`${champ}_en`, valeur);
      app.save(xp);
    } catch (e) {}
  }
  for (const [nom, nomEn] of Object.entries(CATEGORIES)) {
    try {
      const c = app.findFirstRecordByData("categories", "nom", nom);
      c.set("nom_en", nomEn);
      app.save(c);
    } catch (e) {}
  }
}

migrate((app) => {
  ajouterChamps(app);
  remplir(app);
}, (app) => {
  // Retour en arrière : on supprime simplement les champs anglais
  for (const [nomCollection, champs] of Object.entries(CHAMPS)) {
    const collection = app.findCollectionByNameOrId(nomCollection);
    for (const [nom] of champs) {
      if (collection.fields.getByName(nom)) collection.fields.removeByName(nom);
    }
    app.save(collection);
  }
});
