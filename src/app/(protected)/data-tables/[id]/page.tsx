import { DataTableDetailsView } from "@/views/data-table-details";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <DataTableDetailsView dataTableId={id} />;
}
