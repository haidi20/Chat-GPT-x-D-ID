export enum EType {
  INSERT_OFFER,
  INSERT_STREAM_ID,
  INSERT_SESSION_ID,
  INSERT_ICE_SERVERS,
}

export interface IState {
  streamId?: string,
  id?: string,
  offer?: RTCSessionDescriptionInit,
  iceServers?: RTCIceServer[],
  session_id?: string,
  result_url?: string,
}

export interface IOffer {
  type?: string,
  sdp?: string,
}

export interface IResponse {
  data: IState
}

export interface TAction {
  type: string,
  payload: any,
}
