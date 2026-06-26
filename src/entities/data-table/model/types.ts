export type ColumnType = "string" | "number" | "boolean" | "date";

export interface DataTableColumn {
  name: string;
  type: ColumnType;
}

export interface DataTable {
  id: string;
  documentId: string;
  tableName: string;
  columns: DataTableColumn[];
  createdAt: string;
}

export interface DataTableDetail extends DataTable {
  rowCount: number;
}

export type RowFilterOperator = "eq" | "neq" | "gt" | "gte" | "lt" | "lte" | "contains";

export interface RowFilter {
  column: string;
  operator: RowFilterOperator;
  value: string | number | boolean;
}

export type DataTableRow = Record<string, unknown>;

export interface PaginatedDataTableRows {
  items: DataTableRow[];
  total: number;
  page: number;
  limit: number;
}

export interface ListDataTableRowsParams {
  search?: string;
  filters?: RowFilter[];
  page?: number;
  limit?: number;
}
