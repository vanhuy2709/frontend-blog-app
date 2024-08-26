import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CreateBlog from "@/components/form/create.blog";
import { Metadata } from "next";

// either Static metadata
export const metadata: Metadata = {
  title: 'Create Blog',
}

const CreateBlogPage = () => {

  return (
    <Box>
      <Container sx={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <CreateBlog />
      </Container>
    </Box>
  )
}

export default CreateBlogPage;