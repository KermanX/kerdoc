export interface KerdocStyle {
  border: string;
  padding:
    | Length
    | [Length, Length, Length, Length]
    | {
        left?: Length;
        right?: Length;
        top?: Length;
        bottom?: Length;
      };
}

export type LengthUnit =
  | "em"
  | "ex"
  | "%"
  | "px"
  | "cm"
  | "mm"
  | "in"
  | "pt"
  | "pc"
  | "ch"
  | "rem"
  | "vh"
  | "vw"
  | "vmin"
  | "vmax";
export type Length<
  Value extends number = number,
  Unit extends LengthUnit = LengthUnit
> = `${Value}${Unit}`|"0";
