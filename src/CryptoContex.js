import React, { createContext, useContext, useState, useEffect } from "react";

const Crypto = createContext();

const CryptoContex = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [coinId, setCoinId] = useState("bitcoin");
  const [loading, setLoading] = useState(false);
  const [coin, setCoin] = useState();

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");

    // fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  return (
    <Crypto.Provider
      value={{
        currency,
        setCurrency,
        symbol,
        coinId,
        setCoinId,
        loading,
        setLoading,
        coin,
        setCoin,
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContex;

export const CryptoState = () => {
  return useContext(Crypto);
};
