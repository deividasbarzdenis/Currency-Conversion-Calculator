import React, {useCallback, useMemo, useState} from "react";
import { useDispatch, useSelector} from "react-redux";
import {amountChanged} from "../store/actions/RateActions";
import {debounce} from "lodash";

export function AmountField() {
    const dispatch = useDispatch();
    const amount = useSelector();
    const changeAmount = useCallback(
        (newAmount) => dispatch(amountChanged(newAmount)),
        []
    ); //useCallback hooks wait while user stop typing and then updates change amount,
    // useCallback hooks help for child component to not render unnecessary.

    const [displayAmount, setDisplayAmount] = useState(amount);
    const onAmountChanged = useMemo(() => debounce(changeAmount, 500), [changeAmount]);

    const onChange = (e) => {
        let newAmount = e.target.value;
        setDisplayAmount(newAmount);
        onAmountChanged(newAmount);
    }
    return (
        <form className="ExchangeRate-form">
            <input type="text" value={displayAmount} onChange={onChange}/>
        </form>
    );
}

// redux stuff
