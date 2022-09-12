import Sidebar from '../../components/common/Sidebar/Sidebar';
import { useSelector } from 'react-redux';
import { firstPageHeader } from '../../components/assessment/FirstPageHeader';
import { PageMaker } from '../../components/assessment/PageMaker';
import { CategorySection, Score, Section } from '../../components/assessment/PageItems';
import './assessmentScreen.css';

const createPageItems = (assessment) => {
    
    const pageItems = [firstPageHeader];
    if (assessment.program_name==="") {
        return pageItems
    }

    // add category scores
    let categoryScores;
    if (assessment.scores) {
        const scores = assessment.scores;
        categoryScores = Object.values(scores).map((val, key) => {
            return {
                height: 140,
                jsx: <CategorySection key={key} ind={key} props={val} />
            }   
        })
    }
    pageItems.push.apply(pageItems, categoryScores)
        
    // add final score
    const finalScore = {
        height: 100,
        jsx: <Score />
    }
    pageItems.push(finalScore)

    // add immigration advice
    let immigrationAdvice;
    if (assessment.immigration_advice) {
        immigrationAdvice = assessment.immigration_advice.map((val, key) => {
            return {
                height: 300,
                jsx: <Section key={key} label={val.label} data={val.explanation} />
            }
        })
    }
    pageItems.push.apply(pageItems, immigrationAdvice)

    return pageItems
}

const AssessmentPage = () => {
    let pageItems = [firstPageHeader];
    const assessment = useSelector(state => state.assessment);
    pageItems = createPageItems(assessment)

    return (
        <div style={{ minWidth: 1200 }}>
            <Sidebar />
            <div className='assessment-screen'>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <PageMaker pageItems={pageItems} />
                </div>
            </div>
        </div>
    )
}

export default AssessmentPage;