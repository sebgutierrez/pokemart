declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string,
	  	PRISMA_DB_URL: string,
      SESSION_PASSWORD: string
    }
  }
}

export {};