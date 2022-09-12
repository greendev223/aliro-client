import './entriesList.css'

export const Entry = ({ handleModify, handleRemove, title }) => {


    return (
        <div className="entries-box">
            <div className="modify-list">
                <button className="modify-label" onClick={handleRemove}><p className="modify-label-text">X</p></button>
            </div>
            <div className="entries-box-title" onClick={handleModify}>{title}</div>
        </div>
    )
}


const makeId = (entry, keys) => {
    const idComponents = keys.map(key => entry[key]);
    return idComponents.join(" ")
}

const removeEntry = (entries, ind) => {
    return entries.filter((_, index) => index!==ind)
}

export const EntriesList = ({ entries, updateEntries, set, keys }) => {

    const handleRemove = (id) => {
        const list = entries.map(entry => makeId(entry, keys))
        const i = list.indexOf(id)
        updateEntries(removeEntry(entries,i))
        // remove(i)
    }

    const handleModify = (id) => {
        const list = entries.map(entry => makeId(entry, keys))
        const i = list.indexOf(id)
        set(entries[i])
    }

    return (
        <div className="listed-items">
            {
                entries.map((entry, ind) => {
                    const id = makeId(entry, keys)
                    return (
                        <Entry
                            key={ind}
                            handleModify={() => handleModify(id)}
                            handleRemove={() => handleRemove(id)}
                            title={id}
                        />
                    )
                })}
        </div>
    )
}

export default EntriesList