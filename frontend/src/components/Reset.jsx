import React from 'react'
import { ModalContext } from './Modal/ModalContext/ModalContext'
import personService from '../features/persons/personService'
const Reset = ({ profile }) => {
    let { handleModal } = React.useContext(ModalContext)

    const resetFunction = () => {
        personService.reset(profile)
        handleModal()
        window.location.reload();
    }

    return (
        <>
            <div className="flex items-start justify-between">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Reset</h3>
                <button type="button" onClick={() => handleModal()} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
            </div>

            <div className='mt-8 mb-5'>
                <button onClick={resetFunction} className="space-y-3 w-full text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Reset</button >
            </div>
            <button type="button" onClick={() => handleModal()} className="w-full text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Close</button>

        </>
    )
}

export default Reset