import React, {useEffect} from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { ratesUpdated } from "../store/actions/RateActions";
import {
  getCurrencyCode,
  getSupportedCurrencies,
} from "../store/reducers/RateReducer";
import { RateTableContainer } from "./RateTable";
import { CurrencyCodePickerContainer } from "./CurrencyCodePicker";
import { getExchangeRates } from "../api";
import { AmountFieldContainer } from "./AmountField";

export function ExchangeRate() {
    const dispatch = useDispatch(); //this function give us that we can dispatch redux actions
  const supportedCurrencies = useSelector(getSupportedCurrencies);
  const  currencyCode = useSelector(getCurrencyCode);
  const updateRates = (rates) => dispatch(ratesUpdated(rates));

  useEffect(() => {
    getLatestExchangeRates()
  }, [currencyCode]);

  const getLatestExchangeRates = () => {
    getExchangeRates(currencyCode, supportedCurrencies).then((rates) => {
        updateRates(rates);
    });
  }
    return (
      <>
        <section>
          <h1 className="ExchangeRate-header">
            Exchange Rates <CurrencyCodePickerContainer />
          </h1>
        </section>
        <section>
          <AmountFieldContainer />
        </section>
        <section>
          <RateTableContainer />
        </section>
      </>
    );
}

// props types

// redux stuff
export const ExchangeRateContainer = connect(
  null,
  null,
)(ExchangeRate);
