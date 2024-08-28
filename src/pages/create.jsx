import { useState } from 'react';
import {createJob, getJobs} from '../services/job';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const SKILLS = [
    {
        value: 'React',
        label : 'React'
    },{
        value: 'Node',
        label:'Node'
    },{
        value: 'Express',
        label:'Express'
    },{
        value: 'MongoDb',
        label:'MongoDb'
    },{
        value: 'Python',
        label:'Python'
    },{
        value: 'Django',
        label:'Django'
    },{
        value: 'Flask',
        label:'Flask'
    },{
        value: 'Golang',
        label:'Golang'
    },{
        value: 'Java',
        label:'Java'
    },
]

export default function Create () {
    const {id} = useParams();
    const [formData, setFormData] = useState({
        companyName:null,
        logoUrl:null,
        jobPosition:null,
        monthlySalary:null,
        jobType:null,
        remote:null,
        location:null,
        description:null,
        about:null,
        skills: [],
        information:null

    })
    const [loading, setLoading] = useState(false);
    const handleChange = (e)=>{
        console.log(e.target.value, e.target.name, e.target.selectedOptions);
        console.log(formData);
        if(e.target.name === 'skills'){
            return setFormData({...formData, skills: formData.skills.includes(e.target.value) ? formData.skills.filter(skill => skill !== e.target.value) : [...formData.skills, e.target.value]})
        }
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    const handleSubmit = async (e) =>{
        setLoading(true);
        e.preventDefault();
        console.log(formData);
        const data = {...formData};
        data.skills = data.skills.join(',');
        try{
            const jobId = id ? id : null;
            const response = await createJob({data, id: jobId});
            console.log(response);
            if(response.status === 201){
                jobId ? toast.success("Job Updated Successfully") :  toast.success("Job Created Successfully");
                setFormData(response.data);
            }
            else{
                jobId ? toast.error("Failed to Update Job") : toast.error("Failed to Create Job");
            }
        }
        catch(error){
            console.log(error.message);
            
        }
        finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        const fetchJob = async ()=>{
            const response = await getJobs({id});
            if(response.status === 200){
                setFormData(response.data);
            }
        }
        if(id){
            fetchJob();
                }
    },[])
    return(
        <div>
            <h1>Create</h1>
            <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', width:"40%", gap:"10px"}}>
                <label >Company Name:</label>
                <input type="text" onChange={handleChange} value={formData.companyName}  name="companyName" placeholder="Company Name" required></input>
                <label >Logo Url:</label>
                <input type="text" onChange={handleChange}  value={formData.logoUrl} name="logoUrl" placeholder="Logo URL" required></input>
                <label >Job Position:</label>
                <input type="text" onChange={handleChange}  value={formData.jobPosition} name="jobPosition" placeholder="Job Position" required></input>
                <label >Monthly Salary:</label>
                <input type="text" onChange={handleChange} value={formData.monthlySalary} name="monthlySalary" placeholder="Monthly Salary" required></input>
                <select name="jobType" onChange={handleChange} value={formData.jobType} id="" placeholder="Job Type">
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Freelance">Freelance</option>
                </select>
                <select name="remote" onChange={handleChange} value={formData.remote} id="">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
                <label >Location:</label>
                <input type="text" onChange={handleChange} value={formData.location}  name="location" placeholder="Location" required></input>
                <textarea name="description" onChange={handleChange} value={formData.description} placeholder="Description" id=""></textarea>
                <textarea name="about" onChange={handleChange} value={formData.about} placeholder="About" id=""></textarea>
                <select onChange={handleChange} name="skills" id="" multiple>
                    {SKILLS.map((skill, idx) =>(
                        <option selected = {formData.skills.includes(skill.value)} key={idx} value={skill.value}>{skill.label}</option>
                    ))}
                </select>
                <label >Information:</label>
                <input type="text" onChange={handleChange} value={formData.information} name="information" placeholder="Information" required></input>
                {id ? <button disabled={loading} type='update'>Update</button> : <button disabled={loading} type='submit'>Submit</button>}
            </form>
        </div>
    ); 
}