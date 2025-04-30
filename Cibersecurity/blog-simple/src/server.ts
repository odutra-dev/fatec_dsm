import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import {
  validatorCompiler,
  serializerCompiler,
  type ZodTypeProvider,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { userRoute } from "./routes/user.route";
import { fastifyJwt } from "@fastify/jwt";
import { postRoute } from "./routes/post.routes";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, { origin: "*" });

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Api de um Blog",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

app.register(userRoute);
app.register(postRoute);

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET as string,
});

app.register(fastifySwaggerUi, { routePrefix: "/docs" });

app.listen({ port: 3333 }).then(() => {
  console.log("server running in http://localhost:3333");
});
