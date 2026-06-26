import type { DataTableColumn } from "@/entities/data-table";
import { COLUMN_TYPE_LABEL } from "@/entities/data-table";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

interface DataTableColumnsProps {
  columns: DataTableColumn[];
}

export function DataTableColumns({ columns }: DataTableColumnsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>الأعمدة</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {columns.map((column) => (
          <Badge key={column.name} variant="secondary">
            {column.name} · {COLUMN_TYPE_LABEL[column.type]}
          </Badge>
        ))}
      </CardContent>
    </Card>
  );
}
