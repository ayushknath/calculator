const Key = ({ keyChar, handleClick, coloredKeys }) => {
  return (
    <button
      className={`p-2 rounded-md ring-1 ring-slate-100 text-white text-[1.5rem] md:text-[2rem] bg-[#294058] ${
        keyChar === "AC" && "col-span-2"
      } ${keyChar === "=" && "!bg-[#c9e69d] text-black"} ${
        coloredKeys.some((char) => char === keyChar)
          ? "!bg-[#226cae] text-white"
          : ""
      }`}
      onClick={() => handleClick(keyChar)}
    >
      {keyChar}
    </button>
  );
};

export default Key;
