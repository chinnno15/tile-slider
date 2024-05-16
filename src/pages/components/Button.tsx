interface IButton {
  text: string;
  onClick: any;
}

const Button = (opts: IButton) => {
  const {text, onClick} = opts;

  return (
    <button
      type="button"
      style={{
        margin: '10px',
      }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;