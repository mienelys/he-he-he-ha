# INDIVIDUAL FOOTPRINT – Nguyễn Thiện Quang

## Thông tin cá nhân

| Field | Value |
|-------|-------|
| **Họ tên** | Nguyễn Thiện Quang |
| **MSSV** | 2312380029 |
| **Vai trò** | MB Bank scraper, Techcombank scraper, scraper integration |
| **Team** | Team 10 – G10 |
| **Môn học** | NHA408E – Technology Applications in Finance & Banking |
| **Năm học** | 2025–2026 |

---

## Vai trò trong dự án

Quang làm việc về mảng thu thập dữ liệu cho Team 10. Hệ thống nhóm xây dựng lấy thông tin gói vay từ sáu website ngân hàng, mỗi ngân hàng có scraper riêng trên cùng base class dùng chung. Huy viết BaseScraper và BIDV scraper, Phước làm VPBank và Vietcombank, còn Quang đảm nhận **MB Bank** và **Techcombank** cùng với runner điều phối cả sáu scrapers.

Cụ thể, Quang chịu trách nhiệm cho bốn thứ: MB Bank scraper, Techcombank scraper, runAll.js (chạy mọi scraper và ghi loans.json), và fallback datasets cho hai ngân hàng đó.

---

## Dấu ấn cá nhân trong sản phẩm

### Hai scrapers (MBBankScraper, TechcombankScraper)

Các subclass ngắn của BaseScraper, mỗi cái chỉ set tên ngân hàng, danh sách pages, và fallback dataset. Giữ chúng nhỏ là chủ đích – khi ngân hàng thay đổi website, chỉ một file ngắn cần fix.

### Runner (runAll.js)

Chạy cả sáu scrapers, bắt lỗi từ bất kỳ scraper nào để các scraper khác tiếp tục, đưa mọi loan record về cùng set fields, ghi mọi thứ vào loans.json trong một pass duy nhất.

### Fallback data

Trang ngân hàng Việt Nam load hầu hết nội dung bằng JS và thay đổi layout thường xuyên. Fallback datasets cho MB Bank và Techcombank là thứ base class dùng khi retries hết, đảm bảo màn hình so sánh luôn hiển thị gói vay thực.

---

## Những việc đã thực sự làm

- Xây dựng MB Bank scraper trong **mbbank.js**: set hai MB Bank pages và fallback list (Vay sản xuất kinh doanh 6.0%/năm, MISA Lending 5.8%/năm).
- Xây dựng Techcombank scraper trong **techcombank.js**: fallback list (Vay doanh nghiệp SME 5.99%/năm, Vay tín chấp 13.78%/năm).
- Viết **runAll.js** để load sáu scrapers, chạy mỗi scraper trong try/catch, gom kết quả, lưu vào database/loans.json.
- Thiết lập record format chung (id, processingFee, maxLTV, minIncome, source timestamp, loanTypes, lastUpdated).
- Thêm log line cho mỗi bank (số packages hoặc error message).
- Đọc BaseScraper để hiểu inheritance (Puppeteer+stealth, 3 retries, smartExtract).
- Test toàn bộ flow với **runOnce.js**, xác nhận loans.json valid và một scraper failing không stop các scraper còn lại.

---

## File, tính năng, logic đã đóng góp

| File | Path | Chức năng |
|------|------|------------|
| mbbank.js | /backend/scrapers/mbbank.js | MB Bank scraper: target pages và fallback dataset |
| techcombank.js | /backend/scrapers/techcombank.js | Techcombank scraper: target pages và fallback dataset |
| runAll.js | /backend/scrapers/runAll.js | Chạy cả sáu scrapers, cô lập lỗi, tổng hợp và ghi loans.json |
| runOnce.js | /backend/runOnce.js | Entry point kích hoạt runAll để setup database |
| loans.json | /database/loans.json | Output được đọc bởi backend tại /api/loans |

---

## Cách dữ liệu flow từ scraper đến sản phẩm

1. runOnce.js hoặc POST /api/loans/refresh gọi runAllScrapers().
2. Runner đi qua sáu scrapers. Mỗi scrape() thử live pages 3 lần, sau đó fallback về dataset riêng.
3. Mỗi package được reshape và thêm vào array. Bank nào throw được ghi error và bỏ qua.
4. Array được ghi vào database/loans.json trong một pass duy nhất.
5. Backend phục vụ file tại GET /api/loans, Bank Comparison tab đọc và xếp hạng.

---

## Bằng chứng đóng góp

| Type | Nơi kiểm tra |
|------|---------------|
| Source code | mbbank.js, techcombank.js, runAll.js trong repository |
| Output data | database/loans.json chứa MB Bank và Techcombank packages |
| Run logs | Console output của node runOnce.js |
| Demo | Bank Comparison tab trong app đang chạy |

---

## Kết nối với sản phẩm cuối cùng

loans.json là file duy nhất phần còn lại của hệ thống đọc. Nếu không có hai ngân hàng của Quang, hai trong sáu lựa chọn trong bảng so sánh sẽ bị missing. Nếu không có runner và fallback data, bảng so sánh có thể rỗng hoặc outdated trong demo.

---

## Điều cá nhân học được

- **Inheritance tiết kiệm repetition.** Logic dùng chung trong BaseScraper, mỗi bank mới chỉ mất vài dòng.
- **Lên kế hoạch cho scraping failure an toàn hơn assume nó hoạt động.** Fallback data quan trọng hơn live scrape hoàn hảo.
- **Xử lý failure riêng cho từng nguồn giữ pipeline sống.** Một bank tồi không sập toàn bộ run.
- **Để một nơi duy nhất ghi file tiết kiệm rắc rối.** Runner thực hiện một write duy nhất.
- **Đọc code mình xây dựng trên nó.** Hiểu Puppeteer, stealth plugin, smartExtract.

---

## Khó khăn và cách xử lý

**1. Cả hai scrapers luôn fallback về static data**
- *Root cause:* Trong baseScraper, smartExtract() gọi parseRate/cleanText/extractTerm từ bên trong page.evaluate(), nơi `this` không phải scraper object và các function không tồn tại.
- *Fix đề xuất:* Chỉ pull raw text từ browser, parse ở Node.

**2. Một run fail hoàn toàn có thể xóa database**
- *Vấn đề:* runAll.js ghi unconditional, nếu allLoans = [] sẽ xóa dữ liệu cũ.
- *Fix:* Guard write: chỉ ghi nếu allLoans.length > 0.

**3. Refresh chạy các banks tuần tự**
- *Vấn đề:* Sequential + retries làm tổng thời gian vài phút.
- *Fix (planned):* Dùng Promise.allSettled để chạy concurrent.

**4. Loan ids thay đổi mỗi lần run**
- *Vấn đề:* Ids đánh số lại mỗi run, làm PUT /api/loans/:id không ổn định.
- *Fix (planned):* Lấy id từ bank name + package name, stable across refreshes.

---

## Lời nhắn cho sinh viên khóa sau

- **Đọc base class trước khi viết scraper.** Hầu hết behavior đã có sẵn.
- **Không đếm vào live bank sites.** Luôn chuẩn bị fallback data.
- **Match tables bằng text/structure thay vì CSS class.** Class đổi thường xuyên.
- **Giữ mỗi source trong try/catch riêng và để một module duy nhất sở hữu file write.**
- **Nếu muốn live data thực từ JS-heavy pages, giữ Puppeteer path nhưng tune cho từng bank.**

---

*Nguyễn Thiện Quang – Team 10 – NHA408E – 2025–2026*