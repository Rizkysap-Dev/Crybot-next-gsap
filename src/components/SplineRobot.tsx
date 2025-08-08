import Spline from "@splinetool/react-spline/next";

export default function SplineRobot() {
  return (
    <main className="relative h-[190%] w-[104%] flex justify-center items-center overflow-hidden">
      <Spline
        className="absolute top-0 left-0"
        scene="https://prod.spline.design/xSyXlHUOSWwUhKK3/scene.splinecode"
      />
    </main>
  );
}
