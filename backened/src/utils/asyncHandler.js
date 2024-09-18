const asyncHandler = (fn) => async (req, res, next) => {
   // This should print
   try {
     await fn(req, res, next); // 'next' instead of 'fn'
   } catch (error) {
     res.status(error.code || 500).json({
       success: false,
       message: error.message,
     });
   }
 };
 export { asyncHandler };
 