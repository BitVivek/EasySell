import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import CartItems from "./CartItems";
import { StripeProvider } from "react-stripe-elements";
import Checkout from "./Checkout";

const stripeApiKey = import.meta.env.VITE_STRIPE_TEST_API_KEY;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
}));

export default function Cart() {
  const classes = useStyles();
  const [checkout, setCheckout] = useState(false);

  const showCheckout = (val) => {
    setCheckout(val);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={8}>
        <Grid item xs={6} sm={6}>
          <CartItems checkout={checkout} setCheckout={showCheckout} />
        </Grid>
        {checkout && (
          <Grid item xs={6} sm={6}>
            <StripeProvider apiKey={stripeApiKey}>
              <Checkout />
            </StripeProvider>
          </Grid>
        )}
      </Grid>
    </div>
  );
}
