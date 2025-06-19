// pages/api/hello.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("req_method", req.method);
  res.setHeader("Access-Control-Allow-Origin", "*"); // ← 全部許可
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  console.log("test12");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  switch (req.method) {
    case "GET":
      // Read（読み取り）
      res.status(200).json({ message: "Fetching data..." });
      break;
    case "POST":
      // Create（新規作成）
      res.status(201).json({ message: "Data created" });
      break;
    case "PUT":
      // Update（更新）
      res.status(200).json({ message: "Data updated" });
      break;
    case "DELETE":
      // Delete（削除）
      res.status(200).json({ message: "Data deleted" });
      break;
    case "OPTIONS":
      res.status(200).json({ message: "Data options" });
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
