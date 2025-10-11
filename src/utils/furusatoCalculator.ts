/**
 * ふるさと納税の限度額を計算する関数
 *
 * 計算式（簡易版）:
 * 1. 給与所得控除を計算
 * 2. 課税所得を算出（各種控除を差し引く）
 * 3. 住民税所得割額を計算（課税所得の10%）
 * 4. 控除上限額 = 住民税所得割額の20% + 2,000円
 * 5. 安全マージン95%を適用して返す
 */

interface FurusatoLimitParams {
  annualIncome: number;          // 年収
  married: boolean;              // 既婚かどうか
  dependents: number;            // 扶養人数
  socialInsurance?: number;      // 社会保険料（任意）
  mortgageDeduction?: number;    // 住宅ローン控除（任意）
}

/**
 * 給与所得控除を計算
 */
function calculateSalaryDeduction(annualIncome: number): number {
  if (annualIncome <= 1625000) {
    return 550000;
  } else if (annualIncome <= 1800000) {
    return annualIncome * 0.4 - 100000;
  } else if (annualIncome <= 3600000) {
    return annualIncome * 0.3 + 80000;
  } else if (annualIncome <= 6600000) {
    return annualIncome * 0.2 + 440000;
  } else if (annualIncome <= 8500000) {
    return annualIncome * 0.1 + 1100000;
  } else {
    return 1950000;
  }
}

/**
 * 社会保険料を推定（年収の約15%）
 */
function estimateSocialInsurance(annualIncome: number): number {
  return Math.floor(annualIncome * 0.15);
}

/**
 * 基礎控除を計算（2020年以降の新基礎控除）
 */
function calculateBasicDeduction(annualIncome: number): number {
  if (annualIncome <= 24000000) {
    return 480000;
  } else if (annualIncome <= 24500000) {
    return 320000;
  } else if (annualIncome <= 25000000) {
    return 160000;
  } else {
    return 0;
  }
}

/**
 * 配偶者控除を計算
 */
function calculateSpouseDeduction(married: boolean, annualIncome: number): number {
  if (!married) return 0;

  // 年収が1000万円以下の場合、配偶者控除を適用（簡易版）
  if (annualIncome <= 10000000) {
    return 330000; // 住民税の配偶者控除
  }

  return 0;
}

/**
 * 扶養控除を計算
 */
function calculateDependentDeduction(dependents: number): number {
  return dependents * 330000; // 住民税の扶養控除（一般）
}

/**
 * ふるさと納税の限度額を計算
 */
export function calculateFurusatoLimit(params: FurusatoLimitParams): number {
  const {
    annualIncome,
    married,
    dependents,
    socialInsurance,
    mortgageDeduction = 0
  } = params;

  // 1. 給与所得控除を計算
  const salaryDeduction = calculateSalaryDeduction(annualIncome);

  // 2. 給与所得を計算
  const salaryIncome = annualIncome - salaryDeduction;

  // 3. 社会保険料を推定または使用
  const socialInsuranceAmount = socialInsurance || estimateSocialInsurance(annualIncome);

  // 4. 各種控除を計算
  const basicDeduction = calculateBasicDeduction(annualIncome);
  const spouseDeduction = calculateSpouseDeduction(married, annualIncome);
  const dependentDeduction = calculateDependentDeduction(dependents);

  // 5. 課税所得を計算
  const totalDeductions = basicDeduction + spouseDeduction + dependentDeduction + socialInsuranceAmount;
  const taxableIncome = Math.max(0, salaryIncome - totalDeductions);

  // 6. 所得税率を計算（累進課税）
  let incomeTaxRate = 0.05; // デフォルト5%
  if (taxableIncome > 40000000) {
    incomeTaxRate = 0.45;
  } else if (taxableIncome > 18000000) {
    incomeTaxRate = 0.40;
  } else if (taxableIncome > 9000000) {
    incomeTaxRate = 0.33;
  } else if (taxableIncome > 6950000) {
    incomeTaxRate = 0.23;
  } else if (taxableIncome > 3300000) {
    incomeTaxRate = 0.20;
  } else if (taxableIncome > 1950000) {
    incomeTaxRate = 0.10;
  }

  // 7. 住民税所得割額を計算（課税所得の10%）
  const residentTaxAmount = taxableIncome * 0.1;

  // 8. 住宅ローン控除を考慮
  const adjustedResidentTax = Math.max(0, residentTaxAmount - (mortgageDeduction || 0));

  // 9. ふるさと納税の控除上限額を計算
  // 上限額 = (住民税所得割額 × 20%) / (100% - 所得税率 × 1.021 - 10%) + 2,000円
  const controlRate = 1 - (incomeTaxRate * 1.021 + 0.1);
  const limit = Math.floor((adjustedResidentTax * 0.2) / controlRate) + 2000;

  // 10. 安全マージン90%を適用（より保守的に）
  const safeLimit = Math.floor(limit * 0.90);

  return Math.max(0, safeLimit);
}

/**
 * 限度額を1000円単位に切り捨て
 */
export function roundToThousand(amount: number): number {
  return Math.floor(amount / 1000) * 1000;
}

/**
 * 限度額の詳細情報を取得
 */
export function getFurusatoLimitDetails(params: FurusatoLimitParams) {
  const limit = calculateFurusatoLimit(params);
  const roundedLimit = roundToThousand(limit);

  return {
    limit,
    roundedLimit,
    selfBurden: 2000, // 自己負担額
    deductionAmount: roundedLimit - 2000, // 控除額
    recommendedAmount: Math.floor(roundedLimit / 3) // 1つの返礼品あたりの推奨額
  };
}
