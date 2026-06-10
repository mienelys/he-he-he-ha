# GROUP FOOTPRINT – Financial Analyzer Pro

**NHA408E · Technology Applications in Finance & Banking**  
**Học kỳ:** 2025 – 2026 · **Nhóm:** Team 10 (G10)  
**Thành viên:** Đạt (Backend/DevOps) · Huy (Database/Scraper) · Tuấn (Frontend/UI) · Phước (VCB/VPB Scraper) · Quang (MBB/TCB Scraper)  

**Liên kết:**  
- Repo: [https://github.com/FTU-Legacy-62/G10](https://github.com/FTU-Legacy-62/G10)  
- Demo: [https://financial-analyzer-ooel.onrender.com](https://financial-analyzer-ooel.onrender.com)

---

## 1. Tên sản phẩm & Nhóm

**Financial Analyzer Pro** – Hệ thống web hỗ trợ SMEs đánh giá sức khỏe tài chính và so sánh gói vay ngân hàng tự động.

Nhóm gồm 5 thành viên, phân công rõ ràng theo tầng kiến trúc: frontend, backend, database/scraper, và chuyên trách từng ngân hàng.

---

## 2. Vấn đề nhóm muốn giải quyết

SME chiếm >97% doanh nghiệp Việt Nam, nhưng khi cần vay vốn họ gặp 5 vấn đề chính:

1. **Không tự đánh giá được sức khỏe tài chính** (ROE, ROA, D/E, ICR so với ngưỡng an toàn).
2. **Thông tin lãi suất phân tán**, khó so sánh giữa các ngân hàng.
3. **Phải liên hệ trực tiếp** từng ngân hàng → tốn thời gian, áp lực bán hàng.
4. **Thiếu công cụ phân tích rủi ro** tự động theo chuẩn tín dụng.
5. **Quyết định vay dựa trên cảm tính** → chọn gói không tối ưu hoặc vay quá khả năng.

**Bối cảnh:** Thị trường tín dụng SME tăng trưởng mạnh nhưng thiếu minh bạch. Lãi suất biến động theo NHNN, các gói ưu đãi phức tạp, chủ SME thường không có nền tảng tài chính bài bản.

**Ai bị ảnh hưởng?** Chủ doanh nghiệp SME và quản lý tài chính – những người cần quyết định vay vốn nhưng không có thời gian/chuyên môn phân tích sâu.

---

## 3. Người dùng mục tiêu

**Persona chính:** Chủ doanh nghiệp SME / Quản lý tài chính tại Việt Nam  
- Doanh thu 1–50 tỷ/năm  
- Có kiến thức kinh doanh nhưng không chuyên về tài chính ngân hàng  
- Cần biết: có đủ điều kiện vay không? vay được bao nhiêu? chọn ngân hàng/gói nào tốt nhất?  

**Tình huống sử dụng:** Truy cập web, nhập số liệu từ báo cáo tài chính, nhận kết quả phân tích và so sánh trong vài phút – trước khi gặp nhân viên ngân hàng.

---

## 4. Sản phẩm hiện làm được gì (7 tab)

| Tab | Tính năng | Mô tả ngắn |
|-----|-----------|-------------|
| Dashboard KPI | Tính ROE, ROA, D/E, ICR, Margin, Current Ratio | Kèm biểu đồ cơ cấu tài sản, lịch trả nợ |
| Đánh giá rủi ro | Quick Risk 5 cấp + cảnh báo cụ thể | Very Low → Very High, gợi ý cải thiện |
| Rủi ro chuyên sâu | Deep Risk 7 chiều (0-10), radar chart | Phân tích DuPont 3 nhân tố |
| So sánh ngân hàng | 8-Factor Loan Scoring (0-100) | Xếp hạng 5 ngân hàng, highlight Best Match |
| AI Tư vấn | Chatbot DeepSeek API | Tư vấn tiếng Việt theo ngữ cảnh doanh nghiệp |
| NPV & IRR | Phân tích dòng tiền dự án | Tính NPV, IRR, độ nhạy, kịch bản |
| Admin DB | Quản lý gói vay | Thêm/sửa/xóa, import/export JSON |

---

## 5. Input

- **Dữ liệu doanh nghiệp:** tổng tài sản, nợ, doanh thu, lợi nhuận, chi phí lãi vay, số năm hoạt động, tài sản đảm bảo… (có thể upload PDF/Excel để AI tự điền)
- **Dữ liệu gói vay:** 5 ngân hàng (VCB, BIDV, TCB, VPB, Sacombank) – lãi suất, hạn mức, kỳ hạn, LTV, yêu cầu thu nhập, phí xử lý.
- **Dữ liệu vĩ mô:** GDP, lạm phát, tỷ giá, lãi suất điều hành NHNN.

---

## 6. Logic xử lý cốt lõi

### 6.1 Chỉ số tài chính
- D/E = Nợ / (Tổng TS - Nợ)  
- ROA = Lợi nhuận ròng / Tổng TS  
- ROE = Lợi nhuận ròng / Vốn CSH  
- ICR = (LN + Lãi vay) / Lãi vay  
- PMT = P×r(1+r)^n / ((1+r)^n−1) – trả nợ hàng tháng  

### 6.2 Scoring 8 tiêu chí (100 điểm)
| Tiêu chí | Trọng số | Công thức |
|----------|----------|------------|
| Lãi suất | 25 | 25×(1−(rate−4)/11) |
| Khả năng trả nợ | 20 | PMT/Income ≤50% → 20đ |
| Đòn bẩy D/E | 10 | D/E ≤1.5 →10đ; ≥5→0đ |
| Hạn mức | 10 | linear scaling trong [min,max] |
| Kỳ hạn | 10 | trong hạn mức →10đ |
| LTV | 10 | LTV thấp hơn max → điểm cao |
| Yêu cầu thu nhập | 10 | ≥ minIncome →10đ |
| Phí xử lý | 5 | 0%→5đ; ≥2%→0đ |

### 6.3 Quick Risk (5 cấp)
Điểm = D/E×30% + ICR×25% + Profit Margin×25% + Current Ratio×10% + Years×10%  
- ≥80: Very Low (xanh đậm) – xuất sắc  
- 60-79: Low – ổn định  
- 40-59: Medium – rủi ro trung bình  
- 20-39: High – rủi ro cao  
- <20: Very High – rất khó vay  

### 6.4 Deep Risk 7 chiều (0-10 mỗi chiều)
Thanh khoản, đòn bẩy, sinh lời, hiệu quả, rủi ro lãi vay, kinh nghiệm, quy mô.  
Tổng điểm = (Tổng 7 chiều / 70) × 100, hiển thị radar chart.

---

## 7. User Flow (luồng chính)

1. Mở web trên trình duyệt  
2. Nhập dữ liệu doanh nghiệp (hoặc upload file)  
3. Nhập thông tin khoản vay muốn vay  
4. Xem Dashboard KPI – biết các chỉ số ngay  
5. Xem Quick Risk – biết mức độ rủi ro + cảnh báo  
6. Xem Deep Risk radar chart – nhận diện chiều yếu nhất  
7. Xem bảng so sánh ngân hàng – Best Match được highlight  
8. Điều chỉnh số tiền/kỳ hạn để xem tác động  
9. Hỏi AI tư vấn thêm  
10. (Tuỳ chọn) Tính NPV/IRR cho dự án cụ thể  

---

## 8. Output

- **Dashboard KPI:** Thẻ số màu cảnh báo, biểu đồ tròn, lịch trả nợ chi tiết  
- **Bảng so sánh:** 5 ngân hàng xếp hạng, điểm 8 tiêu chí, nhãn Best Match  
- **Quick Risk:** Phân loại 5 cấp + danh sách điểm mạnh / cảnh báo  
- **Deep Risk Radar Chart:** Spider 7 trục + phân tích DuPont  
- **NPV/IRR:** Giá trị hiện tại thuần, suất sinh lời nội tại, waterfall chart, phân tích độ nhạy  
- **AI Consultant:** Phản hồi tiếng Việt từ DeepSeek, cá nhân hóa theo ngữ cảnh  
- **Xuất PDF:** Tổng hợp toàn bộ kết quả  

---

## 9. Các lựa chọn thiết kế quan trọng

| Quyết định | Lý do |
|------------|-------|
| Chọn SME làm người dùng | Phân khúc nhu cầu lớn nhất nhưng được phục vụ kém nhất |
| Backend (Node.js) + frontend (HTML/JS thuần) tách biệt | Các thành viên làm việc độc lập, không block nhau |
| Dùng file JSON thay vì database thật | Tập trung vào logic tài chính & UI trong phạm vi học thuật |
| Chọn DeepSeek API (miễn phí) | Phù hợp dự án học thuật, tiếng Việt tốt, chi phí thấp |
| Bỏ web scraping live trong MVP | Tránh bị block bởi anti-bot, đảm bảo demo ổn định |

---

## 10. Điểm làm tốt

✅ **Thuật toán scoring 8 tiêu chí có chiều sâu** – trọng số 25/20/10/… phản ánh đúng cách ngân hàng đánh giá SME.  
✅ **Deep Risk 7 chiều + radar chart** – khác biệt so với các tool miễn phí khác.  
✅ **Phân công theo tầng kiến trúc** – 5 thành viên làm song song, ít phụ thuộc chéo.  
✅ **Deploy sớm, luôn sẵn sàng** – URL public chạy trên Render, ai cũng test được không cần cài đặt.

---

## 11. Hạn chế hiện tại

⚠ Web scraper chưa ổn định (dễ bị block) – đang dùng fallback data tĩnh.  
⚠ Database là file JSON – không scale, dễ xảy ra write collision.  
⚠ Mobile responsiveness chưa tối ưu – bảng và chart bị tràn trên điện thoại.  
⚠ Chưa có authentication – mọi người dùng chung database, không lưu lịch sử.  
⚠ AI Consultant chưa có context từ kết quả phân tích – chỉ trả lời câu hỏi đơn thuần.

---

## 12. Điều nhóm học được

- **Xác định đúng vấn đề khó hơn viết code** – từ “tool so sánh lãi suất” chuyển thành “khung đánh giá sức khỏe tài chính cho SME”.  
- **Phân công theo tầng kiến trúc** giảm conflict, tăng tốc độ phát triển.  
- **Công thức tài chính dễ, nhưng trọng số & ngưỡng mới khó** – cần validate với người trong ngành.  
- **Deploy sớm để phát hiện lỗi môi trường** – biến môi trường, CORS, cold start, đường dẫn Windows/Linux.  
- **Quản lý thời gian:** AI và web scraper tốn nhiều thời gian hơn dự kiến → phải tạm hoãn scraper để kịp MVP.

---

## 13. Gợi ý cho khóa sau

💌 **Bắt đầu từ bài toán, không từ công nghệ** – đừng hỏi “dùng React hay Vue?” mà hãy hỏi “SME cần gì khi đi vay?”.  
💌 **Deploy từ tuần đầu tiên** – dù chỉ một API đơn giản cũng deploy ngay.  
💌 **Validate thuật toán với người trong ngành** – sách giáo khoa chỉ là điểm xuất phát.  
💌 **Nâng cấp database trước khi thêm tính năng** – JSON chỉ dùng cho prototype.  
💌 **Tính năng AI sẽ mạnh hơn nếu có context** – truyền kết quả risk/scoring vào system prompt.

---

*Group 10 – Financial Analyzer Pro – NHA408E – 2025–2026 – FTU Hà Nội*
