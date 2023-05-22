import { useState } from "react";
import QRCode from "react-qr-code";
import TextField from "@mui/material/TextField";

const QRgenerator = () => {
  const [table, setTable] = useState();
//   const downloadQR = () => {
//     const canvas = document.getElementById("123456");
//     console.log(canvas);
//     const pngUrl = canvas
//       .toDataURL("image/png")
//       .replace("image/png", "image/octet-stream");
//     let downloadLink = document.createElement("a");
//     downloadLink.href = pngUrl;
//     downloadLink.download = "123456.png";
//     document.body.appendChild(downloadLink);
//     downloadLink.click();
//     document.body.removeChild(downloadLink);
//   };
  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "2rem" }}
      >
        <TextField
          id="outlined-basic"
          label="מספר שולחן"
          variant="outlined"
          onChange={(event) => setTable(event.target.value)}
        />
      </div>
      <div style={{ width: "max-content", margin: "auto" }}>
        <QRCode
          style={{ height: "400px", maxWidth: "100%", width: "400px" }}
          value={`http://localhost:3000/cafecafe/${table}`}
          viewBox={`0 0 256 256`}
          title={"סרקו אותי"}
          id="123456"
          size={290}
          level={"H"}
        />
      </div>
      {/* <button onClick={downloadQR}> Download QR </button> */}
    </div>
  );
};

export default QRgenerator;
