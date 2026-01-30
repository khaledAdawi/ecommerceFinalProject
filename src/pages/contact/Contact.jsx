import { Box, Typography, Grid, TextField, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
export default function Contact() {
  const { t} = useTranslation();
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
              <Typography variant="h6">{t(store.city)} {t("STORE")}</Typography>
              <Typography color="text.secondary">{store.address}</Typography>
              <Typography color="text.secondary">
                {t("Monday to Friday")}
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
          {t("SUBSCRIBE TO NEWSLETTER")}
        </Typography>

        <Typography color="text.secondary" sx={{ my: 3 }}>
          {t("Your brand’s power lies in dominance. It is better to have 50% of one market, instead of 10% of five markets.")}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <TextField placeholder={t("Email Address")} size="small" />
          <Button variant="contained" color="inherit">
            {t("SUBSCRIBE")}
          </Button>
        </Box>
      </Box>
    </>
  );
}
