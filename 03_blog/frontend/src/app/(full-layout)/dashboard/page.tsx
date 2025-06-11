import { auth } from "@/auth";
import { Card } from "@/components/card/card";
import { CardBody } from "@/components/card/card-body/card-body";
import { CardHeader } from "@/components/card/card-header/card-header";
import { NavLink } from "@/components/nav-link/nav-link";
import { Pagination } from "@/components/pagination/pagination";
import { Grid, GridItem } from "@/components/ui/grid/grid";
import { ImageContainer } from "@/components/ui/image/image";
import { Tag } from "@/components/ui/tag/tag";
import { Text } from "@/components/ui/text/text";
import { PaginatedArticlesResponse } from "@/types/responses/article-response";
import { fetchApi } from "@/utils/fetch/backend-fetch";

interface UserArticlesProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
}

export default async function UserArticles({ searchParams }: UserArticlesProps) {
  // Get the current session - middleware guarantees this exists on protected routes
  const session = await auth();

  // Await searchParams before using
  const params = await searchParams;

  // Extract pagination parameters
  const page = parseInt(params.page || "1");
  const limit = parseInt(params.limit || "21");

  const result = await fetchApi<PaginatedArticlesResponse>(
    `articles?user_id=${session?.user?.id}&limit=${limit}&page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  // responseData from the fetchApi request
  const responseData = result.data?.data;
  const pagination = result.data;

  return (
    <Grid className="py-2xl">
      <GridItem span={12} className="flex flex-col gap-xs">
        <Text as="h1" variant="headline-2">
          Welcome back {session?.username}!
        </Text>
        <Text>What&apos;s your next Wandrstay?</Text>
      </GridItem>
      <GridItem span={12} className="flex justify-end">
        <NavLink
          href="/blog/create"
          textVariant="body-small"
          className="bg-gray-900/90 text-white px-xs py-2xs rounded-md hover:bg-gray-700/90"
        >
          New Wandrstay
        </NavLink>
      </GridItem>
      {responseData?.map((blog) => (
        <Card key={blog.id} slug={`blog/${blog.slug}`}>
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
      {pagination && (
        <GridItem span={12}>
          <Pagination
            currentPage={pagination.current_page}
            totalPages={pagination.last_page}
            basePath="/dashboard"
            searchParams={params}
          />
        </GridItem>
      )}
    </Grid>
  );
}
