import React from 'react'
import ReactDOM from "react-dom" 
import {ModalContext} from "./ModalContext/ModalContext"
const Modal = () => {

    let{modalContent, modal} = React.useContext(ModalContext);
    if(modal) {
        return ReactDOM.createPortal(
            <div className='fixed top-0 bottom-0 left-0 right-0 overflow-auto backdrop-blur-md bg-white/20'>
                <div className='w-5/6 mx-auto mt-20 md:w-2/6'>
                    <div className="max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow-md sm:p-8 lg:p-10 dark:bg-gray-800 dark:border-gray-700">
                    {modalContent}
                    </div>
                </div>
            </div>
            ,
      document.querySelector("#modal-root")
          );
    }else return null;
};

export default Modal