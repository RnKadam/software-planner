export const validateProjectInput = (req, res, next) => {
  const { projectName, description, requirements, industry, budget } = req.body;

  if (!projectName || !description || !requirements || !industry || !budget) {
    return res.status(400).json({
      error:
        "All fields (projectName, description, requirements, industry, budget) are required",
    });
  }

  next();
};
