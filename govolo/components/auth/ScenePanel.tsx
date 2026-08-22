import {Plane} from "lucide-react";

export default function ScenePanel() {
  return (
    <aside className="relative hidden lg:flex flex-col justify-center overflow-hidden  text-white px-12 py-11 items-center group">
      <img
        src={"/images/login.jpg"}
        alt={"hello world"}
        className="object-cover inset-0 z-0 w-full h-full group-hover:scale-107 transition duration-500 absolute"
      />

      <div className="absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(7,21,38,0.88)_0%,rgba(7,21,38,0.62)_35%,rgba(7,21,38,0.15)_65%,transparent_100%)]" />

      <div className=" relative z-10   min-h-[560px] flex flex-col justify-between mr-[120px]">
        {/* brand */}
        <div className="relative z-10 flex items-center gap-2.5 text-xl font-bold font-[Plus_Jakarta_Sans,sans-serif] mb-[20px]">
          <Plane className="h-full w-6  text-white" />
          GoVolo
        </div>

        {/* body */}
        <div className="relative z-10  max-w-[620px] w-full font-[Plus_Jakarta_Sans,sans-serif]">
          <h1 className="font-[Plus_Jakarta_Sans,sans-serif] text-[40px] font-extrabold leading-[1.14] tracking-[-0.02em]">
            Your next trip is{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(90deg, #7fe0d6, #7cd2f2)",
              }}
            >
              one login away
            </span>
          </h1>

          <p className="mt-4 text-[16px] leading-[1.65] text-white font-[700]">
            Discover New Places, Experience Amazing Adventures, Create
            Unforgettable Memories, and Let Every Journey Take You Somewhere
            New, because the best stories are the ones you live, explore, and
            share along the way.
          </p>

          <div className="mt-10 flex gap-7">
            <div>
              <b className="block font-[Plus_Jakarta_Sans,sans-serif] text-[22px] font-extrabold">
                50K+
              </b>
              <span className="text-[12.5px] text-white/[0.55]">
                Happy travelers
              </span>
            </div>
            <div>
              <b className="block font-[Plus_Jakarta_Sans,sans-serif] text-[22px] font-extrabold">
                120+
              </b>
              <span className="text-[12.5px] text-white/[0.55]">Countries</span>
            </div>
            <div>
              <b className="block font-[Plus_Jakarta_Sans,sans-serif] text-[22px] font-extrabold">
                4.9★
              </b>
              <span className="text-[12.5px] text-white/[0.55]">
                Avg. rating
              </span>
            </div>
          </div>

          <div className="mt-[46px] max-w-[400px] rounded-[22px] p-[20px_22px] ">
            <p className="mb-3.5 text-sm leading-[1.6] text-white">
              &ldquo;Booked Santorini in under five minutes. Travelix remembered
              my preferences from the last trip, genuinely felt
              effortless.&rdquo;
            </p>
            <div className="flex items-center gap-2.5">
              <span className="h-[34px] w-[34px] flex-shrink-0 rounded-full bg-gradient-to-br from-[#ec4d8f] to-[#fb7a3b]" />
              <div>
                <b className="block text-[13px] font-bold">Amara Chukwu</b>
                <span className="text-xs text-white/[0.55]">
                  Lagos, Nigeria
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-[12.5px] text-white mt-[20px]">
          © 2026 GoVolo. Wander further.
        </div>
      </div>
    </aside>
  );
}
