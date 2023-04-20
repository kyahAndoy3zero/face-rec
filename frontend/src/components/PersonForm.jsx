import React from 'react'
import { ModalContext } from '../components/Modal/ModalContext/ModalContext'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { createPer } from '../features/persons/personSlice'
import imgService from '../features/imageReq/imgService'
import { toast } from 'react-toastify'

function PersonForm() {


  let { handleModal } = React.useContext(ModalContext)
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    id_number: '',
    gender: '',
    year_level: '',
    course: ''
  })

  const [data, setData] = useState({});
  const { first_name, last_name, id_number, gender, year_level, course } = formData

  const onSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(data.item(key).name, data.item(key));
    });

    if (!first_name || !last_name || !id_number || !gender || !year_level || !course) {
      toast.error('You need to provide all data')
    }

    const personData = {
      first_name,
      last_name,
      id_number,
      gender,
      year_level,
      course
    }

    imgService.imgUpload(formData)
    dispatch(createPer(personData))
    handleModal()
  }

  const onChange = (e) => {

    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleOnchange = (e) => {
    setData(e.target.files);
  };


  return (
    <>
      <div className="flex items-start justify-between">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create Profile</h3>
        <button type="button" onClick={() => handleModal()} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        </button>
      </div>

      <form onSubmit={onSubmit} className="mt-5 space-y-6">

        <div>
          <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">First Name</label>
          <input type="text" name="first_name" id="first_name" value={first_name} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required="" />
        </div>
        <div>
          <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last Name</label>
          <input type="text" name="last_name" id="last_name" value={last_name} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required="" />
        </div>
        <div>
          <label htmlFor="id_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">ID Number</label>
          <input type="text" name="id_number" id="id_number" value={id_number} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required="" />
        </div>

        <div>
          <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Gender</label>
          <select id="gender" name="gender" onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option defaultValue={'Select Gender'}>Gender</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select>
        </div>

        <div>
          <label htmlFor="year_level" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Year Level</label>
          <select id="year_level" name="year_level" onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option defaultValue={'Select Year Level'}>Select Year Level</option>
            <option value='4rth Year'>4rth Year</option>
            <option value='3rd Year'>3rd Year</option>
            <option value='2nd Year'>2nd Year</option>
            <option value='1st Year'>1st Year</option>
          </select>
        </div>



        <div>
          <label htmlFor="course" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Course</label>
          <select id="course" name="course" onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option defaultValue={'Select Course'}>Select Course</option>
            <option value='BSIT'>BSIT</option>
            <option value='BSBIO'>BSBIO</option>
            <option value='BSMATH'>BSMATH</option>
            <option value='BSES'>BSES</option>
          </select>
        </div>




        <label className="block text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="file_input">Upload file</label>

        <input className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" onChange={handleOnchange}
          accept="image/*"
          multiple />
        <p className="mt-0 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PNG, JPG or JPEG (5MB).</p>
        <p className="mt-0 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">Uploaded image will be trained for facial recognition.</p>

        <div className='space-y-3'>
          <button type="submit" className="w-full text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
        </div>
        <button type="button" onClick={() => handleModal()} className="w-full text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Close</button>

      </form>
    </>
  )
}

export default PersonForm