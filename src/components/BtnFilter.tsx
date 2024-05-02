const BtnFilter = ({
  text,
  onClick,
  isActive,
}: {
  text: string;
  onClick: (filterValue: string) => void;
  isActive: boolean;
}) => {
  const handleClick = () => {
    onClick(text);
  };

  return (
    <button
      className={`min-w-max h-10 text-sm px-6 py-2 rounded-3xl cursor-pointer ${
        isActive ? "bg-slate-300 text-white" : "bg-slate-100 text-slate-500"
      }`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default BtnFilter;
