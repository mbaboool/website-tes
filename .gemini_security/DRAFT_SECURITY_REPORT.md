

---

**Vulnerability:** Improper Neutralization of Special Elements used in an SQL Command ('SQL Injection')
**Severity:** Medium
**Location:** `cms/src/dataProvider.js`
**Line Content:** `query = query.ilike(key, `%${params.filter[key]}%`);`
**Description:** The `key` variable, derived from user-controlled input `params.filter`, is used directly as a column name in a database query. While the value is parameterized by the Supabase client, the column name itself is not validated. This could allow an attacker to probe for valid column names by sending crafted filter requests and observing error messages, leading to an information leak about the database schema.
**Recommendation:** Implement a whitelist validation for the `key` variable. Before using it in a query, ensure that the `key` is one of the expected and valid column names for the given resource. This prevents attackers from injecting arbitrary strings into the column identifier portion of the query.

---

**Vulnerability:** Hardcoded Secret
**Severity:** High
**Location:** `C:\Users\GUS BARAJA\Desktop\website\cms\.env.txt`
**Line Content:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmc2Z6cmpwZ3J1a2ZlcnJlbGhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2MzkwMjIsImV4cCI6MjA3NzIxNTAyMn0.olR9VyCTPf87pKsa2bgKN4FleJJW7Y896CduEAOxIjY`
**Description:** A JWT token is directly committed to the `.env.txt` file. This is a security risk as it exposes sensitive credentials that could be used to access the Supabase project.
**Recommendation:** Remove the JWT token from the `.env.txt` file. Store it as an environment variable (e.g., `VITE_SUPABASE_ANON_KEY`) and access it using `import.meta.env.VITE_SUPABASE_ANON_KEY` as is already done for `supabaseKey` in `dataProvider.js`. Ensure that `.env.txt` is added to `.gitignore` to prevent accidental commits of sensitive information.

---

**Vulnerability:** Hardcoded Secret
**Severity:** Critical
**Location:** `C:\Users\GUS BARAJA\Desktop\website\cms\src\components\ImageStatusChecker.jsx`
**Line Content:** `const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmc2Z6cmpwZ3J1a2ZlcnJlbGhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2MzkwMjIsImV4cCI6MjA3NzIxNTAyMn0.olR9VyCTPf87pKsa2bgKN4FleJJW7Y896CduEAOxIjY';`
**Description:** The Supabase API key is hardcoded directly into the client-side JavaScript code. This key grants anonymous access to the Supabase project and can be easily extracted by anyone inspecting the client-side code. This poses a significant security risk as an attacker could potentially abuse the Supabase project.
**Recommendation:** Remove the hardcoded `supabaseKey`. Instead, import the `supabase` client instance from a centralized configuration file (e.g., `../config/supabase.js` if it exists, or from `dataProvider.js`). If a separate client is absolutely necessary, ensure the key is loaded from an environment variable (e.g., `import.meta.env.VITE_SUPABASE_ANON_KEY`).

---

**Vulnerability:** Hardcoded Secret
**Severity:** Critical
**Location:** `C:\Users\GUS BARAJA\Desktop\website\cms\src\utils\checkSchema.js`
**Line Content:** `const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmc2Z6cmpwZ3J1a2ZlcnJlbGhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2MzkwMjIsImV4cCI6MjA3NzIxNTAyMn0.olR9VyCTPf87pKsa2bgKN4FleJJW7Y896CduEAOxIjY';`
**Description:** The Supabase API key is hardcoded directly into the utility JavaScript code. This key grants anonymous access to the Supabase project and can be easily extracted by anyone inspecting the client-side code. This poses a significant security risk as an attacker could potentially abuse the Supabase project.
**Recommendation:** Remove the hardcoded `supabaseKey`. Instead, import the `supabase` client instance from a centralized configuration file (e.g., `dataProvider.js`).

---

**Vulnerability:** Hardcoded Secret
**Severity:** Critical
**Location:** `C:\Users\GUS BARAJA\Desktop\website\cms\src\utils\fileUpload.js`
**Line Content:** `const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmc2Z6cmpwZ3J1a2ZlcnJlbGhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2MzkwMjIsImV4cCI6MjA3NzIxNTAyMn0.olR9VyCTPf87pKsa2bgKN4FleJJW7Y896CduEAOxIjY';`
**Description:** The Supabase API key is hardcoded directly into the utility JavaScript code. This key grants anonymous access to the Supabase project and can be easily extracted by anyone inspecting the client-side code. This poses a significant security risk as an attacker could potentially abuse the Supabase project.
**Recommendation:** Remove the hardcoded `supabaseKey`. Instead, import the `supabase` client instance from a centralized configuration file (e.g., `dataProvider.js`).

---

**Vulnerability:** Hardcoded Secret
**Severity:** High
**Location:** `C:\Users\GUS BARAJA\Desktop\website\react\.env`
**Line Content:** `VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmc2Z6cmpwZ3J1a2ZlcnJlbGhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2MzkwMjIsImV4cCI6MjA3NzIxNTAyMn0.olR9VyCTPf87pKsa2bgKN4FleJJW7Y896CduEAOxIjY`
**Description:** The Supabase API key is directly committed to the `.env` file, which is part of the repository. This key grants anonymous access to the Supabase project and can be easily extracted by anyone with access to the repository. This poses a significant security risk as an attacker could potentially abuse the Supabase project.
**Recommendation:** Remove the `VITE_SUPABASE_ANON_KEY` from this `.env` file. Instead, use a `.env.local` file (which should be in `.gitignore`) for local development, and configure environment variables securely in your deployment environment (e.g., Vercel, Netlify, Firebase Hosting). Ensure that `.env` files containing sensitive information are always excluded from version control.

---

**Vulnerability:** Hardcoded Secret
**Severity:** Low
**Location:** `C:\Users\GUS BARAJA\Desktop\website\react\src\config\firebase.js`
**Line Content:** `apiKey: "AIzaSyBETnXuNpIDBO1U7ZisgRdOrIwr6i_Guqk",`
**Description:** The Firebase API key is hardcoded directly into the source code. Although Firebase API keys are designed to be publicly exposed, it is generally a security best practice to manage them as environment variables to prevent accidental exposure or misuse, and to allow for easier rotation and environment-specific configurations.
**Recommendation:** Replace the hardcoded `apiKey` with an environment variable (e.g., `import.meta.env.VITE_FIREBASE_API_KEY`). Ensure that this environment variable is loaded securely in your deployment environment and excluded from version control (e.g., via `.gitignore`).

---
