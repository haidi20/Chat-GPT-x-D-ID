import { useRef, useEffect, useState } from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import Image from 'next/image';

interface vmState {
  is_permission: boolean,
  is_show_sidebar: boolean,
}

export default function HomePage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<vmState>({
    is_permission: true,
    is_show_sidebar: false,
  });

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // video.play().catch(error => {
      //   console.error('Failed to autoplay video:', error);
      // });
    }

    checkPermissions();
  }, []);

  const onGetUserMedia = async (): Promise<void> => {
    const permissions = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
    permissions.then(() => {
      alert('accepted the permissions');
      setState(state => ({ ...state, is_permission: true }));
    })
      .catch((err: any) => {
        setState(state => ({ ...state, is_permission: false }));
        console.log(`${err.name} : ${err.message}`)
      });
  }

  const onSideBar = (): void => {
    setState(state => ({ ...state, is_show_sidebar: !state.is_show_sidebar }));
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
              {/* <h1 className=" text-white font-extrabold text-6xl ">
                CHAT GPT x D-ID
              </h1>
              <br />
              <video ref={videoRef} className="
                  flex justify-center items-center 
                 h-80 w-80 rounded-full bg-gray-200 shadow-2xl
                "
              >
                <source src="/videos/video-ai.mp4" type="video/mp4" />
              </video>
              <div
                id="space_actions"
                className=" bg-white rounded-lg items-end "
              >
                button actions
              </div> */}
              <div className=" flex flex-col items-center ">
                <h1 className=" text-white font-extrabold md:text-5xl ">
                  CHAT GPT x D-ID
                </h1>
                <br />
                <video ref={videoRef} className="
                  flex justify-center items-center 
                 h-80 w-80 rounded-full bg-gray-200 shadow-2xl
                "
                >
                  <source src="/videos/video-ai.mp4" type="video/mp4" />
                </video>
              </div>
              <div
                className="max-h-10"
              >
                <div id="tooltip-default" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                  Tooltip content
                  <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <span
                  onClick={onSideBar}
                  className=" 
                    bg-white rounded-full hover:shadow-2xl p-2
                    flex flex-row justify-around
                  "
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 hover:w-12 hover:h-12 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                  </svg>
                </span>
              </div>

            </div>
            {/* <div className=" h-4/6 ">
              {!state.is_permission && (<button

                onClick={onGetUserMedia}
                className="bg-green-500 hover:bg-green-700 text-white font-bold text-sm py-2 px-4 rounded"
              >
                Permisson
              </button>)}
            </div> */}
          </div>
          <div className=" w-full hidden md:block"></div>
        </section>



        {/* <div className="text-center">
          <button
            onClick={onSideBar}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="button" data-drawer-target="drawer-navigation" data-drawer-show="drawer-navigation" aria-controls="drawer-navigation">
            Show navigation
          </button>
        </div> */}


        <div
          id="drawer-navigation"
          className={`
            fixed top-0 left-0 z-40 w-64 md:w-96 h-screen p-4 overflow-y-auto transition-transform
            ${state.is_show_sidebar ? '-translate-x-0' : '-translate-x-full'} bg-white dark:bg-gray-800
           border-r-2 border-gray-200
          `}
          tabIndex={-1} aria-labelledby="drawer-navigation-label">
          <h5 id="drawer-navigation-label" className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Conversation</h5>
          <button onClick={onSideBar} type="button" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            <span className="sr-only">Close menu</span>
          </button>
        </div>

      </main>
    </Layout>
  );
}
