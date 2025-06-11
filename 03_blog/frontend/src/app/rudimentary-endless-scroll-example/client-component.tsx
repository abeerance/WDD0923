// "use client";

// import { Card } from "@/components/card/card";
// import { CardBody } from "@/components/card/card-body/card-body";
// import { CardHeader } from "@/components/card/card-header/card-header";
// import { ImageContainer } from "@/components/ui/image/image";
// import { Tag } from "@/components/ui/tag/tag";
// import { Article } from "@/types/data";
// import { useIntersectionObserver } from "@uidotdev/usehooks";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// interface ClientComponentProps {
//   data: Article[] | undefined;
// }

// export default function ClientComponent({ data }: ClientComponentProps) {
//   const [allShots, setAllShots] = useState<Article[] | undefined>(data);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [ref, entry] = useIntersectionObserver({
//     threshold: 0,
//     root: null,
//     rootMargin: "0px",
//   });

//   console.log(entry?.isIntersecting);
//   const router = useRouter();

//   if (entry?.isIntersecting) {
//     const request = fetch(`http://127.0.0.1:8000/api/articles?limit=20&page=${currentPage + 1}`)

//     const responseData = request.data.data

//     setAllShots([...allShots, responseData])

//   }

//   return (
//     <div className="flex flex-col items-center gap-l">
//       {data?.map((blog) => (
//         <Card key={blog.id} slug={`blog/${blog.slug}`}>
//           <CardHeader
//             title={blog.title}
//             lead={blog.lead}
//             // this is the way to write ReactNode, which are not being propped with the reserved children property
//             content={
//               <div className="flex flex-wrap gap-2xs">
//                 {blog.tags.map((tag) => (
//                   <Tag key={tag.id} label={tag.name} />
//                 ))}
//               </div>
//             }
//           />
//           <CardBody>
//             <ImageContainer src={blog.cover_image.url} alt={blog.cover_image.name} />
//           </CardBody>
//         </Card>
//       ))}
//       <div ref={ref} className="h-[200px] w-full bg-green-950/50" />
//     </div>
//   );
// }
