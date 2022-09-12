import './form.css'
import InputSelection from '../common/InputSelection/InputSelection';
import FormBox from '../common/FormBox/FormBox';
import { ageOptions, countriesOptionsCanAus, getRegionsOptions } from '../../utils/options';
import residenceOptions from '../../data/selectInputOptions/statusInCountryOptions.json';
import relationOptions from '../../data/selectInputOptions/relationOptions.json';
import { useEffect, useState } from 'react';
import { fetchCandidateInput, saveProgress } from '../../contexts/requests';
import { Autocomplete, TextField } from '@mui/material';
import ToggleButtonGroup from '../common/ToggleButtonGroup/ToggleButtonGroup';
import {FaTrash} from "react-icons/fa";
//variables for replacing 1 to first, 2 to second, 3 to third, etc.
const special = ['Zeroth','First', 'Second', 'Third', 'Fourth', 'Fifth', 'Xixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth', 'Eleventh', 'Twelfth', 'Thirteenth', 'Fourteenth', 'Fifteenth', 'Sixteenth', 'Seventeenth', 'Eighteenth', 'Nineteenth'];
const deca = ['twent', 'thirt', 'fort', 'fift', 'sixt', 'sevent', 'eight', 'ninet'];

interface RelativeAbroad {
    relation:any
    country: any,
    region: any,
    residence_status:any,
    age:any
}
interface Data {
    have_relative: string,
    relatives: RelativeAbroad[]
}

let initialState: Data = {
    have_relative:"",
    relatives: [{
        relation:"",
        country: "",
        region: "",
        residence_status:"",
        age:""       
    }]
}
type dataKey = keyof Data;

const RelativesAbroadForm = () => {
    const tableName = 'RelativeAbroad';
    const [data, setData] = useState<Data>(initialState)
    const [validationMsg, setValidationMsg] = useState<Data>(initialState);    

    useEffect(() => {
        // fetchCandidateInput(setEntries, tableName);
    }, [])

    // FIELD VALIDATION
    const validate = () => {
        let validated = true;
        if(data.have_relative == "") return false;
        if(data.have_relative == "Yes"){
            for (let i = 0; i<data.relatives.length; i++){
                for(let [key, value] of Object.entries(data.relatives[i])){
                    let msg = '';
                    if(value == "" && key !="region"){
                        msg = 'Field should not be left empty';
                        validated = false; 
                    }    
                    let temp = [...validationMsg.relatives];
                    temp[i] = {...validationMsg.relatives[i], [key]: msg}
                    setValidationMsg(validationMsg => ({...validationMsg, ['relatives']: temp}));                                        
                }   
            }        
        }
        return validated
    }

    const handleUpdate = (idx: number, field: string, value: string) => {
        let temp = [...data.relatives];
        temp[idx] = {...data.relatives[idx], [field]:value};     
        setData(data => ({...data, ['relatives']: temp}));                    
    }

    const handleUpdateHaveRelative = (field:string, value:string)=>{        
        setData(data => ({ ...data, [field]: value }));
    }

    const handleAddRelative = () => {
        if(data.relatives.length>10)
            return;
        const newRelative:RelativeAbroad = {
            relation:"",
            country: "",
            region: "",
            residence_status:"",
            age:""       
        }

        let temp:RelativeAbroad[] = [...data.relatives, newRelative];            
        setData(data => ({...data, ['relatives']: temp}));                    
    }

    const handleDeleteRelative = (idx:number) => {
        let temp:RelativeAbroad[] = [...data.relatives];
        temp.splice(idx, 1);
        setData(data => ({...data, ['relatives']: temp}));                    
    }

    const stringifyNumber = (n:number)=>{
        if (n < 20) return special[n];
        if (n%10 === 0) return deca[Math.floor(n/10)-2] + 'ieth';
        return deca[Math.floor(n/10)-2] + 'y-' + special[n%10];
    }

    const regionsOptions =(_country:string)=>[]

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start' }}>
            <FormBox validation={validate} data={data} tableName={tableName}>
                <div className='form-card'>
                    <p className='form-card-title'>Relatives Abroad</p>
                    <ToggleButtonGroup
                            options={['Yes', 'No']}
                            name="have_relative"
                            label={"Do you have relatives in immigration destinations?"}
                            value={data.have_relative}
                            onChange={handleUpdateHaveRelative}
                            error={validationMsg.have_relative} />
                    {
                        data.have_relative =="Yes"&&data.relatives.map((item, i)=>{
                            return (
                                <div   key={`relative-${i}`}>
                                        {
                                            i !==0&&(
                                                <div>
                                                    <div className='form-card-content-divider'></div>  
                                                    <div className='form-card-content-title'>
                                                        <>{`${stringifyNumber(i+1)} Relative`}</>
                                                        <div className='delete-action'>
                                                            <button onClick={()=>{handleDeleteRelative(i)}}><FaTrash /></button>
                                                        </div>
                                                    </div>                                          
                                                </div>
                                            )
                                        }  
                                        <div  className='form-card-content-column'>        
                                            <div className="relative-section">                            
                                                <div className='grid-section d-grid-2'>                                                      
                                                    <Autocomplete                                
                                                        id="Relation"
                                                        value={item.relation}
                                                        getOptionLabel={(option) => (option ? option.label : "")}
                                                        options={relationOptions}                                  
                                                        onChange = {(e,value)=>{handleUpdate(i, 'relation', value)}}                    
                                                        renderInput={(params) => <TextField {...params} label="Relation" />}
                                                    />
                                                    <Autocomplete                                
                                                        id="Country"
                                                        value={item.country}
                                                        getOptionLabel={(option) => (option ? option.label : "")}
                                                        options={countriesOptionsCanAus}                                                                                                          
                                                        onChange = {(e,value)=>{handleUpdate(i, 'country', value)}}
                                                        renderInput={(params) => <TextField {...params} label="Country" />}
                                                    />
                                                    <Autocomplete                                
                                                        id="Region"
                                                        value={item.region}
                                                        getOptionLabel={(option) => (option ? option.label : "")}
                                                        options={[]}                                                      
                                                        onChange = {(e,value)=>{handleUpdate(i, 'region', value)}}                    
                                                        renderInput={(params) => <TextField {...params} label="Region" />}
                                                    />
                                                    <Autocomplete                                
                                                        id="residence_status"
                                                        value={item.residence_status}
                                                        getOptionLabel={(option) => (option ? option.label : "")}
                                                        options={residenceOptions}   
                                                        onChange = {(e,value)=>{handleUpdate(i, 'residence_status', value)}}                    
                                                        renderInput={(params) => <TextField {...params} label="Relative_residence_status" />}
                                                    />
                                                    <Autocomplete                                
                                                        id="Age"
                                                        value={item.age}
                                                        getOptionLabel={(option) => (option ? option.label : "")}
                                                        options={ageOptions}                                                      
                                                        onChange = {(e,value)=>{handleUpdate(i, 'age', value)}}      
                                                        renderInput={(params) => <TextField {...params} label="Age" />}
                                                    />
                                                </div>
                                            </div>                                               
                                        </div>  
                            </div>
                            )
                        })
                    }                        
                    <div className='form-footer'>
                        <div className='footer-title'>                                       
                            Add Relatives Abroad
                        </div>
                        <div className='footer-actions'>
                            <button className='footer-action-btn' onClick={()=>handleAddRelative()}>Add</button>
                        </div>
                    </div>   
          
                </div>
            </FormBox>            
        </div>
    )
}

export default RelativesAbroadForm