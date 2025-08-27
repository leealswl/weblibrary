import React from "react";
import { Box, Container, Grid, Stack, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BookSlider from "../../../components/BookSlider/BookSlider";
import { responsive } from "../../../constants/responsive";

const GREEN = "#589857";

const dummyBooks = [
  { itemId: 1, title: "토끼와 거북이", author: "제리 핑크니 (지은이),김예환 (옮긴이)", cover: "https://image.aladin.co.kr/product/5564/61/cover500/8932917051_1.jpg", description: "문학동네어린이문학상 심사위원 만장일치" },
  { itemId: 2, title: "내 고양이 포", author: "생텍쥐페리",  cover: "https://image.aladin.co.kr/product/36931/31/cover200/k832030216_1.jpg", description: "별과 사막, 순수함에 대한 이야기" },
  { itemId: 3, title: "타이거", author: "J.K. 롤링", cover: "https://image.aladin.co.kr/product/36885/25/cover200/k272030606_1.jpg", description: "마법 세계로 떠나는 첫 모험" },
  { itemId: 4, title: "느림보 거북이의 단단한 결심", author: "로버트 C. 마틴", cover: "https://image.aladin.co.kr/product/36639/67/cover200/k092030989_2.jpg", description: "깨끗한 코드를 위한 지침서" },
  { itemId: 5, title: "푸른사자 와니니", author: "어니스트 헤밍웨이", cover: "https://image.aladin.co.kr/product/36859/73/cover200/8936443445_2.jpg", description: "노인의 끈기와 존엄" },
  { itemId: 6, title: "비로와 호랑할배", author: "도스토예프스키", cover: "https://image.aladin.co.kr/product/36812/93/cover200/8932044201_1.jpg", description: "죄의식과 구원의 서사" },
  { itemId: 7, title: "건전지 할머니", author: "도스토예프스키", cover: "https://image.aladin.co.kr/product/36297/91/cover200/8936429450_1.jpg", description: "죄의식과 구원의 서사" },
  { itemId: 8, title: "반반이", author: "도스토예프스키", cover: "https://image.aladin.co.kr/product/36724/77/cover200/8964965353_1.jpg", description: "죄의식과 구원의 서사" },
  { itemId: 9, title: "사랑해사랑해사랑해", author: "도스토예프스키", cover: "https://image.aladin.co.kr/product/85/93/cover200/8990794528_2.jpg", description: "죄의식과 구원의 서사" },
];

const toLargeCover = (url) =>
  typeof url === "string" ? url.replace(/cover\d+/, "cover500") : url; 

export default function RecoBooks() {
  const navigate = useNavigate();
  const data = dummyBooks;

  const feature = data[0];
  const featureTitle  = feature.title;
  const featureAuthor = feature.author;
  const featureDesc = (feature.description && feature.description.slice(0, 120) + "…")
  const featureImg = toLargeCover(feature.cover);

  return (
    <Box sx={{ bgcolor: GREEN, color: "#fff", py: { xs: 6, md: 8 },fontFamily: "KyoboHand, sans-serif",  "& .MuiTypography-root, & .MuiButton-root": {
      fontFamily: "inherit !important",
    },}} className="reco-sec" >
      <Container maxWidth="lg">
        {/* 섹션 헤더 */}
        <Stack alignItems="center" spacing={1} sx={{ mb: { xs: 4, md: 6 } }}>
          <Typography sx={{ opacity: 0.9, fontSize: 13 }} data-aos="fade-up" data-aos-offset="120">
            금주의 추천 도서를 확인해 보세요.
          </Typography>
          <Typography sx={{ fontWeight: 900, fontSize: { xs: 26, sm: 30, md: 36 } }} data-aos="fade-up" data-aos-offset="120">
            금주의 추천 책장
          </Typography>
        </Stack>

        {/* 왼표지,오른 책내용 */}
        <Grid container spacing={4} alignItems="center" justifyContent="space-around" sx={{ mb: { xs: 4, md: 6 } }} data-aos="fade-up" data-aos-offset="120">
          <Grid item xs={12} md={5}>
            <Box
              component="img"
              src={featureImg}
              alt={`${featureTitle} 표지`}
              loading="lazy"
              sx={{
                display: "block",
                width: { xs: 200, sm: 240, md: 260 },
                height: "auto",
                mx: { xs: "auto", md: 0 },
                borderRadius: 2,
                boxShadow: "0 18px 40px rgba(0,0,0,.45)",
              }}
            />
          </Grid>

          <Grid item xs={12} md={7}>
    <Stack spacing={2}>
      <Typography
        sx={{
          fontSize: { xs: 22, sm: 26, md: 30 },
          fontWeight: 800,
          color: "#fff",
          letterSpacing: "-0.5px",
        }}
      >
        {featureTitle}
      </Typography>

      <Typography
        sx={{
          fontSize: { xs: 16, sm: 18 },
          fontWeight: 600,
          color: "rgba(255,255,255,.9)",
        }}
      >
        {featureAuthor}
      </Typography>

      <Typography
        sx={{
          fontSize: { xs: 14, sm: 15.5, md: 16 },
          lineHeight: 1.8,
          color: "rgba(255,255,255,.85)",
          whiteSpace: "pre-line",
        }}
      >
        {featureTitle}은(는) 단순한 고전을 넘어, 지금까지도 많은 독자들에게 사랑받는 작품입니다.{"\n"}
        {featureDesc}{"\n"}
        이 책을 통해 삶의 의미를 되짚고, 함께 읽으며 토론하기에 더없이 좋은 선택이 될 것입니다.
      </Typography>

      <Box>
        <Button
          variant="outlined"
          onClick={() => navigate("/recommand")}
          sx={{
            mt: 2,
            px: 3.5,
            py: 1.3,
            borderRadius: 999,
            borderColor: "#fff",
            color: "#fff",
            fontWeight: 700,
            fontSize: 15,
            "&:hover": { bgcolor: "rgba(255,255,255,.14)", borderColor: "#fff" },
          }}
        >
          추천 도서 보러 가기
        </Button>
      </Box>
    </Stack>
  </Grid>
        </Grid>
      </Container>
      <Box data-aos="fade-up" data-aos-offset="120">
        <BookSlider books={data} responsive={responsive} enableAutoPlay autoPlaySpeed={2000} />
      </Box>
    </Box>
  );
}