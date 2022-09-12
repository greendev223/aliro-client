import "./form.css";
import InputSelection from "../common/InputSelection/InputSelection";
import FormBox from "../common/FormBox/FormBox";
import { optionsGrade, optionsLanguageTest } from "../../utils/options";
import EntriesList from '../common/EntriesList/EntriesList';
import { useEffect, useState } from "react";
import { fetchCandidateInput, saveProgress } from "../../contexts/requests";
import ToggleButtonGroup from "../common/ToggleButtonGroup/ToggleButtonGroup";
import { Autocomplete, TextField } from "@mui/material";


interface Data {
    language_default: string,
    listening_en: any,
    reading_en: any,
    test_type_en: any,
    completed_en: string,
    speak_french:string,    
    listening_fr: any,
    reading_fr: any,
    test_type_fr: any,
    completed_fr: string,

}


let initialState: Data = {
    language_default: "English",
    listening_en: "",
    reading_en: "",
    test_type_en: "",
    completed_en: "",
    speak_french: "" ,   
    listening_fr: "",
    reading_fr: "",
    test_type_fr: "",
    completed_fr: "",
};

type dataKey = keyof Data;


export const LanguageForm = () => {

    const tableName = 'Language';
    const [data, setData] = useState<Data>(initialState)
    const [validationMsg, setValidationMsg] = useState<Data>(initialState)    

    useEffect(() => {
        // fetchCandidateInput(setEntries, tableName);
        // TODO request to check if authenticated
    }, [])
    // FIELD VALIDATION
    const validate = () => {
        let validated = true;
        for (let [key, value] of Object.entries(data)) {
            let msg = '';
            if (!value && !key.includes('_fr')) {
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
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <FormBox validation = {validate} data={data} tableName={tableName}>
                <div className="form-card">
                    <p className='form-card-title'>Language Proficiency</p>
                    <div className='form-card-content-column'>
                        <div className="language-section">
                            <div className='grid-section d-grid-2'>    
                                <TextField
                                    id="english"
                                    label="Language"
                                    type="text"
                                    className='personalFormInput'
                                    value={"English"}                
                                    
                                />          
                                <Autocomplete                 
                                    id="test_type"
                                    value={data.test_type_en}
                                    getOptionLabel={(option) => (option ? option.label : "")}
                                    options={optionsLanguageTest}                                                      
                                    onChange ={(e,v)=>{handleUpdate('test_type_en', v)}}
                                    renderInput={(params) => <TextField {...params} label="Test type" />}
                                />
                                <Autocomplete
                                    
                                    id="listening"
                                    value={data.listening_en}
                                    getOptionLabel={(option) => (option ? option.label : "")}
                                    options={optionsGrade}        
                                    onChange = {(e,v)=>handleUpdate('listening_en', v)}                                                
                                    renderInput={(params) => <TextField {...params} label="Listening" />}
                                />
                                <Autocomplete
                                    
                                    id="Reading"
                                    value={data.reading_en}
                                    getOptionLabel={(option) => (option ? option.label : "")}
                                    options={optionsGrade}            
                                    onChange = {(e,v)=>handleUpdate('reading_en', v)}                                                 
                                    renderInput={(params) => <TextField {...params} label="Reading" />}
                                />                  
                            </div>
                            <ToggleButtonGroup
                                options={['Yes', 'No']}
                                name="completed_en"
                                label={"Have you completed an Official Language test?"}
                                value ={data.completed_en}
                                onChange={handleUpdate}
                                 />                            
                        </div>
                        <ToggleButtonGroup
                                options={['Yes', 'No']}
                                name="speak_french"
                                label={"Do you speak French?"}
                                value ={data.speak_french}
                                onChange={handleUpdate}
                                 />
                        {
                            data.speak_french == 'Yes'&&(
                                <div className="language-section">
                                    <div className='grid-section d-grid-2'>                                    
                                        <Autocomplete                 
                                            id="test_type"
                                            value={data.test_type_fr}
                                            getOptionLabel={(option) => (option ? option.label : "")}
                                            options={optionsLanguageTest}                                                      
                                            onChange = {(e,v)=>handleUpdate('test_type_fr', v)}
                                            renderInput={(params) => <TextField {...params} label="Test type" />}
                                        />
                                        <Autocomplete                                            
                                            id="listening"
                                            value={data.listening_fr}
                                            getOptionLabel={(option) => (option ? option.label : "")}
                                            options={optionsGrade}   
                                            onChange = {(e,v)=>handleUpdate('listening_fr', v)}                                                   
                                            renderInput={(params) => <TextField {...params} label="Listening" />}
                                        />
                                        <Autocomplete                                            
                                            id="Reading"
                                            value={data.reading_fr}
                                            getOptionLabel={(option) => (option ? option.label : "")}
                                            options={optionsGrade}                                                      
                                            onChange = {(e,v)=>handleUpdate('reading_fr', v)}                                                   
                                            renderInput={(params) => <TextField {...params} label="Reading" />}
                                        />                  
                                    </div>
                                    <ToggleButtonGroup
                                        options={['Yes', 'No']}
                                        name="completed_fr"
                                        label={"Have you completed an Official Language test?"}
                                        value ={data.completed_fr}
                                        onChange={handleUpdate}
                                        />                            
                                </div>
                            )
                        }                        
                        <a href="#">How to self evaluate your language profiency</a>
                    </div>                    
                </div>
            </FormBox>            
        </div>
    )
}
