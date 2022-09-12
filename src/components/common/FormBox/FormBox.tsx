import React from 'react';
import "./formBox.css";
import { useDispatch, useSelector } from 'react-redux';
import { formCounterSlice } from '../../../redux/formCounter';
import { RootState } from '../../../store';
import { saveProgress } from '../../../contexts/requests';

interface Props {
    children: React.ReactNode,
    validation?: CallableFunction
    tableName: string
    data: object
}

const FormBox = (props: Props) => {
    const dispatch = useDispatch();
    const { next, prev } = formCounterSlice.actions
    
    const { screen, no_screens } = useSelector((state: RootState) => state.formCounter);
    let hideLeftButton = screen <= 1;
    let hideRightButton = screen >= no_screens;
    
    const handleLeftClick = () => { 
        // if (!props.validation || props.validation()) {
        //     saveProgress(props.tableName, props.data); 
            dispatch(prev());
        // }
    }

    const handleRightClick = () => {
     
        if (!props.validation || props.validation()) {
            saveProgress(props.tableName, props.data); 
            dispatch(next());
        }
    }

    return (
        <div className="form-container" >            
            {props.children}
            <div className='actions-group'>
                <ButtonLeft handleClick={handleLeftClick} hide={hideLeftButton} />
                <ButtonRight handleClick={handleRightClick} hide={hideRightButton} />
            </div>            
        </div>
    )
}

type ButtonProps = {
    handleClick: React.MouseEventHandler<HTMLButtonElement>;
    hide: Boolean;
};

const ButtonLeft = ({ handleClick, hide }: ButtonProps) => {
    if (hide)
        return <div style={{ height: 44, width: 44 }}/>
    else
        return (
            <button id="right" className="round-button left" onClick={handleClick}>
                Back
            </button>
    )
}

const ButtonRight = ({ handleClick, hide }: ButtonProps) => {
    if (hide)
        return <div style={{ height: 44, width: 44 }}/>
    else
        return (
            <button id="right" className="round-button right" onClick={handleClick}>
                Next
            </button>
    )
}


export default FormBox