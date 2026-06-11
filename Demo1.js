/**
 * demo1_vpbank_broken.js
 * 
 * Mô tả: Scraper cho VPBank chỉ dùng CSS selector tìm class chứa 'rate' hoặc 'interest'.
 * Vấn đề: Chỉ test trên snapshot HTML đã được render bởi browser (có class đẹp).
 *         Trên live server, fetch() trả về raw HTML chưa chạy JS → không có class mong muốn.
 * Tác động đến các module khác:
 *   - runAll.js: gọi scraper này, nhận về [] → không có package nào được thêm vào loans.json.
 *   - loans.json: thiếu dữ liệu VPBank.
 *   - Backend API (/api/loans): trả về danh sách thiếu VPBank.
 *   - Frontend (Bank Comparison tab): người dùng thấy thiếu một ngân hàng lớn, so sánh không chính xác.
 *   - Scoring engine: không thể xếp hạng VPBank, kết quả Best Match có thể sai.
 */

const BaseScraper = require('./baseScraper'); // BaseScraper của Huy cung cấp fetchWithRetry, v.v.
const cheerio = require('cheerio');

class VPBankScraperBroken extends BaseScraper {
  constructor() {
    super('VPBank', [
      'https://www.vpbank.com.vn/lai-suat',            // Trang lãi suất chính
      'https://www.vpbank.com.vn/khach-hang-ca-nhan/vay-von' // Fallback URL
    ]);
  }

  /**
   * Hàm scrape chính - chỉ dùng CSS selector.
   * @returns {Array} Danh sách các gói vay (có thể rỗng)
   */
  async scrape() {
    console.log(`[VPBankBroken] Bắt đầu scrape...`);
    // Lấy HTML từ URL đầu tiên (dùng fetchWithRetry kế thừa từ BaseScraper)
    const html = await this.fetchWithRetry(this.urls[0]);
    if (!html) {
      console.error(`[VPBankBroken] Không lấy được HTML, trả về []`);
      return []; // ❌ Không fallback, không log đủ
    }

    const $ = cheerio.load(html);
    const loans = [];

    // ❌ CHỈ DÙNG CSS SELECTOR – trên raw HTML hầu như không bao giờ match
    //    Lý do: VPBank dùng React/JS để inject class name động, raw HTML chỉ có class như 'sc-bXTejn'
    $('[class*="rate"], [class*="interest"]').each((_, el) => {
      const text = $(el).text();
      const rate = this.extractRate(text);
      if (rate) {
        loans.push({
          bank: 'VPBank',
          packageName: 'Vay SME VPBank (từ CSS)',
          interestRate: rate,
          source: 'CSS selector'
        });
      }
    });

    // ❌ Nếu không tìm thấy, trả về [] mà không thử URL thứ hai, không dùng fallback data
    if (loans.length === 0) {
      console.warn(`[VPBankBroken] CSS selector không tìm thấy dữ liệu, trả về rỗng.`);
      // Không gọi getFallbackData(), không thử URL thứ hai
    }
    return loans;
  }

  /**
   * Trích xuất lãi suất từ text.
   * ❌ Regex chỉ hỗ trợ dấu chấm (.), bỏ qua dấu phẩy (,) – ví dụ "7,5%" sẽ không match.
   */
  extractRate(text) {
    // BUG: Không nhận dạng được dấu phẩy là decimal separator
    const match = text.match(/(\d+\.?\d*)%/);
    if (!match) return null;
    let value = parseFloat(match[1]);
    if (isNaN(value) || value < 3 || value > 20) return null; // Lọc sơ bộ
    return value;
  }

  /**
   * Fallback data – nhưng không được dùng vì scrape() không gọi nó.
   */
  getFallbackData() {
    return [{
      packageName: 'Vay sản xuất kinh doanh VPBank (fallback)',
      interestRate: 8.5,
      maxTerm: 120,
      minLoan: 100000000,
      maxLoan: 10000000000,
      pros: 'Lãi suất cạnh tranh',
      cons: 'Yêu cầu tài sản đảm bảo',
      requirements: 'Giấy phép kinh doanh'
    }];
  }
}

module.exports = new VPBankScraperBroken();

/* ========== KẾT QUẢ CHẠY THỬ ==========
   [VPBankBroken] Bắt đầu scrape...
   [VPBankBroken] CSS selector không tìm thấy dữ liệu, trả về rỗng.
   => runAll.js nhận được [] cho VPBank, loans.json không có package nào của VPBank.
   => Frontend hiển thị bảng so sánh với 5 ngân hàng (thiếu VPBank).
   => Người dùng thắc mắc: "Sao không thấy VPBank? Tôi muốn vay VPBank cơ!"
   => Điểm số của các ngân hàng khác bị sai lệch vì thiếu đối thủ cạnh tranh lớn.
*/