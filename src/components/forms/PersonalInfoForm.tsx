import './form.css'
import ToggleButtonGroup from '../common/ToggleButtonGroup/ToggleButtonGroup';
import FormBox from '../common/FormBox/FormBox';
import { countriesOptions } from '../../utils/options';
import { useEffect, useState } from 'react';
import { fetchCandidateInput } from '../../contexts/requests';
import { formatNumber } from '../../utils/formatting';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MuiTelInput } from 'mui-tel-input'

import {FaTrash} from "react-icons/fa";


export interface UserData {
    firstname: string,
    lastname: string,
    middlename: string,
    birthday: string,
    gender: string,
    marital_status:string,
    nationality: any,
    country_of_residence: any,
    funds: string
    net_worth: string,
    phoneNumber:string
}

export interface FamilyData {
    relation:string,
    firstname: string,
    lastname: string,
    middlename: string,
    birthday: string,
    gender: string,
    marital_status:string,
    nationality: any,
    country_of_residence: any,
    funds: string
    net_worth: string,
    phoneNumber:string
}

export interface Data {
    me:UserData,
    family:FamilyData[]
}

export let initialState: Data = {
    me:{        
        firstname: "",
        lastname: "",
        middlename: "",
        birthday: new Date().toDateString(),
        gender: "",
        marital_status:"",
        nationality: "",
        country_of_residence: "",
        funds: "",
        net_worth: "",
        phoneNumber:"+1"
    },
    family:[]
};


