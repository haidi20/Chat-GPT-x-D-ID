import axios from 'axios';
import React, { useReducer } from 'react';

import { IState, EType, IOffer, IResponse, TAction } from "@/types/didType";

const initialState: IState = {
  streamId: "",
  id: "",
  offer: {
    type: "answer",
  },
  iceServers: [],
  session_id: "",
};

const reducer = (state: IState, action: TAction) => {
  switch (action.type) {
    case "INSERT_SESSION_ID":
      return {
        ...state,
        session_id: action.payload.session_id,
      };
    case "INSERT_OFFER":
      return {
        ...state,
        offer: action.payload.offer,
      };
    case "INSERT_ICE_SERVERS":
      return {
        ...state,
        iceServers: action.payload.iceServers,
      };
    default:
      return state;
    // default:
    //   throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export default function useWebRTC() {
  let peerConnection: RTCPeerConnection;
  let sessionClientAnswer: RTCSessionDescriptionInit;

  const [state, dispatch] = useReducer(reducer, initialState);

  const onConnectStream = async (): Promise<any> => {
    let getSdpResponse = null;
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

      const { streamId, session_id, offer, iceServers } = response.data;

      dispatch({ type: "INSERT_SESSION_ID", payload: { session_id: session_id } });
      dispatch({ type: "INSERT_OFFER", payload: { offer: offer } });
      dispatch({ type: "INSERT_ICE_SERVERS", payload: { iceServers: iceServers } });
      dispatch({ type: "INSERT_STREAM_ID", payload: { streamId: streamId } });

      if (offer && iceServers) {
        getSdpResponse = onSdpResponse();
      }

      return getSdpResponse;
      // return response.data;
    } catch (error) {
      // console.error(JSON.stringify(error));
      // res.status(500).json({ message: 'Internal server error' });
      return error;
    }
  }

  const onSdpResponse = async (): Promise<any> => {
    try {
      sessionClientAnswer = await createPeerConnection();
    } catch (e) {
      console.log('error during streaming setup', e);
      // stopAllStreams();
      // closePC();
      return;
    }

    const sdpResponse = await axios.post(`https://api.d-id.com/talks/streams/${state.streamId}/sdp`);

    return sdpResponse;

    // const sdpResponse = await fetch(`${DID_API.url}/talks/streams/${streamId}/sdp`,
    //   {
    //     method: 'POST',
    //     headers: { Authorization: `Basic ${DID_API.key}`, 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ answer: sessionClientAnswer, session_id: sessionId })
    //   });
  }

  const createPeerConnection = async (): Promise<any> => {
    let configuration: RTCConfiguration = { iceServers: state.iceServers };

    peerConnection = new RTCPeerConnection(configuration);
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

    if (state.offer) {
      await peerConnection.setRemoteDescription(state.offer);
      console.log('set remote sdp OK');
    }

    const sessionClientAnswer = await peerConnection.createAnswer();
    console.log('create local sdp OK');

    await peerConnection.setLocalDescription(sessionClientAnswer);
    console.log('set local sdp OK');

    return sessionClientAnswer;
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

      // fetch(`https://api.d-id.com//talks/streams/${state.streamId}/ice`,
      //   {
      //     method: 'POST',
      //     headers: { Authorization: `Basic ${token}`, 'Content-Type': 'application/json' },
      //     body: JSON.stringify({ candidate, sdpMid, sdpMLineIndex, session_id: state.session_id })
      //   });
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

  const onTrack = (event: RTCTrackEvent) => {
    const remoteStream = event.streams[0];
    // setVideoElement(remoteStream);
  }

  return {
    state,
  }

}
