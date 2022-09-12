import './form.css'
import InputSelection from '../common/InputSelection/InputSelection';
import ToggleButtonGroup from '../common/ToggleButtonGroup/ToggleButtonGroup';
import FormBox from '../common/FormBox/FormBox';
import { countriesOptionsCanAus, getRegionsOptions } from '../../utils/options';
import EntriesList from '../common/EntriesList/EntriesList';
import { useEffect, useState } from 'react';
import { fetchCandidateInput, saveProgress } from '../../contexts/requests';
let durationOptions = require('../../data/selectInputOptions/durationOptions.json');

interface Data {
    country: string
    region: string
    work_permit: string
    years: string
}

let initialState: Data = {
    country: "",
    region: "",
    work_permit: "",
    years: "",
};
type dataKey = keyof Data;


const PartnerWorkExperienceForm = () => {
    const tableName = 'SpouseWorkExperience';
    const [data, setData] = useState<Data>(initialState)
    const [validationMsg, setValidationMsg] = useState<Data>(initialState)
    const [entries, setEntries] = useState<Array<Data>>([]);

    useEffect(() => {
        fetchCandidateInput(setEntries, tableName);
    }, [])

    let regionsOptions = getRegionsOptions(data.country)

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
                        <InputSelection
                            name='years'
                            label='Duration'
                            value={data.years}
                            options={durationOptions}
                            onChange={handleUpdate}
                            error={validationMsg.years} />
                    </div>
                    <div className='input-column' style={{ marginLeft: 5 }}>
                        <ToggleButtonGroup
                            options={['Yes', "No"]}
                            name="work_permit"
                            label={"Work permit"}
                            value={data.work_permit}
                            onChange={handleUpdate}
                            error={validationMsg.work_permit} />
                    </div>
                </div>
            </FormBox>
            <EntriesList entries={entries} updateEntries={updateEntries} set={set} keys={['country', 'years']} />
            <div className="add-button-container">
                <button className="add-btn" onClick={handleAddEntry}>
                    Save entry
                </button>
            </div>
        </div>
    )
}

export default PartnerWorkExperienceForm