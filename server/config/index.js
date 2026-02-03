import dotenv from 'dotenv';
dotenv.config();
const config = {
  port: process.env.PORT ,
  MONGODB_URL: process.env.MONGO_URI ,
  JWT_SECRET: process.env.JWT_SECRET 
};
export default config