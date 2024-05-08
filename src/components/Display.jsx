const Display = ({ printPrimary, printSecondary, theme }) => {
  return (
    <div
      className={`display-holder text-right p-2 ${
        theme === "Dark" ? "bg-[#101923] text-white" : "bg-[#e8e8e8]"
      } rounded-md`}
    >
      <div className="secondary-display h-[4rem]">{printSecondary}</div>
      <div className="primary-display h-[5rem] text-2xl font-bold">
        {printPrimary}
      </div>
    </div>
  );
};

export default Display;
