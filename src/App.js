import React, { useRef, useEffect } from 'react';

const signatureUrl = 'https://e7.pngegg.com/pngimages/895/900/png-clipart-electronic-signature-signature-miscellaneous-angle-thumbnail.png'; // Replace with the actual path to your signature image
const crfInformation = {
  signature: signatureUrl, // Replace with the actual path to your signature image
  name: 'David Zylker',
  email: 'davidzylker@zohomail.in',
  reason: 'Sample Partnership Agreement',
  time: 'Nov 29 2022, 17:57:52',
};

const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
};

const drawCRFSignatureImage = async (canvas, crfInformation) => {
  const ctx = canvas.getContext('2d');
  const { signature, name, email, reason, time } = crfInformation;

  // Load the signature image
  const signatureImg = await loadImage(signature);

  // Define canvas size
  const textHeight = 200;
  const padding = 20;
  const totalHeight = signatureImg.height + textHeight + padding * 2;
  const totalWidth = signatureImg.width + padding * 2;

  canvas.width = totalWidth;
  canvas.height = totalHeight;

  // Draw the signature image
  ctx.drawImage(signatureImg, padding, padding);

  // Set text properties
  ctx.font = '20px Arial';
  ctx.fillStyle = 'black';
  ctx.textBaseline = 'top';

  const textX = padding;
  let textY = signatureImg.height + padding + 10;

  // Draw the CRF information
  ctx.fillText('Digitally signed via Zoho Sign by:', textX, textY);
  textY += 30;
  ctx.fillText(`Name: ${name}`, textX, textY);
  textY += 30;
  ctx.fillText(`Email: ${email}`, textX, textY);
  textY += 30;
  ctx.fillText(`Reason: ${reason}`, textX, textY);
  textY += 30;
  ctx.fillText(`Time: ${time}`, textX, textY);
};

const App = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const generateCRFSignatureImage = async () => {
      if (canvasRef.current) {
        await drawCRFSignatureImage(canvasRef.current, crfInformation);
      }
    };

    generateCRFSignatureImage();
  }, []);

  const handleDownload = async () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;

      canvas.toBlob((blob) => {
        if (blob) {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'CRFSignature.png';
          link.click();
        }
      }, 'image/png');
    }
  };

  return (
    <div className="App">
      <h1>CRF Signature App</h1>
      <canvas ref={canvasRef}></canvas>
      <button onClick={handleDownload}>Download Image</button>
    </div>
  );
};

export default App;
