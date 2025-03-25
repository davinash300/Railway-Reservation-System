import React from "react";
import { Box, Container, Typography, Grid, Paper, Link } from "@mui/material";
import {
  Phone,
  Email,
  LocationOn,
  Facebook,
  Twitter,
  Instagram,
} from "@mui/icons-material";

const ContactUs = () => {
  return (
    <Box sx={{ minHeight: "100vh", py: 6, backgroundColor: "#f8f9fa" }}>
      <Container>
        <Typography
          variant="h3"
          fontWeight="bold"
          color="primary"
          textAlign="center"
        >
          Contact Us 📞
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          mt={2}
        >
          Get in touch with us for any queries or support related to your
          railway reservations.
        </Typography>

        <Grid container spacing={4} mt={4} justifyContent="center">
          {/* Head Office */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ p: 4, textAlign: "center", boxShadow: 3 }}>
              <LocationOn color="primary" sx={{ fontSize: 50 }} />
              <Typography variant="h6" fontWeight="bold" mt={2}>
                Head Office
              </Typography>
              <Typography variant="body2">
                123 Railway Avenue, Sector 10, New Delhi - 110001, India
              </Typography>
            </Paper>
          </Grid>

          {/* Customer Support */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ p: 4, textAlign: "center", boxShadow: 3 }}>
              <Phone color="primary" sx={{ fontSize: 50 }} />
              <Typography variant="h6" fontWeight="bold" mt={2}>
                Customer Support
              </Typography>
              <Typography variant="body2">
                Toll-Free: 1800-123-4567 <br />
                Landline: +91-11-45678901
              </Typography>
            </Paper>
          </Grid>

          {/* Email Support */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ p: 4, textAlign: "center", boxShadow: 3 }}>
              <Email color="primary" sx={{ fontSize: 50 }} />
              <Typography variant="h6" fontWeight="bold" mt={2}>
                Email Support
              </Typography>
              <Typography variant="body2">
                General: support@trackvision.com <br />
                Booking: booking@trackvision.com
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Working Hours */}
        <Box textAlign="center" mt={6}>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Working Hours 🕒
          </Typography>
          <Typography variant="body1" color="text.secondary" mt={1}>
            Monday - Saturday: 8:00 AM - 10:00 PM
            <br />
            Sunday & Public Holidays: 9:00 AM - 6:00 PM
          </Typography>
        </Box>

        {/* Social Media */}
        <Box textAlign="center" mt={6}>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Follow Us 🌐
          </Typography>
          <Box mt={2} display="flex" justifyContent="center" gap={3}>
            <Link href="https://facebook.com" target="_blank" color="inherit">
              <Facebook sx={{ fontSize: 40, color: "#1877F2" }} />
            </Link>
            <Link href="https://twitter.com" target="_blank" color="inherit">
              <Twitter sx={{ fontSize: 40, color: "#1DA1F2" }} />
            </Link>
            <Link href="https://instagram.com" target="_blank" color="inherit">
              <Instagram sx={{ fontSize: 40, color: "#E1306C" }} />
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactUs;
