# Product name
Financial Analyzer Pro

## Group code
G10

## Link repo
https://github.com/FTU-Legacy-62/G10

## Link demo
https://financial-analyzer-ooel.onrender.com

## Problem statement
SMEs in Vietnam (over 97% of all enterprises) lack tools to assess their financial health and compare loan packages systematically. Most business owners do not know their ROE, ROA, D/E, or ICR relative to safe thresholds. Loan information is scattered across bank websites, and decisions are often made based on intuition rather than data. Financial Analyzer Pro provides an automated platform for financial health assessment and loan comparison, helping SMEs make informed borrowing decisions.

## Target users
- SME owners and financial managers in Vietnam (revenue 1–50 billion VND/year)
- Business owners who need to evaluate borrowing capacity and compare bank loans before meeting loan officers

The platform is used when SMEs need working capital or expansion loans, enabling them to understand their risk profile and choose the best loan package in minutes.

## Current product capabilities
Financial Analyzer Pro currently provides seven core features organized in a tabbed interface.

1. **Dashboard KPI** – Automatically calculates ROE, ROA, D/E, ICR, Profit Margin, Current Ratio from user inputs, with asset structure charts and detailed repayment schedule.

2. **Quick Risk Assessment (5 levels)** – Classifies business risk from Very Low to Very High with specific warnings and strength indicators.

3. **Deep Risk (7 dimensions)** – Evaluates 7 independent risk aspects (0–10 each), displays radar chart, and includes DuPont three-factor analysis.

4. **Loan Comparison & 8-Factor Scoring** – Scores each loan package on a 0–100 scale using 8 weighted criteria, ranks 5 banks (Vietcombank, BIDV, Techcombank, VPBank, Sacombank), and highlights the Best Match.

5. **AI Consultant** – Chatbot powered by DeepSeek API providing personalized financial advice in Vietnamese.

6. **NPV/IRR Analysis** – Calculates net present value, internal rate of return, sensitivity analysis, and scenario comparison (pessimistic/base/optimistic) for project evaluation.

7. **Admin Database** – Manages loan packages (add/edit/delete), import/export JSON, and update via web scraper.

## Input
- **User inputs** – Financial statement data (total assets, debt, revenue, net profit, interest expense, years of operation, collateral value, desired loan amount, term, monthly income). Users can also upload PDF/Excel files for AI-assisted auto-filling.
- **Loan package data** – Interest rates, min/max limits, max term, LTV ratio, minimum income requirement, processing fees from 5 banks (static JSON with fallback data).
- **Macroeconomic data** – GDP growth, inflation rate, USD/VND exchange rate, SBV policy rate (manual or API update).

## Processing logic
- **Financial ratio calculation** – D/E = Debt / (Assets − Debt); ROA = Net Profit / Total Assets; ROE = Net Profit / Equity; ICR = (Net Profit + Interest) / Interest; PMT = P×r(1+r)^n / ((1+r)^n−1).
- **8-Factor Loan Scoring (0–100)** – Weighted sum: Interest rate (25), debt service coverage (20), D/E (10), loan amount fit (10), term fit (10), LTV (10), income requirement (10), processing fee (5). Each criterion uses linear or threshold-based scoring.
- **Quick Risk Assessment** – Score = D/E score×30% + ICR score×25% + Profit Margin score×25% + Current Ratio score×10% + Years score×10%. Maps to 5 risk levels (Very Low ≥80, Low 60–79, Medium 40–59, High 20–39, Very High <20).
- **Deep Risk 7 dimensions** – Each dimension scored 0–10 using specific formulas for liquidity (Current Ratio), leverage (D/E log scale), profitability (avg of Margin/ROA/ROE), efficiency (relative ROA), interest coverage (ICR), experience (years), size (log assets). Composite = (sum/70)×100.
- **Loan comparison** – After user inputs loan amount and term, the system computes PMT for each bank's package, applies scoring model, sorts by total score, and labels Best Match.
- **AI consultation** – User questions are sent to DeepSeek API (with optional context for future enhancement). The chatbot returns Vietnamese advice based on general financial knowledge.

## User flow
1. A user opens Financial Analyzer Pro on a browser (public URL).
2. The user enters business financial data (or uploads PDF/Excel for AI auto-fill).
3. The user enters desired loan amount, term, monthly income, and collateral value.
4. The system automatically calculates KPIs and displays the Dashboard.
5. The user views Quick Risk Assessment to understand risk level and specific warnings.
6. The user explores Deep Risk radar chart to identify the weakest dimension.
7. The user sees the loan comparison table with scores, rankings, and Best Match highlight.
8. The user adjusts loan amount or term to see how scores and repayment burden change.
9. The user asks the AI Consultant for personalized financial advice.
10. (Optional) The user uses NPV/IRR Analysis to evaluate a specific investment project.

