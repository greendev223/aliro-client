import { formTitle, formSubTitle } from '../../../screens/FormPage'
import './formHeader.css'

interface Props {
    screen: number,
    numberOfForms: number
}

const FormHeader = ({ screen, numberOfForms }: Props) => {
    return (
        <div style={{ minWidth: 1050 }}>
            <div className="container" style={{ marginTop: 75 }}>
                <h2 style={{ margin: '0px 0px 0px 60px' }}>General application form</h2>
            </div>

            <div className="container form-header">
                <h1 className='screen-tracker'>
                    {screen}/{numberOfForms}
                </h1>
                <div style={{ width: 660}}>
                    <div>
                        <h1 style={{ margin: 0 }}>{formTitle(screen)}</h1>
                        <p style={{ margin: 0, fontSize: 13 }}>
                            {formSubTitle(screen)}
                        </p>
                    </div>
                </div>
                {//<button className="btn-grad" style={{ marginRight: 60, alignSelf: 'center' }}>
                    //   save progress
                    //</button>
                }
                <div style={{ width: 140 }}></div>
            </div>
        </div>
    )
}

export default FormHeader