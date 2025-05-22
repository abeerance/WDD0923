import { Grid, GridItem } from "@/components/ui/grid/grid";
import { Text } from "@/components/ui/text/text";
import { PaginatedArticlesResponse } from "@/types/responses/article-response";
import { fetchApi } from "@/utils/fetch/backend-fetch";
import Image from "next/image";
import Link from "next/link";

export default async function BlogOverviewPage() {
  const response = await fetchApi<PaginatedArticlesResponse>("articles?limit=20&page=1");
  const responseData = response.data?.data;

  return (
    <Grid className="py-2xl">
      {responseData?.map((blog) => (
        <GridItem
          key={blog.id}
          span={{ sm: 12, md: 6, lg: 4 }}
          className="rounded-xl shadow-md overflow-clip bg-white flex flex-col border border-gray-100 cursor-pointer"
        >
          <Link href={blog.slug}>
            <div className="pt-m px-s pb-s flex flex-col gap-xs">
              <div className="flex flex-col gap-xs">
                <Text
                  as="h4"
                  variant="headline-4"
                  className="line-clamp-2 h-[calc(2*var(--text-headline-4-line-height))]"
                >
                  {blog.title}
                </Text>
                <Text
                  variant="body-small"
                  className="line-clamp-3 h-[calc(3*var(--text-body-small-line-height))]"
                >
                  {blog.lead}
                </Text>
              </div>
              <div className="flex flex-wrap gap-2xs">
                {blog.tags.map((tag) => (
                  <Text
                    key={tag.id}
                    as="span"
                    variant="body-micro"
                    className="px-xs py-1 bg-gray-100 text-gray-700 rounded-full font-semibold"
                  >
                    {tag.name}
                  </Text>
                ))}
              </div>
            </div>
            <div className="relative w-full aspect-video rounded-t-lg overflow-clip ">
              <Image
                src={blog.cover_image.url}
                alt={blog.cover_image.name}
                fill
                objectFit="cover"
              />
            </div>
          </Link>
        </GridItem>
      ))}
    </Grid>
  );
}
