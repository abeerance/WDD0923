import { BackButton } from "@/components/back-button/back-button";
import { Grid, GridItem } from "@/components/ui/grid/grid";
import { ImageContainer } from "@/components/ui/image/image";
import { Tag } from "@/components/ui/tag/tag";
import { Text } from "@/components/ui/text/text";
import Viewer from "@/components/viewer/viewer";
import type { PublicUser } from "@/types/data";
import type { PaginatedArticlesResponse } from "@/types/responses/article-response";
import { fetchApi } from "@/utils/fetch/backend-fetch";
import { format } from "date-fns";
import { notFound } from "next/navigation";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  // fetch request for the article with the help of a slug
  const response = await fetchApi<PaginatedArticlesResponse>(`articles?slug=${slug}`);
  // fetch request for the user which created the article
  const userResponse = await fetchApi<PublicUser>(`users?id=${response.data?.data[0].user_id}`);

  if (!response.data || response.data.data.length === 0 || !userResponse.data) {
    notFound();
  }

  // destructuring props from the blogData, so that we do not have to write blogData all the time
  const { title, lead, content, tags, cover_image, created_at } = response.data.data[0];
  // destructure username from userResponse
  const { username } = userResponse.data;

  return (
    <Grid className="py-2xl flex flex-col gap-l">
      <GridItem span={12}>
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2xs">
            <Text variant="headline-2" as="h2">
              {title}
            </Text>
            <Text variant="body-small">
              By {username} published on
              {format(new Date(created_at), "MMMM d, yyyy")}
            </Text>
          </div>
          <BackButton />
        </div>
        <Text className="mt-m">{lead}</Text>
      </GridItem>
      <GridItem span={12} className="flex flex-col gap-s">
        <div className="w-full aspect-video relative rounded-xl overflow-hidden">
          <ImageContainer src={cover_image.url} alt={cover_image.name} />
        </div>
        <div className="flex flex-wrap gap-2xs">
          {tags.map((tag) => (
            <Tag key={tag.id} label={tag.name} />
          ))}
        </div>
      </GridItem>
      <GridItem>
        <Viewer content={content} />
      </GridItem>
    </Grid>
  );
}
