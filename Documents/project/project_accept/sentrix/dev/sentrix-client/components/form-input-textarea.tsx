import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface FormInputTextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const FormInputTextarea = ({ label, value, onChange, className = 'w-full' }: FormInputTextareaProps) => {
  return (
    <div className="space-y-2">
      <div className="font-semibold">{label}</div>
      <ReactQuill theme="snow" value={value} onChange={onChange} className={className} />
    </div>
  );
};

export default FormInputTextarea;
