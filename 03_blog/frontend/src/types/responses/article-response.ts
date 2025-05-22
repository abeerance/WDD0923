import { Article } from "../data";
import { PaginationMeta } from "../pagination-meta";

/**
 * Interface for paginated articles response
 */
export interface PaginatedArticlesResponse extends PaginationMeta {
  data: Article[];
}
