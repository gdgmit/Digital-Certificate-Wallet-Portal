import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";

const CaptchaField = forwardRef(({ onCaptchaChange }, ref) => {
  const [captchaText, setCaptchaText] = useState("");
  const canvasRef = useRef(null);

  // Generate a random CAPTCHA
  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ123456789";
    const captcha = Array.from({ length: 6 }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join("");
    setCaptchaText(captcha);
    onCaptchaChange(captcha); // Pass the generated CAPTCHA to the parent
  };

  // Draw CAPTCHA on the canvas
  const drawCaptcha = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Canvas dimensions
    canvas.width = 150;
    canvas.height = 50;

    // Draw background
    ctx.fillStyle = "#f3f4f6";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw CAPTCHA text
    ctx.font = "24px Arial";
    ctx.fillStyle = "#1f2937";
    ctx.fillText(captchaText, 30, 35);

    // Add noise lines
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = "#9ca3af";
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    if (captchaText) drawCaptcha();
  }, [captchaText]);

  // Expose the `generateCaptcha` method to the parent using the `ref`
  useImperativeHandle(ref, () => ({
    refreshCaptcha: generateCaptcha,
  }));

  return (
    <div className="flex items-center space-x-4">
      <canvas ref={canvasRef} className="bg-gray-100 rounded-md shadow-md" />
      <button
        type="button"
        onClick={generateCaptcha}
        className="p-2 bg-gray-200 hover:bg-gray-300 rounded-md focus:outline-none"
        title="Refresh CAPTCHA"
      >
        Refresh
      </button>
    </div>
  );
});

export default CaptchaField;
