import { dmSans } from '@/lib/font';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import CircleIcon from '@mui/icons-material/Circle';
import Image from 'next/image';

const AppHero = () => {
  return (
    <Box sx={{
      backgroundColor: '#FCF7EF',
      padding: { xs: "20px 0 20px", md: "80px 0 80px" }
    }}>
      <Container>
        <Typography sx={{
          fontFamily: dmSans.style,
          fontSize: { xs: "50px", sm: "60px", md: "96px" },
          fontWeight: 500,
          lineHeight: { xs: "70px", sm: "90px", md: "120px" },
          letterSpacing: "-1.92px",
          textAlign: "center",
          mb: "20px"
        }}>
          Our News
        </Typography>

        <Typography sx={{
          fontFamily: dmSans.style,
          fontSize: { xs: "14px", sm: "20px" },
          lineHeight: "30px",
          letterSpacing: "0.6px",
          textAlign: "center",
          mb: "40px"
        }}>
          Get the latest updates and deeper coffee experience from IMAJI Coffee
        </Typography>

        <Image
          src={'/background-image.png'}
          alt="background-image"
          width={0}
          height={0}
          sizes="100vw"
          priority
          style={{ width: "100%", height: "auto", marginBottom: "30px" }}
        />

        <Typography sx={{
          fontFamily: dmSans.style,
          fontSize: { xs: "16px", sm: "20px", md: "32px" },
          fontWeight: 500,
          lineHeight: { xs: "20px", sm: "42px" },
          letterSpacing: "-0.32px"
        }}>
          Collaboration to Develop Coffee and Beverage Industry Expertise in Indonesia
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          <Typography sx={{
            fontFamily: dmSans.style,
            fontSize: { xs: "14px", sm: "20px" },
            lineHeight: "30px",
            letterSpacing: "0.6px",
            color: "#717171"
          }}>4 Min</Typography>
          <CircleIcon sx={{ fontSize: "6px", color: "#717171" }} />
          <Typography sx={{
            fontFamily: dmSans.style,
            fontSize: { xs: "14px", sm: "20px" },
            lineHeight: "30px",
            letterSpacing: "0.6px",
            color: "#717171"
          }}>August 19, 2022</Typography>
        </Stack>
      </Container>
    </Box>
  )
}

export default AppHero;