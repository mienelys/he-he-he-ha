# INDIVIDUAL FOOTPRINT – Team 10 (G10)

**Financial Analyzer Pro** – Hệ thống đánh giá sức khỏe tài chính & so sánh gói vay ngân hàng cho SME Việt Nam

**Môn học:** NHA408E – Technology Applications in Finance & Banking  
**Năm học:** 2025–2026

---

## Thành viên 1: Nguyễn Minh Đạt

| Field | Value |
|-------|-------|
| **Họ tên** | Nguyễn Minh Đạt |
| **MSSV** | 2312380006 |
| **Vai trò** | Backend API, Deploy, Risk Scoring, DeepSeek AI |
| **Team** | Team 10 – G10 |

### Vai trò trong dự án

Trong Team 10, tôi phụ trách mảng backend và DevOps – xây dựng toàn bộ API layer, logic chấm điểm, các engine đánh giá rủi ro, tích hợp AI và triển khai sản phẩm lên môi trường production.

Cụ thể, tôi sở hữu 4 mảng chính:

1. **Express.js API server** và toàn bộ các endpoints.
2. **8-factor loan scoring**, **5‑cấp Quick Risk**, và **7‑chiều Deep Risk**.
3. **Tích hợp DeepSeek AI Consultant**.
4. **Deploy lên Render** với biến môi trường, health check và uptime monitoring.

### Dấu ấn cá nhân trong sản phẩm

#### 8‑factor loan scoring algorithm
Chấm điểm mỗi gói vay theo thang 100 điểm với 8 tiêu chí có trọng số – lãi suất (25đ), khả năng trả nợ (20đ), và 6 tiêu chí còn lại (10đ hoặc 5đ). Đã chạy thuật toán với 10 gói vay thực tế và điều chỉnh trọng số qua 5 vòng cho đến khi kết quả xếp hạng phù hợp với kỳ vọng của một cán bộ tín dụng.

#### 7‑dimension Deep Risk engine
Tạo biểu đồ radar 7 chiều độc lập (thanh khoản, đòn bẩy, sinh lời, hiệu quả, rủi ro lãi vay, kinh nghiệm, quy mô). Mỗi chiều được chấm 0–10 theo công thức riêng, giúp chủ doanh nghiệp dễ dàng nhìn ra điểm yếu cụ thể.

#### Product deployment
Triển khai hệ thống lên Render và tích hợp DeepSeek API. Xử lý timeout, authentication, biến môi trường; đặt timeout 30 giây cho các API call.

### Những việc đã thực sự làm

- Xây dựng Express.js API server với các endpoints: GET /api/health, GET /api/loans, POST /api/loans/refresh, POST /api/ai/chat, POST /api/risk/quick, POST /api/risk/deep.
- Viết 8 hàm scoring cho loan comparison model.
- Xây dựng Quick Risk module: 5 chỉ số tài chính → điểm tổng hợp có trọng số → 5 cấp rủi ro + cảnh báo.
- Xây dựng Deep Risk engine: 7 chiều độc lập (0–10) với các công thức khác nhau.
- Tích hợp DeepSeek AI API: system prompt, AbortController 30s, xử lý lỗi 401/429/network.
- Thiết kế database layer: loans.json schema, helper functions, DEFAULT_LOANS fallback.
- Deploy lên Render: build/start command, environment variables, health check, auto-deploy.
- Thiết lập monitoring qua /api/health mỗi 10 phút để tránh cold start.
- Xử lý lộ API key: revoke, tạo mới, .gitignore, dọn Git history.

### File, tính năng, logic đã đóng góp

| File / Feature | Path | Chức năng |
|----------------|------|------------|
| server.js | /backend/server.js | Main server – endpoints, scoring, risk, AI |
| package.json | /backend/package.json | Dependencies |
| package.json (root) | /package.json | Build & start scripts cho Render |
| POST /api/risk/quick | server.js | 5 inputs → 5 cấp rủi ro + warnings |
| POST /api/risk/deep | server.js | Full financials → 7-dimension scores |
| POST /api/ai/chat | server.js | User question → DeepSeek response |

### Bằng chứng đóng góp

