import dotenv from "dotenv";
dotenv.config();

export default function getConfig() {
  const SERVER_NAME = process.env.SERVER_NAME || "server";
  return {
    name: SERVER_NAME,
    id: "1",
    baserUrls: {
      user: "/",
    },
    port: process.env.PORT || 3001,
    mongodb: {
      url: process.env.MONGODB_URL,
      db: process.env.MONGODB_DB || SERVER_NAME,
    },
    morgan: {
      logStyle: "dev",
    },
    cors: {
      origin: ["*", "http://localhost:3001"],
      credentials: true,
    },
    auth: {
      salt: 10,
    },
    jwt: {
      user: {
        accessSecret: process.env.ACCESS_TOKEN_SECRET,
        refreshSecret: process.env.REFRESH_TOKEN_SECRET,
        accessOptions: {
          expiresIn: "25m",
        },
        refreshOptions: {
          expiresIn: "365d",
        },
      },
      admin: {
        refreshSecret: process.env.ADMIN_REFRESH_TOKEN_SECRET,
        accessSecret: process.env.ADMIN_ACCESS_TOKEN_SECRET,
        accessOptions: {
          expiresIn: "15m",
        },
        refreshOptions: {
          expiresIn: "1d",
        },
      },
    },
  };
}
