import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { getJobs } from "../services/job";
import { verifyToken } from "../utils/auth";
import { deleteJob } from "../services/job";
import { SKILLS } from "./create";
import toast from "react-hot-toast";

function Home() {

    const [jobs, setJobs] = useState([]); // fetch data
    const [filteredJobs, setFilteredJobs] = useState([]);   // data on UI
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [authLoading, setAuthLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [skills, setSkills] = useState(null);
    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setFilteredJobs(jobs.filter((job) => {
            return job.jobPosition.includes(e.target.value) || job.companyName.includes(e.target.value) || job.description.includes(e.target.value)
        }));
    }

    const handleDelete = async(id) => {
        try {
                const response = await deleteJob(id);
                if (response.status === 200) {
                    toast.success("Job Deleted Successfully");
                    fetchJobs();
                    }
                    else{
                        toast.error(response.message);
                    }
                    } catch (error) {
                        toast.error("Job Deletion failed");
        }
    }
    const fetchJobs = async ({skills}) =>{
            
        setLoading(true);
        const response = await getJobs({id: null, skills});
        if(response.status === 200){
            setJobs(response.data);
            setFilteredJobs(response.data);
        }
        setLoading(false);
    }
    
    useEffect(() => {
        
        const fetchUser = async () => {
            setAuthLoading(true);
            const response = await verifyToken();
            if (response.status === 200) {
                setUser(response.data);
                
                }
                setAuthLoading(false);
                
        }
        fetchJobs({skills : null});
        fetchUser();
    },[]);

    const handleSkillChange = (skill) => {
        setSkills((prev) => {
            if(!prev){
                return [skill];
            }
            return prev.includes(skill)? prev.filter((s) => s !== skill) : [...prev, skill]});
    }
    return(
        <div className="home">
            
            <h1>Home</h1>
            <input type="text" name="" placeholder="Search" id="" value={search} onChange={handleSearch} />
            <select onChange={(e)=>handleSkillChange(e.target.value)}>
                {SKILLS.map((skill) => {
                   return <option onSelect={() => handleSkillChange(skill.value)} key={skill}  value={skill.value}>{skill.label}</option>
                })}
            </select>
            {skills && skills.map((skill) => {
                return <span style={{marginRight:"10px"}} key={skill}>{skill}</span>
            })}
            <button disabled={skills === null} onClick={() => fetchJobs({skills})}>Apply Filter</button>
            <button disabled={skills === null} onClick={() => fetchJobs({skills})}>Clear Filter</button>
            {loading ? <h1>Loading...</h1> : filteredJobs.map((job) => {
                return (
                    <div key={job.id}>
                        <h1>{job.jobPosition}</h1>
                        <p>{job.companyName}</p>
                        <p>{job.monthlySalary}</p>
                        <p>{job.description}</p>
                        {job.skills.map((skill) => {
                            return (
                                <span style={{marginRight:"10px"}} key={skill}>{skill}</span>
                                )
                        })}
                        <button onClick={() => navigate(`/job/${job._id}`)}>View</button>
                        {authLoading || user === null ? <button disabled>Edit</button> : <button onClick={() => navigate(`/edit/${job._id}`)}>Edit</button>}
                        {authLoading || user === null ? <button disabled>Delete</button> : <button onClick={() => handleDelete(job._id)}>Delete</button>}
                        </div>
                        );
            })}
        </div>
    );
        

}

export default Home;