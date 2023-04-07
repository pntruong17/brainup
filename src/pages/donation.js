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
          className="w-full h-screen p-10"
        >
          <div className="max-w-2xl mx-auto rounded-3xl shadow-md overflow-hidden">
            <div className="w-full h-32 overflow-hidden">
              <img
                className="w-full object-center"
                src="https://www.leaf.ca/wp-content/uploads/elementor/thumbs/iStock-1163228217-scaled-oxcp7dlxlvswkph8bb90c293mgxqktrf4yozycc460.jpg"
                alt="donate image brainup"
              />
            </div>
            <div className="flex">
              <div className="w-full p-10">
                <h2 className="font-bold text-2xl text-center">
                  Let&apos;s do a good deed today!
                </h2>
                <p className="font-medium text-_dark text-center mt-2 sm:px-10">
                  Your donation will help us develop more high-quality brain
                  games in the future. Thank you for your support.
                </p>

                <div className="w-full flex justify-center items-center mt-8">
                  <div className="w-[200px]">
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
                  <h5 className="font-bold font-Nunito px-5">Or</h5>
                  <a
                    className="font-Nunito font-bold border border-_darkblue/[0.5] rounded-full px-8 py-1 text-_darkblue hover:text-_green"
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