## Outputs
- **Dashboard KPI** – Color-coded financial ratio cards, asset structure pie chart, repayment schedule table.
- **Loan comparison table** – Ranked list of 5 banks with 8-factor scores, estimated PMT, and labels (Best Match / Phù hợp / Cân nhắc / Ít phù hợp).
- **Quick Risk Assessment** – Risk level (5 levels) with bullet-point warnings (e.g., "D/E quá cao – cần giảm nợ") and strengths (e.g., "Profit Margin tốt").
- **Deep Risk Radar Chart** – Spider chart (7 axes 0–10) showing risk profile versus ideal threshold, plus DuPont analysis.
- **NPV/IRR Analysis** – NPV, IRR, payback period, waterfall chart, sensitivity table, scenario comparison.
- **AI Consultant response** – Natural language Vietnamese advice from DeepSeek.
- **Export PDF** – Consolidated report of all analysis results.

## Key design decisions
- **SME focus** – The team chose SMEs because they have the greatest need but are the least served by financial analysis tools. Existing Excel templates are too complex for non-experts.
- **Separated backend + frontend architecture** – Backend (Node.js/Express) and frontend (plain HTML/JS) allow team members to work independently: UI development with mock data while APIs are built, and scraper development in parallel.
- **JSON file instead of real database** – For academic scope, JSON files demonstrate functionality without setup time for PostgreSQL/MongoDB, allowing focus on financial logic and UI/UX. (Noted as a limitation to upgrade later.)
- **DeepSeek API over GPT-4/Claude** – DeepSeek offers free/low-cost API suitable for academic projects, with good Vietnamese language capability. GPT-4/Claude provide higher quality but cost too much for unlimited demo.
- **Static loan data instead of live web scraping** – Web scraping bank websites is prone to blocking (anti-bot, Cloudflare, CAPTCHA). Using static JSON with fallback data ensures the demo always works. Web scrapers are developed in parallel as a supplementary feature.

## Project strengths
✅ **8-factor scoring algorithm has financial depth** – Weights (25/20/10/10/10/10/10/5) were designed intentionally to reflect how banks actually evaluate SME loan applications – interest rate and debt service capacity are most important. The model was validated with real data, not random.

✅ **Deep Risk 7 dimensions with radar chart is a differentiator** – Instead of a single risk score, the radar chart shows a multi-dimensional risk picture. The team has not seen any free tool offering this along with DuPont analysis.

✅ **Team organization with minimal cross-dependency** – Layered architecture enabled 5 members to work in parallel: frontend, backend, database, and scraper specialists. No one had to wait for others to start.

✅ **Deployed and accessible product** – A real public URL running on Render (not just localhost). Instructors and users can test anytime without environment setup.

## Current limitations
⚠ **Web scraper not stable** – Scrapers are sometimes blocked by bank anti-bot systems. Currently using static fallback data, so interest rates may not be real-time.

⚠ **JSON database does not scale** – Concurrent writes to loans.json can cause collisions. Needs replacement with PostgreSQL/MongoDB/Supabase for production.

⚠ **Mobile responsiveness not fully optimized** – The 7-tab interface with multiple charts was designed primarily for desktop. Some tables and charts overflow on phones.

⚠ **No authentication** – All users share the same database. No profile saving or analysis history per business.

⚠ **AI Consultant lacks context from analysis results** – Currently the AI only receives the raw question. If it could read the user's scoring and risk results, advice would be much more accurate.

## Lessons learned
- **Defining the right problem is harder than writing code** – Initially the team planned a simple "interest rate comparison tool." After deeper analysis, they realized SMEs need a reference framework to assess themselves before borrowing, leading to the addition of risk assessment features – which became more important than loan comparison.
- **Layer-based task allocation reduces conflicts** – Assigning ownership by architectural layer (not by feature) allowed parallel work. Changes in UI never affected backend code, and scraper updates never impacted frontend.
- **Financial formulas are easy, but weights and thresholds are hard** – Standard ratios (ROE, ROA, D/E, ICR, PMT) are straightforward. The difficult part is designing scoring weights and risk thresholds that reflect real Vietnamese banking practice. Validation with industry practitioners is essential.
- **Deploy early to catch environment issues** – "Works on my machine" is meaningless in production. The team encountered many problems on Render (environment variables, CORS, cold starts, Windows vs Linux paths) that never appeared locally. Lesson: deploy early and test often.
- **Time management: AI and web scraping took longer than expected** – The team had to postpone live web scraping in the MVP to ensure core features (scoring + risk + UI) were completed before the deadline. That was the right decision – the demo product turned out better than planned.

## Recommendations for future development
💌 **Start with the problem, not the technology** – Don't begin with "let's build an app with React/Node/AI." Begin with "what do SMEs need when borrowing?" then choose appropriate technology.

💌 **Deploy from week one** – Even if only one API endpoint works, deploy it immediately. You will discover environment issues that only appear in production, not localhost.

💌 **Validate algorithms with industry experts** – Scoring weights and risk thresholds need confirmation from real banking practitioners. Textbook knowledge is only a starting point.

💌 **Upgrade database before adding features** – Replace JSON files with PostgreSQL or Supabase (free tier) early. Refactoring after many features have been added is very time-consuming.

💌 **AI Consultant becomes much more useful with context** – Instead of a generic chatbot, pass the user's risk assessment and scoring results into the system prompt. The AI will then give specific, situation-aware advice rather than general recommendations.

---

*Group 10 – Financial Analyzer Pro – NHA408E – 2025–2026 – FTU Hà Nội*