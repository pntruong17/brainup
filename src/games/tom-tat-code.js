import NavbarSemi from "@/components/NavbarSemi";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import ItemScrollAnimation from "./comps/ItemScrollAnimation";

const TreasureCollection = () => {
  const timeRef = useRef();

  const [firstStart, setFirstStart] = useState(false);

  const [close, setClose] = useState(false);

  const [visible, setVisible] = useState(false);

  const [features, setFeatures] = useState(
    [
      { icon: "🥩", id: 0 },
      { icon: "🍇", id: 1 },
      { icon: "🍈", id: 2 },
      { icon: "🍉", id: 3 },
      { icon: "🍊", id: 4 },
      { icon: "🍋", id: 5 },
    ].sort(() => Math.random() - 0.5)
  );

  const [feaSlot, setFeaSlot] = useState(
    new Array(features.length)
      .fill("empty")
      .map((_, i) => (i < 2 ? features[i] : " "))
  );

  const returnSelectedInDiv = () => {
    const filteredFeatures = features.filter((feature) =>
      selected.includes(feature.id)
    );

    const iconDivs = filteredFeatures.map((feature) => (
      <div className="text-3xl" key={feature.id}>
        {feature.icon}
      </div>
    ));

    return iconDivs;
  };

  const [selected, setSelected] = useState([]);

  const [ins, setIns] = useState(3);

  const start = useRef(false);

  const handleStart = () => {
    setFirstStart(true);
  };
  const handleRestart = () => {
    setFirstStart(false);
    setClose(false);
    setVisible(false);
    setFeatures(features.sort(() => Math.random() - 0.5));
    setFeaSlot(
      new Array(features.length)
        .fill("empty")
        .map((_, i) => (i < 2 ? features[i] : " "))
        .sort(() => Math.random() - 0.5)
    );
    setSelected([]);
    setIns(3);
  };

  useEffect(() => {
    if (!start.current) {
      start.current = !start.current;
      return;
    }

    const updateFeatures = () => {
      const index = feaSlot.findIndex((feature) => feature === " ");
      if (index !== -1) {
        const newFeaSlot = [...feaSlot];
        newFeaSlot[index] = features[ins];
        newFeaSlot.sort(() => Math.random() - 0.5);
        setFeaSlot(newFeaSlot);
      } else {
        const newFeaSlot = [...feaSlot];
        newFeaSlot.sort(() => Math.random() - 0.5);
        setFeaSlot(newFeaSlot);
      }
    };
    updateFeatures();
  }, [ins]);

  const setValue = (_value) => {
    const isInfeaSlot = feaSlot.some((v) => v.id === _value);
    const isInSelected = selected.some((v) => v === _value) || false;

    if (isInfeaSlot && !isInSelected && _value !== " ") {
      setSelected((prev) => [...prev, _value]);
      setIns((prev) => prev + 1);
    } else {
      setSelected((prev) => [...prev, _value]);
      setClose(true);
    }
  };

  return (
    <>
      <NavbarSemi />

      <div className="grid grid-cols-5 w-[400px] h-[560px] mx-auto relative">
        {feaSlot &&
          feaSlot.map((f, i) => {
            return (
              <ItemScrollAnimation
                key={i}
                id={f.id}
                visible={visible}
                setVisible={setVisible}
                item={f.icon}
                ins={"ins"}
                setValue={setValue}
              />
            );
          })}
        {close && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h3 className="text-center text-red-500 font-bold">
              You are Wrong!
            </h3>
            <h3 className="text-center text-sm">Your choices are:</h3>

            <div className="flex justify-center">{returnSelectedInDiv()}</div>
          </div>
        )}
      </div>

      <div className="flex h-screen bg-_accent justify-center items-center">
        <div className="max-w-2xl mx-auto box-shadow-framer rounded-2xl bg-white p-5">
          <div className="grid grid-cols-5 w-[400px] h-[560px] mx-auto relative">
            {feaSlot &&
              feaSlot.map((f, i) => {
                return (
                  <ItemScrollAnimation
                    key={i}
                    id={f.id}
                    visible={visible}
                    setVisible={setVisible}
                    item={f.icon}
                    ins={"ins"}
                    setValue={setValue}
                  />
                );
              })}
            {close && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <h3 className="text-center text-red-500 font-bold">
                  You are Wrong!
                </h3>
                <h3 className="text-center text-sm">Your choices are:</h3>

                <div className="flex justify-center">
                  {returnSelectedInDiv()}
                </div>
              </div>
            )}
          </div>
          <div className="w-full flex h-28 justify-center">
            <button
              onClick={handleStart}
              disabled={firstStart && !close ? true : false}
              className={`${
                firstStart ? "hidden" : ""
              } flex justify-center items-center rounded-full w-28 h-12 border bg-green-400 m-1 hover:box-shadow-framer`}
            ></button>
            <button
              onClick={handleRestart}
              className={`${
                !close ? "hidden" : ""
              } flex justify-center items-center rounded-full w-28 h-12 border bg-green-400 m-1 hover:box-shadow-framer`}
            ></button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TreasureCollection;
