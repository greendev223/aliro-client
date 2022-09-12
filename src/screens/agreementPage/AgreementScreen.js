import {useSelector} from "react-redux";
import {
    styled,
    Grid,
    Divider,
    Button,
    Typography,
    SvgIcon,
    Table,
    TableContainer,
    TableRow,
    TableHead,
    TableCell,
    TableBody,
    IconButton,
    Box
} from "@mui/material";
import FormSideBar from "../../components/common/FormSideBar/FormSideBar";
import VisaProcessSideBar from "../../components/common/VisaProcessSideBar/VisaProcessSideBar";
import {ReactComponent as CompanyLogo} from '../../Icons/companyLogo.svg'
import {ReactComponent as Arrow} from '../../Icons/arrow-long.svg'
// import {ReactComponent as Download} from '../../Icons/download.svg'
import {ReactComponent as Eye} from '../../Icons/eye.svg'
import {ReactComponent as Edit} from '../../Icons/edit.svg'
import {ReactComponent as Upload} from '../../Icons/upload.svg'
import {ReactComponent as Signature} from '../../Icons/signature.svg'

import {ReactComponent as Download} from '../../Icons/download.svg'
import {useState} from "react";
import {VisaPageManagement} from "../../redux/visaPageManagement";

const AgreementWrapper = styled(Grid)`
  position: relative;
  display: flex;
  flex-direction: row;
  //padding: 38px 40px 51px 41px;
  width: 1256px;
  height: 786px;
  margin: 0 auto;
  top: 132px;
  background:#FFFFFF;
  //#FFFFFF
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.03);
  border-radius: 4px
`

const InfoWrapper = styled(Grid)`
  display: flex;
  flex-direction: column;
  padding: 40px;
  width: 100%;
`

const SectionText = styled(Typography)`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 34px;
  text-transform: capitalize;
  color: #282828;
`

const ConsultWrapper = styled(Grid)`
  width: 325px;
  height: 36.95px;
  margin-top: 40px;
  display: flex;
  gap: 20px;
  align-items: center;
  flex-direction: row;
`

const ConsulText = styled(Typography)`
  height: 20px;
  font-family: ${(props) => props.family ? props.family : 'Montserrat'};
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  text-decoration-line: ${(props) => props.decoration ? 'underline' : ''};
  color: #282828;`

const InfoText = styled(Typography)`
  width: 852px;
  height: 72px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  color: #282828;
  margin-top: 12px;
`

const MilestonesText = styled(Typography)`
  width: 123px;
  height: 27px;
  font-family: 'Montserrat';
  margin-top: 40px;
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 27px;
  text-transform: capitalize;
  color: #282828
`

const TotalPriceWrapper = styled(Grid) `
  width: 182px;
  height: 24px;
  margin-top: 37px;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  gap: 8px;
  margin-left: auto
`

const ButtonsWrapper = styled(Grid)`
  width: 229px;
  height: 41px;
  margin-top: 41px;
  margin-left: auto;
  gap:24px
`

const OfferButton = styled(Button)`
  width: 130px;
  height: 41px;
  border: 2px solid #752AFF;
  border-radius: 4px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  text-transform: capitalize;
  color: #282828;
`

const AgreeButton = styled(Button)`
  width: 75px;
  height: 41px;
  background: #F3A712;
  border-radius: 4px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  text-transform: capitalize;
  color: #FFFFFF;
  margin-left: 24px;
`


function createData(
    name,
    explanation,
    price,
) {
    return { name, explanation, price };
}

function createDocument(
    name,
    status,
) {
    return { name, status };
}

const rows = [
    createData('01 - Down payment', 'Paid once service agreement is signed', 200),
    createData('02 - Second payment', 'Paid once service agreement is signed', 350),
    createData('03 - Third payment', 'Paid once service agreement is signed', 400),
];

const documents = [
    createDocument('Document Name.pdf', 'Approved'),
    createDocument('Document Name2.pdf', 'Fix required' ),
    createDocument('Document Name3.pdf', 'Missing'),
    createDocument('Document Name4.pdf', 'Waiting for approval'),
    createDocument('Document Name5.pdf', 'Signature required'),
];


