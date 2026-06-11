# INDIVIDUAL FOOTPRINT – Team 10 (G10)

**Financial Analyzer Pro** – Automated financial health assessment & bank loan comparison platform for Vietnamese SMEs

**Course:** NHA408E – Technology Applications in Finance & Banking  
**Academic year:** 2025–2026

---

## Member 1: Nguyễn Minh Đạt

| Field | Value |
|-------|-------|
| **Full name** | Nguyễn Minh Đạt |
| **Student ID** | 2312380006 |
| **Role** | Backend API, Deployment, Risk Scoring, DeepSeek AI |
| **Team** | Team 10 |

### Role in the project

In Team 10, I was responsible for the backend and DevOps side – building the entire API layer, scoring logic, risk engines, AI integration, and deploying the product to production.

Specifically, I owned 4 areas:

1. **Express.js API server** and all its endpoints.
2. **8‑factor loan scoring**, **5‑level Quick Risk**, and **7‑dimension Deep Risk**.
3. **DeepSeek AI Consultant integration**.
4. **Deploying to Render** with environment variables, health checks, and uptime monitoring.

### Personal mark in the product

#### 8‑factor loan scoring algorithm
Each loan package is scored on a 100‑point scale across 8 weighted criteria – interest rate (25 pts), repayment affordability (20 pts), and the remaining six criteria (10 or 5 pts). The challenging part was not coding but calibrating the weights to reflect real bank underwriting practices. I ran the algorithm against 10 real loan packages and adjusted weights across 5 rounds until the rankings matched what a credit officer would expect.

#### 7‑dimension Deep Risk engine
Instead of a single risk number, this engine produces a radar chart across 7 independent dimensions (liquidity, leverage, profitability, efficiency, interest risk, experience, scale). Each dimension scores 0–10 using its own formula, making it easy for a business owner to identify the weakest area.

#### Product deployment
Deployed the system on Render and integrated the DeepSeek API. Handled timeouts, authentication, environment variables, and set a 30‑second timeout for API calls.

### Things actually done

- Built the Express.js API server with endpoints: GET /api/health, GET /api/loans, POST /api/loans/refresh, POST /api/ai/chat, POST /api/risk/quick, POST /api/risk/deep.
- Wrote all 8 scoring functions for the loan comparison model.
- Built the Quick Risk module: 5 financial ratios → weighted composite score → 5 risk levels + specific warnings/strengths.
- Built the Deep Risk engine: 7 independent dimensions (0–10) with different formulas (linear, logarithmic, average‑based).
- Integrated DeepSeek AI API: system prompt, 30s AbortController timeout, error handling for 401/429/network failures.
- Designed the database layer: loans.json schema, helper functions (initDatabase, readDatabase, writeDatabase), DEFAULT_LOANS fallback.
- Deployed to Render: build/start commands, environment variables, health check, auto‑deploy.
- Set up monitoring by pinging /api/health every 10 minutes to keep the free server warm.
- Handled accidental API key leak: revoked the key, generated a new one, added .env to .gitignore, cleaned Git history.

### Files, features, logic contributed

| File / Feature | Path | Function |
|----------------|------|----------|
| server.js | /backend/server.js | Main server – endpoints, scoring, risk, AI |
| package.json | /backend/package.json | Dependencies |
| package.json (root) | /package.json | Build & start scripts for Render |
| POST /api/risk/quick | server.js | 5 inputs → 5 risk levels + warnings |
| POST /api/risk/deep | server.js | Full financials → 7‑dimension scores |
| POST /api/ai/chat | server.js | User question → DeepSeek response |

### Evidence of contribution

