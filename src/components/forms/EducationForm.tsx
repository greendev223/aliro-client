import './form.css'
import InputSelection from '../common/InputSelection/InputSelection';
import ToggleButtonGroup from '../common/ToggleButtonGroup/ToggleButtonGroup';
import FormBox from '../common/FormBox/FormBox';
import { countriesOptions, getRegionsOptions } from '../../utils/options';
import educationTypeOptions from '../../data/selectInputOptions/educationTypeOptions.json'
import EntriesList from '../common/EntriesList/EntriesList';
import { useEffect, useState } from 'react';
import { fetchCandidateInput, saveProgress } from '../../contexts/requests';
import InputForm from '../common/InputForm/InputForm';
import { EARLIEST_BIRTH_DATE } from '../../data/constants';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Autocomplete, TextField } from '@mui/material';
import { Key } from '@mui/icons-material';
import {FaTrash, FaPlus} from "react-icons/fa";

let durationOptions = require('../../data/selectInputOptions/durationOptions.json')
let fieldOfStudyOptions = require('../../data/selectInputOptions/fieldOfStudy.json')

//variables for replacing 1 to first, 2 to second, 3 to third, etc.
const special = ['Zeroth','First', 'Second', 'Third', 'Fourth', 'Fifth', 'Xixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth', 'Eleventh', 'Twelfth', 'Thirteenth', 'Fourteenth', 'Fifteenth', 'Sixteenth', 'Seventeenth', 'Eighteenth', 'Nineteenth'];
const deca = ['twent', 'thirt', 'fort', 'fift', 'sixt', 'sevent', 'eight', 'ninet'];

interface Education {
    type: any
    country: any
    region: string    
    duration: string
    completed: string            
}

let initialState: Education[] = [{
    type: "",
    country: "",    
    duration: "",
    region: "",
    completed: ""          
}]


const EducationForm = () => {
    const tableName = 'Education';
    const [data, setData] = useState<Education[]>(initialState)    
    const [validationMsg, setValidationMsg] = useState<Education[]>(initialState)

    // const  regionsOptions = (_country:string)=> getRegionsOptions(_country);
    const  regionsOptions = (_country:string)=> [];

    useEffect(() => {
        // fetchCandidateInput(setData, tableName);
        setData(initialState);
    }, [])

    // FIELD VALIDATION
    const validate = () => {
        let validated = true;
        for (let i = 0; i<data.length; i++){
            for(let [key, value] of Object.entries(data[i])){
                let msg = '';
                if(value == "" && key !="region"){
                    msg = 'Field should not be left empty';
                    validated = false; 
                }    
                let temp = [...validationMsg];
                temp[i] = {...validationMsg[i], [key]: msg}
                setValidationMsg(temp);                
            }   
        }        
        return validated
    }

    const handleUpdate = (idx: number, field: string, value: string) => {
        let temp = [...data];
        temp[idx] = {...data[idx], [field]:value};                 
        setData(temp);    
    }

    const handleAddEducation = () => {
        if(data.length>10)
            return;
        const newEducation:Education = {
            type: "",
            country: "",    
            duration: "",
            region: "",
            completed: ""          
        }

        let temp:Education[] = [...data, newEducation];            
        setData(temp);
    }

    const handleDeleteEducation = (idx:number) => {
        let temp:Education[] = [...data];
        temp.splice(idx, 1);
        setData(temp);
    }

    const stringifyNumber = (n:number)=>{
        if (n < 20) return special[n];
        if (n%10 === 0) return deca[Math.floor(n/10)-2] + 'ieth';
        return deca[Math.floor(n/10)-2] + 'y-' + special[n%10];
    }
    
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start' }}>
            <FormBox validation={validate} data={data} tableName={tableName}>
                <div className='form-card'>
                    <p className='form-card-title'>Education</p>
                    <div className='button-tabs'>
                        <button className='btn-tab active'>Kyrylo L</button>
                        <button className='btn-tab'>Yura L <FaPlus /></button>
                        <button className='btn-tab'>Tetiana L <FaPlus /></button>
                    </div>
                    {
                        data.map((f, i)=>{
                            return(
                                <div key={`education-${i}`}>
                                    {
                                        i !==0&&(
                                            <div>
                                                <div className='form-card-content-divider'></div>  
                                                <div className='form-card-content-title'>
                                                    <>{`${stringifyNumber(i+1)} Education`}</>
                                                    <div className='delete-action'>
                                                        <button onClick={()=>{handleDeleteEducation(i)}}><FaTrash /></button>
                                                    </div>
                                                </div>                                          
                                            </div>
                                        )
                                    }                                    
                                    <div className='form-card-content-column'>
                                        <div className='grid-section d-grid-2'>                                
                                            <Autocomplete
                                                disablePortal
                                                id="Type"
                                                value={data[i].type}
                                                options={educationTypeOptions}           
                                                onChange={(e,v:any)=>{handleUpdate(i,'type', v)}}        
                                                getOptionLabel={(option) => (option ? option.label : "")}
                                                renderInput={(params) => <TextField {...params} label="Type" />}
                                            />
                                            <Autocomplete                                                
                                                id="Country"
                                                value={data[i].country}
                                                getOptionLabel={(option) => (option ? option.label : "")}
                                                options={countriesOptions}                                                      
                                                onChange={(e,v:any)=>{handleUpdate(i,'country', v)}}
                                                renderInput={(params) => <TextField {...params} label="Country" />}
                                            />
                                            <Autocomplete                                                
                                                id="Region"
                                                value={data[i].region}                                                
                                                options={regionsOptions(data[i].country)}                                                      
                                                getOptionLabel={(option:any)=>(option?option.label:"") }                                                
                                                onChange={(e,v:any)=>{handleUpdate(i,'region', v)}}
                                                renderInput={(params) => <TextField {...params} label="Region" />}
                                            />  
                                            <Autocomplete                                                
                                                id="Duration"
                                                value={data[i].duration}
                                                options={durationOptions}                                                      
                                                getOptionLabel={(option:any)=>(option?option.label:"") }                                                
                                                onChange={(e,v:any)=>{handleUpdate(i,'duration', v)}}
                                                renderInput={(params) => <TextField {...params} label="Duration" />}
                                            />                                                                               
                                        </div>
                                        <ToggleButtonGroup
                                                options={['Yes', 'No']}
                                                name="completed"
                                                label={"Completed"}
                                                value={data[i].completed}
                                                onChange={(arg1:any, arg2:any)=>handleUpdate(i, arg1, arg2)}
                                        />                                        
                                    </div>
                                </div>
                            );
                        })
                    }
                    <div className='form-footer'>
                            <div className='footer-title'>                                       
                                Add Education
                            </div>
                            <div className='footer-actions'>
                                <button className='footer-action-btn' onClick={()=>handleAddEducation()}>Add</button>
                            </div>
                    </div>                       
                </div>                    
            </FormBox>            
        </div>
    )

}


export default EducationForm