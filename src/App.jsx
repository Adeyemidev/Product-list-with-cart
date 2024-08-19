import { useState,  } from 'react';
import './App.css';
import emptyCart from './assets/images/illustration-empty-cart.svg';
import addCart from './assets/images/icon-add-to-cart.svg';
import { LuMinusCircle } from "react-icons/lu";
import { FiPlusCircle } from "react-icons/fi";
import { DATA } from './Data/data';
import carbonNeutral  from './assets/images/icon-carbon-neutral.svg'
// import {Toast} from './button';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
  
export function App() {
  const [addedItems, setAddedItems] = useState([]); 
  const [counts, setCounts] = useState({}); 


  const handleAddCart = (foodId) => {
    if (!addedItems.includes(foodId)) {
      setAddedItems([...addedItems, foodId]);
      setCounts({ ...counts, [foodId]: 1 });
    } else {
      setAddedItems(addedItems.filter(item => item !== foodId));
      setCounts({ ...counts, [foodId]: 0 });
    }
  };

//   const handleCancel = ()=>{
// addedItems.remove()
   
//   }


  const increaseCount = (foodId) => {
    setCounts({ ...counts, [foodId]: (counts[foodId] || 0) + 1 });
  };

  const decreaseCount = (foodId) => {
    setCounts({ ...counts, [foodId]: Math.max((counts[foodId] || 0) - 1, 0) });
  };

  const generateButtonClassNames = (isAdded) => {
    const baseClasses = 'flex m-auto rounded-3xl py-2 px-4 z-30 relative -mt-6 font-medium place-content-center border items-center';
    const addedClasses = 'gap-8 border-red-500 text-white text-[17px]';
    const notAddedClasses = 'gap-2 border bg-slate-50';

    return `${baseClasses} ${isAdded ? addedClasses : notAddedClasses}`;
  };

 const data = DATA;

 

 const totalOrderPrice = addedItems.reduce((total, id) => {
  const item = data.find(food => food.id === id);
  const count = counts[id] || 0;
  return total + (item ? item.price * count : 0);
}, 0);

const handleCancel = (foodId) => {
  setAddedItems(addedItems.filter(item => item !== foodId));
  setCounts({ ...counts, [foodId]: 0 });
};

const [over, setOver] = useState(false)

const notify = () => {
  toast.promise(
    new Promise(resolve => setTimeout(resolve, 2000)),
    {
      pending: 'Order is pending',
      success: 'Order Confirmed 👌',
    }
  );
  setTimeout(() => {
    setOver(true);
  }, 4000); 
};

if(over){
  document.body.classList.add('active-modal')
} else {document.body.classList.remove('active-modal')}
  
return (
   <> 
   
    <div className='flex justify-between gap-6 py-16 px-10 items-start'>
      <div>
        <h1 className="text-5xl font-bold pb-10">Desserts</h1>
        <div className='grid grid-cols-3 gap-6'>
          {data.map((food) => {
            const isAdded = addedItems.includes(food.id);
            const count = counts[food.id] || 0;

            return (
              <div key={food.id}>
                <img 
                  className={`${isAdded ? 'border-red-500 border-2' : ''} rounded-2xl drop-shadow-lg z-20 relative`} 
                  style={{ height: "250px", width: "300px" }} 
                  src={food.img} 
                  alt="" 
                />

              {isAdded ?  <button className={generateButtonClassNames(isAdded)} 
               style={ isAdded? {background: 'hsl(14, 86%, 42%)'} : 'bg-slate-50'}
              >  
                <LuMinusCircle onClick={() => decreaseCount(food.id)} />
                  {count}
                 <FiPlusCircle onClick={() => increaseCount(food.id)} />
                  
                </button>
              : <button   
                  onClick={() => handleAddCart(food.id)}  
                  className={generateButtonClassNames(isAdded)} >
                   <img src={addCart} alt='add to cart' /> Add to cart
                </button>}
            
                <p className='text-base foodName mt-3'>{food.foodTitle}</p>
                <h3 className='product text-lg font-bold'>{food.products}</h3>
                <p className='red font-semibold'>${food.price}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className='rounded-2xl white size'>
        <h1 className="py-4 pl-4 text-2xl font-bold red">Your cart ({Object.values(counts).reduce((a, b) => a + b, 0)})</h1>
        <img className='m-auto' src={emptyCart} alt="Cart" />

<p className='product text-center font-semibold py-2'>Your added items will appear here</p>
       { 
         addedItems.map((id) => { 
        const item = data.find((food) => food.id === id);
          const count = counts[id] || 0;
          return item ? (
        <div key={id} className='py-4 border-b-2 mx-4'>
              <p className='text-base text-black font-medium'>{item.foodTitle}</p>
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-3 mt-1 red400'>
                  <span className='mr-2 red font-medium'>{count}X</span>
                  <p>@ ${item.price}</p>
                  <p>@ ${count * item.price}</p>
                </div>
                <div> 
                  <FiPlusCircle  onClick={() => handleCancel(id)} className='red400 text-lg' />
                </div>

              </div>
            
            </div>

           ) : null;
         })}

{/* The total price and confirm button */}

    {addedItems.length > 0 && (
          <div>
            <div className='px-4 flex justify-between items-center gap-3 mt-1 red400'>
              <span className='mr-2 red400 font-semibold'>Order Total</span>
              <p className='text-2xl font-bold text-black'>${totalOrderPrice.toFixed(2)}</p>
            </div>
            <p className='text-center place-content-center m-auto flex py-3 gap-3 mx-4 rounded-lg mt-6'
              style={{ backgroundColor: 'hsl(13, 31%, 94%) ' }}>
              <div><img src={carbonNeutral} alt="Carbon Neutral" /></div>
              <div>This is a <strong>carbon-neutral</strong> delivery</div>
            </p>          

    <div>
      <button className={`${over ? 'active-modal' : ''}flex m-auto hover button rounded-3xl font-medium py-3 px-10 my-6 text-white`}
       onClick={notify}>Confirm Order</button>

      <ToastContainer
        toastStyle={{backgroundColor: 'hsl(14, 65%, 9%)'}}
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </div>

    </div>
        )}

      </div>
    </div>
    
  {/* This is the Modal Section */}
     { over &&(
       <div
        className=' bg-[#0C0C0C8F] z-50 w-screen h-screen top-0 right-0 bottom-0 left-0 fixed grid justify-center place-items-center'>
       <div className='rounded-2xl white size'>
        <h1 className="py-4 pl-4 text-2xl font-bold red">Order Confirmed</h1>


         {addedItems.map((id) => { 
        const item = data.find((food) => food.id === id);
          const count = counts[id] || 0;
          return item ? (<div className='rounded-lg mx-4 px-2'style={{backgroundColor:' hsl(13, 31%, 94%)'}}>
        <div key={id} className='py-4 border-b-2  ' >
              <p className='text-base text-black font-medium'>{item.foodTitle}</p>
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-3 mt-1 red400'>
                  {/* <p className='' style={{height:'100px', width:'200px'}}>{imgg}</p> */}
                  <span className='mr-2 red font-medium'>{count}X</span>
                  <p>@ ${item.price}</p>
                </div>
                <div> 
                <p>@ ${count * item.price}</p>
                </div>

              </div>
            
            </div>
            </div>
           ) : null;
         })}


       {addedItems.length > 0 && (
            <div>
                <div className='px-4 flex justify-between items-center gap-3 mt-1 red400'>
                   <span className='mr-2 red400 font-semibold'>Order Total</span>
                  <p className='text-2xl font-bold text-black'>${totalOrderPrice.toFixed(2)}</p>
              </div>
           
              <div>
                   <button className='flex m-auto hover button rounded-3xl font-medium py-3 px-10 my-6 text-white' 
                     onClick={()=> setOver(false)}>Start New Order</button>
              </div>
            </div>
        )}

      </div>
      
</div> )}

    </> 
  );
}