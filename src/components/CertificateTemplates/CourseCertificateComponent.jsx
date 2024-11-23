import React, { useEffect, useRef, useState } from 'react';

const CourseCertificateComponent = ({ studentName, regno, year, dept, certificateData }) => {
  const [scale, setScale] = useState(1);
  const certificateRef = useRef(null);
  const courseName = certificateData.name;
  const date = certificateData.date;
  const skills = certificateData.skills;


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
      style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}
      className="relative w-[368px] h-[248px] opacity-100 border border-[#1c1c1c] overflow-hidden"
    >
      <div className="absolute top-[16px] left-[16px] w-full h-full">
        <img
          src="/external/rectangle16448-rw9-400w.png"
          alt="Certificate Background"
          className="w-full h-full"
        />
      </div>
      <div className="absolute top-0 left-0 w-[386px] h-[149px] flex items-start">
        <img
          src="/external/vector26447-8e4r.svg"
          alt="Vector Decoration"
          className="absolute w-[385px] h-[149px] -left-[2px]"
        />
        <img
          src="/external/vector16447-7j7n.svg"
          alt="Vector Decoration"
          className="absolute w-[386px] h-[142px]"
        />
      </div>
      <span className="absolute top-[24px] left-[16px] text-white w-[240px] text-[18px] font-semibold tracking-tight font-[Bahnschrift] leading-[18px]">
        CERTIFICATE OF COMPLETION
      </span>
      <div className="absolute bottom-[4px] left-[45px] w-[280px] flex flex-col items-center">
        <div className="flex flex-col items-center">
          <span className="text-[#1c1c1c] text-[10px] opacity-70 font-medium">
            This is to certify that
          </span>
          <div className="flex flex-col items-center gap-[4px]">
            <span className="text-[#1c1c1c] text-[25px] font-semibold font-greatVibes">
              {studentName}
            </span>
            <span className="text-[#616161] text-[7px] leading-[9.5px] text-center block mt-[3px]">
            {studentName} (Reg No: {regno}), a {year} student of the Department of {dept}, has successfully completed the  
<span className='text-[#1c1c1c] font-medium opacity-100 font-serif'> "GenAI Study Jam" </span>  
on <span className='text-[#1c1c1c] font-medium opacity-100'> 12-11-2024</span>.
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-[10px] mt-[8px] items-center">
          <span className="text-[#1c1c1c] text-[8px] leading-[12px] text-center font-medium">
            Skills Acquired:
          </span>
          <div className="flex flex-wrap justify-center gap-[6px]">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="text-[#1c1c1c] text-[6px] bg-[#f0f0f0] px-2 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute top-[18px] right-0 flex scale-90">
        <div className="relative w-[100px] h-auto">
          <span className="absolute top-[18.87px] left-[7.5px] text-[#1c1c1c] text-[10px] italic font-[Brush Script MT] leading-[12px] text-center">
            <span className="flex flex-col items-center justify-center">
              <span
                dangerouslySetInnerHTML={{
                  __html:
                    '<img src="/external/images/GDG-oC-MIT-logo.png" alt="GDG Logo" class="w-[200px]" />',
                }}
              />
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourseCertificateComponent;
