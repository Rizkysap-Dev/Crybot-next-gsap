import Container from "@/components/Container";
import Navbar from "@/components/Layouts/navbar/Navbar";
import SplineRobot from "@/components/SplineRobot";
import HeroSection from "@/components/home/HeroSection";
import CardGlass from "@/components/ui/CardGlass";
import Image from "next/image";
import Mockup from "@/components/ui/Mockup";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen relative">
      <div className="h-full w-full">
        <Navbar />
        <Container>
          <section className="mt-5 z-50">
            <HeroSection />
          </section>
        </Container>
      </div>
      <div>
        <div className="absolute bottom-2 z-50 left-0">
          <Container>
            <div className="flex justify-start items-center">
              <CardGlass className="p-2 w-[320px]">
                <div className="flex flex-col items-center space-y-5">
                  <div className="flex justify-start space-x-2 items-center">
                    <Image
                      className="h-10 w-10 rounded-full"
                      src="/photoRobot.png"
                      alt="robot"
                      width={80}
                      height={80}
                    />
                    <div>
                      <p>HI, I&apos;m Crybot Pro</p>
                      <p>I&apos;ll tell you everything about crypto</p>
                    </div>
                  </div>
                  <div className="w-full">
                    <Link
                      href="/download"
                      className="button-glass w-full flex justify-center items-center">
                      Download Now
                    </Link>
                  </div>
                </div>
              </CardGlass>
            </div>
          </Container>
        </div>
        <div className="absolute bottom-18 right-0 z-50">
          <Container className="flex flex-col justify-center items-center">
            <span className="text-lg line-height-heading">Home</span>
            <p className="text-xl font-heading line-height-heading">
              Scroll to Explore
            </p>
          </Container>
        </div>
      </div>
      {/* mockup */}
      <Mockup />
      <div className="h-full w-full overflow-hidden absolute top-0 left-0 z-10">
        <SplineRobot />
      </div>
    </main>
  );
}
