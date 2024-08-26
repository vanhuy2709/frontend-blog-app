import * as React from 'react';
import AppHero from '@/components/hero/app.hero';
import { sendRequest } from '@/utils/api';
import { Metadata } from 'next';
import { Container, Stack } from '@mui/material';
import NewsItem from '@/components/news/news.item';
import { EStatus } from '@/enums/status';

// either Static metadata
export const metadata: Metadata = {
  title: 'Blog Website',
}

export default async function HomePage() {

  // Fetch list blog
  const res = await sendRequest<IBackendRes<IBlog[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs`,
    method: 'GET',
    queryParams: {
      populate: "image"
    },
    nextOption: { cache: 'no-store' },
  })

  return (
    <>
      <AppHero />
      {/* <NewList data={res.data} /> */}
      <Container sx={{ pt: "80px", pb: "80px" }}>
        <Stack useFlexGap marginBottom={"30px"} sx={{
          gap: { xs: "16px", sm: "30px" }
        }}>
          {res.data && res.data.length > 0 && res.data.map(news => {
            if (news.attributes.status == EStatus.published) {
              return (
                <NewsItem
                  key={news.id}
                  news={news}
                />
              )
            }
          })}
        </Stack>
      </Container>
    </>
  );
}
