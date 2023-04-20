import React from 'react'
import { ModalContext } from './Modal/ModalContext/ModalContext'
import { useState } from 'react'

import personService from '../features/persons/personService'

const Update = ({ id, profileFname, profileLname, profileIdNumber, profileCourse }) => {

    let { handleModal } = React.useContext(ModalContext)


    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        id_number: '',
        gender: '',
        year_level: '',
        course: ''

    })

    const onSubmit = async (e) => {
        e.preventDefault()

        const personData = {
            id,
            first_name,
            last_name,
            id_number,
            gender,
            year_level,
            course,
        }


        personService.updatePerson(personData);
        handleModal();
        window.location.reload();


    }

    const { first_name, last_name, id_number, gender, year_level, course } = formData

    const onChange = (e) => {

        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }




    return (
        <>
            <div className="flex items-start justify-between">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Update Profile</h3>
                <button type="button" onClick={() => handleModal()} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
            </div>

            <form onSubmit={onSubmit} className="mt-5 space-y-6">

                <div>
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">First Name</label>
                    <input type="text" name="first_name" id="first_name" value={first_name} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder={profileFname} required="" />
                </div>
                <div>
                    <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last Name</label>
                    <input type="text" name="last_name" id="last_name" value={last_name} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder={profileLname} required="" />
                </div>
                <div>
                    <label htmlFor="id_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">ID Number</label>
                    <input type="text" name="id_number" id="id_number" value={id_number} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder={profileIdNumber} required="" />
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
                    <label htmlFor="id_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Course</label>
                    <select id="course" name="course" onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option defaultValue={`${profileCourse}`}>{profileCourse}</option>
                        <option value='BSIT'>BSIT</option>
                        <option value='BSBIO'>BSBIO</option>
                        <option value='BSMATH'>BSMATH</option>
                        <option value='BSES'>BSES</option>
                    </select>
                </div>


                <div className='space-y-3'>
                    <button type="submit" className="w-full text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Update</button>
                </div>
                <button type="button" className="w-full text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Close</button>
            </form>
        </>

    )
}

export default Update