import './form.css'
import InputSelection from '../common/InputSelection/InputSelection';
import ToggleButtonGroup from '../common/ToggleButtonGroup/ToggleButtonGroup';
import FormBox from '../common/FormBox/FormBox';
import { countriesOptions, countriesOptionsCanAus, getRegionsOptions } from '../../utils/options';
import employerPermit from "../../data/selectInputOptions/employerPermitOptions.json";
import { useEffect, useState } from 'react';
import { fetchCandidateInput, saveProgress } from '../../contexts/requests';
import EntriesList from '../common/EntriesList/EntriesList';
import InputForm from '../common/InputForm/InputForm';
import { Autocomplete, TextField } from '@mui/material';
let yearsOfExperienceOptions = require('../../data/selectInputOptions/yearsOfExperienceOptions.json');

interface Data {
    valid_offer:string,
    work_permit: string
    occupation:string,    
    country: any,
    region: any,    
    employer_permit: any
    years_of_experience: number,    
    hourly_wage: number
}

const initialState: Data = {
    valid_offer:"",
    work_permit: "",
    occupation:"",    
    country: "",
    region: "",    
    employer_permit: "",
    years_of_experience: 0,    
    hourly_wage: 0
}

type dataKey = keyof Data;


const JobOfferForm = () => {
    const tableName = 'JobOffer';
    const [data, setData] = useState<Data>(initialState)
    const [validationMsg, setValidationMsg] = useState<Data>(initialState)    

    const regionsOptions = () => []

    useEffect(() => {
        
    }, [])

    const validate = () => {
        let validated = true;
        for (let [key, value] of Object.entries(data)) {            
            let msg = '';
            if (value == '' && key != 'hourly_wage'&& key !='region') {
                msg = 'Field should not be left empty';
                validated = false;
            }
            setValidationMsg(validationMsg => ({ ...validationMsg, [key as dataKey]: msg }));
        }
        return validated
    }

    const handleUpdate = (field: string, value: string) => {
        setData(data => ({ ...data, [field as dataKey]: value }));
    }
    

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start' }}>
            <FormBox validation = {validate} data={data} tableName={tableName} >
                <div className='form-card'>
                    <p className='form-card-title'>Job Offer</p>
                    <div className='form-card-content-column'>
                        <div className='grid-section d-grid-2'>
                            <ToggleButtonGroup
                                options={['Yes', 'No']}
                                name="valid_offer"
                                label={"Do you have a valid job offer?"}
                                value ={data.valid_offer}
                                onChange={handleUpdate}
                                 />
                            <ToggleButtonGroup
                                options={['Yes', 'No']}
                                name="work_permit"
                                label={"Do you have a valid work permit?"}
                                value ={data.work_permit}
                                onChange={handleUpdate}
                                 />
                            <TextField
                                id="occupation"
                                label="Choose Occupation"
                                type="text"
                                className='personalFormInput'
                                value={data.occupation}                
                                onChange = {(e)=>{handleUpdate('occupation',e.target.value)}}            
                            />
                            <Autocomplete       
                                id="country"
                                value={data.country}
                                getOptionLabel={(option) => (option ? option.label : "")}
                                options={countriesOptionsCanAus}
                                onChange = {(e,v)=>{handleUpdate('country', v)}}
                                renderInput={(params) => <TextField {...params} label="Country" />}
                            />

                            <Autocomplete                 
                                id="region"
                                value={data.region}
                                getOptionLabel={(option:any) => (option ? option.label : "")}
                                options={[]}
                                onChange = {(e,v)=>{handleUpdate('region', v)}}                                                      
                                renderInput={(params) => <TextField {...params} label="Region" />}
                            />
                            <Autocomplete                 
                                id="employer_permit"
                                value={data.employer_permit}
                                getOptionLabel={(option) => (option ? option.label : "")}
                                options={employerPermit}   
                                onChange={(e,v)=>handleUpdate('employer_permit', v)}                                                   
                                renderInput={(params) => <TextField {...params} label="Employer Permit" />}
                            />
                            <TextField
                                id="years_experience"
                                label="Years of Experience"
                                type="text"
                                className='personalFormInput'
                                value={data.years_of_experience}                
                                onChange = {(e)=>{handleUpdate('years_of_experience',e.target.value)}}            
                            />
                            <TextField
                                id="hourly_wage"
                                label="Hourly Wage"
                                type="text"
                                className='personalFormInput'
                                value={data.hourly_wage}                
                                onChange = {(e)=>{handleUpdate('hourly_wage',e.target.value)}}            
                            />
                        </div>
                    </div>
                </div>
            </FormBox>
   
        </div>
    )
}

export default JobOfferForm