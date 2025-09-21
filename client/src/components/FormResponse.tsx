interface FormResponseProps {
  isError?: boolean;
  isShow?: boolean;
}

const FormResponse: React.FC<FormResponseProps> = ({ isError, isShow }) => {
  return (
    <div
      className={`absolute py-2 px-4 rounded-md  top-7 transition-all duration-300 ${
        isError ? "bg-red-300 text-red-700" : "bg-green-300 text-green-700 "
      } ${isShow ? "opacity-100 translate-y-0 " : "opacity-0 translate-y-4 "}`}
    >
      {isError
        ? "Ошибка при отправке сообщения!"
        : "Сообщение успешно отправлено!"}
    </div>
  );
};
export default FormResponse;
