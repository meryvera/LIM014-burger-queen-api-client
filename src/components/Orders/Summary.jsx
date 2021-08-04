import React from 'react';
import { SummaryProd } from './SummaryProd';
import { postFn } from '../../services/crud'
import { ModalOrderSent } from './ModalOrderSent';

const jwtDecode = require('jwt-decode')

export const Summary = ({state, setState, handleQty, initialValues, handleRemove}) => {

  const totalSum = (products) => {
    const total = products.reduce((acc, item) => acc + item.product.price * item.qty, 0);
    return total;
  }

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setState({...state, [name] : value})
  }

  const setUserId = () => {
    const storedToken = localStorage.getItem('token');
    const decodedToken = jwtDecode.default(storedToken);
    return decodedToken.uid
  }

  let order = {
    userId: setUserId(),
    client: state.client,
    products: state.products.map((item) => ({
      productId: item.product._id,
      qty: item.qty
    }))
  }

  const dataStore = async() => {
    const storedToken = localStorage.getItem('token');
    await postFn(storedToken, 'orders', order);
  }

  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    dataStore();
    setState(initialValues);
    handleShow();
  };
  
  
  return (
    <form onSubmit={handleSubmit} className=" containerSize my-1 pe-2 ms-lg-3 ">
      <h4 className="w-100 text-center">Resumen del pedido</h4>
      <section className="mb-3 mt-3 d-flex align-items-center">
        <label htmlFor="clientName" className="form-label mb-1">Cliente:&nbsp;</label>
        <input type="text" className="form-control" id="clientName" aria-describedby="clientName"
          name="client" onChange={handleInputChange} value={state.client} required />
      </section>
      <section>
        <div className="d-flex justify-content-between">
          <h6><u>Productos</u></h6>
          <h6><u>Precio</u></h6>
        </div>
        <aside>
          <SummaryProd
            products={state.products}
            handleQty={handleQty}
            handleRemove={handleRemove}
          />
          {
            state.products.length > 0 ?
            <h6 className="mt-3">Total:&nbsp;&nbsp;&nbsp;S/. { totalSum(state.products) }</h6>
            : <p className="m-md-3 m-lg-5 text-center"><em>No has agregado ningún producto</em></p>
          }
        </aside>
      </section>
      <div>
        {
          state.products.length > 0 ?
          <div className="d-flex justify-content-around mt-3">
            <button className="btn btn-secondary"
              onClick={e=> {
                e.preventDefault()
                setState(initialValues)
              }}>
              Borrar orden
            </button>
            <button className="btn btn-danger"
              /* onClick={()=> sendOrderToChef()} */
            >
              Enviar a cocina
            </button>
          </div>
        : ''
        }
      </div>
      <ModalOrderSent show={show} handleClose={handleClose}/>
    </form>
  )
}
