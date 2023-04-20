import React from 'react'
import { ModalContext } from './Modal/ModalContext/ModalContext'
import { useForm } from 'react-hook-form'
import personService from '../features/persons/personService'
import { toast } from 'react-toastify'



const Import = () => {

    const { register, handleSubmit} = useForm();
    let { handleModal } = React.useContext(ModalContext)

    const onSubmit = async (data) => {
        const formData = new FormData();

        if (data.csvFile && data.csvFile[0]) {
            formData.append("csvFile", data.csvFile[0]);
        }

        if (data.imageFiles) {
            for (let i = 0; i < data.imageFiles.length; i++) {
                if (data.imageFiles[i]) {
                    formData.append("imageFiles", data.imageFiles[i]);
                }
            }
        }

        const response = await personService.importFile(formData);
        toast.success(response.data.message)
        handleModal();
    };

    return (
        <>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-start justify-between">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Import Files</h3>
                    <button type="button" onClick={() => handleModal()} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                </div>

                <div className='mt-4'>
                    <label htmlFor="csvFile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Import CSV</label>
                    <label htmlFor="csvFile" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload .CSV file</span></p>

                        </div>
                        <input id="csvFile" type="file" className="hidden" {...register("csvFile")} />
                    </label>
                </div>



                <div className='mt-4'>
                    <label htmlFor="imageFiles" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Import Student Images</label>
                    <label htmlFor="imageFiles" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload student images</span></p>

                        </div>
                        <input id="imageFiles" type="file" className="hidden" {...register("imageFiles")} multiple />
                    </label>
                </div>



                <div className='mt-8 mb-5'>
                    <button type='submit' className="space-y-3 w-full text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Import</button >
                </div>

            </form>
            <button type="button" onClick={() => handleModal()} className="w-full text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Close</button>

        </>
    )
}

export default Import


