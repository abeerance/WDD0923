/**
 * Interface for image data
 */
export interface Image {
  id: number;
  url: string;
  name: string;
  user_id: number;
  article_id: number | null;
  created_at: string;
  updated_at: string;
}

/**
 * Interface for tag data
 */
export interface Tag {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  pivot: {
    article_id: number;
    tag_id: number;
  };
}

/**
 * Interface for article data
 */

export interface Article {
  id: number;
  title: string;
  slug: string;
  lead: string;
  content: string;
  user_id: number;
  image_id: number;
  created_at: string;
  updated_at: string;
  tags: Tag[];
  cover_image: Image;
}
