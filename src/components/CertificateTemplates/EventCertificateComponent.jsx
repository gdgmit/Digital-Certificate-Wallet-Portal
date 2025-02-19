import React, { useState, useEffect, useRef } from "react";

const EventCertificateComponent = ({ studentName, certificateData }) => {
  console.log(studentName, certificateData);
  const [scale, setScale] = useState(1);
  const certificateRef = useRef(null);
  const eventName = certificateData.name;
  const date = certificateData.date;

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
      {/* Certificate Design */}
      <img
        src="/Digital-Certificate-Wallet-Portal/external/rectangle16449-emxc-400w.png"
        alt="Rectangle16449"
        className="absolute top-0 left-0 w-full h-[280px] border-solid border-[16px] border-[#3a3b4f]"
      />
      {/* Additional Design Elements */}
      <img
        src="/Digital-Certificate-Wallet-Portal/external/polygon108311-dmkn.svg"
        alt="Polygon108311"
        className="absolute top-[137.59px] left-[16.2px] w-[49px] h-[41px]"
      />
      {/* Event Name */}
      <span className="absolute top-[24px] left-[16px] text-white w-[144px] text-xl font-semibold leading-[14px]">
        <span className="font-bold">{eventName}</span>
      </span>
      {/* Certificate Content */}
      <div className="absolute top-[36.5px] left-[76px] w-[248px] flex flex-col items-center gap-2">
        <div className="flex flex-col items-center gap-10 mt-10">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[#ffb300] text-xs font-bold leading-[15px]">
              This is to certify that
            </span>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[#ffb300] text-2xl font-bold text-center">
                {studentName}
              </span>
              <span className="text-[#1c1c1c] opacity-70 text-xs text-center font-medium leading-[15px]">
                participated in the event <br />
                <span className="font-bold leading-10">{eventName}</span>
              </span>
            </div>
          </div>
          <div className="flex relative flex-col justify-center items-start gap-2 bottom-[30px]">
            <div className="flex flex-col items-start gap-2">
              <span className="text-[#ffb300] text-xs font-bold text-center leading-[8px]">
                Event Date: {date}
              </span>
            </div>
          </div>
          {/* New Additions */}
          <div
            className="absolute bottom-[-20px] text-center w-full"
            style={{ lineHeight: "12px", fontSize: "10px" }}
          >
            <span
              className="text-xs text-gray-600"
              style={{ lineHeight: "12px", fontSize: "8px" }}
            >
              This certificate was generated electronically and does not require
              a signature. Verify this certificate at{" "}
            </span>
            <a
              href={`https://certificate-verification-link.com/?id=${certificateData.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-500 underline"
              style={{ lineHeight: "12px", fontSize: "8px" }}
            >
              {window.location.href}
            </a>
          </div>
          {/* Seal Design */}
          <div className="absolute top-[-20px] left-[180px] flex scale-90">
            <div className="relative top-10 left-[65.5px] w-[50px] h-[70px]">
              <img
                src="/Digital-Certificate-Wallet-Portal/external/subtract6449-ebpi.svg"
                alt="Subtract6449"
                className="absolute w-full h-full"
              />
            </div>
            <div className="relative w-[80px] h-[77px]">
              <img
                src="\Digital-Certificate-Wallet-Portal/external\kisspnggoldsealgoldmedal5a8f4b8c92929616447-lzb5-200h.png"
                alt="Seal"
                className="absolute w-full h-full"
              />
              <span className="absolute top-[22.87px] left-[27.5px] text-[#1c1c1c] text-[10px] italic font-[Brush Script MT] leading-[12px] text-center">
                <span className="flex flex-col items-center justify-center">
                  <span
                    dangerouslySetInnerHTML={{
                      __html:
                        '<img src="/Digital-Certificate-Wallet-Portal/external/images/gdg_logo.png" alt="GDG Logo" class="w-5 h-5" />',
                    }}
                  />
                  Event
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
