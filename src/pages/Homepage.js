import React from "react";
import Banner from "../components/Banner/Banner";
import Header from "../components/Header";
import CoinPage from "../components/Coin/CoinPage";
import { CryptoState } from "../CryptoContex";
import { Box, CircularProgress } from "@mui/material";

const Homepage = () => {
  const { loading } = CryptoState();
  return (
    <div>
      <Header />
      <Banner />
      {loading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: { md: "row", xs: "column" },
            alignItems: "center",
            margin: "40px",
            justifyContent: "center",
            marginTop: "180px",
          }}
        >
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        </Box>
      ) : (
        <CoinPage />
      )}
    </div>
  );
};

export default Homepage;
