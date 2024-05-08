const ThemeKey = ({ text, theme, handleTheme }) => {
  return (
    <button
      className={`py-2 px-4 rounded-md ${
        theme === "Dark" && theme === text && "bg-slate-100 text-black"
      }
      ${theme === "Light" && theme === text && "bg-[#294058] text-white"}
      `}
      onClick={() => handleTheme(text)}
    >
      {text}
    </button>
  );
};

export default ThemeKey;
