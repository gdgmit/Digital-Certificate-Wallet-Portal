import React, { useEffect, useRef, useState } from "react";

const WorkShopCertificateComponent = ({ studentName, regno, dept, year, certificateData }) => {
  const [scale, setScale] = useState(1);
  const certificateRef = useRef(null);
  const workshopName = certificateData.name;
  const date = certificateData.date;
  const id = certificateData.cert_id;

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
      style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
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
      <div className="absolute top-[237.74px] left-0 w-[400px] h-[42.26px] flex items-start flex-shrink-1">
        <img
          src="/external/vector398311-cvf.svg"
          alt="Vector398311"
          className="absolute top-[11px] left-0 w-[129px] h-[29px]"
        />
        <img
          src="/external/vector388311-qf3q.svg"
          alt="Vector388311"
          className="absolute top-[11px] left-[0.58px] w-[159px] h-[31px]"
        />
        <img
          src="/external/vector378311-39x.svg"
          alt="Vector378311"
          className="absolute top-0 left-[1.16px] w-[27px] h-[18px]"
        />
        <img
          src="/external/vector368311-2l7m.svg"
          alt="Vector368311"
          className="absolute top-[15.05px] left-[166.71px] w-[107px] h-[27px]"
        />
        <img
          src="/external/vector358311-0hwg.svg"
          alt="Vector358311"
          className="absolute top-[8.1px] left-[307.96px] w-[92px] h-[15px]"
        />
        <img
          src="/external/vector348311-64ya.svg"
          alt="Vector348311"
          className="absolute top-[6.95px] left-[252.97px] w-[147px] h-[35px]"
        />
      </div>
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
        className="absolute top-[63.77px] left-[-7.83px] w-[24px] h-[20px]"
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
      <div className="absolute gap-4 top-[23.5px] left-[60px] w-[280px] flex items-center flex-col">
        <span
          style={{
            color: "rgba(43, 102, 104, 1)",
            height: "auto",
            fontSize: "20px",
            fontStyle: "normal",
            textAlign: "center",
            fontFamily: "Rockwell",
            fontWeight: 400,
            lineHeight: "20px",
            fontStretch: "normal",
            textDecoration: "none",
          }}
        >
          <span>CERTIFICATE</span>
          <br />
          <span>OF ATTENDANCE</span>
        </span>
        <div className="gap-[24px] flex items-end flex-col">
          <div className="flex items-center flex-col gap-[8px]">
          <span className="absolute top-[-15px] right-[-57px] text-[#ffffffaa] text-[5.5px] font-medium">
              Certificate ID: {id}
            </span>
            <span
              className="text-[rgba(18, 18, 18, 1)] opacity-[0.50] text-xs font-semibold text-center leading-normal"
              style={{ fontFamily: "font-BRFirma" }}
            >
              This is to certify that
            </span>
            <div className="flex items-center flex-col gap-[16px]">
              <div className="flex items-center flex-col">
                <span className="text-[32px] text-center leading-[32px] font-greatVibes text-[#ffb300]">
                  {studentName}
                </span>
                <img
                  src="/external/line148312-d2rm.svg"
                  alt="Line148312"
                  className="w-[160px] h-[1px]"
                />
              </div>
              <div className="gap-[20px] flex items-center flex-col">
                <span
                  style={{
                    color: "rgba(2, 105, 110, 1)",
                    fontFamily: "BR Firma",
                  }}
                  className="text-[7px] font-medium text-center"
                >
                  {studentName} (Reg No: {regno}), a {year} student of the Department of {dept},  
has actively participated in the 
                <span
                  className="opacity-[0.80] text-[#ffb300]"
                  style={{
                    fontFamily: "Rockwell",
                  }}
                >
                  {" "} {workshopName} { " "}
                </span>
                conducted on {date}.
              </span>
              <span
                className="text-[15px] text-center font-silentha leading-[15px] opacity-60 text-[rgba(18,18,18,1)] font-medium"
              >
                {certificateData.description}
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
            </div>
          </div>
        </div>
        <div className="absolute top-[20px] right-[-45px] flex">
          <div className="relative w-[90px] h-auto">
            <span className="absolute text-[#1c1c1c] text-[10px] italic font-[Brush Script MT] leading-[12px] text-center">
              <span className="flex flex-col items-center justify-center">
                <span
                  dangerouslySetInnerHTML={{
                    __html:
                      '<img src="/external/images/GDG-oC-MIT-logo.png" alt="GDG Logo" class="w-full" />',
                  }}
                />
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkShopCertificateComponent;
