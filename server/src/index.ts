import http from "http";
import express from "express";
import connectToMongodb from "./lib/mongodb/connection";
import serverConfig from "./lib/webserver/index.ts";
import expressConfig from "./lib/webserver/express";
import expressRoutes from "./lib/webserver/routes";

const app = express();
const server = http.createServer(app);

expressConfig(app);

expressRoutes(app, express);

connectToMongodb();

serverConfig(server).startServer();
