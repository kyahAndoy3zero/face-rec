import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'

import personService from '../features/persons/personService'
import { ModalContext } from '../components/Modal/ModalContext/ModalContext'
import Delete from '../components/Delete'
import Update from '../components/Update'
import Reset from '../components/Reset'

function Dashboard() {

    let { handleModal } = React.useContext(ModalContext)
    const [profiles, setProfiles] = useState(null)
    const [query, setQuery] = useState([])

    useEffect(() => {

        const fetchProfile = async () => {
            const result = await personService.getProfile(query)

            setProfiles(result.data.person)
        }
        if (query.length === 0 || query.length > 2) {

            fetchProfile();
        }

    }, [query])

    const handleOnChange = (value) => {
        setQuery(value)

    }

    return (
        <>
            <NavBar handleOnChange={handleOnChange} profiles={profiles} />


            <div className="relative m-10 overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-lg">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-lg">
                                ID Number
                            </th>
                            <th scope="col" className="px-6 py-3 text-lg">
                                Course
                            </th>
                            <th scope="col" className="px-6 py-3 text-lg">
                                Time In
                            </th>
                            <th scope="col" className="px-6 py-3 text-lg">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    {profiles && profiles.map((profile) => (

                        <tbody key={profile._id}>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {profile.first_name} {profile.last_name}
                                </th>
                                <td className="px-6 py-4 text-base">
                                    {profile.id_number}
                                </td>
                                <td className="px-6 py-4 text-base">
                                    {profile.course}
                                </td>
                                <td className="px-6 py-4 text-base">
                                    {profile.time_in}
                                </td>
                                <td className="py-4 text-base text-left">
                                    <a onClick={() => handleModal(<Delete profile={profile._id} />)} className="mr-3 font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
                                    <a onClick={() => handleModal(
                                        <Update id={profile._id}
                                            profileFname={profile.first_name}
                                            profileLname={profile.last_name}
                                            profileIdNumber={profile.id_number}
                                            profileCourse={profile.course}
                                        />)} className="mr-3 font-medium text-blue-600 dark:text-blue-500 hover:underline">Update</a>
                                    <a onClick={() => handleModal(<Reset profile={profile._id} />)} className="mr-3 font-medium text-blue-600 dark:text-blue-500 hover:underline">Reset</a>

                                </td>
                            </tr>
                        </tbody>
                    ))}

                </table>
            </div>

        </>
    )
}

export default Dashboard