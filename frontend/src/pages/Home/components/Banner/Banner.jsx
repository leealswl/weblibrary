import React, { useEffect, useState } from "react";
import { Box, Container, Stack, Typography, Button } from "@mui/material";
import img1 from "../../../../assets/images2.jpg";
import { useNavigate } from "react-router";
import img2 from "../../../../assets/images3.jpg";
import img3 from "../../../../assets/images4.jpg";

const images = [img1, img2, img3];

const Banner = () => {
  //const navigate =useNavigate();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % images.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  return (
    
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: 360, md: 560 },
        backgroundImage: `url(${images[idx]})`, 
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        transition: "background-image 0.6s ease",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,.45) 0%, rgba(0,0,0,.35) 40%, rgba(0,0,0,.25) 100%)",
        }}
      />
      <Container
        data-aos="fade-up" data-aos-offset="120"
        maxWidth="lg"
        sx={{
          position: "relative",
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Stack spacing={2} sx={{ maxWidth: { xs: "100%", md: "62%" } }}>
          <Typography
            sx={{
              color: "rgba(255,255,255,.85)",
              fontSize: { xs: 13, md: 14 },
              letterSpacing: ".08em",
              fontFamily: "'STUNNING-Bd','KyoboHand',sans-serif", 
            }}
          >
            Shared Reading and Discussion
          </Typography>

          <Typography
            component="h1"
            sx={{
              whiteSpace: "pre-line",
              fontSize: { xs: 28, sm: 36, md: 44 },
              lineHeight: 1.25,
              fontWeight: 800,
              textShadow: "0 2px 18px rgba(0,0,0,.35)",
              fontFamily: "'STUNNING-Bd','KyoboHand',sans-serif", 

            }}
          >
            {`아이와 함께 읽고 나누는\n 창작동화`}
          </Typography>

          <Typography
            sx={{
              whiteSpace: "pre-line",
              fontSize: { xs: 14, md: 16 },
              color: "rgba(255,255,255,.9)",
              textShadow: "0 1px 12px rgba(0,0,0,.35)",
              maxWidth: 680,
              fontFamily: "'STUNNING-Bd','KyoboHand',sans-serif", 
            }}
          >
            BooKids를 통해 독서 모임과 리뷰를 나눠보세요.
            {"\n"}취향이 맞는 사람들과 함께 성장하는 경험.
          </Typography>

          <Box>
            {/* <Button
              size="large"
              sx={{
                mt: 1,
                px: 2.75,
                py: 1.1,
                borderRadius: 999,
                bgcolor: "#589857",
                color: "#fff",
                fontWeight: 700,
                "&:hover": { bgcolor: "#569955ff" },
              }}
              onClick={() => {
                navigate("/board")
              }}
            >
              모임 찾아보기
            </Button> */}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Banner;
