import React from 'react'

const CartAmountToggle = (amount, setDecrease, setIncrease) => {
    return (
        <div className='cart-button'>
            <div className="amount-toggle">
                <button onClick={() => setDecrease}></button>
                <div className='amount-style'>{amount}</div>
                <button onClick={() => setIncrease}></button>
            </div>
        </div>
    )
}

export default CartAmountToggle
