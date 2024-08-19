
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
export function Toast(){
    const [over, setOver] = useState(false)

  const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 3000));
  
  const notify = () =>{toast.promise(
    resolveAfter3Sec,
    {
      pending: 'Order is pending',
      success: 'Order Confirmed 👌',
    }
);
setOver(true)
  }

  return (

    <div>
      <button className='flex m-auto hover rounded-3xl font-medium py-3 px-10 my-6 text-white' 
      style={{ background: 'hsl(14, 86%, 42%)' }}  onClick={notify}>Confirm Order</button>
      {/* <ToastContainer /> */}

      <ToastContainer
position="top-left"
autoClose={3000}
hideProgressBar={false}
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
  );
}