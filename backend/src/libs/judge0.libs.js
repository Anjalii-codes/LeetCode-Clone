import { db } from "./libs/db.js";
export const judge0LanguageId = (language) => {
    const LanguageMap = {
        "PYTHON": 71,
        "JAVA": 62,
        "JAVASCRIPT": 63,
    }
    return LanguageMap[language.toupperCase()]
};
export const submitBatch = async (submissions) => {
    const { data } = await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,{submissions})
        
    console.log("submissions Results", data);
    return data
    
};
export const pollBatchResults = async (tokens) => {
    while (true) {
        const { data } = await axios.get(`${process.env.JUDGE0_API_URL}/submissions/batch`, {
            params: {
                tokens: tokens.join(","),
                base64_encoded: false,
            }
        })
        const results = data.submissions
        const isAllDone = results.every((r) => r.status.id !== 1 && r.status.id !== 2)
        if (isAllDone) {
            return results
        }
        await Sleep(1000)

    }
}