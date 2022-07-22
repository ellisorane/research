import React, { useState } from "react";
import  { useSelector, useDispatch } from 'react-redux';

import { decrement, increment, incrementByAmount } from "../../features/counter/counterSlice";

const Counter = () => {
    const count = useSelector(state => state.counter.value);
    const dispatch = useDispatch();
    const [incrementAmount, setIncrementAmount] = useState(2);

    return(
        <div style={{ minHeight: '100vh', textAlign: 'center', marginTop: '150px'}}>
            <h1>Redux Counter</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '50%', margin: 'auto'}}>
                <button onClick={() => dispatch(decrement())}>-</button>
                <span>{ count }</span>
                <button onClick={() => dispatch(increment())}>+</button>
                <input type='number' value={incrementAmount} onChange={(e) => setIncrementAmount(e.target.value)} />
                <button onClick={() => dispatch(incrementByAmount(incrementAmount))}>← Add by Amount</button>
            </div>

            <form style={{marginTop: '150px'}}>
                <input type={'text'} name='node-post' />
                <input type={'submit'} name='node-submit' />
            </form>
            <h3>Info from form</h3>

        </div>
    );
}

export default Counter;