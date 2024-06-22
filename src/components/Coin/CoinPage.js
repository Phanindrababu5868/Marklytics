import { Box, LinearProgress, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useCallback } from "react";
import parser from "html-react-parser";

import { SingleCoin } from "../../config/api";
import { CryptoState } from "../../CryptoContex";
import { numberWithCommas } from "../../util/numberWithCommas";

const CoinPage = () => {
  const { currency, symbol, coinId, coin, setCoin, setLoading } = CryptoState();

  const fetchCoin = useCallback(async () => {
    setLoading(true);
    const { data } = await axios.get(SingleCoin(coinId));
    setCoin(data);
    setLoading(false);
  }, [coinId, setCoin, setLoading]);

  useEffect(() => {
    fetchCoin();
  }, [fetchCoin]);

  const classes = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "40px",
      justifyContent: "center",
      marginTop: "180px",
    },
    sidebar: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 3,
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 2,
      fontFamily: "Montserrat",
    },
    description: {
      width: { xs: "100%", md: "60%" },
      fontFamily: "Montserrat",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "center",
    },
    marketData: {
      alignSelf: "center",
      padding: 0,
      paddingTop: 1,
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: { md: "space-around" },
      alignItems: "center",
      gap: 2,
      textAlign: "center",
    },
  };

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <Box sx={classes.container}>
      <Box sx={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {parser(coin?.description.en.split(". ")[0])}.
        </Typography>
        <Box sx={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </Box>
      </Box>
    </Box>
  );
};

export default CoinPage;
