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
