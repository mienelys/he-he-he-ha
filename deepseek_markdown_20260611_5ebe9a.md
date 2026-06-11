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

In Team 10, I was responsible for the backend and DevOps side – building the entire API layer, scoring logic, risk engines, AI integration, and deploying the product to production. My work sat between the database (loans.json) and the live server, ensuring that all financial calculations, loan comparisons, and AI consultations worked reliably. I owned four main areas: (1) the Express.js API server and all its endpoints; (2) the 8‑factor loan scoring, 5‑level Quick Risk, and 7‑dimension Deep Risk engines; (3) the DeepSeek AI Consultant integration; and (4) deploying everything to Render with environment variables, health checks, and uptime monitoring.

### Personal mark in the product

**1. 8‑factor loan scoring algorithm**  
I designed and implemented a scoring system that evaluates each bank loan package on a 100‑point scale across eight weighted criteria: interest rate (25 pts), repayment affordability (20 pts), D/E leverage (10 pts), loan limit fit (10 pts), term fit (10 pts), LTV/collateral (10 pts), income requirement (10 pts), and processing fee (5 pts). The difficult part was not coding but calibrating the weights to reflect real bank underwriting practices. I ran the algorithm against 10 real loan packages from five banks and adjusted weights across five rounds until the rankings matched what a credit officer would expect.

**2. 7‑dimension Deep Risk engine**  
Instead of a single risk number, this engine produces a radar chart across seven independent dimensions: liquidity, leverage, profitability, efficiency, interest risk, experience, and scale. Each dimension scores 0–10 using its own formula (linear, logarithmic, or average‑based). This makes it easy for a business owner to see exactly which area is dragging them down – poor liquidity, high leverage, or low efficiency – without needing to interpret raw financial ratios.

**3. Product deployment and DevOps**  
I deployed the entire backend on Render, configured build and start scripts, set environment variables (DEEPSEEK_API_KEY, PORT, NODE_ENV), and added a health check endpoint. I also set up a monitoring ping every 10 minutes to keep the free‑tier server warm and avoid cold starts during demos. When I accidentally committed an API key to GitHub, I immediately revoked it, generated a new one, added .env to .gitignore, and cleaned the Git history.

### Things actually done

- Built the Express.js API server with endpoints: GET /api/health, GET /api/loans, POST /api/loans/refresh, POST /api/ai/chat, POST /api/risk/quick, POST /api/risk/deep.
- Wrote all eight scoring functions for the loan comparison model, each with its own linear or threshold‑based logic.
- Built the Quick Risk module: takes five financial ratios (D/E, ICR, Profit Margin, Current Ratio, Years), computes a weighted composite score, classifies into five risk levels (Very Low to Very High), and returns specific warnings and strengths for each.
- Built the Deep Risk engine: seven independent dimensions each scored 0–10 using different formulas, plus a composite score calculation.
- Integrated DeepSeek AI API: wrote a system prompt for SME finance context, added a 30‑second AbortController timeout, and handled three distinct error cases (401 authentication, 429 rate limit, network failure) with appropriate fallback messages.
- Designed the database layer: loans.json schema, initDatabase / readDatabase / writeDatabase helper functions, and DEFAULT_LOANS fallback so the app always has data even if scrapers fail.
- Deployed to Render: configured build command, start command, environment variables, health check, and auto‑deploy from the main branch.
- Set up monitoring on /api/health with a 10‑minute interval to keep the free server warm.
- Handled accidental API key leak: revoked the exposed key immediately, generated a replacement, added .env to .gitignore, and cleaned Git history using git filter‑branch.

### Files, features, logic contributed

| File / Feature | Path | Function |
|----------------|------|----------|
| server.js | /backend/server.js | Main server – endpoints, scoring, risk, AI, database helpers |
| package.json | /backend/package.json | Dependencies: express, cors, dotenv, axios, puppeteer |
| package.json (root) | /package.json | Build & start scripts for Render deployment |
| POST /api/risk/quick | server.js | 5 inputs → 5‑tier risk classification + warnings/strengths |
| POST /api/risk/deep | server.js | Full financials → 7‑dimension scores + radar data |
| POST /api/ai/chat | server.js | User question → DeepSeek call → advisory response |

### Evidence of contribution

