'use client';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import useMediaQuery from '@mui/material/useMediaQuery';
import { dmSans } from "@/lib/font";
import { useRouter } from "next/navigation";
import { convertSlugUrl } from "@/utils/api";

interface IProps {
  news: IBlog;
}

const NewsItem = (props: IProps) => {
  const router = useRouter();
  const matches = useMediaQuery('(min-width:600px)');
  const { news } = props;

  return (
    <Box>
      <Divider />
      <Stack
        direction="row"
        spacing={matches ? 8 : 3}
        alignItems="center">
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${news.attributes.image.data.attributes.url}`}
          alt={`${news.attributes.image.data.attributes.name}`}
          width={matches ? 261 : 131}
          height={matches ? 254 : 124}
          style={{ objectFit: "contain" }} />

        <Box>
          <Typography sx={{
            fontFamily: dmSans.style,
            fontSize: { xs: "14px", sm: "30px", md: "40px" },
            fontWeight: 500,
            mb: 1,
            lineHeight: { xs: "20px", sm: "40px", md: "56px" },
            letterSpacing: "-0.48px",
            cursor: "pointer"
          }}
            onClick={() => router.push(`/blog/${convertSlugUrl(news.attributes.title)}-${news.id}.html`)}
          >
            {news.attributes.title}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <Typography sx={{
              fontFamily: dmSans.style,
              fontSize: { xs: "12px", sm: "20px" },
              lineHeight: { xs: "16px", sm: "30px" },
              letterSpacing: "0.6px",
              color: "#717171"
            }}>{news.attributes.publishedAt.substring(0, 10)}</Typography>
          </Stack>
        </Box>


      </Stack>
    </Box>
  )
}

export default NewsItem