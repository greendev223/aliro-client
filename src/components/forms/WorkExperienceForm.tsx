import './form.css';
import './workExperienceForm.css';

import FormBox from '../common/FormBox/FormBox';
import { useEffect, useState } from 'react';
import { EARLIEST_BEGIN_DATE, MILISECONDS_IN_YEAR } from '../../data/constants';
import { fetchCandidateInput, saveProgress } from '../../contexts/requests';
import {
    getRegionsOptions,
    industryOptions,
    getSubindustryOptions,
    getDuties,
    getSkillLevel,
    getBestFitProfessions,
    getProfessions,
    countriesOptionsCanAus
} from '../../utils/options';
import { Autocomplete, TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import {FaTrash, FaPlus} from "react-icons/fa";

//variables for replacing 1 to first, 2 to second, 3 to third, etc.
const special = ['Zeroth','First', 'Second', 'Third', 'Fourth', 'Fifth', 'Xixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth', 'Eleventh', 'Twelfth', 'Thirteenth', 'Fourteenth', 'Fifteenth', 'Sixteenth', 'Seventeenth', 'Eighteenth', 'Nineteenth'];
const deca = ['twent', 'thirt', 'fort', 'fift', 'sixt', 'sevent', 'eight', 'ninet'];


interface Occupation{
    industry: any,
    startDate: string,
    endDate: string,
    country: any,
    region: any,
    mainDuty:any,
    duties:any[],
    profession:any
}

interface Data {
    firstoccupation:Occupation,
    occupations:Occupation[]
}

let initialState: Data = {
    firstoccupation: {
        industry: "",
        startDate: new Date().toDateString(),
        endDate:  new Date().toDateString(),
        country: "",
        region: "",
        mainDuty:"",
        duties:[],
        profession:""
    },
    occupations:[]
};


const WorkExperienceForm = () => {
    const tableName = 'WorkExperience';
    const [data, setData] = useState<Data>(initialState)
    const [validationMsg, setValidationMsg] = useState<Data>(initialState)    

    useEffect(() => {
        // fetchCandidateInput(setData, tableName);
        // console.log(data.firstoccupation);
        
    }, [])

    const regionOptions = (_country:any)=>{
        return [];
        // return getRegionsOptions(_country);
    }

    const dutiesOptions = (_industry:any)=>{
        return [];
        // return getDuties(industry,'');

    }

    const professions = (_industry:any) =>{
        return [];
        // return getProfessions(industry, '');
    }

    const professionOptions = (_duties:any[], _professions: any)=>{
        return [];
        // return getBestFitProfessions(_duties, _professions);
    }

    // FIELD VALIDATION
    const validate = () => {
        let validated = true;
        const temp_first = data.firstoccupation;
        const temp_occupations = data.occupations;
        for(let [key, value] of Object.entries(temp_first)){            
            let msg = '';
            if(key!="duties"&&value == ""){
                msg = 'Field should not be left empty';
                validated = false; 
            }
            const temp = {...validationMsg.firstoccupation, [key]:msg};
            setValidationMsg(validationMsg => ({ ...validationMsg, ['firstoccupation']: temp }));
        }

        for (let i = 0; i<temp_occupations.length; i++){
            for(let [key, value] of Object.entries(temp_occupations[i])){
                let msg = '';
                if(key!="duties"&&value == ""){
                    msg = 'Field should not be left empty';
                    validated = false; 
                }    
                let temp = [...validationMsg.occupations];
                temp[i] = {...validationMsg.occupations[i], [key]: msg}
                setValidationMsg(validationMsg => ({ ...validationMsg, ['occupations']: temp }));                
            }   
        }        
        return validated
    }

    const handleUpdateFirst = (field: string, value: any) => {
        let temp = {...data.firstoccupation, [field]:value};
        
        setData(data => ({ ...data, ['firstoccupation']: temp }));        
    }

    const handleDateUpdateFirst = (field: string, newDate: Date | null) => {
        let temp = {...data.firstoccupation, [field]: newDate?newDate.toDateString():''};
        setData(data => ({ ...data, ['firstoccupation']: temp }));
    }


    const handleUpdateOtherDutyFirst = () => {

    }

    const handleAddDutyFirst =  () => {
        
    }

    const handleDeleteDutyFirst =  () => {
        
    }

    
    const handleUpdateOccupation = (idx: number, field: string, value: any) => {
        let temp = [...data.occupations];
        temp[idx] = {...data.occupations[idx], [field]:value};                 
        setData(data => ({ ...data, ['occupations']: temp }));           
    }

    const handleDateUpdateOccupation = (idx:number, field: string, newDate: Date | null) => {
        let temp = [...data.occupations];
        temp[idx] = {...data.occupations[idx], [field]: newDate?newDate.toDateString():''};                 
        setData(data => ({ ...data, ['occupations']: temp }));            
    }

    const handleUpdateOtherDutyOccupation = () => {

    }

    const handleAddDutyOccupation =  () => {
        
    }

    const handleDeleteDutyOccupation =  () => {
        
    }

    const handleAddOccupation = () => {
        const newOccupation:Occupation = {
            industry: "",
            startDate: new Date().toDateString(),
            endDate: new Date().toDateString(),
            country: "",
            region: "",
            mainDuty:"",
            duties:[],
            profession:""
        }

        let temp:Occupation[] = [...data.occupations, newOccupation];            
        setData(data => ({...data, ['occupations']: temp}))
    }

    const handleDeleteOccupation = (idx:number) => {
        let temp:Occupation[] = [...data.occupations];
        temp.splice(idx, 1);
        setData(data => ({...data, ['occupations']: temp}));
    }

    
    const stringifyNumber = (n:number)=>{
        if (n < 20) return special[n];
        if (n%10 === 0) return deca[Math.floor(n/10)-2] + 'ieth';
        return deca[Math.floor(n/10)-2] + 'y-' + special[n%10];
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start' }}>
            <FormBox  data={data}  tableName={tableName}>
                <div className='form-card' >
                    <p className='form-card-title'>Work Experience</p>
                    <div className='button-tabs'>
                        <button className='btn-tab active'>Kyrylo L</button>
                        <button className='btn-tab'>Yura L <FaPlus /></button>
                        <button className='btn-tab'>Tetiana L <FaPlus /></button>
                    </div>
                    <div className='form-card-content-column'>
                        <div className='occupation-card'>
                            <Autocomplete
                                disablePortal
                                id="industry"
                                value={data.firstoccupation.industry}
                                options={industryOptions}            
                                getOptionLabel={option=>option.label?option.label:""}                                
                                onChange={(event, value)=>handleUpdateFirst('industry', value)}                                                       
                                renderInput={(params) => <TextField {...params} label="Choose Occupation" />}
                            />
                            <div className='grid-section d-grid-2'>                                
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DesktopDatePicker
                                        label="Start Date"
                                        inputFormat='MM/dd/yyyy'
                                        value={data.firstoccupation.startDate}
                                        className='personalFormInput'
                                        onChange = {(d:any)=>{handleDateUpdateFirst('startDate',d)}}                                        
                                        renderInput = {(params)=><TextField {...params} />}
                                    />                            
                                </LocalizationProvider>            
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DesktopDatePicker
                                        label="End Date"
                                        inputFormat='MM/dd/yyyy'
                                        value={data.firstoccupation.endDate}
                                        className='personalFormInput'
                                        onChange = {(d:any)=>{handleDateUpdateFirst('endDate',d)}}                                        
                                        renderInput = {(params)=><TextField {...params} />}
                                    />                            
                                </LocalizationProvider>      
                                <Autocomplete
                                    disablePortal
                                    id="country"
                                    value={data.firstoccupation.country}                                    
                                    options={countriesOptionsCanAus}                                       
                                    onChange={(event, value)=>handleUpdateFirst('country', value)}                                                                                         
                                    renderInput={(params) => <TextField {...params} label="Country" />}
                                />
                                <Autocomplete
                                    disablePortal
                                    id="region"
                                    value = {data.firstoccupation.region}
                                    options={regionOptions(regionOptions(''))}                                    
                                    onChange={(event, value)=>handleUpdateFirst('region', value)}                                                                                                                                               
                                    renderInput={(params) => <TextField {...params} label="Region" />}
                                />                                
                            </div>
                            <div style ={{'display':'flex', 'flexDirection':'column', 'gap':'15px'}}>
                                <Autocomplete
                                    disablePortal
                                    id="mainDuty"                        
                                    value={data.firstoccupation.mainDuty}        
                                    options={dutiesOptions('')}                                                                               
                                    onChange={(event, value)=>handleUpdateFirst('mainDuty', value)}                                                                                                                                               
                                    renderInput={(params) => <TextField {...params} label="mainDuty" />}
                                />                                
                            </div>                            
                            <div className='form-footer'>
                                <div className='footer-title'>                                       
                                </div>
                                <div className='footer-actions'>
                                    <button className='footer-action-btn'>Add</button>
                                </div>
                            </div>
                            <Autocomplete
                                disablePortal
                                id="Profession"
                                value={data.firstoccupation.profession}
                                options={professionOptions([[], ''], professions(''))}                                                                                      
                                onChange={(event, value)=>handleUpdateFirst('profession', value)}                                                                                                                                               
                                renderInput={(params) => <TextField {...params} label="Profession" />}
                            />      
                        </div>                    
                    </div>
                    {
                        data.occupations.map((item, i)=>{
                        return (<div key={`work-experience-${i}`}>
                                <div className='form-card-content-divider'></div>  
                                <div className='form-card-content-title'>
                                    <>{`${stringifyNumber(i+2)} Occupation`}</>
                                    <div className='delete-action'>
                                        <button onClick={()=>{handleDeleteOccupation(i)}}><FaTrash /></button>
                                    </div>
                                </div>   
                                <div className='form-card-content-column'>
                                    <div className='occupation-card'>
                                        <Autocomplete
                                            disablePortal
                                            id="industry"
                                            value={item.industry}
                                            options={industryOptions}            
                                            getOptionLabel={option=>option.label?option.label:""}                                
                                            onChange={(event, value)=>handleUpdateOccupation(i, 'industry', value)}                                                       
                                            renderInput={(params) => <TextField {...params} label="Choose Occupation" />}
                                        />
                                        <div className='grid-section d-grid-2'>                                
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DesktopDatePicker
                                                    label="Start Date"
                                                    inputFormat='MM/dd/yyyy'
                                                    value={item.startDate}
                                                    className='personalFormInput'
                                                    onChange = {(d:any)=>{handleDateUpdateOccupation(i,'startDate',d)}}                                        
                                                    renderInput = {(params)=><TextField {...params} />}
                                                />                            
                                            </LocalizationProvider>            
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DesktopDatePicker
                                                    label="End Date"
                                                    inputFormat='MM/dd/yyyy'
                                                    value={item.endDate}
                                                    className='personalFormInput'
                                                    onChange = {(d:any)=>{handleDateUpdateOccupation(i,'endDate',d)}}                                        
                                                    renderInput = {(params)=><TextField {...params} />}
                                                />                            
                                            </LocalizationProvider>      
                                            <Autocomplete
                                                disablePortal
                                                id="country"
                                                value={item.country}                                    
                                                options={countriesOptionsCanAus}                                       
                                                onChange={(event, value)=>handleUpdateOccupation(i, 'country', value)}                                                                                         
                                                renderInput={(params) => <TextField {...params} label="Country" />}
                                            />
                                            <Autocomplete
                                                disablePortal
                                                id="region"
                                                value = {item.region}
                                                options={regionOptions(regionOptions(''))}                                    
                                                onChange={(event, value)=>handleUpdateOccupation(i, 'region', value)}                                                                                                                                               
                                                renderInput={(params) => <TextField {...params} label="Region" />}
                                            />                                
                                        </div>
                                        <div style ={{'display':'flex', 'flexDirection':'column', 'gap':'15px'}}>
                                            <Autocomplete
                                                disablePortal
                                                id="mainDuty"                        
                                                value={item.mainDuty}        
                                                options={dutiesOptions('')}                                                                               
                                                onChange={(event, value)=>handleUpdateOccupation(i, 'mainDuty', value)}                                                                                                                                               
                                                renderInput={(params) => <TextField {...params} label="mainDuty" />}
                                            />                                
                                        </div>                            
                                        <div className='form-footer'>
                                            <div className='footer-title'>                                       
                                            </div>
                                            <div className='footer-actions'>
                                                <button className='footer-action-btn'>Add</button>
                                            </div>
                                        </div>
                                        <Autocomplete
                                            disablePortal
                                            id="Profession"
                                            value={item.profession}
                                            options={professionOptions([[], ''], professions(''))}                                                                                      
                                            onChange={(event, value)=>handleUpdateOccupation(i, 'profession', value)}                                                                                                                                               
                                            renderInput={(params) => <TextField {...params} label="Profession" />}
                                        />      
                                    </div>                    
                                </div>
                            </div>
                            )
                        })
                        
                    }
                    <div className='form-footer'>
                        <div className='footer-title'>
                            Add Occations
                        </div>
                        <div className='footer-actions'>
                            <button className='footer-action-btn' onClick={()=>handleAddOccupation()}>Add</button>
                        </div>
                    </div>
                </div>
            </FormBox>            
        </div>
    )
}

export default WorkExperienceForm
