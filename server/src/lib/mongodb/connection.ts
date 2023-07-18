import mongoose from "mongoose";
import getConfig from "../../config";

const config = getConfig();

export default function connectToMongodb() {
  const connectionUrl = getConfig()?.mongodb?.url;

  if (!connectionUrl) {
    console.log("ERROR: Mongodb url is not porvided");
    return null;
  }

  mongoose
    .connect(connectionUrl)
    .then(
      () => {},
      (err: any) => {
        console.info("Mongodb error", err);
      }
    )
    .catch((err: any) => {
      console.log("ERROR AT MONGO:", err);
    });
}

function onConnected() {
  console.info(`[${config?.id ?? "server"}] DB Connected to ${config.mongodb.db}`);
}

function onReConnected() {
  console.info(`[${config?.id ?? "server"}] MongoDB reconnected!`);
}

function onError(error: any) {
  console.error(`[${config?.id ?? "server"}] Error in MongoDb connection: `, error);
  mongoose.disconnect();
}

function onDisconnect() {
  console.error(`[${config?.id ?? "server"}] MongoDB disconnected! Reconnecting in 10s`);
  setTimeout(() => connectToMongodb(), 10000);
}

mongoose.connection.on("connected", onConnected);
mongoose.connection.on("reconnected", onReConnected);
mongoose.connection.on("error", onError);
mongoose.connection.on("disconnected", onDisconnect);