const PersonalInfoForm = () => {
    const [data, setData] = useState<Data>(initialState);
    const [validationMsg, setValidationMsg] = useState<Data>(initialState)

    useEffect(() => {
        fetchCandidateInput(setData, 'PersonalInfo');
    }, [])    

    // FIELD VALIDATION
    const validate = () => {
        let validated = true;
        const temp_me = data.me;
        const temp_family = data.family;
        for(let [key, value] of Object.entries(temp_me)){            
            let msg = '';
            if(key!="middlename"&&value == ""){
                msg = 'Field should not be left empty';
                validated = false; 
            }

            if (key === 'funds' && !Number(value)) {
                msg = 'Should be a number';
                validated = false;
            }
            const temp = {...validationMsg.me, [key]:msg};
            setValidationMsg(validationMsg => ({ ...validationMsg, ['me']: temp }));
        }

        for (let i = 0; i<temp_family.length; i++){
            for(let [key, value] of Object.entries(temp_family[i])){
                let msg = '';
                if(key!="middlename"&&value == ""){
                    msg = 'Field should not be left empty';
                    validated = false; 
                }
    
                if (key === 'funds' && !Number(value)) {
                    msg = 'Should be a number';
                    validated = false;
                }
                let temp = [...validationMsg.family];
                temp[i] = {...validationMsg.family[i], [key]: msg}
                setValidationMsg(validationMsg => ({ ...validationMsg, ['family']: temp }));                
            }   
        }        
        return validated
    }
    const handleUpdateMe = (field: string, value: string) => {
        let temp = {...data.me, [field]:value};
        setData(data => ({ ...data, ['me']: temp }));
    }

    const handleDateUpdateMe = (newDate: Date | null) => {
        let temp = {...data.me, ['birthday']: newDate?newDate.toDateString():''};
        setData(data => ({ ...data, ['me']: temp }));
    }

    const handleNumberUpdateMe = (field: string, value: string) => {
        let valueWithoutSeparators = value.split(",").join("");
        let temp = {...data.me, [field]:valueWithoutSeparators};
        setData(data => ({ ...data, ['me']: temp }));        
    }

    const handleUpdateFamily = (idx: number, field: string, value: string) => {
        let temp = [...data.family];
        temp[idx] = {...data.family[idx], [field]:value};                 
        setData(data => ({ ...data, ['family']: temp }));    
    }

    const handleDateUpdateFamily = (idx: number, newDate: Date | null) => {
        let temp = [...data.family];
        temp[idx] = {...data.family[idx], ['birthday']: newDate?newDate.toDateString():''};                 
        setData(data => ({ ...data, ['family']: temp }));            
    }

    const handleNumberUpdateFamily = (idx: number, field: string, value: string) => {
        let valueWithoutSeparators = value.split(",").join("");
        let temp = [...data.family];
        temp[idx] = {...data.family[idx], [field]:valueWithoutSeparators};                 
        setData(data => ({ ...data, ['family']: temp }));    
    }

    const handleAddFamily = () => {
        const newFamilyMember:FamilyData = {
            relation:"",
            firstname: "",
            lastname: "",
            middlename: "",
            birthday: new Date().toDateString(),
            gender: "",
            marital_status:"",
            nationality: "",
            country_of_residence: "",
            funds: "",
            net_worth: "",
            phoneNumber:"+1"
        }

        let temp:FamilyData[] = [...data.family, newFamilyMember];            
        setData(data => ({...data, ['family']: temp}))
    }

    const handleDeleteFamily = (idx:number) => {
        let temp:FamilyData[] = [...data.family];
        temp.splice(idx, 1);
        setData(data => ({...data, ['family']: temp}));
    }

    return (

        <FormBox validation={validate} data={data} tableName={'PersonalInfo'}>
            <div className='form-card' >
                <p className='form-card-title'>General Info</p>
                <div className='form-card-content'>
                    <div className='grid-section d-grid-2'>
                        <TextField
                            id="firstName"
                            label="Your First Name"
                            type="text"
                            className='personalFormInput'
                            value={data.me.firstname}                
                            onChange = {(e)=>{handleUpdateMe('firstname',e.target.value)}}            
                        />
                        <TextField
                            id="lastName"
                            label="Your Last Name"
                            type="text"
                            className='personalFormInput'
                            value={data.me.lastname}                            
                            onChange = {(e)=>{handleUpdateMe('lastname',e.target.value)}}
                        />                        
                        <TextField
                            id="middleName"
                            label="Your Middle Name"
                            type="text"
                            className='personalFormInput'
                            value={data.me.middlename}              
                            onChange = {(e)=>{handleUpdateMe('middlename',e.target.value)}}              
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="Date of Birth"
                                inputFormat='MM/dd/yyyy'
                                value={data.me.birthday}
                                className='personalFormInput'
                                onChange = {handleDateUpdateMe}
                                renderInput = {(params)=><TextField {...params} />}
                            />                            
                        </LocalizationProvider>
                        <ToggleButtonGroup
                            options={['Male', 'Female']}
                            name="gender" label={"Gender"}
                            value={data.me.gender}
                            onChange={handleUpdateMe}
                            error={validationMsg.me.gender} />                                                
                         <ToggleButtonGroup
                            options={['Married', 'Single']}
                            name="marital_status"
                            label={"Marital status"}
                            value={data.me.marital_status}
                            onChange={handleUpdateMe}
                            error={validationMsg.me.marital_status} />
                        <Autocomplete
                            disablePortal
                            value={data.me.nationality}
                            id="nationality"
                            getOptionLabel={option=>option.label?option.label:""}
                            options={countriesOptions}               
                            onChange={(event, value)=>handleUpdateMe('nationality', value)}                                                                                         
                            renderInput={(params) => <TextField {...params} label="Choose your Nationality" />}
                         />                        
                        <Autocomplete
                            disablePortal
                            value={data.me.country_of_residence}
                            id="residence"
                            getOptionLabel={option=>option.label?option.label:""}
                            options={countriesOptions}                                                        
                            onChange={(event, value)=>handleUpdateMe('country_of_residence', value)}                                                  
                            renderInput={(params) => <TextField {...params} label="Choose Country Residence" />}
                         />
                         <MuiTelInput label="Phone" fullWidth value={data.me.phoneNumber} onChange={(v)=>{handleUpdateMe('phoneNumber',v)}}/>                                                
                        <TextField
                            id="net_worth"
                            label="Net worth"
                            type="text"
                            className='personalFormInput'
                            value={formatNumber(data.me.net_worth)}                            
                            onChange = {(e)=>{handleNumberUpdateMe('net_worth',e.target.value)}}
                        />                        
                        <TextField
                            id="funds"
                            label="Approximate available funds in USD"
                            type="text"
                            className='personalFormInput'
                            value={formatNumber(data.me.funds)}                            
                            onChange = {(e)=>{handleNumberUpdateMe('funds',e.target.value)}}
                        />                                                
                    </div>                    
                </div>
                {
                    data.family.map((f, i)=>{
                        return(
                            <div key={`family-${i}`}>
                                <div className='form-card-content-divider'></div>                            
                                <div className='form-card-content family'>                                
                                    <div className='grid-section d-grid-2'>
                                        <TextField
                                            id="relation"
                                            label="Relation"
                                            type="text"
                                            className='personalFormInput'
                                            value={data.family[i].relation}                
                                            onChange = {(e)=>{handleUpdateFamily(i, 'relation', e.target.value)}}            
                                        />
                                        <TextField
                                            id="firstName"
                                            label="Your First Name"
                                            type="text"
                                            className='personalFormInput'
                                            value={data.family[i].firstname}                
                                            onChange = {(e)=>{handleUpdateFamily(i, 'firstname',e.target.value)}}            
                                        />
                                        <TextField
                                            id="lastName"
                                            label="Your Last Name"
                                            type="text"
                                            className='personalFormInput'
                                            value={data.family[i].lastname}                                     
                                            onChange = {(e)=>{handleUpdateFamily(i, 'lastname',e.target.value)}}
                                        />                        
                                        <TextField
                                            id="middleName"
                                            label="Your Middle Name"
                                            type="text"
                                            className='personalFormInput'
                                            value={data.family[i].middlename}                               
                                            onChange = {(e)=>{handleUpdateFamily(i,'middlename',e.target.value)}}              
                                        />
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DesktopDatePicker
                                                label="Date of Birth"
                                                inputFormat='MM/dd/yyyy'
                                                value={data.family[i].birthday}                
                                                className='personalFormInput'
                                                onChange = {(d:any)=>{handleDateUpdateFamily(i,d)}}
                                                renderInput = {(params)=><TextField {...params} />}
                                            />                            
                                        </LocalizationProvider>                        
                                        <ToggleButtonGroup
                                            options={['Male', 'Female']}
                                            name="gender" label={"Gender"}
                                            value={data.family[i].gender}                
                                            onChange={(arg1:any, arg2:any)=>handleUpdateFamily(i, arg1, arg2)}
                                            error={validationMsg.me.gender} />

                                        <ToggleButtonGroup
                                            options={['Married', 'Single']}
                                            name="marital_status"
                                            label={"Marital status"}
                                            value={data.family[i].marital_status}                
                                            onChange={(arg1:any, arg2:any)=>handleUpdateFamily(i, arg1, arg2)}
                                            error={validationMsg.me.marital_status} />
                                        
                                        <Autocomplete                                            
                                            value={data.family[i].nationality}
                                            id="nationality"
                                            getOptionLabel={option=>option.label?option.label:""}
                                            options={countriesOptions}    
                                            onChange={(event, value)=>handleUpdateFamily(i, 'nationality', value)}                                                  
                                            renderInput={(params) => <TextField {...params} label="Choose your Nationality" />}
                                        />                        
                                        <Autocomplete
                                            disablePortal
                                            value={data.family[i].country_of_residence}
                                            id="residence"
                                            getOptionLabel={option=>option.label?option.label:""}
                                            options={countriesOptions}                                                        
                                            onChange={(event, value)=>handleUpdateFamily(i, 'country_of_residence', value)}                                                  
                                            renderInput={(params) => <TextField {...params} label="Choose Country Residence" />}
                                        />
                                        <MuiTelInput label="Phone" fullWidth value={data.me.phoneNumber} onChange={(v)=>{handleUpdateFamily(i, 'phoneNumber',v)}}/>                        
                                        <TextField
                                            id="net_worth"
                                            label="Net worth"
                                            type="text"
                                            className='personalFormInput'
                                            value={formatNumber(data.family[i].net_worth)}                
                                            onChange = {(e)=>{handleNumberUpdateFamily(i, 'net_worth',e.target.value)}}
                                        />
                                        <TextField
                                            id="funds"
                                            label="Approximate available funds in USD"
                                            type="text"
                                            className='personalFormInput'
                                            value={formatNumber(data.family[i].funds)}                             
                                            onChange = {(e)=>{handleNumberUpdateFamily(i, 'funds',e.target.value)}}
                                        />                                                
                                        <div className='delete-action'>
                                            <button onClick={()=>{handleDeleteFamily(i)}}><FaTrash /></button>
                                        </div>                                        
                                    </div>                                    
                                </div>      
                            </div>
                        )
                    })
                }
                <div className='form-footer'>
                    <div className='footer-title'>
                        Family Member
                    </div>
                    <div className='footer-actions'>
                        <button className='footer-action-btn' onClick={()=>handleAddFamily()}>Add</button>
                    </div>
                </div>
            </div>            
        </FormBox>
    )
}

export default PersonalInfoForm
