import { useRef, useEffect, useState } from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import clsx from 'clsx';
import annyang from 'annyang';

interface vmTranscript {
  final_transcript: string,
  interim_transcript: string,
}

interface vmState {
  is_listening: boolean,
  is_permission: boolean,
  is_show_sidebar: boolean,
  data: Array<String>,
}

export default function HomePage() {
  const [text, setText] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [transcript, setTransript] = useState<vmTranscript>({
    final_transcript: "",
    interim_transcript: "",
  });
  const [state, setState] = useState<vmState>({
    is_listening: false,
    is_permission: true,
    is_show_sidebar: true,
    data: [],
  });



  useEffect(() => {
    // onPlayVideo();

    checkPermissions();
  }, []);

  useEffect(() => {
    const speechRecognition = new (window as any).webkitSpeechRecognition();
    if (state.is_listening) {
      console.info(state.is_listening);
      speechRecognition.stop();

      setState(state => ({
        ...state, data: [
          ...state.data,
          transcript.final_transcript,
        ]
      }));
    } else {

    }
  }, [state.is_listening]);

  const onPlayVideo = (): void => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(error => {
        console.error('Failed to autoplay video:', error);
      });
    }
  }

  const onSideBar = (): void => {
    setState(state => ({ ...state, is_show_sidebar: !state.is_show_sidebar }));
  }

  const onSpeechRecognitionOn = async (): Promise<void> => {
    setState(state => ({ ...state, is_listening: true }));
    const speechRecognition = new (window as any).webkitSpeechRecognition();
    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;
    speechRecognition.lang = "en-US";

    // if (getIsListening) {
    console.info("start");
    speechRecognition.start();
    // }

    speechRecognition.onresult = (event) => {

      // // Loop through the results from the speech recognition object.
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        // If the result item is Final, add it to Final Transcript, Else add it to Interim transcript
        if (event.results[i].isFinal) {
          // state.final_transcript += event.results[i][0].transcript;
          setTransript(transcript => ({
            ...transcript,
            final_transcript: transcript.final_transcript += event.results[i][0].transcript,
          }));
        } else {
          // state.interim_transcript += event.results[i][0].transcript;
          setTransript(transcript => ({
            ...transcript,
            interim_transcript: transcript.interim_transcript += event.results[i][0].transcript,
          }));
        }

        console.info(transcript.final_transcript, event.results[i][0].transcript);
      }

    }



  };

  const onSpeechRecognitionOff = async (): Promise<void> => {
    console.info("stop");
    const speechRecognition = new (window as any).webkitSpeechRecognition();
    speechRecognition.stop();

    setState(state => ({ ...state, is_listening: false }));

    setTransript(transcript => ({
      ...transcript,
      final_transcript: "",
    }));
  }

  const checkPermissions = async (): Promise<void> => {
    try {
      const microphonePermission = await navigator.permissions.query({
        name: "microphone",
      }).then(item => item);
      const soundPermission = await navigator.permissions.query({
        name: "camera",
      });

      // console.info(microphonePermission.state, soundPermission.state);

      if (microphonePermission.state == "granted" && soundPermission.state == "granted") {
        setState(state => ({ ...state, is_permission: true }));
      } else {
        setState(state => ({ ...state, is_permission: false }));
      }
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo templateTitle="test" />

      <main>
        <section
          style={{
            backgroundImage: "url('/images/bg2.jpg')",
            backgroundSize: "cover",
            height: "100vh",
            width: "100vw",
          }}
          className='bg-white flex flex-row justify-around h-full'>
          <div className=" w-full hidden md:block"></div>
          <div className=" w-full h-full flex flex-col justify-around ">
            <div className="  h-full flex flex-col items-center justify-around">
              <div className=" flex flex-col items-center ">
                <h1 className=" text-white font-extrabold md:text-5xl ">
                  CHAT GPT x D-ID
                </h1>
                <br />
                {/* clsx */}
                <video
                  ref={videoRef}
                  className={clsx(
                    "flex justify-center items-center",
                    "h-80 w-80 rounded-full bg-gray-200 shadow-2xl",
                  )}>
                  <source src="/videos/ai.mp4" type="video/mp4" />
                </video>
                <div
                  className="flex flex-row space-x-4 max-h-10"
                >
                  <span
                    onClick={onSideBar}
                    className={clsx(
                      "w-8 h-8 m-2 hover:w-10 hover:h-10 hover:shadow-2xl",
                      "bg-white rounded-full  flex flex-row justify-around p-2",
                    )}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className=" cursor-pointer">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                    </svg>
                  </span>
                  {state.is_listening ? 1 : 0}
                  <span
                    onClick={onSpeechRecognitionOn}
                    className={clsx(
                      "w-8 h-8 m-2 hover:w-10 hover:h-10 hover:shadow-2xl",
                      "bg-white rounded-full flex flex-row justify-around p-2",
                    )}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className=" cursor-pointer">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                    </svg>
                  </span>
                  <span
                    onClick={onSpeechRecognitionOff}
                    className={clsx(
                      "w-8 h-8 m-2 hover:w-10 hover:h-10 hover:shadow-2xl",
                      "bg-white rounded-full flex flex-row justify-around p-2",
                    )}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className=" cursor-pointer">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                    </svg>
                  </span>
                </div>
              </div>

            </div>
          </div>
          <div className=" w-full hidden md:block"></div>
        </section>
        <div
          id="drawer-navigation"
          className={clsx(
            "border-r-2 border-gray-200",
            "bg-white dark:bg-gray-800 fixed top-0 left-0 z-40 w-64 md:w-96 h-screen p-4",
            `${state.is_show_sidebar ? '-translate-x-0' : '-translate-x-full'} overflow-y-auto transition-transform`,
          )}
          tabIndex={-1} aria-labelledby="drawer-navigation-label">
          <h5 id="drawer-navigation-label" className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Conversation</h5>
          <button
            onClick={onSideBar}
            type="button"
            data-drawer-hide="drawer-navigation"
            aria-controls="drawer-navigation"
            className={clsx(
              "rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center ",
              "text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
            )}
          >
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            <span className="sr-only">Close menu</span>
          </button>
          <div className="py-4 overflow-y-auto">
            <ul className="space-y-2 font-medium">
              {
                state.data.map((item, index) => (
                  <li key={index}>
                    <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                      <span className="ml-3">
                        {item}
                      </span>
                    </a>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>

      </main>
    </Layout>
  );
}
