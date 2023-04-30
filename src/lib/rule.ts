import {
  CssRuleType,
  CssSheetType,
  RuleBaseType,
  RuleChildren,
  RuleValueInterface,
} from "../interfaces/rule.interface";
import { _GetRuleString } from "./helper";

export class Rule {
  sheet: CssRuleType;
  private children: Rule[] = []
  constructor(sheet: CssRuleType, children?: RuleChildren[]) {
    this.sheet = sheet;
  }

  get selector() {
    return this.sheet.selectorText;
  }
  set selector(v: string) {
    this.sheet.selectorText = v;
  }
  get style() {
    return this.sheet.style;
  }

  insert(selector: string, _rules: RuleValueInterface) {
    const { children, ...rules } = _rules;
    const cssRule = this.sheet.cssRules[
      this.sheet.insertRule(_GetRuleString(selector, rules))
    ] as CssRuleType;
    const rule = new Rule(cssRule, children);
    this.children.push(rule)
    return rule
  }

  delete() {
    const parentSheet = this.sheet.parentRule as CssRuleType;
    const rules = parentSheet.cssRules;
    for (let i = 0; i < rules.length; i++) {
      if (this.sheet === rules[i]) {
        parentSheet.deleteRule(i);
        continue;
      }
    }
  }
  update(rules: RuleValueInterface) {
    Object.assign(this.style, rules);
  }
}
