import React from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { motion } from "framer-motion";
import DonateButtonWrapper from "@/components/paypal/DonateButton";
import LayoutEmpty from "@/components/LayoutEmpty";

const Donation = () => {
  return (
    <>
      <LayoutEmpty
        pageMeta={{
          title: "Donation",
          description: "the donation helps Brain Up greatly",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full h-screen p-5 md:p-10"
        >
          <div className="max-w-2xl mx-auto rounded-3xl shadow-md overflow-hidden pb-3 bg-white">
            <div className="w-full h-32 overflow-hidden">
              <img
                className="w-full object-center"
                src="https://www.leaf.ca/wp-content/uploads/elementor/thumbs/iStock-1163228217-scaled-oxcp7dlxlvswkph8bb90c293mgxqktrf4yozycc460.jpg"
                alt="donate image brainup"
              />
            </div>
            <div className="flex">
              <div className="w-full p-2 md:p-10">
                <h2 className="font-bold text-_bg_dark text-2xl text-center">
                  Let&apos;s do a good deed today!
                </h2>
                <p className="font-medium text-_bg_dark text-center mt-2 sm:px-10">
                  Your donation will help us develop more high-quality brain
                  games in the future. Thank you for your support.
                </p>

                <div className="w-full flex flex-wrap justify-center items-center mt-8">
                  <div className="w-full md:w-1/3">
                    <PayPalScriptProvider
                      options={{
                        "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                        components: "buttons",
                        currency: "USD",
                      }}
                    >
                      <DonateButtonWrapper currency={"USD"} />
                    </PayPalScriptProvider>
                  </div>
                  <h5 className="w-full md:w-1/3 font-bold font-Nunito px-5 text-center">
                    Or
                  </h5>
                  <a
                    className="w-full md:w-1/3 font-Nunito font-bold border border-_darkblue/[0.5] rounded-md px-8 py-1 text-_darkblue hover:text-_green hover:border-_green text-center"
                    href="https://www.buymeacoffee.com/brainup"
                  >
                    Buy me a coffee!
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </LayoutEmpty>
    </>
  );
};

export default Donation;
