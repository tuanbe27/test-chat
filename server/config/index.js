const config = {
  db_url: process.env.DB_CONNECTION_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpires: process.env.JWT_EXPIRES,
};

export default config;
