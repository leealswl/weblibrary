import React from "react";
import { Box, Container, Typography } from "@mui/material";

export default function PageBanner({ title, subtitle, bgImage }) {
    return (
        <Box
        sx={{
            position: "relative",
            bgcolor: "#faf6ef",
            backgroundImage: bgImage ? `url(${bgImage})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "#fff",
        }}
        >
        <Container maxWidth="lg" 
                    sx={{ py: { xs: 6, md: 10 },
                    textAlign: "right",
                        }}>
            {subtitle && (
            <Typography variant="body1" sx={{ mb: 1 }}>
                {subtitle}
            </Typography>
            )}
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
            {title}
            </Typography>
        </Container>
        </Box>
    );
}
