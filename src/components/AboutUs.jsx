import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import {
  People,
  VerifiedUser,
  Speed,
  Train,
  Star,
  EmojiEvents,
  Timeline,
} from "@mui/icons-material";
// import trainImage from "../assets/train-hero.png"; // Add a relevant train image
// import team1 from "../assets/team1.jpg"; // Add your team images
// import team2 from "../assets/team2.jpg";
// import team3 from "../assets/team3.jpg";

const AboutUs = () => {
  return (
    <Box sx={{ minHeight: "100vh", paddingY: 6 }}>
      <Container>
        {/* Hero Section */}
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" fontWeight="bold" color="primary">
              Get to Know About Us and Relive Our Journey 🚆
            </Typography>
            <Typography variant="body1" color="text.secondary" mt={2}>
              We make train booking **simple, fast, and reliable**. Travel
              worry-free with real-time updates and secure transactions.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} textAlign="center">
            <Train sx={{ fontSize: 150, color: "primary.main" }} />
          </Grid>
        </Grid>

        {/* Statistics Section */}
        <Box sx={{ textAlign: "center", my: 6 }}>
          <Grid container spacing={3} justifyContent="center">
            {[
              {
                title: "1K+",
                subtitle: "Users",
                icon: <People fontSize="large" color="secondary" />,
              },
              {
                title: "4.9",
                subtitle: "Google Rating",
                icon: <Star fontSize="large" color="secondary" />,
              },
              {
                title: "4.8",
                subtitle: "Trustpilot",
                icon: <EmojiEvents fontSize="large" color="secondary" />,
              },
              {
                title: "10K+",
                subtitle: "Bookings",
                icon: <Train fontSize="large" color="secondary" />,
              },
            ].map((item, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Card sx={{ textAlign: "center", padding: 2, boxShadow: 3 }}>
                  <CardContent>
                    <Box sx={{ fontSize: 40 }}>{item.icon}</Box>
                    <Typography variant="h5" fontWeight="bold">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.subtitle}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Core Values Section */}
        <Box sx={{ textAlign: "center", my: 6 }}>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Our Core Values 🌟
          </Typography>
          <Grid container spacing={3} justifyContent="center" mt={2}>
            {[
              {
                icon: <Star />,
                title: "Customer First",
                desc: "We prioritize user satisfaction and experience.",
              },
              {
                icon: <VerifiedUser />,
                title: "Security",
                desc: "Your data and payments are 100% safe.",
              },
              {
                icon: <Speed />,
                title: "Efficiency",
                desc: "Fast and hassle-free booking experience.",
              },
            ].map((value, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Card sx={{ textAlign: "center", padding: 2, boxShadow: 3 }}>
                  <CardContent>
                    <Box sx={{ fontSize: 40, color: "#ff9800" }}>
                      {value.icon}
                    </Box>
                    <Typography variant="h6" fontWeight="bold">
                      {value.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {value.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Journey Timeline */}
        <Box sx={{ textAlign: "center", my: 6 }}>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Our Journey 🚀
          </Typography>
          <Typography variant="body1" color="text.secondary" mt={1}>
            From **2019** to now, we have grown rapidly and made booking easier
            than ever.
          </Typography>
          <img
            src="/assets/timeline.png"
            alt="Journey Timeline"
            style={{ width: "100%", maxWidth: "800px", marginTop: "20px" }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default AboutUs;