- **backend/server.js** – Contains all API endpoints, scoring logic, risk engines, AI integration, and database layer. This file is the core of the backend.
- **frontend/index.html** – I also contributed to the frontend financial logic, including the Quick Risk Assessment, Deep Risk Assessment, and Loan Scoring functions that run in the browser.
- **Two package.json files** – One in the backend folder for server dependencies, one in the root for Render deployment scripts.
- **Public URL** – [https://financial-analyzer-ooel.onrender.com](https://financial-analyzer-ooel.onrender.com) – the live product, which is the strongest evidence that my deployment work succeeded.

### How this connects to the final product

The backend is the layer everything else depends on. Without the API server, the frontend has nothing to call. Without the scoring logic, the product is just a data entry form. Without deployment, no one outside the team can see or test anything.

- The **8‑factor algorithm** turns six inputs from the user into a recommended loan package with a clear “Best Match” label.
- The **Quick Risk** module gives users a precise 0–100 score and a five‑tier risk classification, along with plain‑language warnings (e.g., “Your interest coverage ratio is low – you have fewer options for high‑rate plans”).
- The **Deep Risk** engine produces a radar chart showing which of the seven dimensions is weakest, enabling targeted improvements.
- The **AI Consultant** allows users to ask follow‑up questions in everyday Vietnamese and receive personalised advice.

### What I learned

- **API security and environment configuration** – I accidentally committed a DeepSeek API key to GitHub. GitHub’s secret scanning flagged it. I learned to revoke keys immediately, use .gitignore from day one, and clean history with git filter‑branch.
- **Handling timeouts and errors** – DeepSeek API sometimes takes a long time. I added an AbortController with a 30‑second timeout and categorised errors (401, 429, network) with user‑friendly messages.
- **Algorithms need real‑world validation** – My first weight set produced rankings that didn’t feel right. I ran five calibration rounds manually, comparing algorithm output to what a financially literate person would expect, until the results were consistently reasonable.
- **Deploy early, maintain production parity** – Differences between localhost and a Linux cloud environment (file paths, environment variables, cold starts) caught me off guard. Deploying early and testing often saved us from last‑minute surprises.

### Challenges and how they were resolved

| Problem | Solution |
|---------|----------|
| DeepSeek API timeout – requests would hang indefinitely, freezing the UI | Added AbortController with 30s timeout, plus fallback messages for each error type |
| Render free‑tier cold starts – first request after 15 minutes of inactivity takes ~30 seconds | Set up a ping to /api/health every 10 minutes to keep the server warm; added a skeleton loader on the frontend |
| Scoring weight calibration – initial weights produced unrealistic rankings | Ran five calibration rounds, manually checking each profile and adjusting weights until output was consistently reasonable |
| Accidental API key exposure – committed .env to public repository | Revoked key immediately, generated a new one, added .env to .gitignore, used git filter‑branch to remove the commit from history |

### Message for future students

- **Set up .gitignore before your first commit** – include .env, node_modules, and any file with credentials. It takes two minutes and prevents a painful cleanup later.
- **Deploy early** – even with just one working endpoint, get it running on Render in week one. Production surfaces problems that localhost hides.
- **JSON database is fine for a demo, but switch to a real database (Supabase) early if you plan to scale** – refactoring from JSON to SQL after building many features is not fun.
- **The AI Consultant becomes much more useful with context** – pass the user’s risk scores and loan ranking into the system prompt. The AI will then give specific, situation‑aware advice.
- **Validate scoring weights with someone from a bank** – textbook knowledge is only a starting point; real credit officers can tell you what weights actually make sense.

---

## Member 2: Nguyễn Anh Tuấn

| Field | Value |
|-------|-------|
| **Full name** | Nguyễn Anh Tuấn |
| **Student ID** | 2312380088 |
| **Role** | UI/UX Design, Financial Engine, Dashboard Charts, API Integration, PDF Export, BCTC AI Parser |
| **Team** | Team 10 |

### Role in the project

As **Frontend Developer and UI/UX Designer**, I was responsible for bridging the gap between complex data and the user, crafting the entire client‑side experience. I transformed raw backend databases and scraped loan information into an elegant, easy‑to‑navigate web application. My work was divided into six key areas: (1) designing and coding a comprehensive, responsive 7‑tab UI with dark/light modes; (2) building a proprietary financial engine from scratch to calculate six critical ratios plus PMT, NPV, and IRR; (3) implementing five interactive Chart.js dashboards with clean memory management; (4) wiring up backend APIs to feed real‑time loan data; (5) designing specialised visualisation components like KPI cards, radar charts, and bank comparison grids; and (6) developing advanced analytical features including AI financial statement parsing, DuPont decomposition, sensitivity analysis, scenario analysis, and PDF export.

### Personal mark in the product

**1. Front‑End Development & UI/UX Design (7‑Tab Responsive Interface)**  
By designing and coding a responsive 7‑tab web application from scratch using CSS Grid and Flexbox, I established a polished user layer with a global dark/light mode toggle. The interface features a Risk Assessment tab with a drag‑and‑drop upload zone, an NPV/IRR cash flow calculator, a card‑based Bank Comparison tool, a central Dashboard with five dynamic charts, a Deep Risk radar chart, an AI Consultant chatbot, and a developer database manager.

**2. Custom Financial Engine & Real‑Time Investment Analysis**  
I programmed the platform’s core mathematical engine from scratch, implementing custom algorithms for PMT, NPV, and IRR (powered by Newton‑Raphson iteration). This logic drives real‑time updates for six core financial metrics: ROE, ROA, D/E, ICR, Profit Margin, and Current Ratio. I also engineered advanced analytical tools: a sensitivity table mapped across 14 discount rates (2%–30%), a 3‑tier scenario analysis tool, a cash flow waterfall chart, and a comprehensive break‑even tracking system.

**3. AI Financial Statement Parsing, DuPont Analytics & PDF Exporting**  
I built an AI financial parser to extract text from uploaded statements, leveraging the DeepSeek AI API to automatically fill out forms with proper validation. I also created a DuPont decomposition card that breaks down ROE into three colour‑coded visual metrics with automated AI explanations. Finally, I developed a PDF export tool that generates a polished 3‑page financial report with full Vietnamese font support.

### Things actually done

- Designed and coded the complete 7‑tab responsive UI from scratch using CSS Grid and Flexbox, featuring smooth tab‑switching animations, 9 dynamic and colour‑coded KPI cards, and a global dark/light mode toggle with persistent localStorage tracking.
- Built the core Financial Engine by writing custom `calculatePMT()`, `npv()`, and `irr()` functions (Newton‑Raphson iteration), driving real‑time data updates for six core financial health ratios via `syncData()`.
- Implemented five interactive **Chart.js dashboards** covering key financial structures and schedules, using strict `.destroy()` memory management, plus a combo cash flow waterfall chart.
- Engineered the advanced **NPV & IRR analysis tab**, integrating a 14‑discount‑rate sensitivity table, a 3‑tier scenario analysis tool with factor multipliers, a comprehensive break‑even card, and an Excel/CSV cash flow import feature (powered by SheetJS).
- Built the **AI parsing and analytical modules**: a drag‑and‑drop zone using PDF.js/SheetJS to extract text, connection to the backend `/api/ai/parse-bctc` endpoint for DeepSeek AI form auto‑filling, and a DuPont decomposition card with automated explanations.
- Connected the frontend to backend API endpoints and services using async/await pipelines for real‑time loan data refreshes; developed a visual bank comparison module with a “Best Match” badge; constructed an interactive AI Consultant chat interface with typing indicators.

### Files, features, logic, and demo parts contributed

| File / Feature | Path | Specific function |
|----------------|------|--------------------|
| index.html | /frontend/index.html | Contains all HTML, CSS, and JavaScript for the 7‑tab application – primary contribution |
| 7‑tab UI structure | index.html | Tab containers for all 7 tabs |
| BCTC upload zone + parser | index.html | Drag‑and‑drop file upload, PDF.js/SheetJS parsing, AI backend call, auto‑fill form |
| DuPont decomposition card | index.html | ROE decomposition into NPM, ATO, EM with colour‑coded boxes |
| Sensitivity analysis table | index.html | NPV at 14 discount rates (2%–30%) with colour‑coded rows |
| Scenario analysis (3 scenarios) | index.html | Pessimistic (-20%), Baseline, Optimistic (+20%) with verdict |
| Cash flow waterfall chart | index.html | Bar chart (annual) + line chart (cumulative) combo |
| Break‑even analysis | index.html | Total investment, inflows, net profit, simple ROI |
| PDF export (jsPDF + autoTable) | index.html | 3‑page report with Vietnamese font, balance sheet, income statement, ratios, loan comparison |
| `calculatePMT()`, `npv()`, `irr()` | index.html | Core financial functions; IRR uses Newton‑Raphson |
| `syncData()` – 6 financial ratios | index.html | Real‑time calculation of ROE, ROA, D/E, ICR, Profit Margin, Current Ratio |
| 5 Chart.js dashboard charts | index.html | Doughnut, pie, line, bar, stacked bar with `.destroy()` pattern |
| `refreshFromWebScraper()` – API call | index.html | Calls backend API to refresh loan data |
| `compareBankLoans()` – display | index.html | Renders bank cards with progress bars, score badges, “Best Match” |
| KPI cards (Tab 1 & Tab 5) | index.html | 4 + 5 KPI cards with dynamic values |
| AI Consultant chat interface | index.html | Chat UI with quick buttons, typing indicator |

### Evidence of contribution

- **Source code:** Complete `index.html` file in the repository – contains all HTML, CSS, and JavaScript for the 7‑tab UI, financial engine, 5 dashboard charts, BCTC AI parser, DuPont decomposition, sensitivity/scenario analysis, PDF export, and API integration.
- **Root `index.html`** – includes all Chart.js configurations, jsPDF export logic, and responsive CSS Grid layouts.
- **Live demo** – The web service runs from the team’s GitHub repository, accessible via the public URL [https://financial-analyzer-ooel.onrender.com](https://financial-analyzer-ooel.onrender.com).

### How this connects to the final product

The frontend is the user‑facing layer of the entire system. Without it, the backend server would have no interface, and users could not access any analysis features.

| Module built by me | How it helps the product and the user |
|--------------------|----------------------------------------|
| 7‑tab responsive UI + dark/light mode | Users access all features from one place on any device |
| Financial Statement AI parser | Users upload PDF/Excel – system auto‑fills all numbers, saving 15+ minutes of manual entry |
| Financial Engine (6 ratios + PMT/NPV/IRR) | Users get instant, accurate financial calculations without manual Excel |
| Sensitivity + Scenario analysis | Users understand how NPV changes with different discount rates and cash flow scenarios – essential for investment decisions |
| DuPont decomposition | Users see exactly which factor (profit margin, asset turnover, or leverage) drives their ROE – actionable insight |
| 5 dashboard charts | Users visualise asset structure, capital structure, profit trends, cash flow, and repayment schedules |
| PDF export | Users download a professional 3‑page report to share with banks, investors, or management |
| API connection | Users refresh loan data from real banks via web scraper, then see updated packages instantly |
| Bank comparison display | Users see which loan package best fits their profile with colour‑coded progress bars |

### What I learned

- **Integrating AI into frontend requires careful error handling.** The BCTC parser calls DeepSeek AI via the backend. I learned to implement loading states, timeout handling, and fallback messages – otherwise users see a frozen UI.
- **PDF export with Vietnamese fonts is challenging.** jsPDF does not natively support Unicode. I learned to fetch Roboto fonts from CDN, convert them to base64, add them to jsPDF’s virtual file system, and set the font before rendering text – otherwise all Vietnamese accents appear garbled.
- **Chart.js memory management is critical.** Each chart instance consumes memory. I learned to store chart instances in global variables and call `.destroy()` before creating new ones – otherwise the browser slows down after 5–6 tab switches.
- **IRR convergence needs iteration limits.** Newton‑Raphson sometimes fails to converge. I learned to set a maximum of 1000 iterations, add an early exit condition (change < 1e‑7), and return NaN instead of freezing the browser.
- **Responsive design is not just media queries.** Using `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))` saved me from writing 10+ breakpoints. This single pattern handles mobile, tablet, and desktop elegantly.
- **Dark/light mode requires planning CSS variables early.** I restructured all colours into CSS variables on day one. When dark mode was requested later, I just added a `.dark` class that overrides these variables – zero refactoring needed.

### Challenges encountered and how they were resolved

| Problem | Solution |
|---------|----------|
| **Financial Statement AI parser fails to extract numbers correctly** – Vietnamese PDFs have inconsistent formats; DeepSeek sometimes returned incomplete or misformatted JSON. | Added comprehensive error handling – if AI response lacks required fields, show a detailed error message and do not overwrite existing form data. Also added a timeout (60 seconds) and retry logic. |
| **PDF export garbles Vietnamese accents** – jsPDF default font (Helvetica) does not support Vietnamese characters like ă, â, đ, ê, ô, ơ, ư. | Fetched Roboto font from CDN, converted to base64, added to jsPDF via `addFileToVFS()` and `addFont()`, then set `doc.setFont('Roboto')`. Tested on multiple devices. |
| **Sensitivity analysis table becomes too wide** – 14 discount rates produced a table that overflowed on mobile screens. | Made the table horizontally scrollable using `overflow-x: auto` in a wrapper div. Added responsive CSS so the table font size reduces on small screens. |
| **Scenario analysis multipliers affect Year 0 incorrectly** – Applying ±20% to all cashflows also changed the initial investment (Year 0), which should remain fixed. | Modified scenario logic to apply multipliers only to cashflows at index ≥ 1. Year 0 (initial investment) stays unchanged across all scenarios. |

### Message for future students

- **→ Migrate from vanilla JavaScript to React/Vue.** The current codebase is a single 3000+ line HTML file, which becomes unmaintainable quickly. React components would make the 7 tabs, BCTC upload zone, DuPont card, and PDF export much easier to manage, test, and extend.
- **→ Add caching for BCTC AI responses.** Users may upload the same financial statement file multiple times. Caching parsed results in localStorage or IndexedDB with a 24‑hour TTL would reduce API costs and improve response time by 50–70%.
- **→ Improve PDF export performance and add Excel export.** Currently PDF export takes 2–3 seconds. Optimise by using web workers and add an Excel export option using SheetJS for users who prefer spreadsheets.
- **→ Validate the BCTC parser with real Vietnamese SME files.** The current parser works with standard PDFs, but many Vietnamese SMEs use scanned or handwritten financial statements. Adding OCR (Tesseract.js) would significantly improve real‑world usability.
- **→ Deploy on day one – not after the product is ‘ready’.** Netlify and similar platforms surface environment issues that never appear on localhost (CORS, file paths, API timeouts, font loading). The earlier you find them, the less painful they are to fix.

---

## Member 3: Ngô Quốc Huy

| Field | Value |
|-------|-------|
| **Full name** | Ngô Quốc Huy |
| **Student ID** | 2312380011 |
| **Role** | BaseScraper, BIDV Scraper, Database Management |
| **Team** | Team 10 |

### Role in the project

I was responsible for bank loan data collection and processing on the backend. I built the **BaseScraper** class – the common framework for all scrapers – developed the **BIDV scraper**, and participated in building the multi‑bank data aggregation process through **runAll.js**. My work sits at the data input layer of the system. The data collected and normalised by my modules is used in the Loan Comparison, 8‑Factor Loan Scoring, and Best Match Recommendation features.

### Personal mark in the product

**1. BaseScraper – a reusable scraping architecture**  
Instead of building individual scrapers for each bank from scratch, I designed a shared base class that handles website access, error handling, retry logic, fallback data, and data extraction. This class significantly reduces the workload when extending to new banks and creates a unified structure for the entire scraper module. Any child scraper only needs to set its bank name, URLs, and fallback data.

**2. BIDV scraper and fallback data**  
I built the BIDV scraper as a concrete subclass of BaseScraper, configured its two target URLs (interest rate page and personal loan page), and provided a fallback dataset with two packages (working capital loan, medium/long‑term loan with collateral). This ensures that even if live scraping fails, the system always has BIDV loan data to display.

**3. Data aggregation pipeline (runAll.js)**  
I wrote the orchestration module that imports all six bank scrapers, runs them sequentially, catches errors per bank so that one failure does not stop the rest, normalises all output into a common schema, and writes the consolidated data to loans.json. This pipeline is the backbone of the product’s loan data.

### Things actually done

- Built BaseScraper class with puppeteer‑extra and puppeteer‑extra‑plugin‑stealth to reduce the chance of being blocked.
- Designed constructor to accept bankName and urls, allowing each child scraper to reuse the same logic while remaining configurable per bank.
- Built a retry mechanism inside `scrape()`: if the first attempt fails or returns no valid data, the system retries up to 3 times (with 5‑second delays) before using fallback data.
- Built `_scrapeOnce()` to automatically launch a headless browser, create a new page, set user agent and viewport, navigate to the bank URL, wait for page load, and invoke data extraction logic.
- Built `smartExtract(page)` with two strategies: (1) search for HTML tables containing keywords like “lãi suất”, “interest rate”, “%/năm”; (2) if no matching table, scan elements containing the % symbol to locate fallback interest rate data.
- Built helper functions: `parseRate(text)` to extract interest rates using regex, `cleanText(text)` to normalise loan package names, and `extractTerm(text)` to recognise loan terms in years or months and convert to months.
- Built **bidv.js** inheriting BaseScraper, configured with 2 BIDV URLs, and provided fallback data for two loan packages.
- Built **runAll.js** to import all six bank scrapers (Vietcombank, BIDV, MB Bank, Techcombank, VPBank, Sacombank).
- Wrote logic to run scrapers sequentially, catching errors per bank so that if one scraper fails, the others continue.
- Standardised output data in runAll.js by adding required system fields: id, name, packageName, interestRate, processingFee, maxTerm, minLoan, maxLoan, maxLTV, minIncome, pros, cons, requirements, source, loanTypes, lastUpdated.
- Wrote logic to create the database folder if it does not exist.
- Wrote logic to save all scraped data to database/loans.json.
- Added result logging after scraper execution to report which banks succeeded, which failed, and the total number of loan packages saved.

### Files, features, logic contributed

| File / Feature | Path | Function |
|----------------|------|----------|
| baseScraper.js | /backend/scrapers/baseScraper.js | Parent class – manages Puppeteer, retries, fallback, shared data processing |
| bidv.js | /backend/scrapers/bidv.js | BIDV scraper – inherits BaseScraper, configures URLs, provides fallback data |
| runAll.js | /backend/scrapers/runAll.js | Orchestrates all 6 scrapers, isolates errors, normalises output, writes loans.json |
| loans.json | /database/loans.json | Data file created and updated by runAll.js, used by Loan Comparison and Scoring |
| Scraper data pipeline | baseScraper → bidv.js → runAll.js → loans.json | Connects external bank data to the product’s analysis system |

### Evidence of contribution

- **Source code:** baseScraper.js, bidv.js, and runAll.js are in the repository and contain the scraping and aggregation logic I wrote.
- **Output data:** loans.json after a run contains BIDV packages with all standardised fields – this data is consumed by the frontend.
- **Run logs:** The console output of runAll.js shows success/failure per bank and the total number of loans saved.
- **Live demo:** The Bank Comparison tab displays BIDV loan packages, proving that my pipeline works and is integrated.

### How this connects to the final product

My work serves as the data collection and input processing layer for the Financial Analyzer system. The core features – Loan Comparison, 8‑Factor Loan Scoring, and Best Match Recommendation – all require bank loan package data. Without the scraper and data normalisation pipeline, the system could still perform financial calculations, but it would have no real bank data to support meaningful loan comparison and recommendations. From an architectural perspective, my work is the bridge between external data sources and the financial analysis modules.

### What I learned

- **Reusable architecture matters more than building a feature quickly.** Taking the time to build BaseScraper from the start significantly reduced the workload when extending to other banks and made the codebase easier to maintain.
- **Web scraping in practice is less stable than academic examples suggest.** Bank websites change HTML structures, load data via JavaScript, or return inconsistent results. Scrapers cannot rely entirely on fixed selectors – they need multiple fallback layers.
- **Fallback data is not a temporary fix.** For a product with a live demo and real users, ensuring the system always has data to operate on is just as important as retrieving the latest figures.
- **Data should be normalised at the point of collection.** Bank websites present information in many different formats, but the frontend and scoring algorithms should receive only a single unified data structure. Normalising in runAll.js significantly reduced complexity for downstream modules.
- **A good data pipeline must be fault‑tolerant locally.** A single scraper failure should not stop the entire data collection process. Wrapping each scraper in its own error handler allows other scrapers to continue running.

### Challenges and how they were resolved

| Problem | Solution |
|---------|----------|
| **Scraper failures due to slow or unresponsive bank websites** – pages load slowly, time out, or return no data. | Added a retry mechanism to BaseScraper: up to 3 retries with 5‑second delays, then fallback to static data. |
| **A single scraper failure could break the entire aggregation process** – if one bank failed, the whole script stopped. | Wrapped each scraper in its own try/catch block in runAll.js. Errors are logged but other scrapers continue. |
| **Fixed selectors break when websites change HTML structure** – classes and layouts change without notice. | Built `smartExtract()` that searches for HTML tables containing interest rate keywords, or scans for % symbols as a fallback – much more flexible than hard‑coded selectors. |
| **Regex incorrectly matched percentages that were not interest rates** – fee percentages, promotional discounts, savings rates. | Combined regex with logical filtering: only accept rates within a realistic range (0 < rate < 50) and prioritise sections with interest‑rate keywords. |
| **Inconsistent data structure across scrapers** – different field names (rate vs interestRate, loanName vs packageName). | Normalised all data inside runAll.js before writing to loans.json, adding standard fields like packageName, interestRate, maxTerm, etc. |
| **Browser not closed when a scraper encounters an error** – leaving processes hanging. | Moved browser.close() into a finally block so the browser is always closed, regardless of success or failure. |
| **Scraped data could be empty without throwing an error** – the scraper completed but returned []. | Added data validation inside scrape(): if result is empty, retry; only after all retries fail with no data does the system switch to fallback. |

### Message for future students

- **Do not rely entirely on live web scraping.** Bank websites can change at any time. Build fallback data from the beginning and treat it as an official part of the system.
- **Normalise data at the collection layer.** Design a standard data structure before building interfaces or algorithms. Changing the schema later is much harder.
- **Replace JSON with a real database if you continue scaling.** For this project, loans.json was fine, but for production with user accounts and history, migrate to PostgreSQL or Supabase early.
- **Build a scraper monitoring mechanism.** A scraper working today may fail tomorrow. Add automatic checks to detect which scrapers are failing and send alerts.
- **Treat data as a product.** The hardest part was not writing scoring algorithms or building the UI – it was creating a stable and reliable data source for those algorithms to work with.

---

## Member 4: Nguyễn Trường Phước

| Field | Value |
|-------|-------|
| **Full name** | Nguyễn Trường Phước |
| **Student ID** | 2312380026 |
| **Role** | Data Scraping Engineer – VPBank Scraper, Vietcombank Scraper |
| **Team** | Team 10 |

### Role in the project

As Data Scraping Engineer, I owned the pipeline connecting the product to real interest‑rate data from Vietnamese banks. I was assigned **VPBank** and **Vietcombank**. Three core responsibilities: (1) design and build the VPBank scraper (CSS selector + table fallback), (2) design and build the Vietcombank scraper (regex + keyword‑context for unstructured text), and (3) output normalisation – both scrapers emit the same schema so the rest of the system consumes data without knowing which scraper delivered it.

### Personal mark in the product

**1. Dual‑strategy scraping architecture**  
VPBank uses CSS selector parsing; Vietcombank uses regex with keyword‑context filtering. These are architecturally separate because the problem is architecturally separate. The key design decision was to keep both scrapers behind the same interface – so the backend can call `scrape()` on either one without knowing how the data was obtained.

**2. Three‑tier fallback system that guarantees a non‑empty loan list**  
Every scraper can fail silently – bank websites change HTML, go down for maintenance, or serve bot‑detection pages. My fallback design ensures the system never returns an empty loan list: Tier 1 tries the primary selector strategy, Tier 2 falls back to regex, Tier 3 serves a manually verified static dataset. The frontend sees the same schema regardless of which tier delivered the data.

**3. `extractRate()` validator – noise filter for Vietnamese numeric formats**  
Vietnamese bank websites write numbers with both commas and dots, and a single page can contain dozens of % symbols that have nothing to do with loan interest rates (discounts, promotions, savings rates, penalties). The `extractRate()` function handles both decimal formats, applies a range filter [3%,20%], and rejects round‑number noise. It became the shared utility used by both scrapers.

### Things actually done

- Analysed the page structure of both bank websites before writing code – documented whether each site used structured tables, dynamic JS rendering, or unstructured prose; this analysis directly determined the scraping strategy for each bank.
- Studied Huy’s BaseScraper and understood its retry and proxy‑rotation logic, then extended it separately for VPBank and Vietcombank.
- Built VPBankScraper: Strategy 1 – CSS selector on elements whose class contains ‘rate’ / ‘interest’; Strategy 2 – Cheerio table parser for static‑HTML interest‑rate tables when Strategy 1 returns empty.
- Built VCBScraper: full regex‑based approach scanning all `<p>`, `<div>`, `<li>` elements; rate extraction only fires when the text node also matches the keyword pattern ‘lai suat vay’ or ‘vay von’.
- Wrote `extractRate(text)` – shared utility function: normalises comma/dot decimal formats, applies [3%,20%] range filter, rejects round‑number noise values.
- Designed the three‑tier fallback – Tier 1 (CSS selector), Tier 2 (regex), Tier 3 (static fallback data) – with all tiers outputting the same JSON schema.
- Manually verified fallback data against NHNN public rate disclosures: VPBank reference rate 8.5%/year, Vietcombank 7.5%/year.
- Built a ground‑truth verification process: visited each bank website manually every week, recorded current rates, compared against scraper output to catch silent regression.
- Added structured debug logging to both scrapers: fetched URL, response byte size, all regex matches, every rejected value with reason – making bug reproduction a log‑read rather than a re‑run.
- Ran 30 live scrape cycles per day across both banks to measure real‑world success rates (~75% for VPBank, ~60% for Vietcombank).

### Files, features, logic contributed

| File / Feature | Path | Function |
|----------------|------|----------|
| vpbank.js | /backend/scrapers/vpbank.js | VPBank scraper – dual CSS + table strategy, fallback, logging |
| vietcombank.js | /backend/scrapers/vietcombank.js | Vietcombank scraper – regex + keyword‑context, dedup, fallback |
| extractRate() | Shared across both scrapers | Normalises Vietnamese decimal formats; range filter [3,20]; rejects noise |
| getFallbackData() | Both scrapers | Returns manually verified static rates when all live strategies fail |
| Three‑tier fallback logic | Both scrapers | Tier 1 → Tier 2 → Tier 3; guarantees non‑empty output |
| Debug logging layer | Both scrapers | URL, byte count, matched regex segments, rejection reasons |
| Ground‑truth dataset | Manual, documented weekly | Baseline for accuracy testing; source for fallback rate values |

### Evidence of contribution

- **Source code:** vpbank.js and vietcombank.js in `/backend/scrapers/` – all scraping logic, fallback tiers, and `extractRate()` helper are in these files.
- **Live verification:** Calling POST /api/loans/refresh on the deployed Render URL triggers all scrapers. The presence of VPBank and Vietcombank entries in the response directly confirms my scrapers ran.
- **Fallback data in server.js:** DEFAULT_LOANS in Dat’s server.js contains the VPBank and Vietcombank reference rates I authored and verified – this is the shared safety net for the entire product.
- **Midterm documentation:** Part E of the midterm submission lists ‘Vietcombank + VPBank scraper, three‑tier fallback, output normalisation’ under my name.

### How this connects to the final product

The scrapers are the data intake layer of the entire stack. Every bank comparison the user sees is powered by data that either my scrapers retrieved live from bank websites, or the fallback datasets I verified and authored. If both scrapers return empty and there is no fallback, the comparison tab shows nothing – the product fails its core promise.

| Module | How it helps the product and the user |
|--------|----------------------------------------|
| VPBank Scraper | Delivers up‑to‑date VPBank SME loan packages – the most common private‑bank product Vietnamese SMEs compare |
| Vietcombank Scraper | Covers the largest state‑owned bank; most SMEs already have a Vietcombank relationship and need this data to benchmark |
| Three‑tier fallback | Ensures the comparison table is always populated even when live scraping fails – the user never sees an empty list |
| extractRate() validator | Prevents wrong interest rates from entering the scoring engine – a single corrupted rate would silently skew every downstream comparison |
| Output normalisation | Allows the backend to consume data from all five banks with one schema – no special‑casing per bank |

### What I learned

- **Test on the live site, not a saved snapshot.** The HTML a browser renders after JavaScript execution is not the same as what fetch() receives. This cost me an integration failure that I had to diagnose and fix.
- **No public API means everything is fragile.** Vietnamese bank websites are marketing pages, not data APIs. Any redesign can break the scraper overnight and no bank will notify you. The correct response is not a cleverer scraper – it is robust fallbacks.
- **Keyword specificity beats keyword presence.** ‘Lai suat’ appears in both loan and savings descriptions. ‘Lai suat vay’ is specific to lending. One extra word eliminated an entire class of false positives.
- **Cheerio fires callbacks on nested elements – always deduplicate by value after collection.** This is not documented clearly, and I only discovered it by staring at output with 4 identical entries.
- **Success rate is a product metric, not just a technical metric.** I could have claimed the scraper ‘works’ after a single successful test. Measuring 30 runs per day and reporting 60% honestly was more useful – it told the team how often fallback would fire in production.
- **Log rejection reasons, not just rejections.** Knowing ‘0.5% rejected’ is less useful than ‘0.5% rejected – range filter’. When a new noise pattern appeared (savings rates in the 6–7% range that passed the range filter), my logs made the specific failure case immediately obvious.

### Challenges and how they were resolved

| Problem | Solution |
|---------|----------|
| **VPBank – CSS selector trap** – Product cards injected by JavaScript; static fetch() cannot see them. Strategy 1 returned empty on most live requests. | Added Strategy 2: a table parser targeting `<table tr>` elements, which VPBank renders server‑side even when card components are JS‑dynamic. This brought success rate from 0% to ~75% without Puppeteer. |
| **Vietcombank – noise problem** – 20–30 % symbols on a single page (savings rates, fee structures, promotional discounts, insurance coverage). Naive regex captured all of them. | Combined three independent noise filters: (1) keyword‑context check requiring ‘lai suat vay’ or ‘vay von’, (2) numeric range filter [3%,20%], (3) rejection list for common round‑number noise values. False‑positive count dropped to zero. |
| **Vietcombank – no table structure** – All information in unstructured Vietnamese prose; no `<table>`, no semantic class names. | Switched entirely to regex + keyword‑context strategy. Accepted that success rate would be lower (~60%) and compensated with accurate fallback data. |

### Message for future students

- **→ Migrate Vietcombank to Puppeteer.** The current regex approach works at ~60% but degrades with every page redesign. A headless browser can execute JavaScript and parse fully‑rendered HTML. This is the highest‑ROI upgrade.
- **→ Add automatic structure‑change detection.** Currently, if a bank redesigns HTML overnight, the scraper silently falls back to static data and nobody knows. Add a health check: if live scraper output differs from the last successful run by more than 20%, send an alert.
- **→ Store multiple fallback URLs per bank.** Each bank has a main product page, a business‑loan subpage, and a promotional landing page. If the primary URL fails, try a secondary before giving up. This alone could raise Vietcombank’s success rate to 70–75%.
- **→ Capture promotional rates, not just base rates.** Vietnamese banks frequently run time‑limited promotions (‘Vay uu dai 6.5%/nam trong 6 thang dau’). The current scrapers only target standard‑rate sections. Scraping promotional pages and flagging those rates as time‑limited would significantly improve comparison quality.
- **→ Replace regex context‑matching with a lightweight NLP classifier.** Keyword regex is brittle – it breaks when Vietcombank rephrases product descriptions. A simple sentence classifier trained on ‘loan rate sentence vs not loan rate sentence’ would be far more robust.

---

## Member 5: Nguyễn Thiện Quang

| Field | Value |
|-------|-------|
| **Full name** | Nguyễn Thiện Quang |
| **Student ID** | 2312380029 |
| **Role** | MB Bank scraper, Techcombank scraper, scraper integration |
| **Team** | Team 10 |

### Role in the project

Quang worked on data collection for Team 10. The system pulls loan information from six bank websites, and every bank has its own scraper on top of a shared base class. Huy wrote BaseScraper and the BIDV scraper, Phước did VPBank and Vietcombank, and Quang took the two remaining banks – **MB Bank** and **Techcombank** – together with the runner that ties all six scrapers together and saves their output into one data file (loans.json).

### Personal mark in the product

**1. Two clean, minimal scrapers (MBBankScraper, TechcombankScraper)**  
Each scraper is a short subclass of BaseScraper, setting only the bank name, the list of pages to visit, and a fallback dataset. Keeping them this small was intentional – when a bank changes its website, only one short file needs to be fixed instead of the whole scraping module.

**2. The runner (runAll.js)**  
This script runs all six scrapers, catches errors from any single one so the others keep going, gives every loan record the same set of fields, and writes everything to loans.json in one pass. It also logs success/failure per bank and the total number of packages saved.

**3. Fallback data for MB Bank and Techcombank**  
Vietnamese bank sites load most content with JavaScript and change layout often, so live scraping is not reliable. The fallback datasets I prepared for MB Bank (Vay sản xuất kinh doanh 6.0%, MISA Lending 5.8%) and Techcombank (Vay doanh nghiệp SME 5.99%, Vay tín chấp doanh nghiệp 13.78%) are what the base class uses once its retries run out – this ensures the comparison screen always shows real loan packages during a demo.

### Things actually done

- Built the MB Bank scraper in **mbbank.js**: set the two MB Bank pages (the rates page and the personal‑loan page) and a fallback list of two packages.
- Built the Techcombank scraper in **techcombank.js** the same way, with a fallback list of two packages.
- Wrote **runAll.js** to load the six scrapers, run each one inside a try/catch, gather the successful results into a single array, and save that array to database/loans.json.
- Set up the common record format used while collecting (id, processingFee, maxLTV, minIncome, source timestamp, loanTypes, lastUpdated) so every bank’s data comes out in the same shape.
- Added a log line for each bank in the runner, either the number of packages it returned or its error message, so a broken bank is easy to spot.
- Read through BaseScraper to understand what the subclasses inherit (Puppeteer with stealth plugin, three retries five seconds apart, and the smartExtract logic) and checked that both scrapers fall back correctly when no rate table is found.
- Tested the whole flow with **runOnce.js**, confirming that loans.json comes out valid and that one failing scraper does not stop the rest.

### Files, features, logic contributed

| File | Path | Function |
|------|------|----------|
| mbbank.js | /backend/scrapers/mbbank.js | MB Bank scraper – target pages and fallback dataset |
| techcombank.js | /backend/scrapers/techcombank.js | Techcombank scraper – target pages and fallback dataset |
| runAll.js | /backend/scrapers/runAll.js | Runs all six scrapers, isolates errors, consolidates, writes loans.json once |
| runOnce.js | /backend/runOnce.js | One‑shot entry point that triggers runAll to set up the database |
| loans.json | /database/loans.json | Output written by runAll and read by the backend at GET /api/loans |

### How data flows end to end

1. runOnce.js, or a POST to /api/loans/refresh on the server, calls runAllScrapers().
2. The runner goes through the six scrapers in turn. Each `scrape()` tries the live pages up to three times, then falls back to its own dataset.
3. Each package that comes back is reshaped and added to one array. A bank that throws is recorded as an error and skipped, so it cannot take down the others.
4. The array is written to database/loans.json in a single pass, so the scrapers never fight over the file.
5. The backend serves that file at GET /api/loans, and the Bank Comparison tab on the frontend reads it and ranks the packages for the user.

### Evidence of contribution

- **Source code:** mbbank.js, techcombank.js, and runAll.js in the repository show the URLs, the fallback datasets, the error‑isolated loop, and the single write to loans.json.
- **Output data:** database/loans.json after a run contains the MB Bank and Techcombank packages with the shared fields (id, interestRate, maxTerm, source timestamp, lastUpdated).
- **Run logs:** The console output of `node runOnce.js` shows one success‑or‑fallback line per scraper and the final count of loans saved.
- **Demo:** The Bank Comparison tab in the running app shows MB Bank and Techcombank packages coming from these scrapers.

### How this connects to the final product

loans.json is the single file the rest of the system reads. The backend serves it at GET /api/loans, and the Bank Comparison tab on the frontend uses it to rank loan packages by how well they fit a user’s profile. Without my two banks, two of the six options in that comparison would be missing. Without the runner and fallback data, the comparison could come up empty or out‑of‑date during a demo, since the live pages often return nothing. In other words, this work ensures the comparison feature has a complete and steady set of data to work from.

### What I learned

- **Inheritance saved a lot of repetition.** Because the shared logic lived in BaseScraper, each new bank only took a few lines, and one fix in the base class helped every scraper at once.
- **It is safer to plan for scraping to fail than to assume it works.** Bank sites change and block bots, so good fallback data turned out to matter more than a perfect live scrape.
- **Handling failure separately for each source keeps the whole pipeline alive.** Wrapping every scraper in its own try/catch meant one bad bank did not bring down the run.
- **Letting a single place write the file saved a lot of trouble.** The scrapers just return data and the runner does the one write, which kept loans.json consistent.
- **I had to actually read the code I was building on.** Understanding what Puppeteer, the stealth plugin, and smartExtract were doing was the only way to explain why my scrapers behaved the way they did.

### Challenges and how they were handled

| Problem | Root cause | Proposed fix |
|---------|------------|---------------|
| **Both scrapers always fell back to static data** – neither ever returned a live rate. | In `smartExtract()`, `parseRate()` and `cleanText()` are called inside `page.evaluate()`, where `this` is not the scraper object and those functions (Node‑side) do not exist. | Pull only raw text out of the browser and do the parsing back in Node. (This fix sits in the shared base class.) |
| **A fully failed run could wipe the database** – if all six scrapers fail, `allLoans` becomes `[]` and the good data in loans.json is replaced with an empty array. | The write is unconditional. | Guard the write: only write if `allLoans.length > 0`; otherwise keep the old loans.json. |
| **The refresh runs the banks one at a time** – sequential execution + retries means a full refresh can take minutes. | Each scraper can retry 3 times with 5‑second delays, so total time is the sum of all banks. | Run the banks concurrently using `Promise.allSettled` – total time becomes roughly the slowest single bank, while keeping error isolation. |
| **Loan ids change on every run** – ids are reassigned from 1 each run, and there is no deduplication. | `PUT /api/loans/:id` edits a package by its id; after a refresh, an edit made before may land on a different package. | Generate a stable id from `bank name + package name`, and skip duplicates using a Set. |

### Message for future students

- **Read the base class before you write a scraper.** Most of the behaviour is already there; you mainly set the URLs and the fallback data.
- **Do not count on the live bank sites.** Always prepare fallback data so a demo does not break when a page is down or has changed.
- **Match tables by their text or structure rather than by CSS class.** Banks rename their classes often, and a fixed selector breaks the next week.
- **Keep each source in its own try/catch and let one module own the file write.**
- **If you want real live data from these JavaScript‑heavy pages, keep the Puppeteer path but tune it for each bank.** That is the obvious next step beyond fallback data.

---

*Team 10 (G10) – Financial Analyzer Pro – NHA408E – 2025–2026 – FTU Hanoi*