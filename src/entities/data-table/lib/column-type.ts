import type { ColumnType, RowFilterOperator } from "../model/types";

export const COLUMN_TYPE_LABEL: Record<ColumnType, string> = {
  string: "نص",
  number: "رقم",
  boolean: "منطقي",
  date: "تاريخ",
};

export const ROW_FILTER_OPERATORS: RowFilterOperator[] = ["eq", "neq", "gt", "gte", "lt", "lte", "contains"];

export const ROW_FILTER_OPERATOR_LABEL: Record<RowFilterOperator, string> = {
  eq: "يساوي",
  neq: "لا يساوي",
  gt: "أكبر من",
  gte: "أكبر أو يساوي",
  lt: "أصغر من",
  lte: "أصغر أو يساوي",
  contains: "يحتوي على",
};
