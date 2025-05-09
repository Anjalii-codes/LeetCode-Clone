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
    for(const [language,solution] of Object.entries(referenceSolutions)){
        // get lang id from judge 0
        const languageId = getjudge0LanguageId(language)
        if (!languageId) {
            return res.status(400).json({
                success: false,
                message: "language not supported",
                error:error.message
            })
        }
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