# SparkClean Services — Website

Professional cleaning service website for SparkClean Services, Gaborone, Botswana.

## Tech Stack
- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Supabase** (free tier) — database for bookings, feedback, etc.
- **Resend** (free tier) — email notifications
- **Vercel** — deployment (free tier)

---

## Setup Instructions

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd sparkclean-services
npm install
```

### 2. Set Up Supabase
1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to **SQL Editor** and paste the contents of `supabase/schema.sql` — click **Run**
4. Go to **Settings > API** and copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Set Up Resend
1. Go to [resend.com](https://resend.com) and create a free account
2. Go to **API Keys** → **Create API Key**
3. Copy the key → `RESEND_API_KEY`

### 4. Configure Environment Variables
```bash
cp .env.example .env.local
```
Edit `.env.local` and fill in your values:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
RESEND_API_KEY=re_xxxxxxxxxxxx
OWNER_EMAIL=your@email.com
```

### 5. Run Locally
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000)

---

## Deploy to Vercel
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your repo
3. Add your environment variables in Vercel project settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `RESEND_API_KEY`
   - `OWNER_EMAIL`
4. Click **Deploy** — done!

---

## Customisation Checklist
- [ ] Replace `+267 XXXX XXXX` with your real phone number throughout the codebase
- [ ] Update the WhatsApp link `wa.me/267XXXXXXXX` with your real number
- [ ] Update `hello@sparkclean.co.bw` with your real email
- [ ] Update `OWNER_EMAIL` in your environment variables
- [ ] Add your team members' real names and photos to `/app/about/page.tsx`
- [ ] Add your Facebook and Instagram URLs in `components/Footer.tsx`

---

## Pages
| Page | URL |
|------|-----|
| Home | `/` |
| Services | `/services` |
| Book a Clean | `/book` |
| Schedule a Call | `/call` |
| Feedback | `/feedback` |
| About | `/about` |
| Contact | `/contact` |

---

© 2025 SparkClean Services · Gaborone, Botswana 🇧🇼
