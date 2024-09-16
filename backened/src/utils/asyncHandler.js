

// const asyncHandler = (requestHandler)=> {
//     (req , res , next)=>{
//         Promise.resolve(requestHandler(req , res, next)).reject((error)=> next(error))
//     }
// }

const asyncHandler = (fn)=> async(req , res , next)=>{
     try {
        await fn(req , res , fn)
     } catch (error) {
        res.send(error.code || 500 ).json({
            success :false,
            message : error.message
        })
     }
}

export default asyncHandler