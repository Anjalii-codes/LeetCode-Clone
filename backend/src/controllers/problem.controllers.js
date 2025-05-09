export const createproblem = async (req, res) => {
    // get data 
    const { title, description, difficulty, tags, examples, constraints, testcases, codeSnippets, referenceSolutions } = req.body
    // check Admin or not
    if (req.user.role !== "ADMIN") {
        return res.status(403).json({
            success: false,
            message: "Unauthorized - User is not an admin",
            error:error.message
        })
    }
    // loop through each ref sol
    for(const [language,solutionCode] of Object.entries(referenceSolutions)){
        // get lang id from judge 0
        const languageId = getjudge0LanguageId(language)
        if (!languageId) {
            return res.status(400).json({
                error: ` language ${language} is not supported`,
            })
        }
        //
        const submissions = testcases.map(({ input, output }) =>({
            source_code : solutionCode,
            language_id: languageId,
            stdin: input,
            expected_output: output
            
        }))
        const submissionResults = await submitBatch(submissions)
        const tokens = submissionResults.map((res)=>res.token)

    }

};
export const getAllProblems = async (req, res) => {
};
export const getProblemById = async (req, res) => {
};
export const updateProblem = async (req, res) => {
};
export const deleteProblem = async (req, res) => {
};
export const getSolvedProblemsSolvedByUser = async (req, res) => {
};