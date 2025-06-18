import { auth } from "@/auth";
import { EditBlog } from "@/components/edit-blog/edit-blog";
import { NavLink } from "@/components/nav-link/nav-link";
import { Grid, GridItem } from "@/components/ui/grid/grid";
import { Text } from "@/components/ui/text/text";
import { PublicUser } from "@/types/data";
import { PaginatedArticlesResponse } from "@/types/responses/article-response";
import { fetchApi } from "@/utils/fetch/backend-fetch";
import { notFound } from "next/navigation";

interface EditBlogPageProps {
  params: Promise<{ slug: string }>;
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  // destructure the slug from params
  const { slug } = await params;
  // get user session
  const session = await auth();
  // fetch request for the article with the help of a slug
  const response = await fetchApi<PaginatedArticlesResponse>(`articles?slug=${slug}`);
  // fetch request for the user which created the article
  const userResponse = await fetchApi<PublicUser>(`users?id=${response.data?.data[0].user_id}`);

  // if the blog article does not exist, we call a 404 site
  if (!response.data || response.data.data.length === 0 || !userResponse.data) {
    notFound();
  }

  // destructure userId from userResponse => this is the userId from the user that created the blog
  const { id } = userResponse.data;
  // save the session userId into a variable from the currently logged on user
  const sessionUserId = session?.user?.id;

  if (sessionUserId !== id.toString()) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Grid>
          <GridItem span={12} className="flex flex-col items-center">
            <Text variant="headline-2">Whoops you wandrd out of your stay</Text>
          </GridItem>
          <GridItem span={6} offset={3} className="flex flex-col items-center gap-2xs">
            <Text>The creator has banished you from the hidden gem</Text>
            <Text variant="body-small">Let&apos;s go back to your dashboard</Text>
          </GridItem>
          <GridItem span={12} className="flex justify-center">
            <NavLink
              href="/dashboard"
              className="rounded-full bg-cyan-900/90 text-gray-100 hover:bg-cyan-900/75 px-xs py-2xs transition-all duration-300"
            >
              Dashboard
            </NavLink>
          </GridItem>
        </Grid>
      </div>
    );
  }

  // here we ensured already that the currently logged on user is the one who created the blog article
  return <EditBlog data={response.data.data[0]} />;
}
