import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchCandidateInput } from "../../contexts/requests";
import { initialState } from "../../components/forms/PersonalInfoForm";
import { useUser } from "../../contexts/UserProvider";

const ASSESSMENT_HEADER_LENGTH = 224;

const FirstPageHeader = () => {
    // const occupation = 'Senior hard worker';
    const { user } = useUser();
    const assessment = useSelector(state => state.assessment);
    const [data, setData] = useState(initialState);
    useEffect(() => {
        fetchCandidateInput(setData, 'PersonalInfo');
    }, [])

    return (
        <>
            <div style={{ marginBottom: 15 }}>
                <h1 className='results-title' style={{ marginBottom: 15 }}>Assessment report</h1>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <p style={{ width: 220, fontSize: 15 }} className="results-p">Program name:</p>
                    <p className="results-p-primary" style={{ width: 484, fontSize: 15 }}>{assessment.program_name}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <p style={{ width: 220 }} className="results-p">Country:</p>
                    <p className="results-p-primary">{assessment.country}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <p style={{ width: 220 }} className="results-p">Region:</p>
                    <p className="results-p-primary">{assessment.region ? assessment.region : 'all'}</p>
                </div>

            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                <p style={{ width: 220 }} className="results-p">File number:</p>
                <p className="results-p-primary">{user.file_number}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                <p style={{ width: 220 }} className="results-p">Candidate name:</p>
                <p className="results-p-primary">{data.firstname} {data.middlename} {data.lastname}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                <p style={{ width: 220 }} className="results-p">Date of birth:</p>
                <p className="results-p-primary">{data.birthday}</p>
            </div>
            {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                <p style={{ width: 220 }} className="results-p">Occupation:</p>
                <p className="results-p-primary">{occupation}</p>
            </div> */}
        </>
    )
}


export const firstPageHeader = {
    height: ASSESSMENT_HEADER_LENGTH,
    jsx: <FirstPageHeader />
}
export default FirstPageHeader