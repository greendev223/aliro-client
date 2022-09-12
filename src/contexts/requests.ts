export const fetchCandidateInput = async (set: CallableFunction, category: string) => {
    const requestData = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "table_name": category
        })
    }
    try {
        const res = await fetch('/api/table_input', requestData);
        if (res.status !== 200) {
            console.log(res);
        }
        const data = await res.json();
        if (data[category]) {
            set(data[category])
        }
        
        return true;

    } catch (error) {
        console.error(error)
        return false
    }
}



export const saveProgress = async (tableName: string, data: object) => {

    const requestData = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            table_name: tableName, data
        })
    }

    try {
        const res = await fetch('/api/save_table_input', requestData);
        if (res.status !== 200) {
            console.log(res)
            // alert('Error saving data.')
            return false
        }
    } catch (error) {
        console.error(error)
    }
}