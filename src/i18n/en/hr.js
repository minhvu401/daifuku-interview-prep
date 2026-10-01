// English content — HRPage
export default {
  badge: 'HR Round',
  title: 'HR Interview Q&A',
  subtitle: 'Guaranteed questions · Behavioral · Stability & character · Japanese culture',
  content: `# HR Round — Daifuku Intralogistics Vietnam

### Round 1: HR + Department. All sample answers written in English, ready to use.

HR is not grading your code. They are answering four questions in their head:
1. Will this person **stay long-term**? (Japanese companies fear job-hopping above all)
2. Are they willing to **travel to customer warehouse sites**?
3. Do they fit **Japanese work culture** — regular reporting, honest, humble, punctual?
4. Does the **salary fit the budget**?

---

# A. Questions you will definitely be asked

### 1. "Tell me about yourself."

> Hello, my name is Minh. I am a backend developer.
>
> For the past year I worked at XPERC, building features in Java and Spring Boot for a management platform used by corporate customers.
>
> What I enjoy most is learning things I have not used before. On one project we needed the client side built, so I taught myself Angular and delivered it. I also use AI tools a lot in my daily work — I set them up to automate the repetitive parts of my job, so I can spend my time on the parts that actually need thinking.
>
> I am applying here because I would like to work closer to the real system and the customer, not only from the office. I am also studying Japanese.
>
> I can start immediately. Thank you.

Four beats to remember: **who I am → I enjoy learning → I use AI to automate → why here → available now.**

---

### 2. "What do you know about our company?"

**Must memorize. Not knowing anything about the company is an instant fail at a Japanese company.**

> Daifuku is a Japanese company founded in 1937, and it is the largest material handling systems manufacturer in the world — automated storage and retrieval systems, conveyors, and sorting systems.
>
> The Vietnam office opened in 2019, here in Zen Plaza, and it handles sales, engineering, installation and after-sales service for customers in Vietnam.
>
> The role I am applying for is on the software side — the WCS that controls the equipment and communicates with the customer's host system.

---

### 3. "Why do you want to join Daifuku?"

> There are three reasons.
>
> First, I want to work closer to the real system. At my last company I wrote the code, and someone else talked to the customer. Here I would go to the site, see the equipment, and support the people who use it.
>
> Second, the field itself. Warehouse automation is something I can build real depth in, instead of building the same kind of application again and again.
>
> Third, I am studying Japanese, and I would like to work in a Japanese environment and learn how Japanese teams build systems.

---

### 4. "Why did you leave XPERC?"

> I have already left XPERC. The product there had reached a mature, stable stage, so the development work had become mostly small bug fixes. I want to keep growing as an engineer, and I am looking for a position where I can work on larger projects.
>
> I am also looking for a company with clearer processes and a direction that fits where I want to go in my career. That is why this role interests me — the systems here are large, physical, and built to a standard, and I would like to work that way.

**⚠️ If they probe further** with "What was wrong with their process?":

> Nothing dramatic. It was a smaller and faster-moving setup, and it worked for them. I simply work better where the process and the documentation are clear, so it was a question of fit rather than a problem.

---

### 5. "Where do you see yourself in 3–5 years?"

> In the first year, I want to be the person the team can give any implementation task to and trust that it will be correct.
>
> After that, I want to grow into writing the design documents myself, and to be able to go to a customer site and handle the integration and the training on my own.
>
> I would also like my Japanese to reach a level where I can work directly with the team in Japan.

**Do not say:** freelancing, starting your own company, moving abroad permanently.

---

### 6. "Are you willing to travel to customer sites?"

**The most important question in this round. Answer decisively, with no conditions attached.**

> Yes. That is actually one of the reasons I am applying. I want to see the system running in the real place, not only on my screen.

**If they ask about trips to other provinces, staying multiple days:**

> That is fine with me. May I ask how often it usually happens, and how long a typical trip is? I would like to understand the work properly.

---

### 7. "Can you work overtime?"

> Yes. I understand that with this kind of system, go-live and cutover often happen when the warehouse is not operating. I am fine with that when the project needs it.

---

### 8. "What is your salary expectation?"

> For my level — about one year of experience — I am looking for around 20,000,000 VND gross per month. I am open to discussing it based on the scope of the role and the full package.

**If they push for a number before you are ready:**

> I would rather hear the range for this level first, if that is possible.

⚠️ "Max 50M" is the ceiling for someone who can **lead the team** — not the starting point for one year of experience.

---

### 9. "When can you start?"

> Immediately. I have no notice period to serve.

---

### 10. "How is your Japanese?"

**Be completely honest — someone in the room may speak Japanese.**

> Basic level. I can introduce myself and handle simple conversation, and I am studying to improve. I know it matters here, and I want to reach a working level.

---

# B. Behavioral questions

Structure every answer: **situation → what you did → result.** 30–45 seconds each.

### "Tell me about a difficult problem you solved."

> One of our modules was very slow when the system was under heavy load. I went through the code and found that it was making far more database queries than it needed, and it was joining tables that were not necessary for the result.
>
> I rewrote that part. The number of queries went down by about forty percent, and the response time by about thirty percent.
>
> I could have just added a cache in front of it, but that would only hide the problem. I preferred to fix the cause.

---

### "Tell me about a time you had to learn something new quickly."

> On one project we were building a new chat service. The client side needed to be built in Angular, and I had never used Angular before.
>
> I studied it while the project was running, and I delivered the chat features on the client myself. It took extra effort at the start, but after that I could work on both sides of the system.

---

### "Tell me about a time you worked under pressure."

> I built a vehicle management system on my own, with a fixed deadline. I was the only developer, so everything — the database, the APIs, the tests — was my responsibility.
>
> I planned the work in small pieces so I could see my progress every day, and I still kept unit test coverage above eighty percent. I delivered it on time.

---

### "How do you work in a team?"

> At FPT Software I worked in a team with senior developers. We had a standup every morning, we reviewed each other's code, and sometimes we did pair programming.
>
> I reported my progress and my blockers every day. If something was going to be late, I said so early instead of waiting until the deadline.

---

### "What do you do when a requirement is unclear?"

**A golden question for Japanese companies — they are looking for the spirit of 報連相 (hou-ren-sou): report, contact, consult.**

> I ask. I do not guess.
>
> If the requirement document is not clear, I go back to the business analyst before I write any code. Guessing wrong costs much more time later, and it can reach the customer.

---

### "Tell me about a mistake you made."

⚠️ Choose a **real** mistake — small, already fixed, with a lesson learned.

> Early in my time at XPERC, [briefly describe what happened].
>
> When I realised it, I told my team leader immediately and I fixed it.
>
> What I learned was [the lesson — e.g.: to confirm with the BA instead of assuming / to test the edge case before saying it is done].

**Never say "I have never made a mistake."** In Japanese companies, reporting a problem early is valued more than having no problems.

---

### "How do you handle feedback in code review?"

> I like code review. It is the fastest way for me to learn.
>
> At both of my companies my code was reviewed by senior developers. When they pointed something out, I asked why, so that I would not repeat it. I also review other people's code, and I try to explain my comments the same way.

---

### "What is your greatest strength?"

> I am careful about verifying my own work. I do not say something is finished until I have actually checked that it behaves correctly.

---

### "What is your weakness?"

Choose **one** of these two:

> So far my experience has been implementation from documents. I have not written design documents myself yet. I am aware of that gap, and it is one of the things I want to build in this role.

or:

> My Japanese is still basic. I am studying it, but I know it will take time before I can really use it at work.

**Avoid:** "I work too hard", "I am a perfectionist".

---

# C. Stability and character questions

Japanese companies ask these more deeply than Western ones. It is normal, not intrusive.

### "Where do you live? How is your commute?"

> I live in [district], so coming to District 1 takes me about [number] minutes. That is fine for me every day.

### "Are you applying to other companies?"

> I am talking to a few companies, but this is the role that matches best what I want to do next.

Do not name the other companies.

### "What is important to you in a company?"

> A place where I can stay and grow. I want to work on a real product, with people I can learn from, and where I can see the result of what I build.

Do not mention salary first.

### "Do you plan to study a master's degree or go abroad?"

> No. My plan now is to build my career as an engineer here.

They are checking whether you will leave after one year.

### "Tell me about your education."

> I studied Software Engineering at FPT University. I have completed all the required coursework, and I graduate in September 2026.

---

# D. Questions to ask them

Ask 2–3. **Asking nothing loses points** at a Japanese company.

- How big is the software team here, and how does it work together with the engineers in Japan?
- For someone joining at my level, what does the first year usually look like?
- How much of the work is at customer sites, compared with the office?
- What do new members usually find most difficult in their first few months?
- Is there Japanese language support or training for staff?

**Do not ask in the HR round:** details about leave days, when the next salary review is, whether remote work is possible.

---

# E. Beyond the words — Japanese companies score this too

- **Arrive 10–15 minutes early.** Being late is close to automatic rejection.
- **Shirt, dress trousers, shoes.** No suit required, but no T-shirt.
- **Bring 2–3 printed copies of your CV, a notepad and pen. Take notes when they speak** — Japanese interviewers appreciate this greatly.
- **Bow slightly** when entering and leaving. Shake hands only if they extend theirs first.
- **Turn your phone off**, not just to silent.
- If you do not know something, say so directly: *"I do not know that yet. If I had to find out, I would start by [how you would approach it]."*
- At the end: **"Thank you very much for your time today."** If you have their email, send a short thank-you note within 24 hours.

---

# F. Three things to never do

1. **Overstate your experience.** Your CV and your words must match. You worked from an FRD — you were not the person analysing requirements with the customer.
2. **Criticise your previous company.** Regardless of why you left.
3. **Signal that this is a stepping stone.** Never say "while I wait for...", "later I want to move to...".
`
}
