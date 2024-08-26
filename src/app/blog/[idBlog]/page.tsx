import { Metadata, ResolvingMetadata } from "next";
import Container from "@mui/material/Container";
import { sendRequest } from "@/utils/api";
import NewsPost from "@/components/news/news.post";

type Props = {
  params: { idBlog: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const temp = params?.idBlog?.split('.html') ?? [];
  const temp1 = temp[0]?.split('-') ?? [];
  const blogId = temp1[temp1.length - 1]

  // fetch data
  const res = await sendRequest<IBackendRes<IBlog>>({
    method: 'GET',
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/${blogId}`,
    nextOption: { cache: 'no-store' }
  })

  return {
    title: res.data?.attributes.title,
    description: res.data?.attributes.author,
  }
}

const BlogPage = async ({ params }: { params: { idBlog: string } }) => {

  const temp = params?.idBlog?.split('.html') ?? [];
  const temp1 = temp[0]?.split('-') ?? [];
  const blogId = temp1[temp1.length - 1];

  // Get Data Job by ID
  const res = await sendRequest<IBackendRes<IBlog>>({
    method: 'GET',
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/${blogId}`,
    nextOption: { cache: 'no-store' }
  })

  return (
    <Container sx={{ paddingTop: "80px", paddingBottom: "80px" }}>
      <NewsPost data={res.data} />
    </Container>
  )
}

export default BlogPage;