import { useEffect, useRef } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './FormSideBar.css'

interface Props {
    screen: number,
    numberOfForms: number
}

const FormSideBar = ({ screen, numberOfForms }: Props) => {

    const scrollRef = useRef<any>();

    const moveScrollRight = (scrollOffset:number) => {
        scrollRef.current.scrollLeft += scrollOffset;
    }

    const moveScrollLeft = (scrollOffset:number) => {
        scrollRef.current.scrollLeft -= scrollOffset;
    }

    const moveScrollTo = (scrollOffset:number) => {
        scrollRef.current.scrollLeft = (screen -1)*scrollOffset;
    }

    useEffect(()=>{
        moveScrollTo(300);
    },[screen])

    return (
        <>
        <div className='formSideBarContainer' ref={scrollRef}>
            <div className={`sb-item  first-item ${screen == 1 ? 'active' : ''}`}>
                <div className='item-left'>
                    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 10C10.757 10 13 7.757 13 5C13 2.243 10.757 0 8 0C5.243 0 3 2.243 3 5C3 7.757 5.243 10 8 10ZM8 2C9.654 2 11 3.346 11 5C11 6.654 9.654 8 8 8C6.346 8 5 6.654 5 5C5 3.346 6.346 2 8 2Z" fill={screen == 1?"#752AFF":"#2C2C2C"}/>
                        <path d="M11 12H5C2.243 12 0 14.243 0 17V19C0 19.553 0.448 20 1 20H15C15.552 20 16 19.553 16 19V17C16 14.243 13.757 12 11 12ZM14 18H2V17C2 15.346 3.346 14 5 14H11C12.654 14 14 15.346 14 17V18Z" fill={screen == 1?"#752AFF":"#2C2C2C"}/>
                    </svg>
                    <p className='sb-item-text'>General Info</p>
                </div>                
                <div className='item-right'>
                    {
                        screen == 1 && (
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="16" cy="16" r="16" fill="#F3F1FF"/>
                                <circle cx="16" cy="16" r="6" fill="#752AFF"/>
                            </svg>
                        )
                    }
                    
                </div>
            </div>
            <div className={`sb-item ${screen == 2 ? 'active' : ''}`}>
                <div className='item-left'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" fill="#2C2C2C"/>
                    <path d="M12 18C8.7 18 6 15.3 6 12C6 8.7 8.7 6 12 6C15.3 6 18 8.7 18 12C18 15.3 15.3 18 12 18ZM12 8C9.8 8 8 9.8 8 12C8 14.2 9.8 16 12 16C14.2 16 16 14.2 16 12C16 9.8 14.2 8 12 8Z" fill={screen == 2?"#752AFF":"#2C2C2C"}/>
                    <path d="M12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22ZM12 4C7.6 4 4 7.6 4 12C4 16.4 7.6 20 12 20C16.4 20 20 16.4 20 12C20 7.6 16.4 4 12 4Z" fill={screen == 2?"#752AFF":"#2C2C2C"}/>
                </svg>
                    <p className='sb-item-text'>Purpose</p>
                </div>                
                <div className='item-right'>
                    {
                        screen == 2 && (
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="16" cy="16" r="16" fill="#F3F1FF"/>
                                <circle cx="16" cy="16" r="6" fill="#752AFF"/>
                            </svg>
                        )
                    }
                </div>
            </div>
            <div className={`sb-item ${screen == 3 ? 'active' : ''}`}>
                <div className='item-left'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 19V9C22 8.20435 21.6839 7.44129 21.1213 6.87868C20.5587 6.31607 19.7956 6 19 6H17V4C17 3.46957 16.7893 2.96086 16.4142 2.58579C16.0391 2.21071 15.5304 2 15 2H9C8.46957 2 7.96086 2.21071 7.58579 2.58579C7.21071 2.96086 7 3.46957 7 4V6H5C4.20435 6 3.44129 6.31607 2.87868 6.87868C2.31607 7.44129 2 8.20435 2 9V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22ZM9 4H15V6H9V4ZM4 9C4 8.73478 4.10536 8.48043 4.29289 8.29289C4.48043 8.10536 4.73478 8 5 8H19C19.2652 8 19.5196 8.10536 19.7071 8.29289C19.8946 8.48043 20 8.73478 20 9V19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V9Z" fill={screen == 3?"#752AFF":"#2C2C2C"}/>
                </svg>
                <p className='sb-item-text'>Work Experience</p>
                </div>                
                <div className='item-right'>
                    {
                        screen == 3 && (
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="16" cy="16" r="16" fill="#F3F1FF"/>
                                <circle cx="16" cy="16" r="6" fill="#752AFF"/>
                            </svg>
                        )
                    }
                </div>
            </div>
            <div className={`sb-item ${screen == 4 ? 'active' : ''}`}>
                <div className='item-left'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.5476 7.49525C21.2447 7.09017 20.8318 6.74407 20.3795 6.51596L14.3307 3.63314C13.6424 3.22412 12.8598 3.00781 12.0575 3.00781C11.2827 3.00781 10.5197 3.21232 9.85113 3.59382L3.73546 6.51596C3.71187 6.52776 3.68434 6.54349 3.6568 6.55922C2.13477 7.43233 1.60383 9.37912 2.473 10.9011C2.76797 11.4203 3.20452 11.8411 3.7276 12.1243H3.73153H3.73546L5.33615 12.8873V16.8123C5.33615 17.7287 5.62326 18.6018 6.166 19.3372C6.70874 20.0727 7.45599 20.6076 8.33303 20.8789C9.5011 21.2172 10.7085 21.3863 11.9238 21.3863C11.967 21.3863 12.0103 21.3863 12.0536 21.3863C12.1007 21.3863 12.1479 21.3863 12.1951 21.3863C13.4065 21.3863 14.6099 21.2172 15.7741 20.8829C16.6472 20.6115 17.3984 20.0766 17.9411 19.3412C18.4838 18.6057 18.771 17.7287 18.771 16.8162V12.8873L20.1042 12.2501V18.7748C20.1042 19.3136 20.5408 19.7502 21.0796 19.7502C21.6184 19.7502 22.0549 19.3136 22.0549 18.7748V8.92683C22.0628 8.44308 21.8858 7.94754 21.5476 7.49525ZM7.28294 13.8194L9.78033 15.0071C10.4725 15.4161 11.2591 15.6324 12.0614 15.6324H12.0732C12.0811 15.6324 12.0929 15.6324 12.1007 15.6324C12.8598 15.6324 13.607 15.4279 14.2599 15.0464L16.8242 13.8194V16.8202C16.8242 17.3157 16.6708 17.7877 16.3758 18.1849C16.0848 18.5821 15.6797 18.8731 15.2077 19.0226C14.2245 19.3018 13.2098 19.4434 12.1873 19.4434C12.144 19.4434 12.0968 19.4434 12.0536 19.4434C12.0103 19.4434 11.9631 19.4434 11.9198 19.4434C10.8973 19.4434 9.88259 19.3018 8.89936 19.0226C8.42742 18.8731 8.02626 18.586 7.73129 18.1849C7.44026 17.7877 7.28294 17.3118 7.28294 16.8202V13.8194ZM13.3514 13.3238L13.3475 13.3277L13.3435 13.3317C12.9542 13.5598 12.5098 13.6778 12.0614 13.6778C11.5855 13.6778 11.1254 13.5441 10.7203 13.2963L10.7124 13.2924L10.7046 13.2884L4.6479 10.4056C4.36079 10.2483 4.14842 9.98872 4.05403 9.67408C3.95964 9.35945 3.99503 9.02515 4.14842 8.73412C4.25854 8.53354 4.41979 8.36443 4.61643 8.25037L10.7636 5.31643L10.7675 5.31249L10.7714 5.30856C11.1608 5.08439 11.6052 4.96247 12.0536 4.96247C12.5294 4.96247 12.9896 5.09225 13.3947 5.34396L13.4025 5.34789L13.4104 5.35182L19.4592 8.23464C19.8525 8.45488 20.1003 8.87177 20.1042 9.32405C20.1042 9.75274 19.8879 10.1421 19.5261 10.3741L13.3514 13.3238Z" fill={screen == 4?"#752AFF":"#2C2C2C"}/>
                </svg>
                <p className='sb-item-text'>Education</p>
                </div>                
                <div className='item-right'>
                    {
                        screen == 4 && (
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="16" cy="16" r="16" fill="#F3F1FF"/>
                                <circle cx="16" cy="16" r="6" fill="#752AFF"/>
                            </svg>
                        )
                    }
                </div>
            </div>
            <div className={`sb-item ${screen == 5 ? 'active' : ''}`}>
                <div className='item-left'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM18.917 8H16.612C16.364 6.802 16.007 5.735 15.56 4.847C16.964 5.548 18.132 6.647 18.917 8ZM20 12C20 12.691 19.902 13.359 19.737 14H16.907C16.967 13.356 17 12.689 17 12C17 11.311 16.967 10.644 16.907 10H19.737C19.902 10.641 20 11.309 20 12ZM12 20C11.157 20 10.051 18.52 9.445 16H14.554C13.949 18.52 12.843 20 12 20ZM9.108 14C9.041 13.371 9 12.707 9 12C9 11.293 9.041 10.629 9.108 10H14.891C14.959 10.629 15 11.293 15 12C15 12.707 14.959 13.371 14.892 14H9.108ZM4 12C4 11.309 4.098 10.641 4.263 10H7.093C7.033 10.644 7 11.311 7 12C7 12.689 7.033 13.356 7.093 14H4.263C4.098 13.359 4 12.691 4 12ZM12 4C12.843 4 13.949 5.48 14.555 8H9.445C10.051 5.48 11.157 4 12 4ZM8.439 4.847C7.993 5.735 7.635 6.802 7.388 8H5.083C5.868 6.647 7.036 5.548 8.439 4.847ZM5.083 16H7.388C7.636 17.198 7.993 18.265 8.44 19.153C7.036 18.452 5.868 17.353 5.083 16ZM15.561 19.153C16.007 18.264 16.365 17.198 16.613 16H18.918C18.132 17.353 16.964 18.452 15.561 19.153Z" fill={screen == 5?"#752AFF":"#2C2C2C"}/>
                    </svg>
                    <p className='sb-item-text'>Language Proficiency</p>
                </div>                
                <div className='item-right'>
                    {
                        screen == 5 && (
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="16" cy="16" r="16" fill="#F3F1FF"/>
                                <circle cx="16" cy="16" r="6" fill="#752AFF"/>
                            </svg>
                        )
                    }
                </div>
            </div>
            <div className={`sb-item ${screen == 6 ? 'active' : ''}`}>
                <div className='item-left'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 22C18.83 22 18.658 21.956 18.504 21.868L12 18.151L5.49602 21.868C5.14202 22.068 4.70302 22.037 4.38302 21.787C4.06302 21.536 3.92702 21.116 4.03902 20.725L5.87702 14.29L2.29302 10.706C2.02802 10.441 1.93402 10.051 2.04802 9.69298C2.16202 9.33698 2.46602 9.07398 2.83602 9.01198L8.33402 8.09598L11.106 2.55098C11.445 1.87298 12.556 1.87298 12.895 2.55098L15.667 8.09598L21.165 9.01198C21.534 9.07398 21.838 9.33598 21.953 9.69298C22.067 10.05 21.973 10.441 21.708 10.706L18.124 14.29L19.91 20.541C19.98 20.679 20.02 20.835 20.02 21C20.02 21.556 19.525 21.981 19.01 22C19.007 22 19.003 22 19 22ZM12 16C12.171 16 12.342 16.044 12.496 16.132L17.364 18.913L16.039 14.274C15.939 13.925 16.037 13.549 16.293 13.293L18.919 10.667L14.836 9.98598C14.521 9.93298 14.249 9.73298 14.106 9.44698L12 5.23598L9.89502 9.44698C9.75102 9.73298 9.48002 9.93398 9.16502 9.98598L5.08202 10.667L7.70802 13.293C7.96502 13.55 8.06202 13.926 7.96202 14.274L6.63702 18.913L11.505 16.132C11.658 16.044 11.829 16 12 16Z" fill={screen == 6?"#752AFF":"#2C2C2C"}/>
                    </svg>
                    <p className='sb-item-text'>Job Offer</p>
                </div>                
                <div className='item-right'>
                    {
                        screen == 6 && (
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="16" cy="16" r="16" fill="#F3F1FF"/>
                                <circle cx="16" cy="16" r="6" fill="#752AFF"/>
                            </svg>
                        )
                    }
                </div>
            </div>

            <div className={`sb-item ${screen == 7 ? 'active' : ''}`}>
                <div className='item-left'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 15C9.206 15 11 13.206 11 11C11 8.794 9.206 7 7 7C4.794 7 3 8.794 3 11C3 13.206 4.794 15 7 15ZM7 9C8.103 9 9 9.897 9 11C9 12.103 8.103 13 7 13C5.897 13 5 12.103 5 11C5 9.897 5.897 9 7 9Z" fill={screen == 7?"#752AFF":"#2C2C2C"}/>
                        <path d="M8 16H6C3.794 16 2 17.794 2 20V21C2 21.553 2.448 22 3 22H11C11.552 22 12 21.553 12 21V20C12 17.794 10.206 16 8 16ZM4 20C4 18.897 4.897 18 6 18H8C9.103 18 10 18.897 10 20H4Z" fill={screen == 7?"#752AFF":"#2C2C2C"}/>
                        <path d="M18 11H16C13.794 11 12 12.794 12 15V16C12 16.553 12.448 17 13 17H21C21.552 17 22 16.553 22 16V15C22 12.794 20.206 11 18 11ZM14 15C14 13.897 14.897 13 16 13H18C19.103 13 20 13.897 20 15H14Z" fill={screen == 7?"#752AFF":"#2C2C2C"}/>
                        <path d="M17 10C19.206 10 21 8.206 21 6C21 3.794 19.206 2 17 2C14.794 2 13 3.794 13 6C13 8.206 14.794 10 17 10ZM17 4C18.103 4 19 4.897 19 6C19 7.103 18.103 8 17 8C15.897 8 15 7.103 15 6C15 4.897 15.897 4 17 4Z" fill={screen == 7?"#752AFF":"#2C2C2C"}/>
                    </svg>
                    <p className='sb-item-text'>Relatives Abroad</p>
                </div>                
                <div className='item-right'>
                    {
                        screen == 7 && (
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="16" cy="16" r="16" fill="#F3F1FF"/>
                                <circle cx="16" cy="16" r="6" fill="#752AFF"/>
                            </svg>
                        )
                    }
                </div>
            </div>

            <div className={`sb-item ${screen == 8 ? 'active' : ''}`}>
                <div className='item-left'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 2H5C3.346 2 2 3.346 2 5V17C2 18.302 2.839 19.402 4 19.816V20C4 21.103 4.897 22 6 22C7.103 22 8 21.103 8 20H16C16 21.103 16.897 22 18 22C19.103 22 20 21.103 20 20V19.816C21.161 19.402 22 18.302 22 17V5C22 3.346 20.654 2 19 2ZM20 17C20 17.551 19.551 18 19 18H16H8H5C4.449 18 4 17.551 4 17V5C4 4.449 4.449 4 5 4H19C19.551 4 20 4.449 20 5V17Z" fill={screen == 8?"#752AFF":"#2C2C2C"}/>
                        <path d="M12 6C10.07 6 8.5 7.57 8.5 9.5C8.5 11.08 9.559 12.403 11 12.837V15C11 15.552 11.448 16 12 16C12.552 16 13 15.552 13 15V12.837C14.441 12.403 15.5 11.08 15.5 9.5C15.5 7.57 13.93 6 12 6ZM12 11C11.173 11 10.5 10.327 10.5 9.5C10.5 8.673 11.173 8 12 8C12.827 8 13.5 8.673 13.5 9.5C13.5 10.327 12.827 11 12 11Z" fill={screen == 8?"#752AFF":"#2C2C2C"}/>
                    </svg>

                    <p className='sb-item-text'>Investment Abroad</p>
                </div>                
                <div className='item-right'>
                    {
                        screen == 8 && (
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="16" cy="16" r="16" fill="#F3F1FF"/>
                                <circle cx="16" cy="16" r="6" fill="#752AFF"/>
                            </svg>
                        )
                    }
                </div>
            </div>
           

        </div>
         <div className='scroll-container'>
            <button className='scroll-btn-left' onClick={()=>moveScrollLeft(300)}> <FaArrowLeft /> </button>
            <button className='scroll-btn-right' onClick={()=>moveScrollRight(300)}> <FaArrowRight /> </button>
        </div>
        </>
    )
}

export default FormSideBar;