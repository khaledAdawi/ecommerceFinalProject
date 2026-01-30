import { Box, Typography, Grid, TextField, Button } from "@mui/material";

export default function Contact() {
  return (
    <>
      
      <Box sx={{ height: 450 }}>
        <iframe
          title="map"
          src="https://www.google.com/maps?q=Paris&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
        />
      </Box>

      
      <Box sx={{ py: 10, px: "10%" }}>
        <Grid container spacing={6}>
          {[
            { city: "PARIS", address: "86 rue de Raymond Poincaré" },
            { city: "MADRID", address: "Plaza de la Fuensanta 13" },
            { city: "BERLIN", address: "Friedrichstrasse 18" },
          ].map(store => (
            <Grid item xs={12} md={4} key={store.city}>
              <Typography variant="h6">{store.city} STORE</Typography>
              <Typography color="text.secondary">{store.address}</Typography>
              <Typography color="text.secondary">
                Monday to Friday: 9am to 8pm
              </Typography>
              <Typography color="text.secondary">
                kashop@email.com
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>

      
      <Box sx={{ textAlign: "center", py: 10 }}>
        <Typography variant="overline">
          SUBSCRIBE TO NEWSLETTER
        </Typography>

        <Typography color="text.secondary" sx={{ my: 3 }}>
          Your brand’s power lies in dominance. It is better to have 50% of one
          market, instead of 10% of five markets.
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <TextField placeholder="Email Address" size="small" />
          <Button variant="contained" color="inherit">
            SUBSCRIBE
          </Button>
        </Box>
      </Box>
    </>
  );
}
