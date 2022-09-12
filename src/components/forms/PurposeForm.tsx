import { useState } from "react";
import FormBox from "../common/FormBox/FormBox"

import "./purposeForm.css";

export interface Data {    
    purpose: number,    
}

export let initialState: Data = {
    purpose: 0
}
const PurposeForm = () => {
    const [data, setData] = useState<Data>(initialState);
    const [validationMsg, setValidationMsg] = useState<Data>(initialState)

    const validate = () => {
        let validated = true;
        // for (let [key, value] of Object.entries(data)) {
        for (let key of Object.keys(initialState)) {
            let msg = '';            
            if (key === 'purpose' && (!Number(data[key as keyof Data]) || data['purpose'] ==0)) {
                msg = 'Should be a number';
                validated = false;
            }
            setValidationMsg(validationMsg => ({ ...validationMsg, [key]: msg }));
        }

        return validated
    }

    const cardClickHandler = (cardNum:number) => {
        setData(data => ({ ...data, ['purpose']: cardNum }));
    }



    return(
        <FormBox validation={validate} data={data} tableName={'Purpose'}>
            <div className='form-card' >
                <p className='form-card-title'>Purpose</p>
                <div className='form-card-content'>
                    <div className="purpose-content">
                        <div className={`purpose-card ${data.purpose == 1?'active':''}`} onClick={()=>{cardClickHandler(1)}}>
                            <div className="purpose-img">
                                <img className='purpose-icon' src={"purpose_icon_1.png"} alt="purpose icon" />
                            </div>
                            <div className="purpose-title">
                                My & Family Global<br />Immigration Options
                            </div>
                            {
                                data.purpose == 1 && (
                                    <div className="purpose-badge">
                                        <img className='purpose-icon' src={"purpose_badge.png"} alt="purpose icon" />
                                    </div>
                                )
                            }
                        </div>
                        <div  className={`purpose-card ${data.purpose == 2?'active':''}`} onClick={()=>{cardClickHandler(2)}}>
                            <div className="purpose-img">
                                <img className='purpose-icon' src={"purpose_icon_2.png"} alt="purpose icon" />
                            </div>
                            <div className="purpose-title">
                                Global Business Options
                            </div>
                            {
                                data.purpose == 2 && (
                                    <div className="purpose-badge">
                                        <img className='purpose-icon' src={"purpose_badge.png"} alt="purpose icon" />
                                    </div>
                                )
                            }                            
                        </div>
                        <div  className={`purpose-card ${data.purpose == 3?'active':''}`} onClick={()=>{cardClickHandler(3)}}>
                            <div className="purpose-img">
                                <img className='purpose-icon' src={"purpose_icon_3.png"} alt="purpose icon" />
                            </div>
                            <div className="purpose-title">
                                Global Tourism Options Options
                            </div>
                            {
                                data.purpose == 3 && (
                                    <div className="purpose-badge">
                                        <img className='purpose-icon' src={"purpose_badge.png"} alt="purpose icon" />
                                    </div>
                                )
                            }
                        </div>
                        <div  className={`purpose-card ${data.purpose == 4?'active':''}`}  onClick={()=>{cardClickHandler(4)}}>
                            <div className="purpose-img">
                                <img className='purpose-icon' src={"purpose_icon_4.png"} alt="purpose icon" />
                            </div>
                            <div className="purpose-title">
                                Global Study Options
                            </div>
                            {
                                data.purpose == 4 && (
                                    <div className="purpose-badge">
                                        <img className='purpose-icon' src={"purpose_badge.png"} alt="purpose icon" />
                                    </div>
                                )
                            }
                        </div>
                    </div>                    
                </div>
            </div>
        </FormBox>
    )
}

export default PurposeForm;