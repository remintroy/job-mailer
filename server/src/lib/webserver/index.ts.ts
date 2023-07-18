import getConfig from "../../config";

export default function serverConfig(server: any) {
  const startServer = () => {
    const configData = getConfig();
    server.listen(configData.port, () => {
      console.log(`[${configData.id}] ${configData.name} is started on ${configData.port}`);
    });
  };

  return {
    startServer,
  };
}
