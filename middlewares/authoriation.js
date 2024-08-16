import jwt from 'jsonwebtoken';
import prisma from "../prisma/dbconnect.js";

// Function to verify and decode the JWT token
const verifyAdminToken = async (token) => {
   try {
       // Verify and decode the token using the JWT_SECRET
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       return decoded;
   } catch (error) {
       throw new Error('Invalid token');
   }
}

// Middleware to verify the admin token
const verifyAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'No token provided' });

        const admin = await verifyAdminToken(token);

        const adminExists = await prisma.Administrator.findUnique({ where: { id: admin.id } });
        if (!adminExists) return res.status(401).json({ message: 'Invalid admin' });

        if(adminExists.role != 'Admin') return res.status(403).json({ message: ' must be an admin' });
        
        req.admin = admin;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token or unauthorized access' });
    }
}

export { verifyAdmin };
