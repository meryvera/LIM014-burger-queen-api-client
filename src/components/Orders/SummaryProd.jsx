import React from 'react';

export const SummaryProd = ({/* item, */ products, handleQty, handleRemove}) => {
  console.log(products)
    return (
      <>
        { products.map((item) => (
          <section className="prodQty" >
            <div className="prod">
              <p>{item.name}</p>
              <div>
                <button onClick={(e) => {
                  e.preventDefault()
                  handleQty(item._id, "-")}}>-</button>
                <p>{item.amount}</p>
                <button onClick={(e) => {
                  e.preventDefault()
                  handleQty(item._id, "+")}}>+</button>
                <button onClick={(e) => {
                  e.preventDefault()
                  handleRemove(item._id)}}>🗑
                </button>
              </div>
            </div>
            <p>S/. {item.price * item.amount}</p>
          </section>
        ))}
     </>
    )
  }
