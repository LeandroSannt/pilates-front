interface InputTableProps {
  prefix?: string;
  width?: string;
  valueInput?({ value, index }: any): void;
  index?: number;
}

const InputTable: React.FC<InputTableProps> = ({
  index,
  valueInput,
  width = '100%',
  prefix,
}) => {
  return (
    <div className="mt-1 border relative rounded-md shadow-sm">
      {!!prefix && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">{prefix}</span>
        </div>
      )}
      <input
        onChange={(e) => {
          valueInput && valueInput({ value: e.target.value, index: index });
        }}
        type="text"
        name="company-website"
        id="company-website"
        className={`
          h-11
        focus:ring-indigo-500 
        focus:border-indigo-500 
          block 
          w-[100%] 
          ${!!prefix && 'pl-36 sm:pl-36'} 
          sm:text-sm
        border-gray-300 
          rounded-md
          px-3
          outline-blue700
          `}
      />
    </div>
  );
};

export default InputTable;
