import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


const BEIGE = "#faf6ef";
const green = "#589857";

export default function Section2() {
    const navigate =useNavigate();
  return (
    <Box
      sx={{
        bgcolor: BEIGE,
        py: { xs: 6, md: 8 },                  // 위아래 여백
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: "center" }}>
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: { xs: 26, sm: 32, md: 34 },
            color: green,
            mb: 1.5,
            fontFamily: "'STUNNING-Bd','KyoboHand',sans-serif", 
          }}
          data-aos="fade-up"
        >
          Shared Reading and Discussion
        </Typography>

        <Typography
          sx={{
            whiteSpace: "pre-line",
            fontSize: { xs: 13.5, sm: 15 },
            color: "rgba(0,0,0,.65)",
            mb: 3,
            fontFamily: "'STUNNING-Bd','KyoboHand',sans-serif", 
          }}
          data-aos="fade-up"
        >
          {`BooKids에서 즐겁게 읽고 나누는 독후활동.\n취향이 맞는 사람과 대화로 넓어지는 두 번째 독서.`}
        </Typography>

        <Button
          variant="outlined"
          size="large"
          sx={{
            px: 2.75,
            py: 1.1,
            borderRadius: 999,
            borderColor: green,
            color: green,
            fontWeight: 700,
            fontFamily: "'STUNNING-Bd','KyoboHand',sans-serif", 
            "&:hover": {
              borderColor: "#14520fff",
              bgcolor: "rgba(232,92,47,.06)",
            },
          }}
          data-aos="fade-up"
          onClick={() => navigate("/board")}
        >
          커뮤니티 가기
        </Button>
      </Container>
    </Box>
  );
}
