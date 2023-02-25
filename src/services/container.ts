import { WebContainer, FileSystemTree } from "@webcontainer/api";

let webcontainerInstance: WebContainer;

async function installDependencies() {
  const installProcess = await webcontainerInstance.spawn("npm", ["install"]);
  installProcess.output.pipeTo(
    new WritableStream({
      write(data) {
        console.log(data);
      },
    })
  );

  return installProcess.exit;
}

async function startDevServer(iframe: HTMLIFrameElement, callback: Function) {
  await webcontainerInstance.spawn("npm", ["run", "start"]);

  webcontainerInstance.on("server-ready", (port, url) => {
    iframe.src = url;
    callback();
  });
}

export async function run(
  files: FileSystemTree,
  iframe: HTMLIFrameElement,
  callback: Function
) {
  if (!webcontainerInstance) {
    webcontainerInstance = await WebContainer.boot();
  }
  await webcontainerInstance.mount(files);

  const exitCode = await installDependencies();
  if (exitCode !== 0) {
    throw new Error("Installation failed");
  }

  startDevServer(iframe, callback);
}
