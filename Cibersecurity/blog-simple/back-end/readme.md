# Back-end do blog

## Instalação

```cmd
pnpm install

#or

npm install
```

## Execução

Primeiramente execute o seguinte comando para subir o container do banco de dados:

```cmd
docker compose up
```

Em seguida execute o seguinte comando para a criação do banco de dados:

```cmd
npx prisma migrate dev

npx prisma generate
```

Em seguida execute o seguinte comando para rodar o back-end:

```cmd
pnpm dev

#or

npm run dev
```

## Documentação

![{52019C55-2230-4F04-95C7-59C3C91DC51D}](https://github.com/user-attachments/assets/95450e94-7def-46e2-bd99-dd2b035895aa)
