import './sidebar.css';
import { useDispatch } from 'react-redux';
import { assessmentSlice } from '../../../redux/assessment';
import { useEffect, useState } from 'react';
import { useApi } from '../../../contexts/ApiProvider';
import { AiFillCheckCircle } from 'react-icons/ai';

const initialState = {};
export default function Sidebar() {
    const [assessmentResults, setAssessmentResults] = useState(initialState);
    const api = useApi();

    useEffect(() => {
        (async () => {
            const response = await api.get('/all_program_assessments');
            if (response.ok) {
                setAssessmentResults(response.body);
            }
            else setAssessmentResults(initialState)
        })();
    }, [api]);


    return (
        <div className="sidebar" >
            <div className="sidebar-heading-primary">
                <p style={{ marginLeft: 30 }}>Countries</p>
            </div>
            <ResultsByCountry assessmentResults={assessmentResults} />
        </div>
    )
}


export const ResultsByCountry = ({ assessmentResults }) => {
    return (
        Object.keys(assessmentResults).map((country, ind) => {
            const results = assessmentResults[country];
            return <SingleCountryResults key={ind} country={country} results={results} />
        })
    )
}

const FLAGS = {
    Australia: "australia.png",
    Canada: "canada_64.png"
}

const SingleCountryResults = ({ country, results }) => {

    let flag = FLAGS[country];
    useEffect(() => { }, [results])
    return (
        <>
            <div className="sidebar-heading-secondary">
                <img className="sidebar-flag" src={flag} alt="logo" />
                <p style={{ marginLeft: 20 }}>{country}</p>
            </div>
            {results.map((data, ind) => <ProgramLink key={ind} programData={data} ind={ind} />)}
        </>
    )
}


function getColor(score, maxScore) {

    const _maxScore = Math.max(1, maxScore);
    // if maxScore is 0 it is a fail/pass requirement. Return green
    if (maxScore === 0)
        return '#00aa1c';
    if (score / _maxScore < 0.3)
        return '#bd2608';
    if (score / _maxScore < .5)
        return '#d6b80f';
    else if (score / _maxScore < .7)
        return '#bd2608';
    else if (score / _maxScore < .9)
        return '#0ed60f';
    else
        return '#00aa1c';
}

// const ProgramLink = ({ name, score, maxScore }) => {
const ProgramLink = ({ programData, ind }) => {
    const dispatch = useDispatch();
    let score = programData.summary.adjusted_score;
    let maxScore = programData.summary.total_max_score; 
    let color = getColor(score, maxScore);
    const { setAssessment } = assessmentSlice.actions;
    let scoreText = Math.round(score / maxScore * 100) + '%';
    if (maxScore === 0) {
        // scoreText = 'ELIGIBLE';
        scoreText = <AiFillCheckCircle fontSize={24}/>
    } 

    const handleClick = () => {
        dispatch(setAssessment(programData));
    }
    

    return (
        <div className="sidebar-item" onClick={handleClick}>
            <p style={{ marginLeft: 30, fontSize: 11 }}>
                {programData.program_name}
            </p>
            <p style={{ marginRight: 20, color: color, alignSelf: 'right', fontWeight: 'bold' }}>
                {scoreText}
            </p>
        </div>
    )
}
