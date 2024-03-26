import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import PageHeader from '../components/PageHeader';
import EmploymentType from '../sidebar/EmploymentType';
import {FaBagShopping} from 'react-icons/fa6'
const JobDetails = () => {
    const {id}=useParams();
     const [job,setJob]=useState([]);
     
    useEffect(()=>{
       fetch(`http://localhost:5000/all-jobs/${id}`).then(res=>res.json()).then(data=>setJob(data))
    },[])

    const handleApply=async()=>{
        const { value: url } = await Swal.fire({
            input: "url",
            inputLabel: "URL address",
            inputPlaceholder: "Enter the URL"
          });
          if (url) {
            Swal.fire(`Entered URL: ${url}`);
          }
    }
        // console.log(id)
  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 space-y-6'>
        <PageHeader title={"Single Job page"} path={"single job"}/>
        <h2 className='text-bold text-black'>
            Job ID:{id}
        </h2>
        <h1 className='text-bold text-blue text-2xl'>JOB DETAILS</h1>
        <p className='text-gray-500 font-sans'>Here is how the job details align with your job preferences</p>
        <h1>{job.jobTitle}</h1>
       <span className='flex flex-row gap-2'><FaBagShopping/>JOB TYPE</span>
        <div className='space-x-2'>
        <button className='bg-blue px-8 py-2 text-white '>{job.employmentType}</button>
        <button className='bg-blue px-8 py-2 text-white' onClick={handleApply}>Apply Now</button>
        </div>
        <div>
            
        </div>
    </div>
  )
}

export default JobDetails