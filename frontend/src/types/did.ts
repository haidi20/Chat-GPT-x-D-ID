export enum EType {
  INSERT_STREAM_ID,
  INSERT_SESSION_ID,
}

export interface IOffer {
  type: string,
  sdp: string,
}

export interface IState {
  streamId?: string,
  id?: string,
  offer?: string,
  iceServers?: string,
  session_id?: string,
  result_url?: string,
}

export interface IResponse {
  data: IState
}

export interface TAction {
  type: EType,
  payload: IState,
}
