import Key from "./Key";

const keyChars = [
  ["AC", "Back", "/"],
  ["7", "8", "9", "*"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["00", "0", ".", "="],
];

const Keys = ({ handleClick, coloredKeys }) => {
  return (
    <div className="key-holder mt-4 grid grid-rows-5 grid-cols-4 gap-2">
      {keyChars.map((keyChar) =>
        keyChar.map((char) => (
          <Key
            key={char}
            keyChar={char}
            handleClick={handleClick}
            coloredKeys={coloredKeys}
          />
        ))
      )}
    </div>
  );
};

export default Keys;
