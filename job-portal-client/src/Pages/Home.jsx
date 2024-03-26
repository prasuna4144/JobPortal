import Banner from '../components/Banner'
import { useEffect,useState } from 'react';
import Card from '../components/Card';
import Jobs from './Jobs';
import Sidebar from '../sidebar/Sidebar'
import Newsletter from '../components/Newsletter';
const Home = () => {
  const[selectedCategory,setSelectedCategory]=useState(null);
  const[jobs,setJobs]=useState([]);
  const[isLoding,setIsLoading]=useState(true);
  const[currentPage,setCurrentPage]=useState(1);
  const itemsPerPage=6;
 
  useEffect(()=>{
    setIsLoading(true);
    fetch("http://localhost:5000/all-jobs").then(res=>res.json()).then(data=>{
      // console.log(data)
      setJobs(data)
      setIsLoading(false)
    })
  },[])
  // console.log(jobs)

  const [query, setQuery] = useState("");
const [location, setLocation] = useState("");

const handleInputChange = (event) => {
  const { name, value } = event.target;

  if (name === 'title') {
    // Update the query state for job position
    setQuery(value);
  } else if (name === 'location') {
    // Update the location state for job location
    setLocation(value);
  }
};

  // console.log(query);

  // filter jobs by title
  const filteredItems=jobs.filter((job)=>job.jobTitle.toLowerCase().indexOf(query.toLowerCase())!==-1);
  // console.log(filteredItems)


  // .......Radio Filtering
  const handleChange=(event)=>{
    setSelectedCategory(event.target.value)
  }


  // ......Buuton based Filtering ....

  const handleClick = (event) => {
    setSelectedCategory(event.target.value); // Use setSelectedCategory instead of selectedCategory
  }

// calculating index range
 const calculatePageRange=()=>{
  const startIndex = (currentPage-1)*itemsPerPage;
  const endIndex =startIndex+itemsPerPage;
  return {startIndex,endIndex};
 }
    
 const nextPage=()=>{
  if(currentPage<Math.ceil(filteredItems.length/itemsPerPage)){
    setCurrentPage(currentPage+1);
  }
 }

//  function for previous page 
const prevPage=()=>{
  if(currentPage >1){
    setCurrentPage(currentPage-1)
  }
}

  // main function
  const filteredData=(jobs,selected,query)=>{
    let filteredJobs=jobs;

    //filtering input items
    if(query){
      filteredJobs=filteredItems  ;
    }

    // category filtering
    if(selected){
        filteredJobs=filteredJobs.filter(
          ({
            jobLocation,
            maxPrice,
            experienceLevel,
            salaryType,
            employmentType,
            postingDate,
          })=>{
            
            return(
            jobLocation.toLowerCase()===selected.toLowerCase() || 
            parseInt(maxPrice)<=parseInt(selected)||
            postingDate>=selected||
            salaryType.toLowerCase()==selected.toLowerCase()||
            experienceLevel.toLowerCase()==selected.toLowerCase()||
            employmentType.toLowerCase()===selected.toLowerCase()
        )
            }
            );
        console.log(filteredJobs);
    }

    //  slice the data based on current page
    const{startIndex,endIndex}=calculatePageRange();
    filteredJobs=filteredJobs.slice(startIndex,endIndex);
    return filteredJobs.map((data,i)=><Card key={i} data={data}/>)
  }

  const result=filteredData(jobs,selectedCategory,query);

  return (
    <div >
   
<Banner query={query} handleInputChange={handleInputChange}/>
<div className='bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12'>
  {/* left side */}
  <div className='bg-white p-4 rounded'>
    <Sidebar handleChange={handleChange} handleClick={handleClick}/>
  </div>

  {/* job cards */}
  <div className='col-span-2 bg-white p-4 rounded'>

    {
      isLoding ?(<p className='font-medium'>Loading....</p>):result.length >0? (<Jobs result={result}/> ):<>
      <h3 className='text-lg font-bold mb-2'>{result.length} Jobs</h3>
      <p>No data Found</p>
      </>
    }
  {/* pagination here */}
    {
      result.length>0 ? (
        <div className='flex justify-center mt-4 space-x-8'>
           <button onClick={prevPage} disabled={currentPage==1} className='hover:underline'>Previous</button>
           <span className='mx-2'>Page {currentPage} of {Math.ceil(filteredItems.length/itemsPerPage)}</span>
           <button onClick={nextPage} disabled={currentPage===Math.ceil(filteredItems.length/itemsPerPage)} className='hover:underline'>Next</button>
        </div>
      ):""
    }
    </div>
   
  {/* right side */}
  <div className='bg-white p-4 rounded'><Newsletter/></div>

</div>
    </div>
  )
}

export default Home