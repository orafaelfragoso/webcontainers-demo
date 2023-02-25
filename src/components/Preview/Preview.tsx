import React, { useState, useRef } from "react";
import { run } from "../../services/container";
import { files } from "../../utils/files";

function Preview() {
  const iframeRef = useRef() as React.MutableRefObject<HTMLIFrameElement>;
  const [running, setRunning] = useState(false);
  const [ready, setReady] = useState(false);

  const handleRun = async () => {
    setRunning(true);
    setReady(false);
    run(files, iframeRef.current, () => {
      setRunning(false);
      setReady(true);
    });
  };

  return (
    <div className="mockup-window bg-base-300 w-full max-w-[1024px] h-1/2">
      <div
        className="tooltip tooltip-left tooltip-primary absolute top-2 right-6"
        data-tip="Allow third-party cookies before running"
      >
        <button
          className={`btn btn-primary btn-sm ${running ? "loading" : ""}`}
          disabled={running}
          onClick={handleRun}
        >
          {running ? "Running" : "Run"}
        </button>
      </div>
      <div
        className={`justify-center items-center h-full px-4 py-16 bg-base-200 ${
          ready ? "hidden" : "flex"
        }`}
      >
        {running ? "" : 'Click "Run" to load the code.'}
      </div>
      <iframe
        ref={iframeRef}
        allow="cross-origin-isolated"
        src=""
        className={`w-full h-full ${ready ? "block" : "hidden"}`}
      ></iframe>
    </div>
  );
}

export default Preview;
