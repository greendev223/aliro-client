import './form.css'
import InputSelection from '../common/InputSelection/InputSelection';
import ToggleButtonGroup from '../common/ToggleButtonGroup/ToggleButtonGroup';
import FormBox from '../common/FormBox/FormBox';
import { countriesOptionsCanAus, getRegionsOptions } from '../../utils/options';
import EntriesList from '../common/EntriesList/EntriesList';
import { useEffect, useState } from 'react';
import { fetchCandidateInput, saveProgress } from '../../contexts/requests';
let optionsDuration = require('../../data/selectInputOptions/durationOptions.json')

interface Data {
    country: string
    region: string
    completed: string
    duration: string
}

let initialState: Data = {
    completed: "",
    country: "",
    duration: "",
    region: "",
}
type dataKey = keyof Data;

const PartnerEducationForm = () => {
    const tableName = 'SpouseEducation';
    const [data, setData] = useState<Data>(initialState)
    const [validationMsg, setValidationMsg] = useState<Data>(initialState)
    const [entries, setEntries] = useState<Array<Data>>([]);

    useEffect(() => {
        fetchCandidateInput(setEntries, tableName);
    }, [])

    // FIELD VALIDATION
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

    let regionsOptions = getRegionsOptions(data.country)

    const handleUpdate = (field: string, value: string) => {
        setData(data => ({ ...data, [field as dataKey]: value }));
    }

    const handleAddEntry = () => {
        if (validate()) {
            let _entries = entries.filter(i => i !== data);
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
                    <div className='input-column' style={{ marginRight: 5 }}>
                        <InputSelection
                            name='duration'
                            label='Duration'
                            value={data.duration}
                            options={optionsDuration}
                            onChange={handleUpdate}
                            error={validationMsg.duration} />
                        <InputSelection
                            name='country'
                            label='Country'
                            value={data.country}
                            options={countriesOptionsCanAus}
                            onChange={handleUpdate}
                            error={validationMsg.country} />
                        <InputSelection
                            name='region'
                            label='Region'
                            value={data.region}
                            options={regionsOptions}
                            onChange={handleUpdate}
                            error={validationMsg.region} />
                    </div>
                    <div className='input-column' style={{ marginLeft: 5 }}>
                        <ToggleButtonGroup
                            options={['Yes', "No"]}
                            name="completed"
                            label={"Completed"}
                            value={data.completed}
                            onChange={handleUpdate}
                            error={validationMsg.completed} />
                    </div>
                </div>
            </FormBox>
            <EntriesList entries={entries} updateEntries={updateEntries} set={set} keys={['country', 'duration']} />
            <div className="add-button-container">
                <button className="add-btn" onClick={handleAddEntry}>
                    Save entry
                </button>
            </div>
        </div>
    )
}

export default PartnerEducationForm