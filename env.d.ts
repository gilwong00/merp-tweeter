declare namespace NodeJS {
  export interface ProcessEnv {
    MONGO_URI: string;
    JWT_SECRET: string;
  }
}
