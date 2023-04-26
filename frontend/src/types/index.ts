export enum EFrom {
  AI = "ai",
  USER = "user",
}

export interface IState {
  is_listening: boolean,
  is_permission: boolean,
  is_show_sidebar: boolean,
  src_video: string,
  data: {
    text: string;
    from: EFrom;
  }[],
}

export interface IResponse {
  data: {
    response: string,
    // linkVideo: string,
  }
}

