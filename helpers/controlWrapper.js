const controlWrapper = (control) => {
  return async (req, res, next) => {
    try {
      await control(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default controlWrapper;
