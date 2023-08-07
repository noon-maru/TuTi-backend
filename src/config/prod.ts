interface key {
  mongoURI: string;
}

const prodkey: key = {
  mongoURI: process.env.MONGO_URI || "",
};

export default prodkey;
