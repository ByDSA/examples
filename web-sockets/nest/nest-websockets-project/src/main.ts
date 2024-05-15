import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  } );
  const { PORT } = await import("../../../common.mjs");

  console.log("Starting server at port " + PORT);
  await app.listen(PORT);
}
bootstrap();
