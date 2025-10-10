import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaMariaDb({
  host: "ls-c964e7b99edd3da976da10f9b9137e607f459d65.cmr0sqm4oc9l.us-east-1.rds.amazonaws.com",
  port: 3306,
  database: "db_blog",
  user: "dbmasteruser",
  password: "%&rJ+VD5&vCmL$Y1ltxjcQnI%bAdX+9_",
  connectionLimit: 5,
});

export const prisma = new PrismaClient({
  adapter,
});
