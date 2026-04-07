import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 10,             
  standardHeaders: true, 
  legacyHeaders: false,  

  keyGenerator: (req) => {
    return req.user?.id || req.ip; 
  },

  handler: (req, res) => {
    res.status(429).json({
      message: "Too many requests. Please try again later."
    });
  }
});