1. **backend/server.js** – API server, JSON database, DeepSeek integration, scraper refresh endpoint.
2. **frontend/index.html** – All financial logic in the browser (Quick Risk, Deep Risk, Loan Scoring).
3. **Two package.json files** – one for backend, one for root deployment.
4. **Public URL** – [https://financial-analyzer-ooel.onrender.com](https://financial-analyzer-ooel.onrender.com)

### How this connects to the final product

The backend is the layer everything else depends on. The 8‑factor algorithm turns user inputs into loan recommendations. Quick Risk helps users understand their risk level without knowing ICR/D/E. Deep Risk provides a 7‑dimension radar chart. The AI Consultant allows natural‑language Q&A.

### What I learned

- **API security and environment configuration** – I accidentally committed .env to GitHub, had to revoke, recreate, and clean history.
- **Handling timeouts and errors** – Added AbortController with 30s timeout and categorised error messages.
- **Algorithms need real‑world validation** – 5 calibration rounds were needed before the rankings felt correct.
- **Deploy early, maintain production parity** – Differences between localhost and cloud (file paths, cold starts, env vars) are significant.

### Challenges and how I handled them

| Problem | Solution |
|---------|----------|
| DeepSeek API timeout | AbortController (30s), fallback messages |
| Render cold start | Ping /api/health every 10 min, skeleton loader |
| Scoring weights unrealistic | 5 rounds of manual calibration |
| Leaked API key | Revoked immediately, added .gitignore, cleaned history |

### Message for future students

- **Set up .gitignore before your first commit.**
- **Deploy early** – even with just one working endpoint.
- **JSON database is fine for a demo, but switch to Supabase early if you plan to scale.**
- **The AI Consultant becomes much more useful with context** – pass risk/scoring results into the system prompt.
- **Validate scoring weights with someone from a bank.**

---

## Member 2: Ngô Quốc Huy

| Field | Value |
|-------|-------|
| **Full name** | Ngô Quốc Huy |
| **Student ID** | 2312380011 |
| **Role** | BaseScraper, BIDV Scraper, Database Management |
| **Team** | Team 10 |

### Role in the project

I was responsible for bank loan data collection and processing on the backend. I built the **BaseScraper** class – the common framework for all scrapers – developed the **BIDV scraper**, and participated in building the multi‑bank data aggregation process through **runAll.js**.

### Personal mark in the product

**BaseScraper** – the parent class that handles website access, retry logic, fallback data, and shared data processing. Thanks to this base class, extending to new banks required very little code.

### Things actually done

- Built BaseScraper with puppeteer‑extra + stealth plugin.
- Designed constructor to accept bankName and urls.
- Retry mechanism in `scrape()`: up to 3 attempts, 5s delay.
- `_scrapeOnce()` launches headless browser, sets user agent, navigates, waits for page load.
- `smartExtract(page)` with 2 strategies: search for HTML tables containing keywords like "lãi suất", or scan elements containing '%'.
- Helper functions: `parseRate()`, `cleanText()`, `extractTerm()`.
- **bidv.js** – inherits BaseScraper, configures BIDV URLs, provides fallback data.
- **runAll.js** – imports 6 scrapers, runs them sequentially, catches errors per bank, normalises output, writes to loans.json.
- Creates database folder if missing, logs results.

### Files, features, logic contributed

| File / Feature | Path | Function |
|----------------|------|----------|
| baseScraper.js | /backend/scrapers/baseScraper.js | Parent class – Puppeteer, retry, fallback |
| bidv.js | /backend/scrapers/bidv.js | BIDV scraper |
| runAll.js | /backend/scrapers/runAll.js | Orchestrates 6 scrapers, consolidates, writes loans.json |
| loans.json | /database/loans.json | Loan data used for comparison |

### Evidence of contribution

- Officially assigned to Database/Scraper in the Group Footprint.
- Bank data appears in the Loan Comparison feature.
- The pipeline from bank websites → loans.json is integrated and used by the final product.

### How this connects to the final product

My work is the data intake layer. Without the scraper system, the product would have no real bank data to compare or score.

### What I learned

- **Reusable architecture matters more than building a feature quickly.**
- **Real‑world web scraping is unstable** – you need multiple fallback layers.
- **Fallback data is not a temporary fix** – it ensures the system always has data to operate on.
- **Normalise data at the collection point** – reduces complexity for downstream modules.
- **A data pipeline must be fault‑tolerant locally** – one scraper failing should not stop the rest.

### Challenges and how they were resolved

| Problem | Solution |
|---------|----------|
| Slow/unresponsive bank websites | Retry 3 times + fallback data |
| One scraper failure breaking the whole run | Wrap each scraper in its own try/catch |
| Fixed selectors break when HTML changes | `smartExtract()` searches by keywords or '%' |
| Regex matching non‑interest percentages | Combine with range filter (0–50) and prioritise sections with keywords |
| Inconsistent data structure across scrapers | Normalise in runAll.js before writing |
| Browser not closed on error | Use finally block to close browser |
| Empty result without throwing an error | Validate result and retry if empty |

### Message for future students

- **Do not rely entirely on live web scraping** – build fallback data from the start.
- **Normalise data at the collection layer** – design a standard schema early.
- **Upgrade to a real database (Supabase) if you plan to scale.**
- **Build a monitoring mechanism for scrapers** – detect silent failures.
- **Treat data as a product** – invest in the data pipeline before complex features.

---

## Member 3: Nguyễn Trường Phước

| Field | Value |
|-------|-------|
| **Full name** | Nguyễn Trường Phước |
| **Student ID** | 2312380026 |
| **Role** | Data Scraping Engineer – VPBank Scraper, Vietcombank Scraper |
| **Team** | Team 10 |

### Role in the project

As Data Scraping Engineer, I owned the pipeline connecting the product to real interest‑rate data from Vietnamese banks. I was assigned **VPBank** and **Vietcombank**. Three core responsibilities: (1) VPBank scraper (CSS selector + table fallback), (2) Vietcombank scraper (regex + keyword‑context), (3) output normalisation.

### Personal mark in the product

1. **Dual‑strategy scraping architecture** – VPBank uses CSS selectors, Vietcombank uses regex + keyword context. Both share the same interface.
2. **Three‑tier fallback system** – guarantees a non‑empty loan list.
3. **`extractRate()` validator** – handles Vietnamese decimal formats, range filter [3%,20%], noise rejection.

### Things actually done

- Analysed the page structure of both banks before writing any code.
- Built VPBankScraper: Strategy 1 – CSS selector on class containing 'rate'/'interest'; Strategy 2 – Cheerio table parser.
- Built VCBScraper: regex scanning `<p>`, `<div>`, `<li>`; extraction only fires when text contains 'lai suat vay' or 'vay von'.
- Wrote `extractRate()`: normalises comma/dot decimals, applies range filter [3%,20%], rejects round‑number noise.
- Designed three‑tier fallback (Tier 1: CSS, Tier 2: regex, Tier 3: static verified data).
- Manually verified fallback data: VPBank 8.5%/year, Vietcombank 7.5%/year.
- Built a ground‑truth verification process: manually checked each bank every week, compared with scraper output.
- Added structured debug logging (URL, byte size, matches, rejection reasons).
- Ran 30 live scrape cycles per day to measure success rates (~75% for VPBank, ~60% for Vietcombank).

### Files, features, logic contributed

| File / Feature | Path | Function |
|----------------|------|----------|
| vpbank.js | /backend/scrapers/vpbank.js | VPBank scraper (dual strategy, fallback, logging) |
| vietcombank.js | /backend/scrapers/vietcombank.js | VCB scraper (regex, keyword‑context, dedup, fallback) |
| extractRate() | Shared | Normalises formats, range filter, noise rejection |
| getFallbackData() | Both scrapers | Static verified rates |
| Three‑tier fallback logic | Both | Tier 1 → Tier 2 → Tier 3 |

### Evidence of contribution

- Source code in `/backend/scrapers/`.
- POST /api/loans/refresh triggers all scrapers; VPBank/VCB entries appear in the response.
- DEFAULT_LOANS in server.js contains the VPBank/VCB reference rates I verified.
- Midterm documentation clearly lists my work.

### How this connects to the final product

The scrapers are the data intake layer of the entire stack. Without them, the comparison table would be empty. The fallback ensures data is always available. `extractRate()` prevents wrong rates from entering the scoring engine.

### What I learned

- **Test on the live site, not a saved snapshot** – fetch() HTML differs from browser‑rendered HTML.
- **No public API means everything is fragile** – robust fallbacks matter more than clever scraping.
- **Keyword specificity** – 'lai suat vay' instead of 'lai suat' eliminated savings rates.
- **Cheerio fires callbacks on nested elements** – always deduplicate after collection.
- **Success rate is a product metric, not just a technical metric** – measure honestly and compensate with fallback.
- **Log rejection reasons, not just rejections** – helps diagnose new noise patterns.

### Challenges and how they were resolved

| Problem | Solution |
|---------|----------|
| VPBank – JS injection hides data from static fetch | Added table parser (static HTML) → success rate 75% |
| Vietcombank – 20–30 % symbols (savings, fees, discounts) | 3 filters: keyword specificity, range guard, rejection list → false positive = 0 |
| Vietcombank – no table structure | Switched to regex + keyword‑context, accept ~60% success rate, rely on accurate fallback |

### Message for future students

- **→ Migrate Vietcombank to Puppeteer** (highest ROI).
- **→ Add automatic structure‑change detection** (alert when output differs >20% from last successful run).
- **→ Store multiple fallback URLs per bank** (try secondary URL before giving up).
- **→ Capture promotional rates** (flag time‑limited offers).
- **→ Replace regex context‑matching with a lightweight NLP classifier** (more robust).

---

## Member 4: Nguyễn Thiện Quang

| Field | Value |
|-------|-------|
| **Full name** | Nguyễn Thiện Quang |
| **Student ID** | 2312380029 |
| **Role** | MB Bank scraper, Techcombank scraper, scraper integration |
| **Team** | Team 10 |

### Role in the project

Quang worked on data collection. He took **MB Bank**, **Techcombank**, and the **runAll.js** script that orchestrates all six scrapers and saves their output into one data file. Specifically, he built the MB Bank scraper, the Techcombank scraper, the runAll.js runner, and the fallback datasets for those two banks.

### Personal mark in the product

1. **Two short scrapers** – subclasses of BaseScraper; each only sets the bank name, URLs, and fallback data.
2. **runAll.js runner** – runs all six scrapers, isolates errors, normalises fields, writes loans.json in one pass.
3. **Fallback data** – MB Bank (6.0%, 5.8%), Techcombank (5.99%, 13.78%) ensures the demo always has data.

### Things actually done

- Built **mbbank.js**: 2 URLs, fallback list of 2 packages.
- Built **techcombank.js**: similarly.
- Wrote **runAll.js**: loads 6 scrapers, runs each inside try/catch, collects results, adds required fields (id, processingFee, maxLTV, minIncome, source timestamp, loanTypes, lastUpdated), writes to loans.json.
- Added per‑bank logging (package count or error message).
- Read BaseScraper to understand inheritance.
- Tested the whole flow with runOnce.js, confirming that one failing scraper does not stop the rest.

### Files, features, logic contributed

| File | Path | Function |
|------|------|----------|
| mbbank.js | /backend/scrapers/mbbank.js | MB Bank scraper + fallback |
| techcombank.js | /backend/scrapers/techcombank.js | Techcombank scraper + fallback |
| runAll.js | /backend/scrapers/runAll.js | Runs 6 scrapers, consolidates, writes loans.json |
| runOnce.js | /backend/runOnce.js | One‑shot entry point to trigger runAll |
| loans.json | /database/loans.json | Output served by GET /api/loans |

### How data flows end to end

1. runOnce.js or POST /api/loans/refresh calls runAllScrapers().
2. Runner iterates over the 6 scrapers – each `scrape()` tries live pages up to 3 times, then falls back.
3. Each returned package is reshaped and added to an array. Failed banks are logged and skipped.
4. The array is written to loans.json in a single write.
5. The backend serves it at GET /api/loans, and the frontend displays it in the Bank Comparison tab.

### Evidence of contribution

- Source code: mbbank.js, techcombank.js, runAll.js in the repository.
- Output: loans.json contains MB Bank and Techcombank packages.
- Logs: console output of runOnce.js.
- Demo: Bank Comparison tab shows those two banks.

### How this connects to the final product

loans.json is the single file the rest of the system reads. Without MB Bank or Techcombank, two of the six options in the comparison would be missing. The runner and fallback data ensure the data is always available and consistent.

### What I learned

- **Inheritance saves a lot of repetition** – each new bank only took a few lines.
- **Planning for failure is safer than assuming success** – fallback data is critical.
- **Handling failure separately for each source keeps the whole pipeline alive** – one bad bank does not bring down the run.
- **Letting a single place own the file write** avoids conflicts.
- **I had to actually read the code I was building on** – understanding BaseScraper, Puppeteer, and smartExtract was essential.

### Challenges and how they were handled

| Problem | Root cause | Proposed fix |
|---------|------------|---------------|
| Both scrapers always fell back to static data | Inside `page.evaluate()`, calling `parseRate()`/`cleanText()` which don't exist in browser context | Pull raw text from browser, parse in Node |
| A fully failed run could wipe the database | Unconditional write; if allLoans = [], it erases the file | Guard write: only write if `allLoans.length > 0` |
| Refresh runs the banks one at a time (slow) | Sequential execution + retries → total time = sum of all banks | Use `Promise.allSettled` to run concurrently |
| Loan ids change on every run | Ids are reassigned from 1 each run, breaking `PUT /api/loans/:id` | Use stable id based on bank+package name, add deduplication |

### Message for future students

- **Read the base class before you write a scraper** – most behaviour is already there.
- **Do not rely on live bank sites** – always prepare fallback data.
- **Match tables by text or structure rather than CSS class** – classes change often.
- **Keep each source in its own try/catch and let one module own the file write.**
- **If you want real live data from these JavaScript‑heavy pages, keep the Puppeteer path but tune it for each bank.**

---

*Team 10 (G10) – Financial Analyzer Pro – NHA408E – 2025–2026 – FTU Hanoi*