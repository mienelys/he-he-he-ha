/**
 * demo2_vpbank_vcb_partial.js
 * 
 * Mô tả: Đã cải thiện VPBank bằng chiến lược table parser, nhưng Vietcombank vẫn dùng regex
 *        thiếu keyword specificity, dẫn đến lấy nhầm lãi suất tiết kiệm và các % nhiễu.
 * Tác động đến các module khác:
 *   - loans.json: nhận dữ liệu VPBank đúng, nhưng Vietcombank có thể chứa lãi suất sai (6.2% tiết kiệm).
 *   - Scoring engine: tính điểm dựa trên lãi suất sai → xếp hạng Best Match không chính xác.
 *   - AI Consultant: nếu người dùng hỏi "Lãi suất Vietcombank hiện tại?", AI có thể trả lời sai dựa trên dữ liệu nhiễu.
 *   - Frontend: hiển thị gói vay với lãi suất 6.2%, người dùng tưởng đó là vay nhưng thực chất là gửi tiết kiệm.
 */

const BaseScraper = require('./baseScraper');
const cheerio = require('cheerio');

// ========== PHẦN VPBank ĐÃ ĐƯỢC CẢI THIỆN (Thêm table parser) ==========
class VPBankScraperPartial extends BaseScraper {
  constructor() {
    super('VPBank', ['https://www.vpbank.com.vn/lai-suat']);
  }

  async scrape() {
    const html = await this.fetchWithRetry(this.urls[0]);
    if (!html) return this.getFallbackData();

    const $ = cheerio.load(html);
    let loans = [];

    // Strategy 1: CSS selector (vẫn có thể thất bại, nhưng giữ lại để dự phòng)
    $('[class*="rate"], [class*="interest"]').each((_, el) => {
      const rate = this.extractRate($(el).text());
      if (rate) loans.push({ packageName: 'Vay VPBank', interestRate: rate, source: 'CSS' });
    });

    // ✅ Strategy 2: Table parser – dùng khi CSS selector không tìm thấy
    if (loans.length === 0) {
      console.log('[VPBankPartial] CSS selector rỗng, chuyển sang table parser...');
      $('table tr').each((_, tr) => {
        const cells = $(tr).find('td');
        if (cells.length >= 2) {
          const name = $(cells[0]).text().trim();
          const rate = this.extractRate($(cells[1]).text());
          if (name && rate) {
            loans.push({ packageName: name, interestRate: rate, source: 'table' });
          }
        }
      });
    }

    return loans.length ? loans : this.getFallbackData();
  }

  extractRate(text) {
    // Regex đã hỗ trợ dấu phẩy
    const match = text.match(/(\d+[,.]?\d*)\s*%/);
    if (!match) return null;
    let value = parseFloat(match[1].replace(',', '.'));
    if (value < 3 || value > 20) return null;
    return value;
  }

  getFallbackData() { /* như cũ */ }
}

// ========== PHẦN Vietcombank VẪN BỊ LỖI (regex đơn giản, bắt nhiễu) ==========
class VCBScraperPartial extends BaseScraper {
  constructor() {
    super('Vietcombank', ['https://vietcombank.com.vn/lai-suat-vay']);
  }

  async scrape() {
    const html = await this.fetchWithRetry(this.urls[0]);
    if (!html) return this.getFallbackData();

    const $ = cheerio.load(html);
    const loans = [];

    // ❌ Quét tất cả các thẻ p, div, li, không lọc kỹ từ khóa
    $('p, div, li').each((_, el) => {
      const text = $(el).text();
      // ❌ Chỉ kiểm tra từ 'lãi suất' – vẫn bao gồm 'lãi suất tiết kiệm'
      if (!/lãi\s*suất/i.test(text)) return;

      const rate = this.extractRate(text);
      if (rate) {
        loans.push({
          bank: 'Vietcombank',
          packageName: text.slice(0, 60).trim(),
          interestRate: rate
        });
      }
    });

    // ❌ Chưa có deduplication => có thể xuất hiện nhiều bản ghi trùng lặp
    return loans.length ? loans : this.getFallbackData();
  }

  extractRate(text) {
    // Regex hỗ trợ dấu phẩy, nhưng không lọc noise
    const match = text.match(/(\d+[,.]?\d*)\s*%/);
    if (!match) return null;
    let value = parseFloat(match[1].replace(',', '.'));
    if (value < 3 || value > 20) return null; // vẫn giữ range filter
    return value;
  }

  getFallbackData() {
    return [{
      packageName: 'Vay doanh nghiệp SME Vietcombank (fallback)',
      interestRate: 7.5,
      maxTerm: 120
    }];
  }
}

/* ========== KẾT QUẢ CHẠY THỬ ==========
   VPBankPartial: table parser hoạt động, lấy được 2-3 gói vay thật (thành công ~75%).
   VCBScraperPartial: 
      - Trên trang thật, có cả mục "Lãi suất tiết kiệm 6.2%/năm" và "Lãi suất vay 7.5%/năm".
      - Regex bắt cả hai → loans bao gồm 6.2% (sai) và 7.5% (đúng).
      - Kết quả: loans.json chứa gói vay 6.2% – người dùng tưởng Vietcombank cho vay rẻ hơn thực tế.
      - Scoring engine tính điểm ưu tiên lãi suất thấp → Vietcombank được đẩy lên top một cách sai lệch.
      - Best Match sai, người dùng có thể chọn sai ngân hàng.
*/