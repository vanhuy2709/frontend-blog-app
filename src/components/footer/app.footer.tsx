'use client';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from "next/image";
import { dmSans } from "@/lib/font";
import { listServices, listIcons } from "@/data/footer";

const AppFooter = () => {
  const matches = useMediaQuery('(min-width:600px)');

  return (
    <Box sx={{
      backgroundColor: '#121212',
      padding: '50px 0 50px',
      color: 'white'
    }}>
      <Container>
        <Typography sx={{
          fontSize: { xs: "40px", md: "64px" },
          fontFamily: dmSans.style,
          textAlign: 'center',
          fontWeight: 500,
          lineHeight: '80px',
          letterSpacing: '-0.64px',
          marginBottom: '30px',
        }}>
          Our Location
        </Typography>

        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px'
        }}>
          {listServices.map(item => (
            <Typography key={item} sx={{
              fontSize: { xs: "12px", sm: "16px", md: "20px" },
              fontFamily: dmSans.style,
              fontWeight: 400,
              lineHeight: '30px',
              letterSpacing: '0.6px'
            }}>
              {item}
            </Typography>
          ))}
        </Box>

        <Divider sx={{
          borderColor: "white",
          width: '100%',
          margin: '30px 0 30px'
        }} />

        <Stack
          direction={matches ? "row" : "column"}
          justifyContent="space-between"
          alignItems="center"
          gap={"30px"}
          sx={{
            mb: '80px'
          }}
        >
          <Stack direction="row" spacing={3}>
            {listIcons.map(icon => (
              <Image
                key={icon.id}
                src={`/icon/${icon.path}`}
                alt={icon.name}
                width={24}
                height={24} />
            ))}
          </Stack>

          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography
              sx={{
                fontFamily: dmSans.style,
                fontSize: '18px',
                display: { xs: "none", md: "block" }
              }}>
              Delivery Order
            </Typography>
            <Image src={'/icon/app-store.svg'}
              alt="app-store-download"
              width={134}
              height={40} />
            <Image src={'/icon/google-play.svg'}
              alt="app-store-download"
              width={134}
              height={40} />
          </Stack>
        </Stack>

        <Typography sx={{
          color: '#A27B5C',
          fontFamily: dmSans.style,
          fontSize: { xs: "14px", sm: "18px" },
          lineHeight: '28px',
          letterSpacing: '0.54px',
          textAlign: 'center'
        }}>
          © 2023 IMAJI COFFEE, All rights reserved
        </Typography>

      </Container>
    </Box>
  )
}

export default AppFooter;