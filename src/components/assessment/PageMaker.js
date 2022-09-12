import './assessment.css';
import { Fragment } from 'react';


const PAGE_LENGTH = 1123;


export const PageMaker = ({ pageItems }) => {
    const pages = [];
    let currentPageContent = [];
    let remainingPageLength = PAGE_LENGTH;

    // loop through content
    for (let pageItem of pageItems) {
        
        if (pageItem.height > remainingPageLength) {
            pages.push(<Page items={currentPageContent} />);
            remainingPageLength = PAGE_LENGTH;
            currentPageContent = [];
        }
        currentPageContent.push(pageItem.jsx);
        remainingPageLength -= pageItem.height;
    }
    pages.push(<Page items={currentPageContent} />);
    
    return (
        <>  
            {pages.map((page, key) => <Fragment key={key}>{page}</Fragment>)}
        </>
    )
        
}


const Page = ({ items }) => {
    
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className='results-card'>
                <div className='results-report'>
                    {items.map((item, key) => <Fragment key={key}>{item}</Fragment>)}
                </div>
            </div>
        </div>
    )
}

// const item_height = ({ margin_bottom, margin_top, n_lines, line_height }) => {
//     return margin_bottom + margin_top + n_lines * line_height
// }
    

// const Table = ({ title, data }) => {
    
//     // component height
//     const n_rows = data.length + title? 1:0;
//     const height_props = {
//         margin_top: 15,
//         margin_bottom: 15,
//         n_lines: n_rows,
//         line_height: 14
//     }
//     const height = item_height(height_props)


//     if (!data)
//         return <></> 
    
//     const rows = []       
//     for (let i=0; i<data.length; i++) {
//         let rowData = data[i]
//         const tmp = (
//             <tr>
//                 {rowData.map((val, key) => {
//                     if (i===0)
//                         return <th key={key}>{val}</th>
//                     else
//                         return <td key={key}>{val}</td>
//                 })}
//             </tr>
//         )
//         rows.push(tmp)
//     }
//     const body =  (
//         <>
//             <p className='table-heading'>{title}</p>
//             <table>{rows}</table>
//         </>
//     )
    
//     return (
//         {
//             height: height,
//             jsx: body
//         }
//     )
// }
