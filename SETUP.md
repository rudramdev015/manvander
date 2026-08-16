# House of Echoes — Backend & Dashboard Setup

This project now has a real backend: a Node.js/Express API, a MongoDB
database, Cloudinary for image/video storage, and a React admin dashboard
at `/dashboard`. The old git-based CMS (Decap) is gone.

**The public site never breaks even if you skip this entirely.** Every
section still renders from the content already baked into the build. Once
the backend is live, the site fetches live data in the background and
swaps it in — that's what makes the dashboard actually change anything.

## 1. MongoDB Atlas (database)

1. Go to https://mongodb.com/cloud/atlas/register and sign up (free, no
   card required for the tier below).
2. Create a free **M0** cluster (any region close to your users).
3. **Database Access** → add a database user (username + password).
4. **Network Access** → add `0.0.0.0/0` (allow from anywhere) — Render's
   IPs aren't static, so this is the simplest option for now.
5. **Database → Connect → Drivers** → copy the connection string. It
   looks like:
   `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
   Replace `<user>`/`<password>`, and add a database name before the `?`,
   e.g. `.../houseofechoes?retryWrites=true...`

## 2. Cloudinary (image/video storage)

1. Go to https://cloudinary.com/users/register/free and sign up.
2. The dashboard home page shows **Cloud Name**, **API Key**, and
   **API Secret** — copy all three.

## 3. Deploy the backend to Render

1. Go to https://render.com and sign in with GitHub.
2. **New → Web Service** → connect the `manvander` repo.
3. Settings:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free
4. Add environment variables (Render → your service → Environment):
   - `MONGODB_URI` — from step 1
   - `JWT_SECRET` — any long random string (e.g. run
     `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`
     locally and paste the output)
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
     — from step 2
   - `CORS_ORIGIN` — your site's URL(s), comma-separated, e.g.
     `https://your-site.vercel.app,http://localhost:5173`
5. Deploy. Once live, note the URL Render gives you, e.g.
   `https://house-of-echoes-api.onrender.com`.

Render's free tier spins the service down after 15 minutes of no traffic
and takes ~30-60s to wake back up on the next request. This is fine here:
the site's stale-while-revalidate loading means visitors always see the
static content instantly regardless, and get live content once the API
responds (whether that's instant or after a cold-start delay).

## 4. Seed the database with existing content

From the `server` folder, with `MONGODB_URI` set in `server/.env` (copy
`server/.env.example` to `server/.env` and fill it in):

```bash
cd server
npm install
npm run seed
```

This reads everything already in `content/*.json` and loads it into
MongoDB as the starting data — nothing you already have gets lost.

## 5. Create your admin login

```bash
cd server
npm run create-admin
```

Follow the prompts for an email and password. Run this again any time to
change the password or add another admin.

## 6. Point the frontend at the API

Locally: copy `.env.example` to `.env` at the project root and set
`VITE_API_URL` to your Render URL.

On Vercel: **Project Settings → Environment Variables** → add
`VITE_API_URL` = your Render URL → redeploy.

## 7. Log in

Visit `your-site.com/dashboard`, sign in with the admin account from step
5. Every section and collection in the sidebar is editable there —
changes save to MongoDB and appear on the live site within seconds.

---

## Running the backend locally

```bash
cd server
npm install
npm run dev       # starts on http://localhost:4000
```

Then set `VITE_API_URL=http://localhost:4000` in the project root's
`.env` and run `npm run dev` there as usual.
