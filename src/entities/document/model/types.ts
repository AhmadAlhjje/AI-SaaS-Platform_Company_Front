export interface Document {
  id: string;
  fileName: string;
  fileType: string;
  knowledgeType: string;
  status: string;
  createdAt: string;
}

export interface PaginatedDocuments {
  items: Document[];
  total: number;
  page: number;
  limit: number;
}

export interface ListDocumentsParams {
  search?: string;
  page?: number;
  limit?: number;
}
