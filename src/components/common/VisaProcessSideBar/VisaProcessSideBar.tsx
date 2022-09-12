import {styled, Grid,  Typography, Box , Button ,SvgIcon, Divider, IconButton} from "@mui/material";
import {ReactComponent as Status} from '../../../Icons/processing-oval.svg'
import {ReactComponent as Vector} from '../../../Icons/vector.svg'
import {ReactComponent as Document} from '../../../Icons/document.svg'
import {ReactComponent as Help} from '../../../Icons/help.svg'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from '../../../store'

import { pink } from '@mui/material/colors';
import {VisaPageManagement, visaPageManageSlice} from "../../../redux/visaPageManagement";
import {AgreementSvg, DocumentSvg} from "../../../Icons/changeColorIcons";

const SideBarWrapper = styled(Grid)`
  display: flex;
  margin: 38px 0 0 41px;
  flex-direction: column;
  width: 268px;
  height: 243px;
`

const WaitForInvite = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  gap: 8px;
  width: 268px;
  height: 20px;
  margin-top: 11px;
`

const StatusText = styled(Typography)<{width: string, fontWeight: string}>`
  width: ${(props) => props.width};
  height: 20px;
  font-family: 'Assistant';
  font-style: normal;
  font-weight: ${(props) => props.fontWeight};
  font-size: 15px;
  line-height: 20px;
  color: #282828;`

const ProcessButton = styled(Button)<{textColor?:boolean}>`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  text-transform: capitalize;
  color: ${props => props.textColor   ? '#752AFF': '#282828'};
  justify-content: flex-start;
  margin-top: 33px;
`




const VisaProcessSideBar = () => {
    const dispatch = useDispatch();
    const {changePage} = visaPageManageSlice.actions
    const { pageSectionName } = useSelector(
        (state : RootState) => state.visaPageManage
    )


    const checkFunction =  (pageName:string) => {
        dispatch(changePage(pageName))
    }





    return (
        <SideBarWrapper>
            <StatusText width='120px'  fontWeight='400'>Application Status:</StatusText>
            <WaitForInvite>
                <SvgIcon component={Status}/>
                <StatusText width='204px'  fontWeight='600'>Applied - waiting for invitation</StatusText>
                <SvgIcon style={{width: '6px', height: '10px'}} viewBox='0 0 6 10' component={Vector}/>
            </WaitForInvite>
            <Divider style={{marginTop: 18, width: "94%"}} />
            <ProcessButton
                textColor={pageSectionName === 'Agreement'}
                startIcon={<AgreementSvg fill={pageSectionName === 'Agreement' ? '#752AFF': '#282828'}/>} onClick={() => checkFunction('Agreement')}
            >Agreement
            </ProcessButton>
            <ProcessButton
                textColor={pageSectionName === 'Documents'}
                startIcon={<DocumentSvg  fill={pageSectionName === 'Documents' ? '#752AFF': '#282828'}/>} onClick={() => checkFunction('Documents')}
            >Documents
            </ProcessButton>
            <Divider style={{marginTop: 18, width: "94%"}} />
            <ProcessButton startIcon={<Help/>} >Documents</ProcessButton>
        </SideBarWrapper>
    )
}

export default VisaProcessSideBar