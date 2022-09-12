import { Fab } from "@mui/material";
import { Edit } from "@mui/icons-material";
import "./reportForm.css";


const ReportForm = () => {

    return (
        <>
            <div className="report-container">
                <div className="sidebar-report">
                    <div className="card questionaire">
                        <Fab size="small" color="secondary" aria-label="edit">
                            <Edit />
                        </Fab>
                        <span>Edit Assessment Questionaire</span>
                    </div>
                    <div className="card sidebar-body">
                        <div className="sidebar-collection">
                            <div className="sidebar-collection-header">
                                <img src ="./ca_flag.png" /> 
                                <div>Canada</div>
                            </div>
                            <div className="sidebar-collection-body">
                                <div className="sidebar-collection-item active"     >
                                    <div className="collection-item-header">
                                        Ontario Immigrant Nominee
                                    </div>
                                    <div className="collection-item-body">
                                        <div className="collection-item-text">Masters Graduate Stream</div>
                                        <div className="collection-item-badge green">98%</div>
                                    </div>
                                </div>
                                <div className="sidebar-collection-item">
                                    <div className="collection-item-header">
                                        Ontario Immigrant Nominee
                                    </div>
                                    <div className="collection-item-body">
                                        <div className="collection-item-text">PhD Graduate System</div>
                                        <div className="collection-item-badge yellow">56%</div>
                                    </div>
                                </div>
                                <div className="sidebar-collection-item">
                                    <div className="collection-item-header">
                                        Ontraio's Express Entry
                                    </div>
                                    <div className="collection-item-body">
                                        <div className="collection-item-text">French-Speaking Skilled<br />Woker Stream</div>
                                        <div className="collection-item-badge yellow">46%</div>
                                    </div>
                                </div>
                                <div className="sidebar-collection-item">
                                    <div className="collection-item-header">
                                        Ontario Immigrant Nominee
                                    </div>
                                    <div className="collection-item-body">
                                        <div className="collection-item-text">Human Capital Priorities<br /></div>
                                        <div className="collection-item-badge red">24%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sidebar-collection">
                            <div className="sidebar-collection-header">
                                <img src ="./au_flag.png" /> 
                                <div>Australia</div>
                            </div>
                            <div className="sidebar-collection-body">
                                <div className="sidebar-collection-item"     >
                                    <div className="collection-item-header">
                                        Ontario Immigrant Nominee
                                    </div>
                                    <div className="collection-item-body">
                                        <div className="collection-item-text">Masters Graduate Stream</div>
                                        <div className="collection-item-badge green">98%</div>
                                    </div>
                                </div>
                                <div className="sidebar-collection-item">
                                    <div className="collection-item-header">
                                        Ontario Immigrant Nominee
                                    </div>
                                    <div className="collection-item-body">
                                        <div className="collection-item-text">PhD Graduate System</div>
                                        <div className="collection-item-badge yellow">56%</div>
                                    </div>
                                </div>
                                <div className="sidebar-collection-item">
                                    <div className="collection-item-header">
                                        Ontraio's Express Entry
                                    </div>
                                    <div className="collection-item-body">
                                        <div className="collection-item-text">French-Speaking Skilled<br />Woker Stream</div>
                                        <div className="collection-item-badge yellow">46%</div>
                                    </div>
                                </div>
                                <div className="sidebar-collection-item">
                                    <div className="collection-item-header">
                                        Ontario Immigrant Nominee
                                    </div>
                                    <div className="collection-item-body">
                                        <div className="collection-item-text">Human Capital Priorities<br /></div>
                                        <div className="collection-item-badge red">24%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="report-body card">                    
                    <p className="report-body-title">Assessment Report</p>        
                                                                            
                    <div className="report-body-items">
                        <div className="report-body-item">
                            <div className="item-body">
                                Ontario Immigrant Nominee
                            </div>
                            <div className="item-header">
                                Masters Graduate Stream
                            </div>
                        </div>
                        <div className="report-body-item">
                            <div className="item-header">
                                Country
                            </div>
                            <div className="item-body">
                                Canada
                            </div>
                        </div>
                        <div className="report-body-item">
                            <div className="item-header">
                                Region
                            </div>
                            <div className="item-body">
                                Northwest Territories
                            </div>                            
                        </div>
                        <div className="report-body-item">
                            <div className="item-header">
                                File number
                            </div>
                            <div className="item-body">
                                File number
                            </div>
                        </div>
                        <div className="report-body-item">
                            <div className="item-header">
                                Candidate name
                            </div>
                            <div className="item-body">
                                Lovushkin Kyrylo
                            </div>
                        </div>
                        <div className="report-body-item">
                            <div className="item-header">
                                Date of Birth
                            </div>
                            <div className="item-body">
                                1990-09-05
                            </div>
                        </div>
                        <div className="report-body-item">
                            <div className="item-header">
                                1. Job Offer
                                <div className="badge"><img src="./check-simple.png" /> Passed</div>
                            </div>
                            <div className="item-body">
                                A Pass/Fail Requirement. There Is No Score In This Category
                            </div>
                        </div>
                        <div className="report-body-item">
                        <div className="item-header">
                                2. Work Experience
                                <div className="badge"><img src="./check-simple.png" /> Passed</div>
                            </div>
                            <div className="item-body">
                                 A Pass/Fail Requirement. There Is No Score In This Category
                            </div>
                        </div>
                        <div className="report-body-item">
                            <div className="item-header">
                                3. Language
                                <div className="badge"><img src="./check-simple.png" /> Passed</div>
                            </div>
                            <div className="item-body">
                                A Pass/Fail Requirement. There Is No Score In This Category
                            </div>
                        </div>
                        <div className="report-body-item">
                            <div className="item-header">
                                4. Settlement funds
                                <div className="badge"><img src="./check-simple.png" /> Passed</div>
                            </div>
                            <div className="item-body">
                                A Pass/Fail Requirement. There Is No Score In This Category
                            </div>
                        </div>
                    </div>

                    <div className="report-body-footer">
                        <div className="footer-icon">
                            <img src="./human-resources.png" />
                        </div>
                        <div className="footer-body">
                            <div className="title">
                                <img src="state.png" />
                                Eligible
                            </div>
                            <div className="description">
                                You are likely Eligible under the requirements of the Northwest Territories. PNP-Employer Driven Stream-Entry Level/Semi-Skilled Occupations.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReportForm;