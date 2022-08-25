import React from 'react'
import { useContext } from 'react'
import { Context } from '../context/context'

export default function Product() {
  const {allProducts, isLogin, setCart, setUpdateProductList} = useContext(Context)
 
  const addToCartHandler = product =>{
    if(product.quantity>0){
      fetch('/product/addToCart/'+ product._id)
        .then(res=>res.json(res))
        .then(data=>{
            setUpdateProductList(pre=>+pre-1)
            const productToAdd = {...product, quantity:1}
            setCart(pre=>{
              if(pre.some(el=>el._id===productToAdd._id)){
                return pre.map(el=>{
                  if(el._id===productToAdd._id){
                    el.quantity++
                    return el
                  } else return el
                })
              } else return [...pre, productToAdd]
            })
        }) 
    } 
  }
  
  return (
    <div>
      <h1>All Products</h1>
      {
         allProducts && allProducts.map((ele,i) => (
           <div key={i}>
              <h3>{ele.product_title}</h3>
              <h5>quantity: {ele.quantity}</h5>
              <h5>price: {ele.price} €</h5>
              {isLogin && ( <button onClick={()=>addToCartHandler(ele)}>Add to cart</button> )}
           </div>
         ))
      }
    </div>
  )
}