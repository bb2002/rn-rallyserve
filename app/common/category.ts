export interface Category {
  name: string;
  code: string;
}

export const DISASTER: Category = { name: "재해·재난", code: "disaster" };
export const LIFE: Category = { name: "생활지원", code: "life" };
export const ENVIRONMENT: Category = { name: "환경보호", code: "environment" };
export const CULTURE: Category = { name: "문화행사", code: "culture" };
export const HEALTH: Category = { name: "보건·의료", code: "health" };
export const MENTORING: Category = { name: "멘토링", code: "mentoring" };
export const SAFETY: Category = { name: "예방·안전", code: "safety" };
export const INTERNATIONAL: Category = { name: "국제", code: "international" };

const categories: Category[] = [
  DISASTER,
  LIFE,
  ENVIRONMENT,
  CULTURE,
  HEALTH,
  MENTORING,
  SAFETY,
  INTERNATIONAL,
];

export function nameToCode(name: string): string | undefined {
  const category = categories.find((category) => category.name === name);
  return category ? category.code : undefined;
}

export function codeToName(code: string): string | undefined {
  const category = categories.find((category) => category.code === code);
  return category ? category.name : undefined;
}
