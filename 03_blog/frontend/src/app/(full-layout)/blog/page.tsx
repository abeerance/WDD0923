import { Card } from "@/components/card/card";
import { CardBody } from "@/components/card/card-body/card-body";
import { CardHeader } from "@/components/card/card-header/card-header";
import { Grid } from "@/components/ui/grid/grid";
import { ImageContainer } from "@/components/ui/image/image";
import { Tag } from "@/components/ui/tag/tag";
import { PaginatedArticlesResponse } from "@/types/responses/article-response";
import { fetchApi } from "@/utils/fetch/backend-fetch";

export default async function BlogOverviewPage() {
  const response = await fetchApi<PaginatedArticlesResponse>("articles?limit=20&page=1");
  const responseData = response.data?.data;

  return (
    <Grid className="py-2xl">
      {responseData?.map((blog) => (
        <Card key={blog.id} slug={blog.slug}>
          <CardHeader
            title={blog.title}
            lead={blog.lead}
            // this is the way to write ReactNode, which are not being propped with the reserved children property
            content={
              <div className="flex flex-wrap gap-2xs">
                {blog.tags.map((tag) => (
                  <Tag key={tag.id} label={tag.name} />
                ))}
              </div>
            }
          />
          <CardBody>
            <ImageContainer src={blog.cover_image.url} alt={blog.cover_image.name} />
          </CardBody>
        </Card>
      ))}
    </Grid>
  );
}
