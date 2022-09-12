import './form.css'
import InputSelection, { SelectionOption } from '../common/InputSelection/InputSelection';
import FormBox from '../common/FormBox/FormBox';
import EntriesList from '../common/EntriesList/EntriesList';
import { ageOptions, countriesOptions, getRegionsOptions } from '../../utils/options';
import residenceOptions from '../../data/selectInputOptions/statusInCountryOptions.json';
import relationOptions from '../../data/selectInputOptions/relationOptions.json';
import { useEffect, useState } from 'react';
import { fetchCandidateInput, saveProgress } from '../../contexts/requests';


interface Data {
    country: string
    region: string
    relative: string
    status: string
    age: string
}

let initialState: Data = {
    country: "",
    region: "",
    relative: "",
    status: "",
    age: "",
};
type dataKey = keyof Data;


const Form = () => {

    const tableName = 'RelativeAbroad';
    const [data, setData] = useState<Data>(initialState)
    const [validationMsg, setValidationMsg] = useState<Data>(initialState)
    const [entries, setEntries] = useState<Array<Data>>([]);
    let regionsOptions = getRegionsOptions(data.country)

    useEffect(() => {
        fetchCandidateInput(setEntries, tableName);
        // TODO request to check if authenticated
    }, [])


    const validate = () => {
        let validated = true;
        for (let [key, value] of Object.entries(data)) {
            let msg = '';
            if (!value) {
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

    const handleAddEntry = () => {
        if (validate()) {
            let _entries = entries.filter(i => i!==data);
            _entries = [..._entries, data];
            setEntries(_entries)
            setData(initialState)
            saveProgress(tableName, _entries); 
        }
    }

    const set = (entry: any) => {
        setData(entry)
    }

    const updateEntries = (xs: Array<Data>) => {
        setEntries(xs)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <FormBox data={entries} tableName={tableName}>
                <div className='form-card'>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignSelf: 'center' }}>
                        <div className='input-column' style={{ marginRight: 5 }}>
                            <InputSelection
                                name='country'
                                label='Country'
                                value={data.country}
                                options={countriesOptions}
                                onChange={handleUpdate}
                                error={validationMsg.country} />
                            <InputSelection
                                name='region'
                                label='Region'
                                value={data.region}
                                options={regionsOptions}
                                onChange={handleUpdate}
                                error={validationMsg.region} />
                            <InputSelection
                                name='age'
                                label='Age'
                                value={data.age}
                                options={ageOptions}
                                onChange={handleUpdate}
                                error={validationMsg.age} />
                        </div>
                        <div className='input-column' style={{ marginLeft: 5 }}>
                            <InputSelection
                                name='relative'
                                label='Relation'
                                value={data.relative}
                                options={relationOptions}
                                onChange={handleUpdate}
                                error={validationMsg.relative} />
                            <InputSelection
                                name='status'
                                label='Relative residence status'
                                value={data.status}
                                options={residenceOptions}
                                onChange={handleUpdate}
                                error={validationMsg.status} />
                            <InputComponent 
                                type={'selection'} 
                                label={'kjorec'} 
                                field={'status'} 
                                options={residenceOptions}
                                handleUpdate={handleUpdate}
                                data={data}
                                validationMsg={validationMsg}/>
                        </div>
                    </div>
                </div>
            </FormBox>
            <EntriesList entries={entries} updateEntries={updateEntries} set={set} keys={['relative', 'country']} />
            <div className="add-button-container">
                <button className="add-btn" onClick={handleAddEntry}>
                    Save entry
                </button>
            </div>
        </div>
    )
}

interface InputProps {
    type: string
    label: string
    field: string
    options: Array<SelectionOption>
    data: Data
    validationMsg: Data
    handleUpdate: CallableFunction
}

const InputComponent = ({type, label, field, options, data, validationMsg, handleUpdate}: InputProps)  => {
    let component = <></>
    switch (type) {
        case 'selection':
            component = (
                <InputSelection
                    name={field}
                    label={label}
                    value={data[field as keyof Data]}
                    options={options}
                    onChange={handleUpdate}
                    error={validationMsg[field as keyof Data]} />
            )
    }
    return component
}

export default Form