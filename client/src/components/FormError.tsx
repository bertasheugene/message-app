interface FormErrorProps {
  errorMessage?: string;
}

const FormError: React.FC<FormErrorProps> = ({ errorMessage }) => {
  return <p className="error">{errorMessage}</p>;
};
export default FormError;
