import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPerson, deleteProfile, reset } from '../features/persons/personSlice'

function Cards() {

  const dispatch = useDispatch()
  const { persons } = useSelector((state) => state.persons)

  useEffect(() => {


    dispatch(getPerson())

    const interval = setInterval(() => {
      dispatch(getPerson())
    }, 2500)


    return () => {
      clearInterval(interval)
      dispatch(reset())
    }

  }, [])




  return (
    <>
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
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>

          {persons.map((person) => (

            <tbody key={person._id}>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {person.first_name} {person.last_name}
                </th>
                <td className="px-6 py-4 text-base">
                  {person.id_number}
                </td>
                <td className="px-6 py-4 text-base">
                  {person.course}
                </td>
                <td className="px-6 py-4 text-base">
                  {person.time_in}
                </td>
                <td className="px-6 py-4 text-base text-right">
                  <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => dispatch(deleteProfile(person._id))}>Delete</a>
                </td>
              </tr>
            </tbody>
          ))}

        </table>
      </div>
    </>
  )
}

export default Cards

