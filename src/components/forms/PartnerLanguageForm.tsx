import InputSelection from "../common/InputSelection/InputSelection";
import FormBox from "../common/FormBox/FormBox";
import EntriesList from '../common/EntriesList/EntriesList';
import { optionsGrade, optionsLanguageTest } from "../../utils/options";
import { useEffect, useState } from "react";
import { fetchCandidateInput, saveProgress } from "../../contexts/requests";
import ToggleButtonGroup from "../common/ToggleButtonGroup/ToggleButtonGroup";


interface Data {
    language: string
    listening: string
    reading: string
    speaking: string
    writing: string
    test_type: string
}

let initialState: Data = {
    language: "",
    listening: "",
    reading: "",
    speaking: "",
    writing: "",
    test_type: "",
};
type dataKey = keyof Data;


export const PartnerLanguageForm = () => {
    const tableName = 'SpouseLanguage';
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

    const handleUpdate = (field: string, value: string) => {
        setData(data => ({ ...data, [field as dataKey]: value }));
    }

    const handleAddEntry = () => {
        if (validate()) {
            // filter out if entry already included
            let _entries = entries.filter(i => i.language !== data.language);
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
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <FormBox data={entries} tableName={tableName}>
                <div className="form-card">
                    <div className='input-column' style={{ marginRight: 5 }}>
                        <ToggleButtonGroup
                            options={['English', "French"]}
                            name="language" label={"Langauge"}
                            value={data.language}
                            onChange={handleUpdate}
                            error={validationMsg.language}
                        />
                        <InputSelection
                            name='listening'
                            label='Listening'
                            value={data.listening.toString()}
                            options={optionsGrade}
                            onChange={handleUpdate}
                            error={validationMsg.listening} />
                        <InputSelection
                            name='speaking'
                            label='Speaking'
                            value={data.speaking.toString()}
                            options={optionsGrade}
                            onChange={handleUpdate}
                            error={validationMsg.speaking} />
                    </div>
                    <div className='input-column' style={{ marginLeft: 5 }}>
                        <InputSelection
                            name='test_type'
                            label='Test type'
                            options={optionsLanguageTest}
                            value={data.test_type}
                            onChange={handleUpdate}
                            error={validationMsg.test_type} />
                        <InputSelection
                            name='reading'
                            label='Reading'
                            value={data.reading.toString()}
                            options={optionsGrade}
                            onChange={handleUpdate}
                            error={validationMsg.reading} />
                        <InputSelection
                            name='writing'
                            label='Writing'
                            value={data.writing.toString()}
                            options={optionsGrade}
                            onChange={handleUpdate}
                            error={validationMsg.writing} />
                    </div>
                </div>
            </FormBox>
            <EntriesList entries={entries} updateEntries={updateEntries} set={set} keys={['language']} />
            <div className="add-button-container">
                <button className="add-btn" onClick={handleAddEntry}>
                    Save entry
                </button>
            </div>
        </div>
    )
}