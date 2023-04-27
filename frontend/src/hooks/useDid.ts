import { useState, useEffect, useRef } from 'react';

import axios from 'axios';
// import moment from 'moment';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

import { IState, EFrom, IResponse } from '@/types';

export default function useDid() {
  const [state, setState] = useState<IState>({
    is_listening: false,
    is_permission: true,
    is_show_sidebar: false,
    src_video: "/videos/ai.mp4",
    data: [],
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const {
    transcript, listening, resetTranscript
  } = useSpeechRecognition();

  useEffect(() => {
    // onPlayVideo();

  }, []);

  // scroll to the bottom of the chat when new messages are added
  useEffect(() => {
    if (chatEndRef.current) {
      // console.info("scroll");
      // chatEndRef.current.scrollTop = chatEndRef.current.scrollHeight;
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [state.data]);

  const onPlayVideo = (): void => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(error => {
        console.error('Failed to autoplay video:', error);
      });
    }
  }

  const onSideBar = (value?: boolean): void => {
    let setValue: boolean = false;

    if (value != undefined) {
      setValue = value;
    } else {
      setValue = !state.is_show_sidebar;
    }

    // console.info(setValue);

    setState(state => ({ ...state, is_show_sidebar: setValue }));
  }

  const onSpeechRecognitionOn = async (): Promise<void> => {
    // console.info("start");

    // console.info(transcript);

    setState(state => ({ ...state, is_listening: true }));

    SpeechRecognition.startListening({
      continuous: true,
    });
  };

  const onSpeechRecognitionOff = async (): Promise<void> => {
    // console.info("stop");

    setState(state => ({ ...state, is_listening: false }));

    // console.info(transcript);

    if (transcript != "") {
      setState(state => ({
        ...state, data: [
          ...state.data,
          {
            text: transcript,
            from: EFrom.USER,
          },
        ]
      }));
    }

    sendData();

    resetTranscript();
    SpeechRecognition.stopListening();
  }

  const sendData = async (): Promise<void> => {
    let message: string = "";

    // message = transcript;
    message = "Hi, doctor. To be honest, I'm feeling quite stressed lately";

    if (message == "") {
      return;
    }

    // console.info(message);

    try {
      const getStream: string = await axios.get(`/api/didApi`, { params: { message: message } })
        .then(result => result.data);

      console.info(getStream);

      // onPlayVideo();

    } catch (error) {
      // alert(error);

      console.info(error);
    }
  }

  return {
    state, videoRef, chatEndRef,
    onSideBar, onSpeechRecognitionOff, onSpeechRecognitionOn
  }
}