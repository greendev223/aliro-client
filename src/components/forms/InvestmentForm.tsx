import './form.css'
import InputSelection from '../common/InputSelection/InputSelection';
import FormBox from '../common/FormBox/FormBox';
import { countriesOptions, getRegionsOptions } from '../../utils/options';
import InputForm from '../common/InputForm/InputForm';
import EntriesList from '../common/EntriesList/EntriesList';
import { useEffect, useState } from 'react';
import { fetchCandidateInput, saveProgress } from '../../contexts/requests';
import ToggleButtonGroup from '../common/ToggleButtonGroup/ToggleButtonGroup';
import { Autocomplete, TextField } from '@mui/material';
import {FaTrash} from "react-icons/fa";

//variables for replacing 1 to first, 2 to second, 3 to third, etc.
const special = ['Zeroth','First', 'Second', 'Third', 'Fourth', 'Fifth', 'Xixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth', 'Eleventh', 'Twelfth', 'Thirteenth', 'Fourteenth', 'Fifteenth', 'Sixteenth', 'Seventeenth', 'Eighteenth', 'Nineteenth'];
const deca = ['twent', 'thirt', 'fort', 'fift', 'sixt', 'sevent', 'eight', 'ninet'];

interface Investment {
    country: any,
    region: any,
    city:string,
    amount:string
}
interface Data {
    have_investment: string,
    investments: Investment[]
}

let initialState: Data = {
    have_investment:"",
    investments: [{        
        country: "",
        region: "",
        city:"",
        amount:""       
    }]
}
type dataKey = keyof Data;

const InvestmentForm = () => {

    const tableName = 'Investment';
    const [data, setData] = useState<Data>(initialState)
    const [validationMsg, setValidationMsg] = useState<Data>(initialState)    

    useEffect(() => {
        // fetchCandidateInput(setEntries, tableName);
    }, [])

    // let regionsOptions = getRegionsOptions(data.country)


    // FIELD VALIDATION
    const validate = () => {
        let validated = true;
        if(data.have_investment == "") return false;
        if(data.have_investment == "Yes"){
            for (let i = 0; i<data.investments.length; i++){
                for(let [key, value] of Object.entries(data.investments[i])){
                    let msg = '';
                    if(value == "" && key !="region"){
                        msg = 'Field should not be left empty';
                        validated = false; 
                    }    
                    if (key === 'amount' && !Number(value)) {
                        msg = 'Should be a number';
                        validated = false;
                    }
                    let temp = [...validationMsg.investments];
                    temp[i] = {...validationMsg.investments[i], [key]: msg}
                    setValidationMsg(validationMsg => ({...validationMsg, ['investments']: temp}));                                        
                }   
            }        
        }
        return validated
    }

    const handleUpdate = (idx: number, field: string, value: string) => {
        let temp = [...data.investments];
        temp[idx] = {...data.investments[idx], [field]:value};     
        setData(data => ({...data, ['investments']: temp}));                    
    }

    const handleUpdateHaveInvestment = (field:string, value:string)=>{        
        setData(data => ({ ...data, [field]: value }));
    }

    const handleAddInvestment = () => {
        if(data.investments.length>10)
            return;
        const newInvestment:Investment = {
            country: "",
            region: "",
            city:"",
            amount:""       
        }

        let temp:Investment[] = [...data.investments, newInvestment];            
        setData(data => ({...data, ['investments']: temp}));                    
    }

    const handleDeleteInvestment = (idx:number) => {
        let temp:Investment[] = [...data.investments];
        temp.splice(idx, 1);
        setData(data => ({...data, ['investments']: temp}));                    
    }

    const stringifyNumber = (n:number)=>{
        if (n < 20) return special[n];
        if (n%10 === 0) return deca[Math.floor(n/10)-2] + 'ieth';
        return deca[Math.floor(n/10)-2] + 'y-' + special[n%10];
    }
    
    function formatNumber(n:string) {
        return Number(n).toLocaleString()
    }    

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start' }} onSubmit={() => console.log('sumbitting')}>
            <FormBox validation={validate} data={data} tableName={tableName}>
                <div className='form-card'>                    
                    <p className='form-card-title'>Investment Abroad</p>
                    <ToggleButtonGroup
                            options={['Yes', 'No']}
                            name="have_investment"
                            label={"Do you have investments in immigration destinations?"}
                            value={data.have_investment}
                            onChange={handleUpdateHaveInvestment}
                            error={validationMsg.have_investment} />
                    {
                        data.have_investment=="Yes"&&data.investments.map((item, i)=>{
                            return (
                            <div key={`investment-${i}`}>
                                {
                                    i !==0&&(
                                        <div>
                                            <div className='form-card-content-divider'></div>  
                                            <div className='form-card-content-title'>
                                                <>{`${stringifyNumber(i+1)} Investment`}</>
                                                <div className='delete-action'>
                                                    <button onClick={()=>{handleDeleteInvestment(i)}}><FaTrash /></button>
                                                </div>
                                            </div>                                          
                                        </div>
                                    )
                                }  
                                <div className='form-card-content-column'>                        
                                    <div className="investment-section">                            
                                        <div className='grid-section d-grid-2'>
                                            <TextField
                                                id="amount"
                                                label="Value of your investment in USD"
                                                type="text"
                                                className='personalFormInput'
                                                value={item.amount}                
                                                onChange = {(e)=>{handleUpdate(i, 'amount',e.target.value)}}            
                                            />                                
                                            <Autocomplete                                
                                                id="Country"
                                                value={item.country}
                                                getOptionLabel={(option) => (option ? option.label : "")}
                                                options={countriesOptions}                                                      
                                                onChange={(e,v)=>handleUpdate(i, 'country', v)}
                                                renderInput={(params) => <TextField {...params} label="Country" />}
                                            />                             
                                            <Autocomplete                                
                                                id="Region"
                                                value = {item.region}
                                                getOptionLabel={(option:any) => (option ? option.label : "")}
                                                options={[]} 
                                                onChange={(e,v)=>handleUpdate(i, 'region', v)}                                                     
                                                renderInput={(params) => <TextField {...params} label="Region" />}
                                            />                                
                                            <TextField
                                                id="city"
                                                label="City"
                                                type="text"
                                                className='personalFormInput'
                                                value={item.city}                
                                                onChange = {(e)=>{handleUpdate(i, 'city',e.target.value)}}            
                                            />
                                        </div>
                                    </div>
                                    

                                    
                                </div>  
                            </div>
                            );
                        })
                    }                    
                    <div className='form-footer'>
                        <div className='footer-title'>                                       
                            Add Investment Abroad
                        </div>
                        <div className='footer-actions'>
                            <button className='footer-action-btn' onClick={()=>handleAddInvestment()}>Add</button>
                        </div>
                    </div>                     
                </div>
            </FormBox>            
        </div>
    )
}

export default InvestmentForm
