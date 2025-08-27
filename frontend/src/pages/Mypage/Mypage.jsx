import * as React from "react";
import {
  Avatar, Box, Button, Chip, Container, Divider, Grid, IconButton, Stack,
  Tab, Tabs, TextField, Typography, Card, CardContent, CardMedia, Snackbar
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const GREEN = "#589857";
const BEIGE = "#faf6ef";

export default function MyPage() {
  // ------- 더미 유저/데이터 -------
  const [user, setUser] = React.useState({
    id: 1,
    nickname: "test님",
    email: "test@example.com",
    bio: "책을 좋아하는 프론트엔드 개발자",
    interests: ["동화", "그림책", "추리"],
    avatarUrl: "https://i.pravatar.cc/150?img=32",
  });

  const [myPosts] = React.useState([
    { id: 101, title: "요술 방망이 감상문", date: "2025-08-20", likes: 12 },
    { id: 102, title: "토끼 간 이야기에서 배운 점", date: "2025-08-22", likes: 7 },
  ]);

  const [savedBooks] = React.useState([
    {
      id: 201,
      title: "콩쥐에게 생긴 비밀 신발",
      cover: "https://image.aladin.co.kr/product/36898/35/cover500/8965796148_1.jpg",
      author: "어떤 작가",
    },
    {
      id: 202,
      title: "호랑이를 피해 하늘로",
      cover: "https://image.aladin.co.kr/product/37020/84/cover500/k642030523_1.jpg",
      author: "또 다른 작가",
    },
  ]);

  // ------- UI 상태 -------
  const [tab, setTab] = React.useState(0);
  const [editMode, setEditMode] = React.useState(false);
  const [toast, setToast] = React.useState({ open: false, msg: "" });

  // 편집용 임시값
  const [form, setForm] = React.useState({
    nickname: user.nickname,
    bio: user.bio,
  });

  const toggleEdit = () => {
    if (editMode) {
      // 저장 (지금은 더미로 상태만 적용)
      setUser((u) => ({ ...u, nickname: form.nickname, bio: form.bio }));
      setToast({ open: true, msg: "프로필이 저장되었습니다 (더미)" });
    }
    setEditMode((v) => !v);
  };

  return (
    <Box sx={{ bgcolor: BEIGE, minHeight: "100vh", pb: 10 }}>
      <Container maxWidth="md">
        {/* 헤더 */}
        <Stack alignItems="center" spacing={2} sx={{ pt: 6, pb: 3 }}>
          <Avatar src={user.avatarUrl} sx={{ width: 96, height: 96, boxShadow: 2 }} />
          {editMode ? (
            <TextField
              label="닉네임"
              size="small"
              value={form.nickname}
              onChange={(e) => setForm((f) => ({ ...f, nickname: e.target.value }))}
              inputProps={{ style: { fontFamily: "KyoboHand" } }}
            />
          ) : (
            <Typography variant="h5" sx={{ fontFamily: "'KyoboHand','sans-serif'", fontWeight: 700 }}>
              {user.nickname}
            </Typography>
          )}

          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>

          {editMode ? (
            <TextField
              multiline
              minRows={2}
              label="한 줄 소개"
              value={form.bio}
              onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
              fullWidth
            />
          ) : (
            <Typography sx={{ color: "text.secondary" }}>{user.bio}</Typography>
          )}

          <Stack direction="row" spacing={1}>
            {user.interests.map((tag) => (
              <Chip key={tag} label={tag} size="small" sx={{ bgcolor: "#fff", border: "1px solid #eee" }} />
            ))}
          </Stack>

          <IconButton
            color="primary"
            onClick={toggleEdit}
            sx={{
              bgcolor: GREEN, color: "#fff", "&:hover": { bgcolor: "#4c8550" },
              borderRadius: 2, px: 2
            }}
          >
            {editMode ? <SaveIcon /> : <EditIcon />}
            <Typography sx={{ ml: 1, fontWeight: 700 }}> {editMode ? "저장" : "프로필 편집"}</Typography>
          </IconButton>
        </Stack>

        <Divider />

        {/* 탭 */}
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          centered
          sx={{
            mt: 2,
            "& .MuiTab-root": { fontFamily: "'KyoboHand','sans-serif'", fontSize: 18 },
            "& .MuiTabs-indicator": { backgroundColor: GREEN },
          }}
        >
          <Tab label="내 글" />
          <Tab label="찜한 책" />
          <Tab label="설정" />
        </Tabs>

        {/* 탭 패널 */}
        <Box sx={{ mt: 3 }}>
          {tab === 0 && (
            <Grid container spacing={2}>
              {myPosts.map((p) => (
                <Grid item xs={12} sm={6} key={p.id}>
                  <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{ fontFamily: "'KyoboHand','sans-serif'", fontWeight: 700, mb: .5 }}
                      >
                        {p.title}
                      </Typography>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" color="text.secondary">{p.date}</Typography>
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                          <FavoriteIcon fontSize="small" color="error" />
                          <Typography variant="body2">{p.likes}</Typography>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              {myPosts.length === 0 && (
                <EmptyState text="아직 작성한 글이 없어요" />
              )}
            </Grid>
          )}

          {tab === 1 && (
            <Grid container spacing={2}>
              {savedBooks.map((b) => (
                <Grid item xs={12} sm={6} key={b.id}>
                  <Card sx={{ display: "flex", borderRadius: 3, boxShadow: 3 }}>
                    <CardMedia
                      component="img"
                      image={b.cover}
                      alt={b.title}
                      sx={{ width: 120, objectFit: "cover" }}
                    />
                    <CardContent sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {b.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {b.author}
                      </Typography>
                      <Button
                        size="small"
                        startIcon={<BookmarkIcon />}
                        sx={{ bgcolor: GREEN, color: "#fff", "&:hover": { bgcolor: "#4c8550" } }}
                      >
                        읽으러 가기
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              {savedBooks.length === 0 && (
                <EmptyState text="찜한 책이 없어요" />
              )}
            </Grid>
          )}

          {tab === 2 && (
            <Stack spacing={2} sx={{ maxWidth: 480, mx: "auto" }}>
              <TextField label="닉네임" value={user.nickname} size="small" disabled />
              <TextField label="이메일" value={user.email} size="small" disabled />
              <Button
                variant="outlined"
                color="error"
                sx={{ borderRadius: 2 }}
                onClick={() => setToast({ open: true, msg: "로그아웃 (더미)" })}
              >
                로그아웃
              </Button>
            </Stack>
          )}
        </Box>
      </Container>

      <Snackbar
        open={toast.open}
        autoHideDuration={2000}
        onClose={() => setToast({ open: false, msg: "" })}
        message={toast.msg}
      />
    </Box>
  );
}

function EmptyState({ text }) {
  return (
    <Stack alignItems="center" spacing={1} sx={{ py: 6, opacity: 0.7 }}>
      <Typography>{text}</Typography>
      <Typography variant="body2" color="text.secondary">무언가 추가해볼까요?</Typography>
    </Stack>
  );
}
