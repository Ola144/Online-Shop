import { Client, Databases, Storage } from "appwrite";

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("688e25ed003062fd4cf5");

export const databases = new Databases(client);
export const storage = new Storage(client);
