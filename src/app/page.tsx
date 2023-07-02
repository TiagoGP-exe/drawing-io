import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Image src="/images/logo.svg" alt="drawing.io" width={200} height={200} />
      <h1 className="text-6xl font-bold mt-10">
        Welcome to <a href="https://drawing-io.vercel.app">drawing.io!</a>
      </h1>
    </div>
  );
}
