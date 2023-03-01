declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string;
      JWT_SECRET: string;
      JWT_TOKEN_EXPIRATION: string;
    }
  }
  namespace Express {
    interface Request {
      id: string;
      role: string;
    }
  }
}

export {};
