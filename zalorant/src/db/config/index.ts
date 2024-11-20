import { Db, MongoClient, ServerApiVersion } from 'mongodb'


const uri = "mongodb+srv://amala:MtMSu3zD0ARHxPNj@cluster2.lvn1z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2"

if (!uri) {
  throw new Error("MONGODB_URI is not defined in environment variables.")
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

let db: Db | null = null

const dbName = "gc2-database"

export async function connectToDB(): Promise<Db> {
  if (!db) {
    try {
      await client.connect()
      db = client.db(dbName)
      const collections = await db.listCollections().toArray()
      console.log(`Connected to MongoDB! Collections in ${dbName}:`, collections.map(c => c.name))
    } catch (error) {
      console.error("MongoDB connection error:", error)
      throw error
    }
  }
  return db
}

export async function closeConnection(): Promise<void> {
  try {
    if (client) {
      await client.close()
      console.log("MongoDB connection closed")
    }
  } catch (error) {
    console.error("Error closing MongoDB connection:", error)
  }
}

export { client }


// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// })

// export const connectToDB = async () => {
//   try {
//     if (!client.isco) {
//       await client.connect()
//     }
//     return client.db("gc2-database")
//   } catch (error) {
//     console.error("Failed to connect to MongoDB", error)
//     throw error
//   }
// }


///import { MongoClient, Db, ServerApiVersion } from "mongodb";
