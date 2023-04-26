
import axios from 'axios';
import { useReducer, useState } from "react";
import { NextApiRequest, NextApiResponse } from 'next';

import {
  IState, EType, IOffer, IResponse, TAction
} from "@/types/did";

const initialState: IState = {
  streamId: "",
  id: "",
  offer: "",
  iceServers: "",
  session_id: "",
};

function reducer(state: IState, action: TAction) {
  switch (action.type) {
    case EType.INSERT_STREAM_ID:
      return {
        ...state,
        streamId: action.payload.streamId,
      };
    default:
      return state;
  }
}

let peerConnection: RTCPeerConnection;

const [state, dispatch] = useReducer(reducer, initialState);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { message } = req.query;

  // const result = await findVideo(message);
  const getConnectStream = await onConnectStream();

  res.status(200).json(getConnectStream);
}

const onConnectStream = async (): Promise<any> => {

  const token = process.env.TOKEN;

  const options = {
    method: 'POST',
    url: 'https://api.d-id.com/talks/streams',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${token}`
    },
    data: {
      nfig: {
        stich: 'true',
      },
      source_url: 'https://create-images-results.d-id.com/DefaultPresenters/Billy_m/image.jpeg',
    },
  };

  try {
    const response: IResponse = await axios(options);
    // console.info(response);

    const { streamId, session_id } = response.data;

    dispatch({ type: EType.INSERT_STREAM_ID, payload: { streamId: streamId } });
    dispatch({ type: EType.INSERT_SESSION_ID, payload: { session_id: session_id } });

    // return response.data;
  } catch (error) {
    // console.error(JSON.stringify(error));
    // res.status(500).json({ message: 'Internal server error' });
    return error;
  }
}

const onSdpResponse = async (iceServers: RTCIceServer[]): Promise<any> => {


}

const createPeerConnection = (offer: IOffer, iceServers: RTCIceServer[]): any => {
  let result = "";

  peerConnection = new RTCPeerConnection({ iceServers });
  peerConnection.addEventListener('icegatheringstatechange', onIceGatheringStateChange, true);
  peerConnection.addEventListener('icecandidate', onIceCandidate, true);
  peerConnection.addEventListener('iceconnectionstatechange', onIceConnectionStateChange, true);
  peerConnection.addEventListener('connectionstatechange', onConnectionStateChange, true);
  peerConnection.addEventListener('signalingstatechange', onSignalingStateChange, true);
  peerConnection.addEventListener('track', onTrack, true);

  if (!RTCPeerConnection) {
    console.error("WebRTC not supported");

    return;
  }

  return result;
}

const findVideo = async (text: string | null): Promise<any> => {

  if (text == null) {
    return;
  }

  const token = process.env.TOKEN;

  const options = {
    // method: 'POST',
    // url: 'https://api.d-id.com/talks',
    method: 'GET',
    url: 'https://api.d-id.com/talks/tlk_rVxL1bU3j9ox8hBNPrwNV',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${token}`
    },
    data: {
      script: {
        type: 'text',
        input: text,
        provider: {
          type: 'microsoft',
          voice_id: 'en-US-DavisNeural',
          voice_config: {
            style: 'Chat',
          },
        },
      },
      config: {
        stich: 'true',
      },
      source_url: 'https://create-images-results.d-id.com/DefaultPresenters/Billy_m/image.jpeg',
    },
  };

  try {
    const response: IResponse = await axios(options);
    // console.info(response);

    return response.data.result_url;
  } catch (error) {
    // console.error(JSON.stringify(error));
    // res.status(500).json({ message: 'Internal server error' });
    return error;
  }
}

const getBasaeUrl = (): string => {
  let baseUrl = "";

  if (process.env.NODE_ENV == "development") {
    baseUrl = "http://localhost:5000";
  }

  return baseUrl;
}

const onIceGatheringStateChange = () => {
  // peerConnection.iceGatheringState
}

const onIceCandidate = (event: RTCPeerConnectionIceEvent) => {
  const token = process.env.TOKEN;
  // console.log('onIceCandidate', event);

  if (event.candidate) {
    const { candidate, sdpMid, sdpMLineIndex } = event.candidate;

    fetch(`https://api.d-id.com//talks/streams/${state.streamId}/ice`,
      {
        method: 'POST',
        headers: { Authorization: `Basic ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidate, sdpMid, sdpMLineIndex, session_id: state.session_id })
      });
  }
}

const onIceConnectionStateChange = () => {
  // iceStatusLabel.innerText = peerConnection.iceConnectionState;
  // iceStatusLabel.className = 'iceConnectionState-' + peerConnection.iceConnectionState;
  // if (peerConnection.iceConnectionState === 'failed' || peerConnection.iceConnectionState === 'closed') {
  //   stopAllStreams();
  //   closePC();
  // }
}

const onConnectionStateChange = () => {
  // peerConnection.connectionState
}
const onSignalingStateChange = () => {
  // peerConnection.signalingState
}

function onTrack(event: RTCTrackEvent) {
  const remoteStream = event.streams[0];
  // setVideoElement(remoteStream);
}
