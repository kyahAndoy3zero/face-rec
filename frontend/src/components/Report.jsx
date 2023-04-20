import React from 'react'
import * as Excel from "exceljs";
import * as FileSaver from "file-saver";
import { ModalContext } from './Modal/ModalContext/ModalContext';
import personService from '../features/persons/personService';
import { useState, useEffect } from 'react';
const Report = ({ profiles, date }) => {


    const [stats, setStats] = useState([])


    useEffect(() => {

        const fetchStats = async () => {
            const result = await personService.stats()
            setStats(result.data.stats)
        }
        fetchStats()
    }, [])


    let { handleModal } = React.useContext(ModalContext)
    const blobType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const createExcel = new Excel.Workbook();
    const student = createExcel.addWorksheet("Student Info");

    student.columns = [
        { header: 'Student ID', key: 'id_number', width: 10 },
        { header: 'Last Name', key: 'last_name', width: 32 },
        { header: 'Fist Name', key: 'first_name', width: 32 },
        { header: 'Gender', key: 'gender', width: 15, },
        { header: 'Year Level', key: 'year_level', width: 15, },
        { header: 'Course', key: 'course', width: 15, },
        { header: 'Time In', key: 'time_in', width: 15, },
    ];

    profiles.map((profile) => {
        student.addRow({ id_number: `${profile.id_number}`, last_name: `${profile.last_name}`, first_name: `${profile.first_name}`, gender: `${profile.gender}`, year_level: `${profile.year_level}`, course: `${profile.course}`, time_in: `${profile.time_in}` });
    })

    stats.map((stat) => {
        const studentStats = createExcel.addWorksheet(`${stat._id}`);
        studentStats.mergeCells('A1:F1');
        studentStats.getCell('A1').alignment = { horizontal: 'center' };
        studentStats.getCell('A1').value = `${stat._id}`;
        studentStats.addRow(['Male', 'Female', 'First Year', 'Second Year', 'Third Year', 'Fourth Year']);
        studentStats.addRow([stat.maleCount, stat.femaleCount, stat.fyear, stat.syear, stat.tyear, stat.lyear]);
        studentStats.addRow(['Total', stat.total]);
    })



    async function writeExcel() {

        createExcel.xlsx.writeBuffer().then(data => {

            const blob = new Blob([data], { type: blobType });
            FileSaver.saveAs(blob, `${date}`);
        }).catch(err => {
            console.log(err)
        })

    }


    return (

        <>

            <div className="flex items-start justify-between">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Report</h3>
                <button type="button" onClick={() => handleModal()} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
            </div>

            <div className='mt-8 mb-5'>
                <button onClick={() => writeExcel()} className="space-y-3 w-full text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Download Report</button >
            </div>
            <button type="button" onClick={() => handleModal()} className="w-full text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Close</button>

        </>

    )
}

export default Report


