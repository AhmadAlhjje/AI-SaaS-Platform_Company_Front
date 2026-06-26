import { Hash, Table2 } from "lucide-react";
import type { DataTableDetail } from "@/entities/data-table";
import { Card, CardContent } from "@/shared/ui/card";

interface DataTableInfoProps {
  dataTable: DataTableDetail;
}

export function DataTableInfo({ dataTable }: DataTableInfoProps) {
  return (
    <Card>
      <CardContent className="flex flex-wrap items-center gap-6 pt-6">
        <div className="flex items-center gap-2">
          <Table2 className="text-muted-foreground size-4" />
          <span className="text-muted-foreground text-sm">الأعمدة</span>
          <span className="text-foreground text-sm font-semibold">{dataTable.columns.length}</span>
        </div>
        <div className="flex items-center gap-2">
          <Hash className="text-muted-foreground size-4" />
          <span className="text-muted-foreground text-sm">الصفوف</span>
          <span className="text-foreground text-sm font-semibold">{dataTable.rowCount}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">تاريخ الإنشاء</span>
          <span className="text-foreground text-sm font-semibold">
            {new Date(dataTable.createdAt).toLocaleDateString("ar")}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
