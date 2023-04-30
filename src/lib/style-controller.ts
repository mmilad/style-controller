import { CssRuleType, RuleValueInterface } from "../interfaces/rule.interface";
import { Rule } from "./rule";
import { _GetRuleString } from "./helper";

export class StyleController {
  private styleEl: HTMLStyleElement;
  private children: Rule[] = [];

  constructor(styleEl: HTMLStyleElement | null = null) {
    if (!styleEl) {
      styleEl = document.createElement("style");
      document.head.appendChild(styleEl);
    }
    this.styleEl = styleEl;
  }

  get sheet() {
    return this.styleEl.sheet as CSSStyleSheet;
  }

  insert(selector: string, _rules: RuleValueInterface) {
    const { children, ...rules } = _rules;
    const cssRule = this.sheet.cssRules[
      this.sheet.insertRule(_GetRuleString(selector, rules))
    ] as CssRuleType;
    const rule = new Rule(cssRule, children);
    this.children.push(rule);
    return rule;
  }

  delete(rule: Rule) {
    const rules = this.sheet.cssRules;
    for (let i = 0; i < rules.length; i++) {
      if (rule.sheet === rules[i]) {
        this.sheet.deleteRule(i);
        continue;
      }
    }
    const indexInChildren = this.children.findIndex((item) => item === rule);
    if (indexInChildren) {
      this.children.splice(indexInChildren, 1);
    }
  }
  disable(disable = true) {
    return (this.styleEl.disabled = disable);
  }

  /**
   * @returns {[key: string]: CSSStyleRule} object of of rules
   */
  getRules() {
    const rules: { [key: string]: CSSStyleRule } = {};
    for (let i = 0; i < this.sheet.cssRules.length; i++) {
      const rule = this.sheet.cssRules[i] as CSSStyleRule;
      rules[rule.selectorText] = rule;
    }
    return rules;
  }
}
