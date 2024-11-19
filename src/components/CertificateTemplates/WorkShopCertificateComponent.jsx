import React, { useEffect, useRef, useState } from 'react';

const WorkShopCertificateComponent = ({ studentName, workshopName, date }) => {
  const [scale, setScale] = useState(1);
  const certificateRef = useRef(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (certificateRef.current) {
        const parentWidth = certificateRef.current.parentElement.offsetWidth;
        const certificateWidth = certificateRef.current.offsetWidth;
        const newScale = parentWidth / certificateWidth;
        setScale(newScale);
      }
    });

    if (certificateRef.current?.parentElement) {
      resizeObserver.observe(certificateRef.current.parentElement);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={certificateRef}
      style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}
      className="w-[400px] h-[280px] flex overflow-hidden relative bg-white shadow-lg"
    >
      <div className="absolute top-0 left-0 w-[400px] h-[72.25px] flex items-start flex-shrink-1">
        <img
          src="/external/vector338311-tra3.svg"
          alt="Vector338311"
          className="absolute top-[1.16px] left-[286.7px] w-[113px] h-[71px]"
        />
        <img
          src="/external/vector328311-ltrt7.svg"
          alt="Vector328311"
          className="absolute top-[1.16px] left-[161.27px] w-[181px] h-[35px]"
        />
        <img
          src="/external/vector318311-8a4b.svg"
          alt="Vector318311"
          className="absolute top-[33.53px] left-[13.87px] w-[42px] h-[14px]"
        />
        <img
          src="/external/vector308311-egvn.svg"
          alt="Vector308311"
          className="absolute top-0 left-0 w-[38px] h-[51px]"
        />
        <img
          src="/external/vector288311-k1a.svg"
          alt="Vector288311"
          className="absolute top-[1.16px] left-[1.16px] w-[161px] h-[43px]"
        />
        <img
          src="/external/vector298311-rfhs.svg"
          alt="Vector298311"
          className="absolute top-[1.16px] left-[59.54px] w-[101px] h-[44px]"
        />
      </div>
      {/* Other elements remain unchanged */}
      <div className="absolute gap-4 top-[43.5px] left-[80px] w-[240px] flex items-center flex-col">
        <span
          style={{
            color: 'rgba(43, 102, 104, 1)',
            height: 'auto',
            fontSize: '20px',
            fontStyle: 'normal',
            textAlign: 'center',
            fontFamily: 'Rockwell',
            fontWeight: 400,
            lineHeight: '20px',
            fontStretch: 'normal',
            textDecoration: 'none',
          }}
        >
          <span>CERTIFICATE</span>
          <br />
          <span>OF ATTENDANCE</span>
        </span>
        <div className="gap-[24px] flex items-end flex-col">
          <div className="flex items-center flex-col gap-[8px]">
            <span
              className="text-[rgba(18, 18, 18, 1)] opacity-[0.50] text-xs font-semibold text-center leading-normal"
              style={{ fontFamily: 'font-BRFirma' }}
            >
              This is to certify that
            </span>
            <div className="flex items-center flex-col gap-[16px]">
              <div className="flex items-center flex-col">
                <span
                  className="text-[32px] text-center leading-[32px]"
                  style={{
                    fontFamily: 'BrushScriptMT',
                    fontStyle: 'italic',
                    color: 'rgba(190,154,69,1)',
                  }}
                >
                  {studentName}
                </span>
                <img
                  src="/external/line148312-d2rm.svg"
                  alt="Line148312"
                  className="w-[160px] h-[1px]"
                />
              </div>
              <div className="gap-[4px] flex items-center flex-col">
                <span
                  className="w-[240px] opacity-[0.80] text-[10px] font-normal text-center"
                  style={{ color: 'rgba(2, 105, 110, 1)', fontFamily: 'Rockwell' }}
                >
                  Has attended
                </span>
                <span
                  className="w-[200px] opacity-[0.80] text-xs font-normal text-center leading-[10px]"
                  style={{
                    color: 'rgba(190, 154, 69, 1)',
                    fontFamily: 'Rockwell',
                  }}
                >
                  {workshopName}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-[80px] self-center">
            <div className="flex gap-1 items-center flex-col">
              <img
                src="/external/line18311-587r.svg"
                alt="Line18311"
                className="w-[80px] h-[1px]"
              />
              <span
                style={{
                  color: 'rgba(2, 105, 110, 1)',
                  fontFamily: 'BR Firma',
                }}
                className="text-[6px] font-medium text-center"
              >
                Workshop Date: {date}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkShopCertificateComponent;
