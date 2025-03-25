import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { Train, Search, Security, ThumbUp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: "100vh", textAlign: "center", paddingY: 6 }}>
      <Container>
        {/* Hero Section */}
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" fontWeight="bold" color="primary">
              Welcome to Railway Reservation System 🚆
            </Typography>
            <Typography variant="body1" color="text.secondary" mt={2}>
              Book your train tickets easily and travel hassle-free with our
              seamless booking experience.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              sx={{ mt: 3 }}
              onClick={() => navigate("/search")}
            >
              Book Your Train Now
            </Button>
          </Grid>
          <Grid item xs={12} md={6} textAlign="center">
            <Train sx={{ fontSize: 150, color: "primary.main" }} />
          </Grid>
        </Grid>

        {/* Features Section */}
        <Box sx={{ my: 6 }}>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Why Choose Us?
          </Typography>
          <Grid container spacing={3} justifyContent="center" mt={3}>
            {[
              {
                icon: <Search fontSize="large" />,
                title: "Easy Train Search",
                desc: "Find and book trains in just a few clicks.",
              },
              {
                icon: <Security fontSize="large" />,
                title: "Secure Transactions",
                desc: "Your payments and personal data are safe with us.",
              },
              {
                icon: <ThumbUp fontSize="large" />,
                title: "Trusted by Thousands",
                desc: "Over 10,000+ happy travelers book with us.",
              },
            ].map((feature, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Card sx={{ textAlign: "center", padding: 2, boxShadow: 3 }}>
                  <CardContent>
                    <Box sx={{ fontSize: 40, color: "#ff9800" }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" fontWeight="bold">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Call to Action */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" fontWeight="bold">
            Ready to start your journey?
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 2 }}
            onClick={() => navigate("/search")}
          >
            Find Your Train
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
