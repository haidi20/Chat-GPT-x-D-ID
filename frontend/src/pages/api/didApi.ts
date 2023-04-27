
import axios from 'axios';
import { useReducer, useState } from "react";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { message } = req.query;

  // const result = await findVideo(message);
  // const getConnectStream = await onConnectStream();
  let getConnectStream = "";

  res.status(200).json(getConnectStream);
}

