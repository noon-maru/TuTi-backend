import dotenv from "dotenv";

dotenv.config();

interface key {
  mongoURI: string;
  sessionSecret: string;
  hashSecret: string;
}

const devkey: key = {
  mongoURI: process.env.MONGO_URI || "",
  sessionSecret: process.env.SESSION_SECRET || "",
  hashSecret: process.env.HASH_SECRET || "",
};
export default devkey;
