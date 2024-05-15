import { Module } from "@nestjs/common";
import { GatewayModule } from "./websockets";

@Module( {
  imports: [GatewayModule],
  controllers: [],
  providers: [],
} )
export class AppModule {}
