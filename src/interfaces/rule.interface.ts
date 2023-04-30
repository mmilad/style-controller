export type RuleBaseType = Partial<CSSStyleDeclaration>;
export type RuleChildren = {
  selector: string;
  rules: RuleValueInterface;
};
export type RuleValueInterface = {
  children?: RuleChildren[];
} & RuleBaseType;

export type CssRuleType = CSSStyleRule & CSSGroupingRule;
export type CssSheetType = CSSStyleSheet | CssRuleType;