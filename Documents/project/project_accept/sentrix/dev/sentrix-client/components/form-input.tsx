import { FormInputProps } from '@/types/components';

const FormInput = ({ label, className = 'w-full', error, ...props }: FormInputProps) => {
  return (
    <div className={className}>
      <label htmlFor={props.name}>{label}</label>
      <input
        type="text"
        className="form-input disabled:cursor-not-allowed disabled:bg-[#f1f3f5] disabled:text-[#909296]"
        required
        {...props}
      />
      {error && <p className="text-red-500 my-2">{error}</p>}
    </div>
  );
};

export default FormInput;
