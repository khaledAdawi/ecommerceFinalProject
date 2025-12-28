import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();

  return (
    <Box>
      
      <Box
        sx={{
          height: 320,
          backgroundImage:"",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{ color: "#fff", letterSpacing: 4 }}
        >
          CART
        </Typography>
      </Box>

      <Container maxWidth="md">
        <Box
          sx={{
            mt: 8,
            p: 5,
            border: "1px solid #eee",
            textAlign: "center",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ mb: 2, fontWeight: 500 }}
          >
            YOUR CART IS CURRENTLY EMPTY.
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: "text.secondary", mb: 4 }}
          >
            Why not return to our amazing shop and start filling it with products?
            Just click on the button below to instantly get back to the shop page.
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#000",
              color: "#fff",
              px: 4,
              py: 1.5,
              "&:hover": {
                backgroundColor: "#222",
              },
            }}
            onClick={() => navigate("/shop")}
          >
            RETURN TO SHOP
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
