import { useRef, useEffect, useState } from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

interface vmState {
  is_permission: boolean,
}

export default function HomePage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<vmState>({
    is_permission: true,
  });

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(error => {
        console.error('Failed to autoplay video:', error);
      });
    }

    checkPermissions();
  }, []);

  const onGetUserMedia = async () => {
    const permissions = navigator.mediaDevices.getUserMedia({ audio: true, video: true })
    permissions.then((stream) => {
      alert('accepted the permissions');
      setState(state => ({ ...state, is_permission: true }));
    })
      .catch((err) => {
        setState(state => ({ ...state, is_permission: false }));
        console.log(`${err.name} : ${err.message}`)
      });
  }

  async function checkPermissions() {
    try {
      const microphonePermission = await navigator.permissions.query({
        name: "microphone",
      });
      const soundPermission = await navigator.permissions.query({
        name: "microphone",
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
        <section className='bg-white flex flex-row justify-around h-full'>
          <div className=" w-full hidden md:block"></div>
          <div className=" w-full h-full flex flex-col justify-around ">
            <div className="  h-4/5 flex justify-center items-end">
              {/* <span className="">
                  image avatar AI
                </span> */}
              {/* <iframe className="w-full h-full" src="" allowFullScreen></iframe> */}
              <video ref={videoRef} className="
                  flex justify-center items-center 
                 h-80 w-80 rounded-full bg-gray-200 shadow-2xl
                "
              >
                <source src="/videos/video-ai.mp4" type="video/mp4" />
              </video>
            </div>
            <div className=" h-full ">
              {!state.is_permission && (<button

                onClick={onGetUserMedia}
                className="bg-green-500 hover:bg-green-700 text-white font-bold text-sm py-2 px-4 rounded"
              >
                Permisson
              </button>)}
            </div>
          </div>
          <div className=" w-full hidden md:block"></div>
        </section>
      </main>
    </Layout>
  );
}
