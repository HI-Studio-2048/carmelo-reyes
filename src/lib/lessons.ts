export interface Lesson {
  id: number
  title: string
  description: string
  duration: string
  free: boolean
  content?: string
}

export const lessons: Lesson[] = [
  {
    id: 1,
    title: "The Secrets I Used to Build My eSIM Empire",
    description:
      "My full origin story — how I went from $47 in my bank account to $1.2M+ selling eSIMs. I'm sharing everything: the failures, the breakthrough moment, why eSIMs are the play right now, and the exact platform I used to get started.",
    duration: "25 min read",
    free: true,
    content: `
      <h2>I Had $47 in My Bank Account</h2>
      <p>Let me take you back to early 2024. I was 20 years old, living in Miami, and I had just checked my bank account for the third time that day hoping the number would magically change. It didn't. $47. That was it.</p>
      <p>I'd dropped out of community college six months earlier because I couldn't focus on classes when I was constantly thinking about how to make money. My parents didn't get it. My friends thought I was crazy. And honestly? Some days I thought they were right.</p>

      <h2>The Graveyard of Failed Side Hustles</h2>
      <p>Before I found eSIMs, I tried everything. And I mean <em>everything</em>.</p>
      <p>First it was dropshipping. I spent two months building a Shopify store selling LED strip lights. Ran some Facebook ads, burned through $300, got maybe four sales. After returns and ad spend, I was negative. Classic.</p>
      <p>Then I got into crypto during one of those mini bull runs. Made $800 in a week and thought I was a genius. Lost $1,200 the next week. Turns out I was not, in fact, a genius.</p>
      <p>Amazon FBA was next. I found a "winning product" — silicone kitchen utensils from Alibaba. Ordered 500 units, paid for shipping, got them to an Amazon warehouse. Sold maybe 60 before the listing got buried. I still have boxes of spatulas in my mom's garage.</p>
      <p>Every single one of these had the same problem: insane competition, razor-thin margins, and no real edge. I was just another kid trying to copy what YouTube gurus were selling.</p>

      <h2>Why eSIMs Are Different (and Why Most People Don't Know Yet)</h2>
      <p>Here's what changed everything. Late 2024, I stumbled on a Reddit thread about the eSIM industry. Someone was talking about how physical SIM cards are dying — how Apple removed the SIM tray from newer iPhones, how Samsung and Google were going all-in on eSIM. The global eSIM market is projected to hit $125 billion. That's not a typo. $125 billion.</p>
      <p>Think about it: every single person who travels internationally needs data. Every digital nomad, every business traveler, every tourist. And the old way — buying a physical SIM card at the airport, paying insane roaming fees — that's dead. eSIMs let you buy a data plan from your phone in 30 seconds. No physical card, no store visit, no hassle.</p>
      <p>The more I researched, the more I realized this wasn't like dropshipping or crypto. This was a real industry with real demand, and it was still early enough that you could actually build something.</p>

      <h2>Finding eSIM Launch — The Platform That Changed Everything</h2>
      <p>The big question was: how do you actually sell eSIMs? You can't just manufacture them. You need carrier agreements, a platform, infrastructure. That's where I found <a href="https://www.esimlaunch.com/" target="_blank" rel="noopener noreferrer">eSIM Launch</a>.</p>
      <p>eSIM Launch is a white-label platform that lets you create your own branded eSIM store. They handle all the backend — the carrier partnerships, the eSIM delivery, the coverage in 190+ countries. You just set up your store, pick your pricing, and start selling under your own brand.</p>
      <p>I signed up, picked a brand name, customized my store, and had it live in about a day. Total investment: around $500 for the setup and some initial marketing. Compare that to the thousands I burned on dropshipping and Amazon FBA for literally nothing.</p>

      <h2>The First $5K Month</h2>
      <p>My first month was slow. I made maybe $800. But here's what was different from every other business I'd tried — every single sale was profit. No inventory, no shipping costs, no returns of silicone spatulas. The margins were real.</p>
      <p>I started posting on TikTok and Instagram. Simple content: "how to get cheap data when you travel," "stop paying roaming fees," that kind of stuff. Nothing fancy, just my phone and real talk. By month three, I hit $5K in a single month.</p>
      <p>That was the moment I knew this was different. $5K might not sound like a lot to some people, but when you've been at $47 and watched three businesses fail, $5K in a month feels like you just won the lottery.</p>

      <h2>Scaling to $40K/Month</h2>
      <p>Once I had proof of concept, I went all in. I reinvested everything back into the business. Started running targeted ads on Instagram and TikTok. Built an affiliate program so travel bloggers would promote my store. Optimized my SEO so people searching "buy eSIM for Europe" or "cheap travel data" would find me.</p>
      <p>By month eight, I was doing $25K/month. By month twelve, I crossed $40K/month consistently. Total revenue passed $1.2 million. From $500 to seven figures in about a year.</p>
      <p>The beautiful thing about <a href="https://www.esimlaunch.com/" target="_blank" rel="noopener noreferrer">eSIM Launch</a> is that it scales with you. I didn't have to hire a dev team or build infrastructure. The platform handled everything on the backend while I focused on marketing and growing the brand.</p>

      <h2>What I Want You to Take Away</h2>
      <p>I'm not telling you this to flex. I'm telling you because a year ago I was the kid with $47 and a garage full of spatulas. If I can do this, you can do this.</p>
      <p>The eSIM industry is still early. Most people don't even know what an eSIM is yet. That's the opportunity. By the time everyone figures it out, the people who got in now will already have established brands, loyal customers, and recurring revenue.</p>
      <p>You don't need a degree. You don't need connections. You don't need $10K to start. You need about $500 and a willingness to actually put in the work.</p>

      <h2>What's Next</h2>
      <p>In <strong>Lesson 2</strong>, I'm going to walk you through exactly how to launch your own white-label eSIM brand using <a href="https://www.esimlaunch.com/" target="_blank" rel="noopener noreferrer">eSIM Launch</a> — step by step, screen by screen. We're talking store setup, branding, going live. The whole thing takes about 5 minutes once you know what you're doing.</p>
      <p>If you're serious about building something real, I'll see you there.</p>
    `,
  },
  {
    id: 2,
    title: "How to Launch Your White-Label eSIM Brand in 5 Minutes",
    description:
      "I walk you through the exact steps to set up your own eSIM store from scratch. Brand name, logo, custom domain — we're getting you live and ready to sell by the end of this lesson.",
    duration: "20 min read",
    free: false,
  },
  {
    id: 3,
    title: "Store Setup, Pricing Strategy & 190+ Country Coverage",
    description:
      "Pricing is where most people mess up. I'll show you how I set my margins, which regions sell the most, and how to structure your plans so customers keep coming back.",
    duration: "22 min read",
    free: false,
  },
  {
    id: 4,
    title: "Marketing Mastery — IG/TikTok Growth + SEO + Affiliates",
    description:
      "This is the lesson that made me the most money. I'm breaking down exactly how I grew on social media, ranked on Google, and built an affiliate army that sells for me while I sleep.",
    duration: "30 min read",
    free: false,
  },
  {
    id: 5,
    title: "Scaling to 6 Figures — Ads, Teams & Automation",
    description:
      "Once you're making consistent sales, it's time to pour gas on the fire. Paid ads, hiring your first VA, automating customer support — this is how you go from side hustle to real business.",
    duration: "28 min read",
    free: false,
  },
]

export function getLesson(id: number): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === id)
}
