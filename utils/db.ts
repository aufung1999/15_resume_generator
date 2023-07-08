import mongoose from "mongoose";
import * as dotenv from "dotenv";
const { MongoClient, ServerApiVersion } = require("mongodb");

type Connection = {
  isConnected?: any;
};

const MONGODB_URL: string = process.env.MONGODB_URL as string;
const connection: Connection = {};

async function connect() {
  if (connection.isConnected) {
    console.log("already connected");
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("use previous connection");
      return;
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(MONGODB_URL);
  console.log("new connection");
  connection.isConnected = db.connections[0].readyState;
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log("not disconnected");
    }
  }
}
function convertDocToObj(doc:any) {
  // console.log(doc._id)
  doc._id = doc._id?.toString();
  doc.createdAt = doc.createdAt.toString();
  doc.updatedAt = doc.updatedAt.toString();
  doc.__v = doc.__v.toString();
  return doc;
}

const db = { connect, disconnect, convertDocToObj };
export default db;
