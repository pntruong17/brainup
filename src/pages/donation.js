import React from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { motion } from "framer-motion";
import DonateButtonWrapper from "@/components/paypal/DonateButton";

const Donation = () => {
  return (
    <>
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
                Your donation will help us develop more high-quality brain games
                in the future. Thank you for your support.
              </p>
              <div className="w-full flex justify-center mt-8">
                <div className="w-[200px]">
                  <PayPalScriptProvider
                    options={{
                      "client-id": process.env.REACT_PAYPAL_CLIENT_ID,
                      components: "buttons",
                      currency: "USD",
                    }}
                  >
                    <DonateButtonWrapper currency={"USD"} />
                  </PayPalScriptProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Donation;
