import {
  RuleBaseType,
} from "../interfaces/rule.interface";

export const _ToKkebab = (str: string) => {
  return str.replace(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    ($, ofs) => (ofs ? "-" : "") + $.toLowerCase()
  );
}

export const _GetRuleString = (selector: string, rules: RuleBaseType) => {
  return `${selector} {${Object.keys(rules)
    .map((key) => `${_ToKkebab(key)}: ${rules[key as any]};`)
    .join("")}}`;
}