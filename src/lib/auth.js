import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("medidb");

export const auth = betterAuth({
  database: mongodbAdapter(db, client),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [jwt()],
  session: {
    cookieCache: {
      enabled: true, // Enable caching session in cookie (default: `false`)
      strategy: "jwt",
      maxAge: 5 * 24 * 60 * 60, // 5 days
    },
  },
});
