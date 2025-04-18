"use client"
import { useState } from "react";
import QRCode from "qrcode";

export default function QRCodeGenerator() {
  const [inputText, setInputText] = useState("");
  const [qrCodeImage, setQRCodeImage] = useState("");

  const generateQRCode = async () => {
    try {
      const qrCodeDataURL = await QRCode.toDataURL(inputText);
      setQRCodeImage(qrCodeDataURL);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>QR Code Generator</h1>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text or URL"
        style={{ padding: "10px", width: "300px", marginRight: "10px" }}
      />
      <button
        onClick={generateQRCode}
        style={{ padding: "10px 20px", cursor: "pointer" }}
      >
        Generate QR Code
      </button>

      {qrCodeImage && (
        <div style={{ marginTop: "20px" }}>
          <img src={qrCodeImage} alt="QR Code" />
        </div>
      )}
    </div>
  );
}