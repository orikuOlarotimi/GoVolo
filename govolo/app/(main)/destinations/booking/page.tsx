import { MdOutlineAddLocationAlt } from "react-icons/md";

const page = () => {
  return (
    <div className="bg-[rgb(248,250,252)]">
      <div className="relative">
        <div className="py-30 px-4 flex items-center justify-center bg-gradient-to-br from-[rgb(5,15,25)] via-[rgb(8,30,45)] to-[rgb(10,65,90)]">
          <div className="container">
            <div className="flex flex-col items-center">
              <MdOutlineAddLocationAlt size={70} className="text-white mb-6" />
              <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight text-[rgb(255,255,255)]">
                All Destinations
              </h1>
              <div className="h-1 w-20 bg-[rgb(14,164,230)]/50 mx-auto rounded-full mb-4"></div>
            </div>
            <p className="text-[rgb(255,255,255)]/70 text-base mx-[20px] text-center">
              Explore our handpicked destinations around the world
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[rgb(248,250,252)] rounded-t-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="opacity-100 transform-none">
              <div className="flex items-center justify-between max-w-md">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all bg-[rgb(14,168,230)] text-[rgb(255,255,255)] shadow-md">
                    1
                  </div>
                  <span className="ml-2 text-sm font-medium text-[rgb(15,23,41)]">
                    Select Package
                  </span>
                  <div className="w-12 h-px bg-[rgb(225,231,239)] mx-4"></div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all bg-[rgb(242,245,247)] text-[rgb(99,111,129)]">
                    2
                  </div>
                  <span className="ml-2 text-sm font-medium text-[rgb(99,111,129)]">
                    Guest Details
                  </span>
                </div>
              </div>
            </div>
            <form>
              <div className="space-y-6">
                <div className="opacity-100 transform-none">
                  <div className="relative">
                    <label className="block text-sm font-semibold text-[rgb(15,23,41)] mb-2 flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-map-pin h-4 w-4 text-[rgb(14,168,230)]"
                      >
                        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>{" "}
                      Destination
                    </label>
                    <button
                      type="button"
                      className="w-full flex items-center justify-between p-4 rounded-xl border border-[rgb(225,231,239)] bg-[rgb(248,250,252)] hover:border-[rgb(14,168,230)]/40 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&amp;q=80"
                          alt="Bali, Indonesia"
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div className="text-left">
                          <p className="font-semibold text-[rgb(15,23,41)]">
                            Bali, Indonesia
                          </p>
                          <div className="flex items-center gap-2 text-xs text-[rgb(99,111,129)]">
                            <span className="flex items-center gap-0.5">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-star h-3 w-3 text-amber-400 fill-amber-400"
                              >
                                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                              </svg>
                              4.9
                            </span>
                            <span>•</span>
                            <span>5 nights</span>
                          </div>
                        </div>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-chevron-down h-5 w-5 text-[rgb(99,111,129)] transition-transform"
                      >
                        <path d="m6 9 6 6 6-6"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="opacity-100 transform-none">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[rgb(15,23,41)] mb-2 flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-calendar h-4 w-4 text-[rgb(14,168,230)]"
                        >
                          <path d="M8 2v4"></path>
                          <path d="M16 2v4"></path>
                          <rect
                            width="18"
                            height="18"
                            x="3"
                            y="4"
                            rx="2"
                          ></rect>
                          <path d="M3 10h18"></path>
                        </svg>{" "}
                        Check-in
                      </label>
                      <input
                        type="date"
                        className="w-full p-3 rounded-xl border border-[rgb(225,231,239)] bg-[rgb(248,250,252)] text-[rgb(15,23,41)] focus:border-[rgb(14,168,230)] focus:ring-2 focus:ring-[rgb(14,168,230)]/20 outline-none transition-all"
                        value=""
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[rgb(15,23,41)] mb-2 flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-calendar h-4 w-4 text-[rgb(14,168,230)]"
                        >
                          <path d="M8 2v4"></path>
                          <path d="M16 2v4"></path>
                          <rect
                            width="18"
                            height="18"
                            x="3"
                            y="4"
                            rx="2"
                          ></rect>
                          <path d="M3 10h18"></path>
                        </svg>{" "}
                        Check-out
                      </label>
                      <input
                        type="date"
                        className="w-full p-3 rounded-xl border border-[rgb(225,231,239)] bg-[rgb(248,250,252)] text-[rgb(15,23,41)] focus:border-[rgb(14,168,230)] focus:ring-2 focus:ring-[rgb(14,168,230)]/20 outline-none transition-all"
                        value=""
                      />
                    </div>
                  </div>
                </div>
                <div className="opacity-100 transform-none">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[rgb(15,23,41)] mb-2 flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-users h-4 w-4 text-[rgb(14,168,230)]"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>{" "}
                        Adults
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          className="w-8 h-8 rounded-lg border border-[rgb(225,231,239)] flex items-center justify-center hover:bg-[rgb(242,245,247)]"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-semibold">2</span>
                        <button
                          type="button"
                          className="w-8 h-8 rounded-lg border border-[rgb(225,231,239)] flex items-center justify-center hover:bg-[rgb(242,245,247)]"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[rgb(15,23,41)] mb-2 flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-users h-4 w-4 text-[rgb(14,168,230)]"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>{" "}
                        Children
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          className="w-8 h-8 rounded-lg border border-[rgb(225,231,239)] flex items-center justify-center hover:bg-[rgb(242,245,247)]"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-semibold">0</span>
                        <button
                          type="button"
                          className="w-8 h-8 rounded-lg border border-[rgb(225,231,239)] flex items-center justify-center hover:bg-[rgb(242,245,247)]"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-100 transform-none">
                  <div className="relative">
                    <label className="block text-sm font-semibold text-[rgb(15,23,41)] mb-2 flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-hotel h-4 w-4 text-[rgb(14,168,230)]"
                      >
                        <path d="M10 22v-6.57"></path>
                        <path d="M12 11h.01"></path>
                        <path d="M12 7h.01"></path>
                        <path d="M14 15.43V22"></path>
                        <path d="M15 16a5 5 0 0 0-6 0"></path>
                        <path d="M16 11h.01"></path>
                        <path d="M16 7h.01"></path>
                        <path d="M8 11h.01"></path>
                        <path d="M8 7h.01"></path>
                        <rect x="4" y="2" width="16" height="20" rx="2"></rect>
                      </svg>{" "}
                      Room Type
                    </label>
                    <button
                      type="button"
                      className="w-full flex items-center justify-between p-4 rounded-xl border border-[rgb(225,231,239)] bg-[rgb(248,250,252)] hover:border-[rgb(14,168,230)]/40 transition-all"
                    >
                      <div className="text-left">
                        <p className="font-semibold text-[rgb(15,23,41)]">
                          Standard Room
                        </p>
                        <p className="text-xs text-[rgb(99,111,129)]">
                          Comfortable double bed, city view
                        </p>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-chevron-down h-5 w-5 text-[rgb(99,111,129)] transition-transform"
                      >
                        <path d="m6 9 6 6 6-6"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="opacity-100 transform-none">
                  <label className="block text-sm font-semibold text-[rgb(15,23,41)] mb-3">
                    Add-ons
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      className="flex items-center gap-3 p-3 rounded-xl border transition-all border-[rgb(225,231,239)] hover:border-[rgb(14,168,230)]/30"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-coffee h-5 w-5 text-[rgb(99,111,129)]"
                      >
                        <path d="M10 2v2"></path>
                        <path d="M14 2v2"></path>
                        <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"></path>
                        <path d="M6 2v2"></path>
                      </svg>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium text-[rgb(15,23,41)]">
                          Daily Breakfast
                        </p>
                        <p className="text-xs text-[rgb(99,111,129)]">
                          $25/night
                        </p>
                      </div>
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-3 p-3 rounded-xl border transition-all border-[rgb(225,231,239)] hover:border-[rgb(14,168,230)]/30"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-shield h-5 w-5 text-[rgb(99,111,129)]"
                      >
                        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                      </svg>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium text-[rgb(15,23,41)]">
                          Travel Insurance
                        </p>
                        <p className="text-xs text-[rgb(99,111,129)]">
                          $45/night
                        </p>
                      </div>
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-3 p-3 rounded-xl border transition-all border-[rgb(225,231,239)] hover:border-[rgb(14,168,230)]/30"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-car h-5 w-5 text-[rgb(99,111,129)]"
                      >
                        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
                        <circle cx="7" cy="17" r="2"></circle>
                        <path d="M9 17h6"></path>
                        <circle cx="17" cy="17" r="2"></circle>
                      </svg>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium text-[rgb(15,23,41)]">
                          Airport Transfer
                        </p>
                        <p className="text-xs text-[rgb(99,111,129)]">
                          $35/night
                        </p>
                      </div>
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-3 p-3 rounded-xl border transition-all border-[rgb(225,231,239)] hover:border-[rgb(14,168,230)]/30"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-wifi h-5 w-5 text-[rgb(99,111,129)]"
                      >
                        <path d="M12 20h.01"></path>
                        <path d="M2 8.82a15 15 0 0 1 20 0"></path>
                        <path d="M5 12.859a10 10 0 0 1 14 0"></path>
                        <path d="M8.5 16.429a5 5 0 0 1 7 0"></path>
                      </svg>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium text-[rgb(15,23,41)]">
                          Premium WiFi
                        </p>
                        <p className="text-xs text-[rgb(99,111,129)]">
                          $10/night
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="opacity-100 transform-none">
                  <button
                    type="submit"
                    className=" cursor-pointer bg-[linear-gradient(135deg,rgb(13,165,231),rgb(33,196,93))] px-6 w-full py-3 rounded-xl flex items-center justify-center gap-2 group font-semibold transition-all duration-300 ease-in-out text-white  hover:scale-105 rounded-[10px] "
                  >
                    Continue to Guest Details{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-arrow-right h-4 w-4 group-hover:translate-x-0.5 transition-transform"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="lg:col-span-1">
            <div className="opacity-100 transform-none">
              <div className="sticky top-20 bg-[rgb(248,250,252)] border border-[rgb(225,231,239)] rounded-3xl p-6 shadow-xl shadow-[rgb(14,168,230)]/5">
                <h3 className="font-heading font-bold text-lg text-[rgb(15,23,41)] mb-4">
                  Booking Summary
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[rgb(99,111,129)]">
                      Bali, Indonesia · 5 nights
                    </span>
                    <span className="font-medium">$2,495</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[rgb(99,111,129)]">
                      Standard Room upgrade
                    </span>
                    <span className="font-medium">+$0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[rgb(99,111,129)]">
                      Taxes &amp; fees
                    </span>
                    <span>$249.5</span>
                  </div>
                  <div className="h-px bg-[rgb(225,231,239)]"></div>
                  <div className="flex justify-between font-bold text-[rgb(15,23,41)]">
                    <span>Total</span>
                    <span className="text-[rgb(14,168,230)] text-xl">
                      $2,744.5
                    </span>
                  </div>
                </div>
                <div className="mt-6 p-3 rounded-xl bg-[rgb(242,245,247)]/50 text-xs text-[rgb(99,111,129)] flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-info h-4 w-4 text-[rgb(14,168,230)] shrink-0 mt-0.5"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 16v-4"></path>
                    <path d="M12 8h.01"></path>
                  </svg>
                  <span>
                    Free cancellation up to 30 days before check-in. No hidden
                    fees.
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-[rgb(99,111,129)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-shield h-3 w-3 text-[rgb(14,168,230)]"
                  >
                    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                  </svg>
                  <span>SSL Secure Payment</span>
                  <span className="mx-1">•</span>
                  <span>Best Price Guarantee</span>
                </div>
              </div>
            </div>
            <div className="opacity-100 transform-none">
              <div className="mt-6 bg-[rgb(248,250,252)] border border-[rgb(225,231,239)] rounded-2xl p-5">
                <p className="font-semibold text-sm text-[rgb(15,23,41)] mb-3 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-message-circle h-4 w-4 text-[rgb(14,168,230)]"
                  >
                    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                  </svg>{" "}
                  Need help?
                </p>
                <div className="space-y-2">
                  <a
                    href="tel:+15551234567"
                    className="flex items-center gap-3 text-sm text-[rgb(99,111,129)] hover:text-[rgb(14,168,230)] transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[rgb(14,168,230)]/10 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-phone h-3.5 w-3.5 text-[rgb(14,168,230)]"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    +1 (555) 123-4567
                  </a>
                  <a
                    href="mailto:bookings@travelix.com"
                    className="flex items-center gap-3 text-sm text-[rgb(99,111,129)] hover:text-[rgb(14,168,230)] transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[rgb(14,168,230)]/10 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-mail h-3.5 w-3.5 text-[rgb(14,168,230)]"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                      </svg>
                    </div>
                    bookings@travelix.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
