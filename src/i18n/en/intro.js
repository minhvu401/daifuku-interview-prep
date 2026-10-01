// English content — IntroPage
export default {
  badge: 'Self-Introduction',
  title: 'Self-Intro Scripts',
  subtitle: '3 versions: HR (~50s) · Department detail · Japanese GM (~45s)',
  content: `# Self-introduction — Daifuku Intralogistics Vietnam

> **Accuracy notes** — everything below stays inside these boundaries:
> 1. At XPERC the requirements arrive as an FRD written by the BA. Minh implements from the FRD; he does not run requirement analysis with the customer or author design documents.
> 2. The ~40% / ~30% performance win came from **CODE changes** — fewer queries, fewer joins. NOT from Redis caching.
> 3. Redis was configured so two pods of the system shared state and ran smoothly. That is deployment/scaling work, a separate story from the performance fix.

---

## Version A — HR round, ~50 seconds

Keep it human. HR is not testing your code here — they want to know who you are and whether you will stay.

> Hello, my name is Minh. I am a backend developer.
>
> For the past year I worked at XPERC, building features in Java and Spring Boot for a management platform used by corporate customers.
>
> What I enjoy most is learning things I have not used before. On one project we needed the client side built, so I taught myself Angular and delivered it. I also use AI tools a lot in my daily work — I set them up to automate the repetitive parts of my job, so I can spend my time on the parts that actually need thinking.
>
> I am applying here because I would like to work closer to the real system and the customer, not only from the office. I am also studying Japanese.
>
> I can start immediately. Thank you.

**Four beats to remember:** who I am → I enjoy learning new things → I use AI to automate → why here → available now.

Technical details (FRD, query optimization, 40%/30%) — **only bring these out when the Department person asks**.

---

## If the Department person asks "what exactly did you do at XPERC?"

Only then go into detail. Keep it to 40 seconds.

> I worked from the functional requirement documents our business analysts wrote. I read the FRD, asked questions when something was unclear, and built the functions in Java and Spring Boot — the APIs, the database work, the background jobs. I wrote the tests, fixed the defects that came back, and supported the modules after they went live.
>
> The thing I am most proud of: one module was slow under heavy load. I went into the code, reduced the number of queries it made and removed joins that were not needed. Queries went down about forty percent and response time about thirty percent. I fixed the cause instead of hiding it behind a cache.

---

## Version B — Round 2 (Japanese GM), ~45 seconds

Keep it **slower and simpler**. Japanese executives often speak English as a second language too.

*(Optional opener in Japanese — bow slightly)*

**はじめまして。ヴー・ホアン・ミンと申します。よろしくお願いいたします。**

*Hajimemashite. Vu Hoang Minh to moushimasu. Yoroshiku onegai itashimasu.*

> Good afternoon. My name is Minh. Thank you for your time.
>
> I graduated in Software Engineering from FPT University. For one year I worked as a backend developer at XPERC. I used Java and Spring Boot. I received the requirement document from our business analyst, and I built the functions from it. I wrote the tests. After the release, I fixed the problems and delivered the next version.
>
> I want to join Daifuku because I want to work close to a real system and a real customer, not only in the office. I am studying Japanese now, and I hope to work with the team in Japan.
>
> Thank you very much.

---

## Why "I work from an FRD" is a strong answer, not a weak one

Do not apologise for it. Say it plainly. It tells them three things they want:

- You can read a specification and build exactly what it says — Daifuku sells systems where the spec is the contract with the customer.
- You ask when the FRD is unclear instead of guessing.
- You want to grow into the design side, which is exactly what their JD offers ("create software design documents").

> "Have you written design documents?" → **"Not yet. I have worked from them for a year, so I know what a good one needs to contain. That is a part of this role I want to grow into."**

---

## Delivery notes

- **Pace:** slower than feels natural. Roughly 2 words per second. Pause at every full stop.
- **Numbers:** "about forty percent", "about thirty percent".
- **Daifuku:** DAI-fu-ku. Say the company name once, confidently.
- **If you lose a word:** say "Sorry, let me say that again" and restart the sentence. Never freeze silently.
- **Do not memorise word for word.** Memorise the five beats: education → what I did at XPERC → two results → why Daifuku → available now.
- **FRD** — say the words in full the first time: "functional requirement document". Then use "FRD".

---

## Follow-ups this introduction will trigger

| They will ask | Have ready |
|---|---|
| "Tell me more about the performance fix." | Code fix: fewer queries, removed unnecessary joins. ~40% query reduction, ~30% response time improvement. Say clearly: fixed the code, not covered with a cache. |
| "You mentioned Redis — what did you use it for?" | Honest and separate: Redis was configured so two pods shared state and the system ran smoothly when scaled out. Not a caching layer added for speed. |
| "Have you designed a database schema yourself?" | Honest about the boundary: FRD and design came from the BA; you implemented the entities and queries. Your own design example: Car Management project schema. |
| "Have you written design documents?" | Not yet, want to grow into it in this role. |
| "Do you have Oracle or SQL Server?" | PostgreSQL professionally, MySQL at university. Standard SQL and transactions transfer. Do not bluff. |
| "Do you know warehouse systems / WCS?" | No. Then bridge: you have integrated external systems, built message queue workflows, kept integrations running when the other side was slow or down. Same shape of problem. |
| "Are you willing to travel to customer sites?" | Yes, clearly and without hesitation. This is central to the job. |
| "How is your Japanese?" | Basic, currently studying. Give your honest level — someone in the room may speak it. |
| "Your salary expectation?" | ~20M VND gross for one year of experience. Open to discuss. |
| "Why did you leave XPERC?" | Short, neutral, no complaints about anyone. |

---

## Questions to ask them

Ask two or three. This is scored.

- How big is the software team here, and how does it work with the engineers in Japan?
- How much of the year is spent at customer sites versus in the office?
- For someone joining now, what does the first year look like — implementation first, then design documents later?
`
}