1. **backend/server.js** – API server, JSON database, DeepSeek integration, scraper refresh endpoint.
2. **frontend/index.html** – toàn bộ logic tài chính chạy trong browser (Quick Risk, Deep Risk, Loan Scoring).
3. **2 package.json files** – cho backend và root deployment.
4. **URL public** – [https://financial-analyzer-ooel.onrender.com](https://financial-analyzer-ooel.onrender.com)

### Kết nối với sản phẩm cuối cùng

Backend là tầng mà mọi thứ khác phụ thuộc. 8-factor algorithm biến đầu vào thành khuyến nghị vay. Quick Risk giúp người dùng không cần hiểu ICR/D/E. Deep Risk cung cấp radar chart 7 chiều. AI Consultant cho phép hỏi đáp bằng ngôn ngữ tự nhiên.

### Điều cá nhân học được

- **Bảo mật API và cấu hình môi trường** – đã commit .env lên GitHub, phải revoke và dọn history.
- **Xử lý timeout và lỗi** – AbortController 30s, phân loại lỗi theo mã.
- **Algorithms cần kiểm nghiệm thực tế** – 5 vòng calibration mới đạt kết quả hợp lý.
- **Deploy sớm, maintain production parity** – khác biệt giữa local và cloud rất lớn.

### Khó khăn đã gặp và cách xử lý

| Vấn đề | Giải pháp |
|--------|------------|
| DeepSeek API timeout | AbortController 30s, fallback messages |
| Render cold start | Ping /api/health mỗi 10 phút, skeleton loader |
| Scoring weight không hợp lý | 5 vòng calibration thủ công |
| Lộ API key | Revoke ngay, tạo mới, .gitignore, filter-branch |

### Lời nhắn cho sinh viên khóa sau

- **Set up .gitignore trước commit đầu tiên.**
- **Deploy sớm** – ngay cả khi chỉ một endpoint.
- **JSON database ổn cho demo, nhưng nếu scale thì chuyển sang Supabase sớm.**
- **AI Consultant sẽ hữu ích hơn nếu có context** (pass risk/scoring vào prompt).
- **Validate scoring weights với người trong ngành.**

---

## Thành viên 2: Ngô Quốc Huy

| Field | Value |
|-------|-------|
| **Họ tên** | Ngô Quốc Huy |
| **Vai trò** | BaseScraper, BIDV Scraper, Database Management |
| **Team** | Team 10 – G10 |

### Vai trò trong dự án

Phụ trách thu thập và xử lý dữ liệu gói vay ngân hàng. Xây dựng class **BaseScraper** – framework chung cho tất cả scrapers. Phát triển **BIDV scraper** và quy trình tổng hợp dữ liệu qua **runAll.js**.

### Dấu ấn cá nhân trong sản phẩm

**BaseScraper** – class cha xử lý truy cập website, retry logic, fallback data. Nhờ base class này, việc mở rộng sang các ngân hàng khác giảm đáng kể khối lượng code.

### Những việc đã thực sự làm

- Xây dựng BaseScraper với puppeteer-extra + stealth plugin.
- Thiết kế constructor nhận bankName và urls.
- Cơ chế retry trong scrape(): tối đa 3 lần, delay 5s.
- Hàm `_scrapeOnce()` launch headless browser, set user agent, navigate.
- `smartExtract(page)` với 2 chiến lược: tìm table chứa keywords lãi suất, hoặc quét element chứa %.
- Các hàm tiện ích: `parseRate()`, `cleanText()`, `extractTerm()`.
- **bidv.js** kế thừa BaseScraper, cấu hình URL, fallback data.
- **runAll.js** import 6 scrapers, chạy tuần tự, bắt lỗi từng bank, chuẩn hóa output, ghi loans.json.
- Tạo thư mục database nếu chưa có, log kết quả.

### File, tính năng, logic đã đóng góp

| File / Feature | Path | Chức năng |
|----------------|------|------------|
| baseScraper.js | /backend/scrapers/baseScraper.js | Class cha – quản lý Puppeteer, retry, fallback |
| bidv.js | /backend/scrapers/bidv.js | BIDV scraper |
| runAll.js | /backend/scrapers/runAll.js | Điều phối 6 scrapers, tổng hợp, ghi loans.json |
| loans.json | /database/loans.json | Dữ liệu gói vay dùng cho so sánh |

### Bằng chứng đóng góp

- Phân công trong Group Footprint: Database/Scraper.
- Dữ liệu ngân hàng xuất hiện trong tính năng Loan Comparison.
- Pipeline từ website → loans.json được tích hợp và sử dụng.

### Kết nối với sản phẩm cuối cùng

Công việc là tầng thu thập đầu vào. Nếu không có scraper, hệ thống không có dữ liệu thực để so sánh và chấm điểm.

### Điều cá nhân học được

- **Reusable architecture quan trọng hơn xây nhanh.**
- **Web scraping thực tế không ổn định** – cần fallback layers.
- **Fallback data không phải giải pháp tạm thời** – đảm bảo hệ thống luôn có dữ liệu.
- **Chuẩn hóa dữ liệu ngay tại điểm thu thập** – giảm phức tạp cho module sau.
- **Pipeline phải chịu lỗi cục bộ** – một scraper fail không dừng toàn bộ.

### Khó khăn và cách xử lý

| Vấn đề | Giải pháp |
|--------|------------|
| Website chậm/không phản hồi | Retry 3 lần + fallback data |
| Một scraper fail làm hỏng tổng hợp | Mỗi scraper trong try/catch riêng |
| Selector cố định bị hỏng | smartExtract() tìm theo keywords hoặc % |
| Regex match nhầm % không phải lãi suất | Kết hợp lọc range (0-50) và ưu tiên section có keywords |
| Dữ liệu không nhất quán | Chuẩn hóa trong runAll.js trước khi ghi |
| Browser không đóng khi lỗi | finally block đóng browser |
| Scraped data rỗng nhưng không throw | Validate result, retry nếu rỗng |

### Lời nhắn cho sinh viên khóa sau

- **Không phụ thuộc hoàn toàn vào live scraping** – có fallback data ngay từ đầu.
- **Chuẩn hóa dữ liệu ngay tại tầng thu thập** – thiết kế schema trước.
- **Nâng cấp lên database thực (Supabase) nếu scale.**
- **Xây dựng monitoring cho scraper** – phát hiện silent failure.
- **Xem dữ liệu như một sản phẩm** – đầu tư vào data pipeline trước các tính năng phức tạp.

---

## Thành viên 3: Phuoc

| Field | Value |
|-------|-------|
| **Họ tên** | Phuoc |
| **Vai trò** | Data Scraping Engineer – VPBank Scraper, Vietcombank Scraper |
| **Team** | Team 10 – G10 |

### Vai trò trong dự án

Data Scraping Engineer – sở hữu pipeline kết nối sản phẩm với dữ liệu lãi suất thực tế. Được giao **VPBank** và **Vietcombank**. Ba trách nhiệm chính: (1) VPBank scraper (CSS selector + table fallback), (2) Vietcombank scraper (regex + keyword-context), (3) output normalisation.

### Dấu ấn cá nhân trong sản phẩm

1. **Kiến trúc hai chiến lược** – VPBank dùng CSS selector, Vietcombank dùng regex. Giữ cùng interface.
2. **Three-tier fallback** – đảm bảo không bao giờ trả về danh sách rỗng.
3. **extractRate() validator** – xử lý format số tiếng Việt, lọc nhiễu.

### Những việc đã thực sự làm

- Phân tích cấu trúc trang VPBank và Vietcombank.
- Xây dựng VPBankScraper: Strategy 1 – CSS selector, Strategy 2 – Cheerio table parser.
- Xây dựng VCBScraper: regex quét \<p\>,\<div\>,\<li\>, chỉ kích hoạt khi có 'lai suat vay' hoặc 'vay von'.
- Viết `extractRate()`: chuẩn hóa dấu phẩy/dấu chấm, range filter [3%,20%], loại bỏ noise.
- Three-tier fallback (T1: CSS, T2: regex, T3: static data).
- Xác minh thủ công fallback data: VPBank 8.5%/năm, Vietcombank 7.5%/năm.
- Ground-truth verification mỗi tuần, so sánh output.
- Structured debug logging (URL, byte count, matches, rejections).
- Chạy 30 live cycles/ngày để đo success rate (~75% VPBank, ~60% Vietcombank).

### File, tính năng, logic đã đóng góp

| File / Feature | Path | Chức năng |
|----------------|------|------------|
| vpbank.js | /backend/scrapers/vpbank.js | VPBank scraper (dual strategy, fallback, log) |
| vietcombank.js | /backend/scrapers/vietcombank.js | VCB scraper (regex, keyword-context, dedup, fallback) |
| extractRate() | Shared | Chuẩn hóa format, range filter, noise rejection |
| getFallbackData() | Both scrapers | Static rates đã xác minh |
| Three-tier fallback | Both | Tier 1 → Tier 2 → Tier 3 |

### Bằng chứng đóng góp

- Source code trong `/backend/scrapers/`.
- POST /api/loans/refresh gọi scrapers, response có VPBank/VCB entries.
- DEFAULT_LOANS trong server.js chứa reference rates do tôi xác minh.
- Midterm documentation ghi rõ công việc.

### Kết nối với sản phẩm cuối cùng

Scrapers là tầng intake dữ liệu. Nếu không có, bảng so sánh rỗng. Fallback đảm bảo luôn có dữ liệu. extractRate() ngăn lãi suất sai vào scoring engine.

### Điều cá nhân học được

- **Test trên live site, không phải saved snapshot** – HTML khác nhau giữa fetch() và browser.
- **Không public API → mọi thứ đều fragile** – fallback mạnh mẽ quan trọng hơn scraper thông minh.
- **Keyword specificity** – 'lai suat vay' thay vì 'lai suat' loại bỏ savings rate.
- **Cheerio gọi callback trên nested elements** – luôn dedup sau collect.
- **Success rate là product metric** – đo trung thực 60% cho VCB, bù bằng fallback.
- **Log rejection reasons** – giúp diagnose noise pattern mới.

### Khó khăn và cách xử lý

| Vấn đề | Giải pháp |
|--------|------------|
| VPBank – JS injection, CSS selector không thấy | Thêm table parser (static HTML) → success rate 75% |
| Vietcombank – 20–30 % symbols nhiễu | 3 filters: keyword specificity, range guard, rejection list → false positive = 0 |
| Vietcombank – không có table structure | Chuyển sang regex + keyword-context, chấp nhận success rate 60% |

### Lời nhắn cho sinh viên khóa sau

- **→ Migrate Vietcombank sang Puppeteer** (ROI cao nhất).
- **→ Thêm automatic structure-change detection** (alert khi output lệch >20%).
- **→ Lưu multiple fallback URLs** (thử secondary trước khi give up).
- **→ Capture promotional rates** (flag time-limited).
- **→ Thay regex bằng lightweight NLP classifier** (robust hơn).

---

## Thành viên 4: Nguyễn Thiện Quang

| Field | Value |
|-------|-------|
| **Họ tên** | Nguyễn Thiện Quang |
| **MSSV** | 2312380029 |
| **Vai trò** | MB Bank scraper, Techcombank scraper, scraper integration |
| **Team** | Team 10 – G10 |

### Vai trò trong dự án

Đảm nhận **MB Bank**, **Techcombank** và **runAll.js** (điều phối 6 scrapers, ghi loans.json). Cụ thể: MB Bank scraper, Techcombank scraper, runAll.js, fallback datasets cho hai ngân hàng.

### Dấu ấn cá nhân trong sản phẩm

1. **Hai scrapers** – subclass ngắn của BaseScraper, chỉ set bankName, urls, fallback data.
2. **Runner runAll.js** – chạy 6 scrapers, bắt lỗi từng bank, đưa về cùng fields, ghi loans.json một lần.
3. **Fallback data** – MB Bank (6.0%, 5.8%), Techcombank (5.99%, 13.78%) đảm bảo demo luôn có dữ liệu.

### Những việc đã thực sự làm

- Xây dựng **mbbank.js**: 2 URLs, fallback 2 packages.
- Xây dựng **techcombank.js**: tương tự.
- Viết **runAll.js**: load 6 scrapers, try/catch từng cái, gom kết quả, thêm các field chuẩn (id, processingFee, maxLTV, minIncome, source timestamp, loanTypes, lastUpdated), ghi loans.json.
- Thêm log cho mỗi bank (số packages hoặc lỗi).
- Đọc BaseScraper để hiểu inheritance.
- Test flow với runOnce.js, đảm bảo một scraper fail không stop các scraper khác.

### File, tính năng, logic đã đóng góp

| File | Path | Chức năng |
|------|------|------------|
| mbbank.js | /backend/scrapers/mbbank.js | MB Bank scraper + fallback |
| techcombank.js | /backend/scrapers/techcombank.js | Techcombank scraper + fallback |
| runAll.js | /backend/scrapers/runAll.js | Chạy 6 scrapers, tổng hợp, ghi loans.json |
| runOnce.js | /backend/runOnce.js | Entry point gọi runAll |
| loans.json | /database/loans.json | Output cho GET /api/loans |

### Cách dữ liệu flow

1. runOnce.js hoặc POST /api/loans/refresh gọi runAllScrapers().
2. Runner lần lượt chạy từng scraper (3 retries, fallback).
3. Mỗi package được reshape, thêm vào allLoans. Bank lỗi được ghi log và bỏ qua.
4. Ghi allLoans vào loans.json (một write duy nhất).
5. Backend đọc file tại GET /api/loans, frontend hiển thị.

### Bằng chứng đóng góp

- Source code: mbbank.js, techcombank.js, runAll.js trong repo.
- Output: loans.json chứa MB Bank và Techcombank packages.
- Logs: console output của runOnce.js.
- Demo: Bank Comparison tab hiển thị hai ngân hàng này.

### Kết nối với sản phẩm cuối cùng

loans.json là nguồn dữ liệu duy nhất cho tính năng so sánh. Nếu thiếu MB Bank hoặc Techcombank, bảng so sánh chỉ còn 4/6 ngân hàng. Runner và fallback đảm bảo dữ liệu luôn có sẵn.

### Điều cá nhân học được

- **Inheritance tiết kiệm repetition** – chỉ cần vài dòng cho mỗi bank mới.
- **Planning for failure an toàn hơn assume success** – fallback data quan trọng.
- **Xử lý failure riêng cho từng source** – một bank lỗi không sập pipeline.
- **Một nơi duy nhất ghi file** – tránh conflict.
- **Đọc code mình xây dựng trên nó** – hiểu BaseScraper, Puppeteer, smartExtract.

### Khó khăn và cách xử lý

| Vấn đề | Nguyên nhân | Giải pháp đề xuất |
|--------|-------------|-------------------|
| Cả hai scrapers luôn fallback | Trong page.evaluate(), gọi hàm parseRate/cleanText không tồn tại | Pull raw text từ browser, parse ở Node |
| Một run fail hoàn toàn có thể xóa DB | Ghi unconditional, nếu allLoans=[], xóa dữ liệu cũ | Guard: chỉ ghi nếu allLoans.length > 0 |
| Refresh chạy tuần tự mất nhiều thời gian | Sequential + retries → tổng thời gian lớn | Dùng Promise.allSettled chạy concurrent |
| Loan ids thay đổi mỗi lần run | Đánh số lại từ 1, PUT /api/loans/:id không ổn định | Lấy id từ bank+package name, stable + dedup |

### Lời nhắn cho sinh viên khóa sau

- **Đọc base class trước khi viết scraper** – hầu hết behavior đã có.
- **Không đếm vào live bank sites** – luôn có fallback.
- **Match tables bằng text/structure thay vì CSS class** – class đổi thường xuyên.
- **Giữ mỗi source trong try/catch riêng và một module duy nhất ghi file.**
- **Nếu muốn live data thực, giữ Puppeteer path nhưng tune cho từng bank.**

---

*Team 10 (G10) – Financial Analyzer Pro – NHA408E – 2025–2026 – FTU Hà Nội*