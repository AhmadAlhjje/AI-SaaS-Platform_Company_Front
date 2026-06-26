"use client";

import { Plus, X } from "lucide-react";
import { useState } from "react";
import type { DataTableColumn, RowFilter, RowFilterOperator } from "@/entities/data-table";
import { ROW_FILTER_OPERATOR_LABEL, ROW_FILTER_OPERATORS } from "@/entities/data-table";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

const SELECT_CLASS =
  "border-input bg-background h-9 rounded-lg border px-3 text-sm shadow-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

interface DataTableFilterBuilderProps {
  columns: DataTableColumn[];
  filters: RowFilter[];
  onChange: (filters: RowFilter[]) => void;
}

function toFilterValue(column: DataTableColumn | undefined, raw: string): string | number | boolean {
  if (column?.type === "number") {
    return Number(raw);
  }
  if (column?.type === "boolean") {
    return raw === "true";
  }
  return raw;
}

export function DataTableFilterBuilder({ columns, filters, onChange }: DataTableFilterBuilderProps) {
  const [column, setColumn] = useState(columns[0]?.name ?? "");
  const [operator, setOperator] = useState<RowFilterOperator>("eq");
  const [value, setValue] = useState("");

  const selectedColumn = columns.find((item) => item.name === column);

  function handleAdd() {
    if (!column || value === "") {
      return;
    }

    onChange([...filters, { column, operator, value: toFilterValue(selectedColumn, value) }]);
    setValue("");
  }

  function handleRemove(index: number) {
    onChange(filters.filter((_, itemIndex) => itemIndex !== index));
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <select className={SELECT_CLASS} value={column} onChange={(event) => setColumn(event.target.value)}>
          {columns.map((item) => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <select
          className={SELECT_CLASS}
          value={operator}
          onChange={(event) => setOperator(event.target.value as RowFilterOperator)}
        >
          {ROW_FILTER_OPERATORS.map((item) => (
            <option key={item} value={item}>
              {ROW_FILTER_OPERATOR_LABEL[item]}
            </option>
          ))}
        </select>
        {selectedColumn?.type === "boolean" ? (
          <select className={SELECT_CLASS} value={value} onChange={(event) => setValue(event.target.value)}>
            <option value="">اختر قيمة</option>
            <option value="true">نعم</option>
            <option value="false">لا</option>
          </select>
        ) : (
          <Input
            type={selectedColumn?.type === "number" ? "number" : "text"}
            placeholder="القيمة"
            className="w-40"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        )}
        <Button variant="outline" size="sm" onClick={handleAdd}>
          <Plus />
          إضافة فلتر
        </Button>
      </div>

      {filters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.map((filter, index) => (
            <Badge key={`${filter.column}-${filter.operator}-${index}`} variant="default" className="gap-1.5">
              {filter.column} {ROW_FILTER_OPERATOR_LABEL[filter.operator]} {String(filter.value)}
              <button type="button" aria-label="إزالة الفلتر" onClick={() => handleRemove(index)}>
                <X className="size-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
