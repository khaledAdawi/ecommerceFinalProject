import { Box, Button, Container, IconButton, Typography, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import CircularProgress from "@mui/material/CircularProgress";
import useRemoveFromCart from "../../hooks/useRemoveFromCart";
import useUpdateCartItem from "../../hooks/useUpdateCartItem";
import Swal from "sweetalert2";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";


export default function CartItem() {
  const navigate = useNavigate();
  const { data, isError, isLoading } = useCart();
  const { mutate: removeItem, isPending } = useRemoveFromCart();
  const { mutate: updateItem, isPending: updatePending } = useUpdateCartItem();

  if (isLoading) return <CircularProgress sx={{ m: 5 }} />;
  if (isError) return <Typography>Error loading cart</Typography>;

  const handleUpdate = (productId, action) => {
    const item = data.items.find((i) => i.productId === productId);
    if (!item) return;

    if (action === "-") {
      if (item.count === 1) {
        Swal.fire({
          title: "Remove item?",
          text: "This item quantity is 1. Do you want to remove it from the cart?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, remove it",
          cancelButtonText: "No, keep it",
        }).then((result) => {
          if (result.isConfirmed) removeItem(productId);
        });
        return;
      }

      updateItem({ productId, count: item.count - 1 });
    }

    if (action === "+") {
      updateItem({ productId, count: item.count + 1 });
    }
  };

  if (!data.items.length) {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 10, textAlign: "center" }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            YOUR CART IS CURRENTLY EMPTY.
          </Typography>

          <Typography sx={{ mb: 4, color: "text.secondary" }}>
            Why not return to our shop and start shopping?
          </Typography>

          <Button
            variant="contained"
            sx={{ m: 5, bgcolor: "#000", "&:hover": { bgcolor: "#222" } }}
            onClick={() => navigate("/shop")}
          >
            RETURN TO SHOP
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Box sx={{ display: "flex", gap: 6, mt: 8 }}>


        <Box sx={{ flex: 2 }}>

          <Typography variant="h6" sx={{ mb: 3, letterSpacing: 1 }}>
            SHOPPING CART
          </Typography>

          {data.items.map((item) => (
            <Box
              key={item.productId}
              sx={{
                borderBottom: "1px solid #eee",
                pb: 3,
                mb: 3,
              }}
            >

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography sx={{ fontWeight: 500 }}>
                  {item.productName}
                </Typography>

                <Typography sx={{ fontWeight: 500 }}>
                  ${item.totalPrice}
                </Typography>
              </Box>


              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  ${item.price}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #ddd",
                    borderRadius: 1,
                    overflow: "hidden",
                  }}
                >
                  <IconButton
                    size="small"
                    disabled={updatePending}
                    onClick={() => handleUpdate(item.productId, "-")}
                    sx={{ borderRadius: 0 }}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>

                  <Box
                    sx={{
                      px: 2,
                      minWidth: 40,
                      textAlign: "center",
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                  >
                    {item.count}
                  </Box>

                  <IconButton
                    size="small"
                    disabled={updatePending}
                    onClick={() => handleUpdate(item.productId, "+")}
                    sx={{ borderRadius: 0 }}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>

              </Box>


              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ fontSize: 12 }}
                >
                  UPDATE
                </Button>

                <Button variant="outlined" size="small" color="error" sx={{ fontSize: 12 }}
                  onClick={() => removeItem(item.productId)}
                  disabled={isPending}
                >
                  REMOVE
                </Button>
              </Box>
            </Box>
          ))}

        </Box>


        <Box
          sx={{
            flex: 1,
            border: "1px solid #eee",
            p: 4,
            height: "fit-content",
          }}
        >
          <Typography variant="h6" sx={{ mb: 3 }}>
            CART TOTALS
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography>Subtotal</Typography>
            <Typography>${data.cartTotal}</Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography>Shipping</Typography>
            <Typography variant="body2" color="text.secondary">
              Free shipping
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: 600,
              mt: 3,
              mb: 3,
            }}
          >
            <Typography>TOTAL</Typography>
            <Typography>${data.cartTotal}</Typography>
          </Box>

          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#000",
              py: 1.5,
              "&:hover": { backgroundColor: "#222" },
            }}
          >
            PROCEED TO CHECKOUT
          </Button>
        </Box>

      </Box>

    </Container>
  );
}
