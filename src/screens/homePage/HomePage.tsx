import './homePage.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCandidateInput } from "../../contexts/requests";
import { Data, initialState } from "../../components/forms/PersonalInfoForm";

const HomePage = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<Data>(initialState);

    const validate = () => {
        let validated = true;
        for (let key of Object.keys(initialState)) {
            if (!data[key as keyof Data] && key!=='middlename') {
                validated = false;
            }
        }    
        return validated
    }
    
    let assessmentButtonText = validate() ? 'Edit input' : 'Take assessment';

    useEffect(() => {
        fetchCandidateInput(setData, 'PersonalInfo');
    }, [])

    const handleToAssessment = () => {
        navigate('/results')
    }
    function ToAssessment() {
        navigate('/form');
    }

    const handleToInput = () => {
        setTimeout(ToAssessment, 100)
    }

    const GoToResultsButton = () => {
        if (validate()) {
            return (
                <div className="home-page-button" onClick={handleToAssessment}>
                    Assessment results
                </div>
            )
        }
        return <></>
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className='home-page-container'>
                <div className="home-page-button" onClick={handleToInput}>
                    {assessmentButtonText}
                </div>

                {GoToResultsButton()}
            </div>
        </div>
    )
}

export default HomePage