const AgreementPage = () => {
    const { visaPageManage } = useSelector(
        state => state
    )
    const [agreementSection, setAgreementSection] = useState()

    const setAction = (status) => {
        switch (status) {
            case 'Approved':
                return (
                    <>
                        <IconButton style={{border: '2px solid #E7E7E7' ,borderRadius: 4, padding: 10}}>
                            <SvgIcon style={{width: 21, height: 20}} viewBox='0 0 21 20' onClick={() => console.log('sfsaf')}  component={Eye}/>
                        </IconButton>
                        <IconButton style={{border: '2px solid #E7E7E7' ,borderRadius: 4 , marginLeft: 15}}>
                            <SvgIcon style={{width: 20, height: 16}} onClick={() => console.log('sfsaf')}  viewBox='0 0 20 16'  fill='black' component={Download}/>
                        </IconButton>
                    </>);
            case 'Fix required':
                return (
                    <>
                        <IconButton style={{border: '2px solid #E7E7E7' ,borderRadius: 4, padding: 10}}>
                            <SvgIcon style={{width: 21, height: 20}} viewBox='0 0 21 20' onClick={() => console.log('sfsaf')}  component={Edit}/>
                        </IconButton>
                        <IconButton style={{border: '2px solid #E7E7E7' ,borderRadius: 4 , marginLeft: 15}}>
                            <SvgIcon style={{width: 20, height: 16}}   onClick={() => console.log('sfsaf')} viewBox='0 0 20 16'   fill='black' component={Download}/>
                        </IconButton>
                    </>
                )
            case 'Missing' :
                return (
                    <IconButton style={{border: '2px solid #E7E7E7' ,borderRadius: 4, padding: 10}}>
                        <SvgIcon style={{width: 18, height: 14}} viewBox='0 0 18 14' onClick={() => console.log('sfsaf')}  component={Upload}/>
                    </IconButton>
                )
            case 'Waiting for approval' :
                return (
                    <>
                        <IconButton style={{border: '2px solid #E7E7E7' ,borderRadius: 4, padding: 10}}>
                            <SvgIcon style={{width: 21, height: 20}} viewBox='0 0 21 20' onClick={() => console.log('sfsaf')}  component={Eye}/>
                        </IconButton>
                        <IconButton style={{border: '2px solid #E7E7E7' ,borderRadius: 4 , marginLeft: 15}}>
                            <SvgIcon style={{width: 20, height: 16}}  onClick={() => console.log('sfsaf')}  viewBox='0 0 20 16'  fill='black' component={Download}/>
                        </IconButton>
                    </>
                )
            case 'Signature required' :
                return (
                   <>
                       <IconButton style={{border: '2px solid #E7E7E7' ,borderRadius: 4, padding: 10}}>
                           <SvgIcon style={{width: 21, height: 20}} viewBox='0 0 21 20' onClick={() => console.log('sfsaf')}  component={Signature}/>
                       </IconButton>
                       <IconButton style={{border: '2px solid #E7E7E7' ,borderRadius: 4 , marginLeft: 15}}>
                           <SvgIcon style={{width: 20, height: 16}}  onClick={() => console.log('sfsaf')}  viewBox='0 0 20 16'  fill='black' component={Download}/>
                       </IconButton>
                   </>
                )

        }
    }

    const setStatus = (status) => {
        switch (status) {
          case 'Approved':
              return <Typography style={{
                  width: '90.02px',
                  height: '28px',
                  border: '2px solid rgba(0, 203, 20, 0.7)',
                  borderRadius: '3px',
                  fontFamily: 'Montserrat',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  fontSize: '13px',
                  lineHeight: '16px',
                  color: '#282828',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
              }}> Approved </Typography>
            case 'Fix required':
                return <Typography style={{
                    width: '103px',
                    height: '28px',
                    border: '2px solid rgba(252, 197, 57, 0.7)',
                    borderRadius: '3px',
                    fontFamily: 'Montserrat',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    fontSize: '13px',
                    lineHeight: '16px',
                    color: '#282828',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}> Fix required </Typography>
            case 'Missing' :
                return <Typography style={{
                    width: '90.02px',
                    height: '28px',
                    border: '2px solid rgba(255, 39, 39, 0.6)',
                    borderRadius: '3px',
                    fontFamily: 'Montserrat',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    fontSize: '13px',
                    lineHeight: '16px',
                    color: '#282828',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}> Missing </Typography>
            case 'Waiting for approval' :
                return <Typography style={{
                    width: '159px',
                    height: '28px',
                    border: '2px solid rgba(117, 42, 255, 0.4)',
                    borderRadius: '3px',
                    fontFamily: 'Montserrat',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    fontSize: '13px',
                    lineHeight: '16px',
                    color: '#282828',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}> Waiting for approval </Typography>
            case 'Signature required' :
                return <Typography style={{
                    width: '149px',
                    height: '28px',
                    border: '2px solid rgba(252, 197, 57, 0.7)',
                    borderRadius: '3px',
                    fontFamily: 'Montserrat',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    fontSize: '13px',
                    lineHeight: '16px',
                    color: '#282828',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}> Signature required </Typography>
        }
    }

    const assessment = useSelector(state => state.assessment);
    return(
        <AgreementWrapper  >
            <VisaProcessSideBar/>
            <Divider flexItem orientation='vertical'/>
            <InfoWrapper>
                <SectionText>{visaPageManage.pageSectionName}</SectionText>
                <Grid style={{display: 'flex', alignItems: 'center'}}>
                    <ConsultWrapper>
                        <SvgIcon  style={{width: '32px', height: '38px'}}  viewBox='0 0 32 38' component={CompanyLogo}/>
                        <ConsulText decoration={true}>Stars Consult</ConsulText>
                        <SvgIcon style={{width: '14px', height: '14px'}} viewBox='0 0 14 14' component={Arrow} />
                        <ConsulText> Lovushkin K.</ConsulText>
                    </ConsultWrapper>
                    {visaPageManage.pageSectionName === 'Documents' && (
                        <>
                            <SvgIcon style={{marginLeft: 'auto', marginTop: 40, width: '20px', height: '16px'}} viewBox='0 0 20 16' onClick={() => console.log('sfsaf')}  fill='black' component={Download}/>
                            <Typography
                                style={{
                                    fontFamily: 'Assistant',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    fontSize: '15px',
                                    lineHeight: '20px',
                                    marginLeft: '16px',
                                    marginTop: '37px',
                                    color:'grey'}}
                            >Download selected</Typography>
                        </>
                    )}
                </Grid>
                {visaPageManage.pageSectionName === 'Agreement' ? (
                    <>
                        <ConsulText style={{marginTop: '28px'}}  family='Assistant'> Service description:</ConsulText>
                        <InfoText>This list of companies and startups in West Coast with more than 500 employees provides data on their funding history,
                        investment activities, and acquisition trends. Insightsabout top trending companies, startups, investments and M&A activities,
                        notable investors of these companies, their management team, and recent news are also included.
                        </InfoText>
                        <MilestonesText> Milestones</MilestonesText>
                        <TableContainer style={{marginTop: '29px'}}  >
                            <Table
                                sx={{ minWidth: 650 }} >
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{background: '#FCFAFF', border: '1px solid rgba(224, 224, 224, 1)' }}>Name</TableCell>
                                        <TableCell style={{background: '#FCFAFF',  border: '1px solid rgba(224, 224, 224, 1)'}} align="left">Explanation</TableCell>
                                        <TableCell style={{background: '#FCFAFF', border: '1px solid rgba(224, 224, 224, 1)'  }} align="left">Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            style={{  border: 0 }}
                                        >
                                            <TableCell style={{ border: '1px solid rgba(224, 224, 224, 1)'  }} component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell style={{ border: '1px solid rgba(224, 224, 224, 1)'  }} align="left">{row.explanation}</TableCell>
                                            <TableCell  style={{ border: '1px solid rgba(224, 224, 224, 1)'  }} align="left">{row.price}$</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TotalPriceWrapper>
                            <Typography
                                style={{
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    fontSize: '17px',
                                    lineHeight: '22px',
                                    color: '#282828'
                                }}
                            >Total Service fee:
                            </Typography>
                            <Typography style={{
                                fontStyle: 'normal',
                                fontWeight: '700',
                                fontSize: '18px',
                                lineHeight: '24px',
                                flexGrow: 0,
                                color: '#282828'
                                }}>950$
                            </Typography>
                        </TotalPriceWrapper>
                        <ButtonsWrapper>
                            <OfferButton>Counter Offer</OfferButton>
                            <AgreeButton>Agree</AgreeButton>
                        </ButtonsWrapper>
                    </>
                ) : (
                    <>
                        <TableContainer style={{marginTop: '29px'}}  >
                            <Table sx={{ minWidth: 650 }} >
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{background: '#FCFAFF', border: '1px solid rgba(224, 224, 224, 1)' }}>Name</TableCell>
                                        <TableCell style={{background: '#FCFAFF',  border: '1px solid rgba(224, 224, 224, 1)'}} align="left">Status</TableCell>
                                        <TableCell style={{background: '#FCFAFF', border: '1px solid rgba(224, 224, 224, 1)'  }} align="left">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {documents.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            style={{  border: 0 }}
                                        >
                                            <TableCell style={{ border: '1px solid rgba(224, 224, 224, 1)'  }} component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell style={{ border: '1px solid rgba(224, 224, 224, 1)'  }} align="left">{setStatus(row.status)}</TableCell>
                                            <TableCell  style={{ border: '1px solid rgba(224, 224, 224, 1)'  }} align="right">{setAction(row.status)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                        </TableContainer>
                    </>
                )}
            </InfoWrapper>
        </AgreementWrapper>
    )
}

export default AgreementPage