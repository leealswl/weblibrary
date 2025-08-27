import React, { useState, useMemo } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Stack,
  IconButton,
  InputAdornment,
  Link,
  CircularProgress
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import logo from "../../assets/booky.png";
import useSignUp from "../../hooks/useSignUp";

export default function SignUp() {
  const navigate = useNavigate();
  const { mutate: signUp, isPending } = useSignUp({
    onSuccess: () => {
      alert("회원가입 성공! 로그인 해주세요.");
      navigate("/login", { replace: true });
    },
    onError: (msg) => alert(msg || "회원가입 실패"),
  });
  const [form, setForm] = useState({
    username: "",
    email: "",
    pw: "",
    pw2: "",
    showPw: false,
    showPw2: false,
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((v) => ({ ...v, [name]: value }));
  };

  const toggleShow = (key) => setForm((v) => ({ ...v, [key]: !v[key] }));

  const pwMismatch = useMemo(
    () => form.pw.length > 0 && form.pw2.length > 0 && form.pw !== form.pw2,
    [form.pw, form.pw2]
  );

  const canSubmit =
    form.username.trim() &&
    form.email.trim() &&
    form.pw.trim() &&
    form.pw2.trim() &&
    !pwMismatch;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit || isPending) return;
    signUp({ username: form.username, password: form.pw, email: form.email });
    };

    const inputProps = {
    disableUnderline: true,
    sx: { bgcolor: "#f1f3f5", borderRadius: 1, "&:hover": { bgcolor: "#eef0f2" }, minHeight: 48 },
  };

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,                 // 화면 전체 덮기
        bgcolor: "#f1f3f5",
        display: "grid",
        placeItems: "center",     // 수평/수직 중앙
        p: 2,
        overflow: "hidden",
      }}
    >
      <Paper
        elevation={2}
        sx={{
          width: "100%",
          maxWidth: 400,
          p: { xs: 3, sm: 4 },
          borderRadius: 2,
        }}
      >
        {/* 로고 */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Link component={RouterLink} to="/" underline="none">
            <img
              src={logo}
              alt="logo"
              style={{ maxWidth: "200px", height: "auto", cursor: "pointer" }}
            />
          </Link>
        </Box>

        {/* 폼 */}
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={2}>
            <TextField
              name="username"
              value={form.username}
              onChange={onChange}
              placeholder="아이디"
              fullWidth
              variant="filled"
              InputProps={{
                disableUnderline: true,
                sx: {
                  bgcolor: "#f1f3f5",
                  borderRadius: 1,
                  "&:hover": { bgcolor: "#eef0f2" },
                  minHeight: 48,
                },
              }}
            />

            <TextField
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="이메일"
              type="email"
              fullWidth
              variant="filled"
              InputProps={{
                disableUnderline: true,
                sx: {
                  bgcolor: "#f1f3f5",
                  borderRadius: 1,
                  "&:hover": { bgcolor: "#eef0f2" },
                  minHeight: 48,
                },
              }}
            />

            <TextField
              name="pw"
              value={form.pw}
              onChange={onChange}
              placeholder="비밀번호"
              type={form.showPw ? "text" : "password"}
              fullWidth
              variant="filled"
              InputProps={{
                disableUnderline: true,
                sx: {
                  bgcolor: "#f1f3f5",
                  borderRadius: 1,
                  "&:hover": { bgcolor: "#eef0f2" },
                  minHeight: 48,
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="비밀번호 보기"
                      onClick={() => toggleShow("showPw")}
                      edge="end"
                    >
                      {form.showPw ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              name="pw2"
              value={form.pw2}
              onChange={onChange}
              placeholder="비밀번호 재확인"
              type={form.showPw2 ? "text" : "password"}
              fullWidth
              variant="filled"
              error={pwMismatch}
              helperText={pwMismatch ? "비밀번호가 일치하지 않습니다." : " "}
              FormHelperTextProps={{ sx: { mx: 0 } }}
              InputProps={{
                disableUnderline: true,
                sx: {
                  bgcolor: "#f1f3f5",
                  borderRadius: 1,
                  "&:hover": { bgcolor: "#eef0f2" },
                  minHeight: 48,
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="비밀번호 보기"
                      onClick={() => toggleShow("showPw2")}
                      edge="end"
                    >
                      {form.showPw2 ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={!canSubmit}
              sx={{
                mt: 0.5,
                py: 1.2,
                borderRadius: 1,
                bgcolor: "#589857",
                "&:hover": { bgcolor: "#599258ff" },
                textTransform: "none",
                fontWeight: 600,
                color: "#000",
              }}
              fullWidth
            >
              회원가입
            </Button>

            <Box sx={{ textAlign: "center", mt: 1 }}>
              <Link
                component={RouterLink}
                to="/login"
                underline="hover"
                sx={{ color: "#4B3F2F", fontWeight: 500 }}
              >
                이미 계정이 있으신가요? 로그인
              </Link>
            </Box>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
