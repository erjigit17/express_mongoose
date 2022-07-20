import 'dotenv/config'

export const PORT: number = Number(process.env.PORT) ?? 8080
export const mongoDB: string = process.env.MY_MONGO_DB || ''