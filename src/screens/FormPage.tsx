import { useSelector } from 'react-redux';
import FormHeader from '../components/common/FormHeader/FormHeader';
import EducationForm from '../components/forms/EducationForm';
// import JobOfferForm from '../components/forms/JobOfferForm';
import { LanguageForm } from '../components/forms/LanguageForm';
import PersonalInfoForm from '../components/forms/PersonalInfoForm';
import WorkExperienceForm from '../components/forms/WorkExperienceForm';
import { RootState } from '../store';
// import InvestmentForm from '../components/forms/InvestmentForm';
import RelativesAbroadForm from '../components/forms/RelativesAbroadForm';
import PartnerEducationForm from '../components/forms/PartnerEducationForm';
import { PartnerLanguageForm } from '../components/forms/PartnerLanguageForm';
import PartnerWorkExperienceForm from '../components/forms/PartnerWorkExperience';
import { useNavigate } from 'react-router-dom';
import BusinessForm from '../components/forms/BusinessForm';
import FormSideBar from '../components/common/FormSideBar/FormSideBar';
// import Form from '../components/forms/Form';

import "./formPage.css";
import PurposeForm from '../components/forms/PurposeForm';
import JobOfferForm from '../components/forms/JobOfferForm';
import InvestmentForm from '../components/forms/InvestmentForm';
import ReportForm from '../components/forms/ReportForm';

export const formTitle = (screen: number) => {
    switch (screen) {
        // case 1: return "Management & business Experience"
        case 1: return "Personal info"
        case 2: return "Purpose"
        case 3: return "Work experience"
        case 4: return "Education"
        case 5: return "Language profficiency"
        // case 5: return "Job offer"
        case 6: return "JobOffer"
        case 7: return "Relatives in destination countries"        
        case 8: return "Partner language profficiency"
        case 9: return "Partner work experience"
        default: return ""
    }
}


export const formSubTitle = (screen: number) => {
    switch (screen) {
        // case 1: return "Management & business Experience"
        case 1: return "Personal info"
        case 2: return "Purpose"
        case 3: return "Work experience"
        case 4: return "Education"
        case 5: return "Language profficiency"
        // case 5: return "Job offer"
        case 6: return "JobOffer"
        case 7: return "Relatives Abroad"        
        case 8: return "Investment Abroad"
        case 9: return "Report"
        default: return ""
    }
}


const formSwitcher = (screen: number) => {
    switch (screen) {
        // case 1: return <BusinessForm />
        case 1: return <PersonalInfoForm />
        case 2: return <PurposeForm />
        case 3: return <WorkExperienceForm />
        case 4: return <EducationForm />
        case 5: return <LanguageForm />
        // case 5: return <JobOfferForm />
        
        case 6: return <JobOfferForm />
        case 7: return <RelativesAbroadForm />        
        case 8: return <InvestmentForm />    
        case 9: return <ReportForm />        
        // default: return <PersonalInfoForm />
    }
}

// const spouseFormSwitcher = (screen: number) => {
//   switch(screen){
//     case 1: return <SpousePersonalInfo/>
//     default: return <PersonalInfoForm />
//   }
// }

const FormPage = () => {
    const { screen, no_screens } = useSelector((state: RootState) => state.formCounter)

    const navigate = useNavigate();

    const handleToAssessment = () => {
        // setTimeout(ToAssessment, 300)
        navigate('/report')
    }

    const GoToResultsButton = () => {
        if (screen === 9) {
            // handleToAssessment();
            // return (
            //     <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
            //         <div className="home-page-button" style={{ height: 100 }} onClick={handleToAssessment}>
            //             Go to results
            //         </div>
            //     </div>
            // )
        }
        return <></>
    }

    return (
        <div className='formPageContainer'>
            {
                screen < 9 && (
                    <FormSideBar  screen={screen} numberOfForms={no_screens}  />       
                )
            }            
            {formSwitcher(screen)}
            {/* {pi.spouse_accompanies === "Yes" ?
                <div className="container" style={{ justifyContent: 'center', marginTop: 30  }}>
                    { spouseFormSwitcher(screen) }
                 </div>
                : <></>
            } */}
            {/* {GoToResultsButton()} */}
        </div>
    )
}

export default FormPage