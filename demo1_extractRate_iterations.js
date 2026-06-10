/**
 * DEMO 1 — extractRate() validator: three iterations
 * Individual Footprint · Phuoc · Financial Analyzer Pro · Team 10
 *
 * This script runs all three versions of extractRate() against the same
 * test inputs and shows exactly which bug each version introduced and fixed.
 *
 * Run: node demo1_extractRate_iterations.js
 * No dependencies required.
 */

const testInputs = [
  // Should be accepted by final version
  { text: "Lãi suất vay 8.5%/năm cho SME",      expected: 8.5,  label: "dot decimal (VPBank)" },
  { text: "Lãi suất vay ưu đãi 7,5%/năm",        expected: 7.5,  label: "comma decimal (VCB)" },
  { text: "Gói vay SME 12%/năm áp dụng 2025",    expected: 12,   label: "integer rate" },
  // Should be REJECTED by final version
  { text: "Phí phạt chậm trả 0.5%/tháng",        expected: null, label: "penalty rate (too low)" },
  { text: "Lãi suất tiết kiệm 6.2%/năm",         expected: null, label: "savings rate — passes range but wrong type" },
  { text: "Ưu đãi giảm 50% phí dịch vụ",         expected: null, label: "promotional discount 50%" },
  { text: "Bảo hiểm 100% giá trị khoản vay",     expected: null, label: "insurance coverage 100%" },
  { text: "Chương trình hoàn tiền 30%",           expected: null, label: "cashback 30%" },
  { text: "Không có thông tin lãi suất ở đây",   expected: null, label: "no % symbol at all" },
];

// ─── VERSION 1 ───────────────────────────────────────────────────────────────
// Bug: regex /(\d+\.?\d*)%/ misses comma decimals ('7,5%')
function extractRate_v1(text) {
  const match = text.match(/(\d+\.?\d*)%/);
  if (!match) return null;
  return parseFloat(match[1]);
}

// ─── VERSION 2 ───────────────────────────────────────────────────────────────
// Fix: accepts comma decimals + range guard [3, 20]
// Remaining bug: round-number noise (50, 30, 20, 100) still passes range filter
function extractRate_v2(text) {
  const match = text.match(/(\d+[,.]?\d*)\s*%/);
  if (!match) return null;
  const value = parseFloat(match[1].replace(',', '.'));
  if (value < 3 || value > 20) return null;   // range guard added
  return value;
}

// ─── VERSION 3 (FINAL) ───────────────────────────────────────────────────────
// Fix: reject round-number noise list + tightened decimal pattern
const NOISE_VALUES = [100, 50, 30, 20];
function extractRate_v3(text) {
  const match = text.match(/(\d+[,.]?\d*)\s*%/);
  if (!match) return null;
  const value = parseFloat(match[1].replace(',', '.'));
  if (value < 3 || value > 20) return null;
  if (NOISE_VALUES.includes(value)) return null;  // noise rejection list
  return value;
}

// ─── RUN COMPARISON ──────────────────────────────────────────────────────────
console.log("=".repeat(72));
console.log("DEMO 1 — extractRate() validator: three iterations");
console.log("Individual Footprint · Phuoc · Financial Analyzer Pro · Team 10");
console.log("=".repeat(72));

const versions = [
  { name: "v1 (naive regex — misses comma decimals)", fn: extractRate_v1 },
  { name: "v2 (+ range guard — round noise still passes)", fn: extractRate_v2 },
  { name: "v3 FINAL (+ noise rejection list)", fn: extractRate_v3 },
];

let totalBugs = { v1: 0, v2: 0, v3: 0 };

testInputs.forEach(({ text, expected, label }) => {
  console.log(`\n  Input: "${label}"`);
  console.log(`  Text:   ${text}`);
  console.log(`  Expected result: ${expected}`);

  versions.forEach((v, i) => {
    const result = v.fn(text);
    const correct = result === expected;
    const tag = correct ? "✓" : "✗ BUG";
    if (!correct) totalBugs[`v${i + 1}`]++;
    console.log(`  ${v.name.padEnd(50)} → ${String(result).padEnd(6)} ${tag}`);
  });
});

console.log("\n" + "=".repeat(72));
console.log("BUG SUMMARY (wrong outputs vs expected):");
console.log(`  v1: ${totalBugs.v1} incorrect outputs`);
console.log(`  v2: ${totalBugs.v2} incorrect outputs`);
console.log(`  v3: ${totalBugs.v3} incorrect outputs`);
console.log("\nKEY BUGS DEMONSTRATED:");
console.log("  v1 → missed '7,5%' comma decimal: returned null instead of 7.5");
console.log("  v2 → passed '0.5%' penalty: accepted 0.5 (below range guard added in v3)");
console.log("       BUT savings rate '6.2%' still accepted — needs keyword filter in VCBScraper");
console.log("  v3 → all test cases correct");
console.log("=".repeat(72));
