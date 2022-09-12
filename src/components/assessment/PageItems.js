import { Fragment } from "react";
import { useSelector } from "react-redux";
import './assessment.css';


// const SCORE_HEIGHT = 43;
// const MAX_SCORE_HEIGHT = 20;
// const HEADING_HEIGHT = 79;
// const CHARACTERS_PER_LINE_TEXT = 1048 * 9
// const getCategoryHeight = (vals) => {
//     let explanationHeight = 0;
//     if (vals.text){
//         const n_rows = Math.ceil(vals.text.length / CHARACTERS_PER_LINE_TEXT)
//         explanationHeight = n_rows * 16;
//     }
//     // const explanationHeight = Math.ceil(score.explanation.length / 105) * 15 + 7;
//     return HEADING_HEIGHT + explanationHeight + SCORE_HEIGHT + MAX_SCORE_HEIGHT;
// }

export const Section = ({ ind, label, data }) => {
    const items = []
    for (let i = 0; i < data.length; i++) {
        const vals = data[i];
        
        const tmp = (
            <div>
                <p className='explanation-heading'>{vals.title}</p>
                <p className="results-p">{vals.text}</p>
                <BulletPoints bulletPoints={vals.bullets} />
                <Table data={vals.table} />
            </div>
        )
        items.push(tmp)
    }
    return (
        <>
            <h1 className='category-heading'>{ind}{label}</h1>
            {items.map((expl, key) => <Fragment key={key}>{expl}</Fragment>)}
        </>
    )
}

export const CategorySection = ({ ind, props }) => {
    
    const { label, explanation, score, max_score } = props;
    let scoreText = 'Requirement passed';
    let maxScoreText = 'This is a pass/fail requirement. There is no score in this category.'
    
    if (max_score) {
        scoreText = `Score: ${score} points`;
        maxScoreText = `Maximum score obtainable in this category: ${max_score} points`;    
    }
    
    return (
        <>
            <Section ind={ind+1+'. '} label={label} data={explanation} />
            <p className='category-score'>{scoreText}</p>
            <p className="results-p">
                {maxScoreText}
            </p>
        </>
    )
}


const BulletPoints = ({ bulletPoints }) => {

    if (bulletPoints) {
        return (
            <ul style={{marginTop: 0}}>
                {bulletPoints.map((val, ind) => <li key={ind} className='results-p'>{val} </li>)}
            </ul>)
    } else
        return <></>
}


const Table = ({ data }) => {

    if (!data)
        return <></>

    const rows = []
    for (let i = 0; i < data.length; i++) {
        let rowData = data[i]
        const tmp = (
            <tr key={i} >
                {rowData.map((val, key) => {
                    if (i === 0)
                        return <th className="assessment-table-headrow" key={key}>{val}</th>
                    else
                        return <td className="assessment-table-row" key={key}>{val}</td>
                })}
            </tr>
        )
        rows.push(tmp)
    }

    return (
        <table className="assessment-table">
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}


export const Score = () => {
    const { program_name, summary } = useSelector(state => state.assessment);
    let scoreText = '';
    let maxScoreText = `You are likely eligible under the requirements of the ${program_name}.`
    let scoreMark = 'Likely Eligible'
    let scoreFont = { fontSize: 16 };
    if (summary.total_max_score) {
        scoreText = `Total score`;
        maxScoreText = `Pass mark under ${program_name}: ${summary.required_score} points`;
        scoreMark = summary.adjusted_score
        scoreFont = {};
    }
    
    return (
        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <div style={{ marginRight: 15 }}>
                <div className='result-score' style={scoreFont}>
                    {scoreMark}
                </div>
            </div>

            <div style={{ maxWidth: 600 }}>
                <p className='category-score' style={{ margin: 0 }}>{scoreText}</p>
                <p className='results-p' style={{ margin: 0 }}>{maxScoreText}</p>
            </div>
        </div>
    )
}