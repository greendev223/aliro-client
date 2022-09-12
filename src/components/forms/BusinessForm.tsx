import './form.css'
import InputSelection from '../common/InputSelection/InputSelection';
// import ToggleButtonGroup from '../common/ToggleButtonGroup/ToggleButtonGroup';
import FormBox from '../common/FormBox/FormBox';
import educationTypeOptions from '../../data/selectInputOptions/educationTypeOptions.json'
import { useEffect, useState } from 'react';
import { fetchCandidateInput } from '../../contexts/requests';
import InputForm from '../common/InputForm/InputForm';
import { formatNumber } from '../../utils/formatting';


interface Data {
    // city: string
    years: string
    percent_ownership: string
    number_employees: string
    type: string
    // currency: string
    annual_sales: string
    net_profit: string
    net_company_worth: string
}

let initialState: Data = {
    // city: "",
    years: "",
    percent_ownership: "",
    number_employees: "",
    type: "",
    annual_sales: "",
    net_profit: "",
    net_company_worth: "",
}

type dataKey = keyof Data
const KEYS = Object.keys(initialState)

export default function BusinessForm() {
    const tableName = 'Business';
    const [data, setData] = useState<Data>(initialState)
    const [validationMsg, setValidationMsg] = useState<Data>(initialState)

    useEffect(() => {
        fetchCandidateInput(setData, tableName);
    }, [])

    // FIELD VALIDATION
    const validate = () => {
        let validated = true;
        for (let key of KEYS) {
            let msg = '';
            if (!data[key as dataKey]) {
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

    const handleNumberUpdate = (field: string, value: string) => {
        let valueWithoutSeparators = value.split(",").join("");
        setData(data => ({ ...data, [field as dataKey]: valueWithoutSeparators }));
    }

    return (
        <FormBox validation={validate} data={data} tableName={tableName}>
            <div className='form-card'>
                <div className='input-column' style={{ marginRight: 5 }}>
                    <InputSelection
                        name='type'
                        label='Type'
                        value={data.type}
                        options={educationTypeOptions}
                        onChange={handleUpdate}
                        error={validationMsg.type} />
                    <InputForm
                        name='years'
                        label='Years owning a business in last five years'
                        value={data.years}
                        type="number"
                        min="0"
                        max="5"
                        onChange={handleUpdate}
                        error={validationMsg.years}/>
                    <InputForm
                        name='percent_ownership'
                        label='Percent ownership in the company'
                        value={data.percent_ownership}
                        type="number"
                        min="0"
                        max="100"
                        onChange={handleUpdate}
                        error={validationMsg.percent_ownership}/>
                    <InputForm
                        name='number_employees'
                        label='Number of employees'
                        value={data.number_employees}
                        type="number"
                        min="0"
                        onChange={handleUpdate}
                        error={validationMsg.number_employees} />
                </div>
                <div className='input-column' style={{ marginLeft: 5 }}>
                    <InputForm
                        name='annual_sales'
                        type='text'
                        label='Annual sales'
                        value={formatNumber(data.annual_sales)}
                        onChange={handleNumberUpdate}
                        error={validationMsg.annual_sales} />
                    <InputForm
                        name='net_profit'
                        type='text'
                        label='Annual net profit after tax'
                        value={formatNumber(data.net_profit)}
                        onChange={handleNumberUpdate}
                        error={validationMsg.net_profit} />

                    <InputForm
                        name='net_company_worth'
                        type='text'
                        label='Approximate company value'
                        value={formatNumber(data.net_company_worth)}
                        onChange={handleNumberUpdate}
                        error={validationMsg.net_company_worth} />
                    {/* <ToggleButtonGroup
                            options={['Yes', "No"]}
                            name="completed" label={"Do you have management experience"}
                            value={data.years}
                            onChange={handleUpdate}
                            error={validationMsg.years}
                        /> */}
                </div>
            </div>
        </FormBox>
    )

}
