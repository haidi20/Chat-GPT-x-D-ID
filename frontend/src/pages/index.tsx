import clsx from 'clsx';
import { useRef, useEffect, useState } from 'react';

import { EFrom } from '@/types';
import useDid from '@/hooks/useDid';
import useWebRTC from '@/hooks/useWebRTC';

import Seo from '@/components/Seo';
import Layout from '@/components/layout/Layout';

export default function HomePage() {

  const {
    // state and useRef
    state: stateDid, videoRef, chatEndRef,
    // functions
    onSideBar, onSpeechRecognitionOff, onSpeechRecognitionOn
  } = useDid();

  const {
    state: stateWebRTC
  } = useWebRTC();

  useEffect(() => {
    // console.info(stateWebRTC.offer);
  }, []);


  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo templateTitle="test" />

      <main >
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
                  src={stateDid.src_video}
                  className={clsx(
                    "flex justify-center items-center",
                    "h-80 w-80 rounded-full bg-gray-200 shadow-2xl",
                  )}>
                </video>
                <div
                  className="flex flex-row space-x-4 max-h-10"
                >
                  <span
                    onClick={event => onSideBar()}
                    className={clsx(
                      "w-8 h-8 m-2 hover:w-10 hover:h-10 hover:shadow-2xl",
                      "bg-white rounded-full  flex flex-row justify-around p-2",
                    )}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className=" cursor-pointer">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                    </svg>
                  </span>
                  <span
                    onClick={stateDid.is_listening ? onSpeechRecognitionOff : onSpeechRecognitionOn}
                    className={clsx(
                      "w-8 h-8 m-2 hover:w-10 hover:h-10 hover:shadow-2xl",
                      "bg-white rounded-full flex flex-row justify-around p-2",
                    )}
                  >
                    {
                      stateDid.is_listening
                        ? (
                          <svg
                            className="cursor-pointer"
                            style={{
                              verticalAlign: "middle",
                              fill: "currentColor",
                              overflow: "hidden"
                            }}
                            viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <path d="M835.7 279.5L664.1 451.2v60.9c0 41.8-14.9 77.7-44.7 107.5-29.8 29.8-65.6 44.7-107.5 44.7-17.4 0-34.7-3-51.8-9L414.5 701c30.7 16.2 63.2 24.2 97.5 24.2 58.6 0 108.8-20.8 150.5-62.5 41.6-41.8 62.4-91.9 62.4-150.6v-60.9c0-8.2 3-15.4 9-21.4s13.1-9 21.4-9c8.2 0 15.4 3 21.4 9s9 13.2 9 21.4V512c0 70.1-23.4 131-70.1 182.8-46.7 51.9-104.5 81.6-173.3 89.2v62.7H664c8.2 0 15.4 3 21.4 9s9 13.1 9 21.4c0 8.2-3 15.4-9 21.4s-13.2 9-21.4 9H359.7c-8.2 0-15.4-3-21.4-9s-9-13.2-9-21.4 3-15.4 9-21.4 13.1-9 21.4-9h121.7V784c-39.6-4.1-76.9-17-111.7-38.5L249 866.3c-3.2 3.2-6.8 4.8-10.9 4.8-4.1 0-7.8-1.6-10.9-4.8l-39-39c-3.2-3.2-4.8-6.8-4.8-10.9 0-4.1 1.6-7.8 4.8-10.9l586.7-586.7c3.2-3.2 6.8-4.8 10.9-4.8 4.1 0 7.8 1.6 10.9 4.8l39 39c3.2 3.2 4.8 6.8 4.8 10.9-0.1 4-1.6 7.6-4.8 10.8zM306 565.8l-48 48c-13.3-32.6-20-66.6-20-101.8v-61c0-8.2 3-15.4 9-21.4s13.1-9 21.4-9c8.2 0 15.4 3 21.4 9s9 13.2 9 21.4v60.9c0.1 16.9 2.5 34.9 7.2 53.9z m349-349.1L359.7 512V268.6c0-41.8 14.9-77.7 44.7-107.5 29.8-29.8 65.6-44.7 107.5-44.7 32.3 0 61.6 9.4 87.7 28.1 26.2 18.7 44.6 42.8 55.4 72.2z" />
                          </svg>
                        ) :
                        (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className=" cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                          </svg>
                        )
                    }

                  </span>

                </div>
              </div>

            </div>
          </div>
          <div className=" w-full hidden md:block"></div>
        </section>
        {/* start left side bar conversation */}
        <div
          id="drawer-navigation"
          className={clsx(
            "border-r-2 border-gray-200",
            "bg-white dark:bg-gray-800 fixed top-0 left-0 z-40 w-64 md:w-96 h-screen p-4",
            `${stateDid.is_show_sidebar ? '-translate-x-0' : '-translate-x-full'} overflow-y-auto transition-transform`,
          )}
          tabIndex={-1} aria-labelledby="drawer-navigation-label">
          <h5 id="drawer-navigation-label" className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Conversation</h5>
          <button
            onClick={event => onSideBar()}
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
          <div className="py-4" >
            {/*   */}
            <ul className="space-y-2 overflow-y-auto" >
              {
                stateDid.data.map((item, index) => (
                  <li key={index}>
                    <div className={clsx(
                      `${item.from == EFrom.USER ? 'justify-end text-right' : ''}`,
                      "flex text-gray-900",
                      "dark:text-white dark:hover:bg-gray-700",
                    )}>
                      <span className={clsx(
                        "ml-3 rounded-lg p-2",
                        `${item.from == EFrom.USER ? ' bg-[#F0C8B3]' : 'bg-[#C6C3BE]'}`,
                      )}>
                        {item.text}
                      </span>
                    </div>
                  </li>
                ))
              }
              <div ref={chatEndRef}></div>
            </ul>
          </div>
        </div>
        {/* end left side bar conversation */}
      </main>
    </Layout>
  );
}
