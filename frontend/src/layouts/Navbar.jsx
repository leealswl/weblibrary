import * as React from "react";
import { AppBar, Container, Toolbar, Typography, Stack, Link as MLink,IconButton,Drawer,Box,Divider, } from "@mui/material";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useAuthStore } from "../store/useAuthStore";
import LogoutButton from "../components/LogoutButton";

const BEIGE = "#faf6ef";      
const green = "#589857";     
const green_DIM = "#569955ff";

const linkSx = {
    px: 2,
    py: 1.25,
    fontSize: 15,
    textDecoration: "none",
    color: green,
    borderRadius: 0,                
    transition: "all .15s ease",
    "&:hover": {
        textDecoration: "underline",  
        textUnderlineOffset: "4px",   
        textDecorationThickness: "3px", // 밑줄
    },
};

const activeSx = {
    textDecoration: "underline",
    textUnderlineOffset: "5px",
    textDecorationThickness: "3px",
    fontWeight: 600,
};
const navItems = [
    { to: "/board", label: "게시판" },
    { to: "/recommand", label: "추천 책장" },
    { to: "/recommand/edit", label: "책장 소식" },
];


export default function NavBar() {
    const [open, setOpen] = React.useState(false);
    const user = useAuthStore((s) => s.user);

    return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: BEIGE, color: green }}>
        <Container maxWidth="lg" disableGutters>
        <Toolbar disableGutters sx={{ px:0, minHeight: 'auto' }}>
          {/* 좌: 로고/브랜드 */}
            <Typography
            component={NavLink}
            to="/"
            sx={{
                mr: 4,
                fontWeight: 800,
                fontSize: 28,
                letterSpacing: "-0.02em",
                color: green,
                textDecoration: "none",
                "&:hover": { color: green_DIM },
            }}
            >
            BooKids
            </Typography>

            <Stack direction="row" sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {navItems.map((item) => (
                <MLink
                key={`${item.to}-${item.label}`}
                component={NavLink}
                to={item.to}
                sx={({ isActive }) => ({
                    ...linkSx,
                    ...(isActive ? activeSx : null),
                })}
                >
                {item.label}
                </MLink>
            ))}
            </Stack>

            <Stack direction="row" spacing={0.5} sx={{ display: { xs: "none", md: "flex" } }}>
                {user ? (
                    <>
                    <Typography sx={{ px: 2, py: 1.25, color: green, fontSize: 15, fontFamily:"'KyoboHand','STUNNING-Bd',sans-serif" }}>
                        {user.username} 님
                    </Typography>
                    {/* <MLink component={NavLink} to="/mypage" sx={linkSx}>
                        마이페이지
                    </MLink> */}
                    <LogoutButton variant="outlined" after="/" />
                    </>
                ) : (
                    <>
                    <MLink component={NavLink} to="/login" sx={linkSx}>
                        로그인
                    </MLink>
                    <MLink component={NavLink} to="/login/signup" sx={linkSx}>
                        회원가입
                    </MLink>
                    </>
                )}
            </Stack>

            <IconButton
            onClick={() => setOpen(true)}
            sx={{ ml: "auto", display: { xs: "inline-flex", md: "none" }, color: green }}
            aria-label="메뉴 열기"
            >
            <MenuIcon />
            </IconButton>
            <Drawer
                anchor="right"
                open={open}
                onClose={() => setOpen(false)}
                sx={{ display: { xs: "block", md: "none" } }}
                PaperProps={{ sx: { width: 280, bgcolor: BEIGE } }}
                ModalProps={{ keepMounted: true }}  
            >
            <Box sx={{ display: "flex", alignItems: "center", px: 2, py: 1 }}>
                <Typography sx={{ fontWeight: 800, fontSize: 22, color: green, flex: 1 }}>
                logogogo
                </Typography>
                <IconButton onClick={() => setOpen(false)} aria-label="메뉴 닫기" sx={{ color: green }}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider sx={{ opacity: 0.2 }} />

        <Stack sx={{ p: 1 }}>
            {navItems.map((item) => (
            <MLink
                key={`${item.to}-${item.label}`}
                component={NavLink}
                to={item.to}
                onClick={() => setOpen(false)}
                sx={({ isActive }) => ({
                ...linkSx,
                display: "block",
                px: 2,
                py: 1.25,
                fontSize: 16,
                ...(isActive ? activeSx : null),
                })}
            >
                {item.label}
            </MLink>
            ))}
        </Stack>

        <Divider sx={{ opacity: 0.2, my: 0.5 }} />

        <Stack sx={{ p: 1 }}>
            {user ? (
                <>
                {/* <Typography sx={{ px: 2, py: 1.25, color: green, fontSize: 16 }}>
                    {user.username} 님
                </Typography> */}
                <MLink
                    component={NavLink}
                    to="/mypage"
                    onClick={() => setOpen(false)}
                    sx={{display: "block", px: 2, py: 1.25, fontSize: 16,
                        color: green, textDecoration: "none",
                        "&:hover": { textDecoration: "underline", textUnderlineOffset: "4px", textDecorationThickness: "3px" },
                    }}
                >
                    {user.username} 님
                </MLink>
                {/* 모바일에선 버튼 하나로 처리 */}
                <Box sx={{ px: 2, py: 1 }}>
                    <LogoutButton variant="outlined" after="/" />
                </Box>
                </>
            ) : (
                <>
                <MLink
                    component={NavLink}
                    to="/login"
                    onClick={() => setOpen(false)}
                    sx={{ ...linkSx, display: "block", px: 2, py: 1.25, fontSize: 16 }}
                >
                    로그인
                </MLink>
                <MLink
                    component={NavLink}
                    to="/login/signup"
                    onClick={() => setOpen(false)}
                    sx={{ ...linkSx, display: "block", px: 2, py: 1.25, fontSize: 16 }}
                >
                    회원가입
                </MLink>
                </>
            )}
        </Stack>
        </Drawer>

        </Toolbar>
        </Container>
    </AppBar>
    );
}
