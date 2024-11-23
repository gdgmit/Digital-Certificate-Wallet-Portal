import React, { useState, useEffect, useRef } from "react";

const EventCertificateComponent = ({
  studentName,
  regno,
  year,
  dept,
  certificateData,
}) => {
  const [scale, setScale] = useState(1);
  const certificateRef = useRef(null);
  const eventName = certificateData.name;
  const date = certificateData.date;
  const description = certificateData.description;

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (certificateRef.current) {
        const parentWidth = certificateRef.current.parentElement.offsetWidth;
        const certificateWidth = certificateRef.current.offsetWidth;
        const newScale = parentWidth / certificateWidth;
        setScale(newScale);
      }
    });

    if (certificateRef.current) {
      resizeObserver.observe(certificateRef.current.parentElement);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={certificateRef}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "top left",
      }}
      className="relative w-full max-w-[404px] h-auto flex flex-col items-center justify-center"
    >
      <img
        src="/external/rectangle16449-emxc-400w.png"
        alt="Rectangle16449"
        className="absolute top-0 left-0 w-full h-[280px] border-solid border-[16px] border-[#3a3b4f]"
      />
      <img
        src="/external/polygon108311-dmkn.svg"
        alt="Polygon108311"
        className="absolute top-[137.59px] left-[16.2px] w-[49px] h-[41px]"
      />
      <img
        src="/external/polygon118311-bloh.svg"
        alt="Polygon118311"
        className="absolute top-[85.33px] left-[66.45px] w-[24px] h-[20px]"
      />
      <img
        src="/external/polygon128311-w0g.svg"
        alt="Polygon128311"
        className="absolute top-[63.77px] left-[15.83px] w-[24px] h-[20px]"
      />
      <img
        src="/external/polygon138312-jgzh.svg"
        alt="Polygon138312"
        className="absolute top-[122.21px] left-[367.88px] w-[16px] h-[14px]"
      />
      <img
        src="/external/polygon178312-z6zh.svg"
        alt="Polygon178312"
        className="absolute top-[162.21px] left-[307.88px] w-[16px] h-[14px]"
      />
      <img
        src="/external/polygon148312-jl4c.svg"
        alt="Polygon148312"
        className="absolute top-[224.24px] left-[360.51px] w-[16px] h-[14px]"
      />
      <img
        src="/external/polygon158312-tx8.svg"
        alt="Polygon158312"
        className="absolute top-[70.3px] left-[311.79px] w-[20px] h-[17px]"
      />
      <img
        src="/external/polygon168312-lytg.svg"
        alt="Polygon168312"
        className="absolute top-[196.37px] left-[63.08px] w-[20px] h-[17px]"
      />
      <span className="absolute top-[24px] left-[16px] text-white w-[144px] text-xl font-semibold leading-[14px]">
        <span className="font-bold">{eventName}</span>
      </span>
      <div className="absolute top-[220px] left-[20px] w-[360px] h-[40px] flex items-start">
        <div className="absolute top-0 left-0 w-[40px] h-[40px] flex items-start">
          <img
            src="/external/vector36452-ukmm.svg"
            alt="Vector36452"
            className="absolute top-0 left-[-20px] w-[10px] h-[40px]"
          />
          <img
            src="/external/vector46452-4hyw.svg"
            alt="Vector46452"
            className="absolute top-[38.97px] left-[0.01px] w-[11px] h-[40px]"
          />
        </div>
        <div className="absolute top-0 left-[360px] w-[40px] h-[40px] flex items-start">
          <img
            src="/external/vector36452-rkk8.svg"
            alt="Vector36452"
            className="absolute top-0 left-[15px] w-[10px] h-[40px]"
          />
          <img
            src="/external/vector46453-1vw.svg"
            alt="Vector46453"
            className="absolute top-[38.97px] left-[-0.01px] w-[11px] h-[40px]"
          />
        </div>
      </div>
      <div className="absolute top-[36.5px] left-[76px] w-[248px] flex flex-col items-center gap-2">
        <div className="flex flex-col items-center gap-2 mt-3">
          <div className="flex flex-col items-center gap-0">
            <span className="text-[#1c1c1c] opacity-60 text-[13px] font-extrabold leading-[15px]">
              CERTIFICATE OF PARTICIPATION
            </span>
            <span className="text-[#ffb300] text-[0.6rem] font-bold leading-[30px]">
              This certificate is proudly presented to
            </span>
            <div className="absolute top-[55px] left-[-25px] w-[300px] flex flex-col items-center gap-1 ">
              <span className="text-[#1c1c1c] opacity-80 text-3xl font-bold text-center mt-1 mb-0 leading-none font-greatVibes">
                {studentName} 
              </span>
              <span className="text-[#1c1c1c] text-[0.4rem] leading-[9px] text-center font-medium leading-[15px]">
                <span className="opacity-80"> {studentName} </span> <span className="text-[rgb(255,179,0)] text-center font-semibold font-serif">
                   (Reg No: {regno}),
                </span><span className="opacity-80"> a {year} student of the Department of {dept}, has successfully
                participated in the event</span><br/>
                <span className="text-[#1c1c1c] text-2xl font-bold text-center pt-4  font-thin opacity-80"> {eventName}</span>{" "}<br/>
                <span className="text-[#ffba26] text-center font-semibold">
                  conducted on {date}
                </span>
                <span className="block mt-auto h-[35px] opacity-80"> {description} </span>
              </span>
              <div className="flex relative items-start bottom-[10px]">
                <div className="flex flex-col items-start mt-3">
                  <span className="text-[#ffb300] text-xs font-bold text-center leading-[8px]">
                    Event Date: {date}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-[-32px] right-[-70px] flex scale-90">
            <div className="relative w-[100px] h-auto">
              <span className="absolute top-[18.87px] left-[7.5px] text-[#1c1c1c] text-[10px] italic font-[Brush Script MT] leading-[12px] text-center">
                <span className="flex flex-col items-center justify-center">
                  <span
                    dangerouslySetInnerHTML={{
                      __html:
                        '<img src="/external/images/GDG-oC-MIT-logo.png" alt="GDG Logo" class="w-full h-auto" />',
                    }}
                  />
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCertificateComponent;
