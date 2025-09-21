import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import FormError from "../components/FormError";
import FormResponse from "../components/FormResponse";

interface FormData {
  name: string;
  phone: string;
  message: string;
}

const MessagePage: React.FC = () => {
  const navigate = useNavigate();
  const [isShowResponse, setIsShowResponse] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
    setError,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/messages",
        data
      );
      //console.log(response);
      reset();
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "Ошибка при отправке сообщения!",
      });
    } finally {
      setIsShowResponse(true);

      setTimeout(() => {
        setIsShowResponse(false);
      }, 2000);
    }
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^(?:375|80)(?:25|29|33|44)\d{7}$/;
    return phoneRegex.test(phone.replace(/\D/g, ""));
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <FormResponse isShow={isShowResponse} isError={!isSubmitSuccessful} />
      <div className="bg-gray-700 p-4 rounded-lg shadow-xl max-w-lg w-full mx-4">
        <h1 className="text-2xl font-bold mb-4">Отправьте сообщение</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              className="form-label form-label-required"
              htmlFor="form-name"
            >
              Имя
            </label>
            <input
              {...register("name", {
                required: "Имя обязательно",
                minLength: {
                  value: 2,
                  message: "Имя должно содержать минимум 2 символа",
                },
              })}
              className={`form-field ${errors.name ? "border-red-500 " : " "}`}
              placeholder="Введите имя"
              id="form-name"
            />
            {errors.name && <FormError errorMessage={errors.name.message} />}
          </div>

          <div>
            <label
              className="form-label form-label-required"
              htmlFor="form-phone"
            >
              Телефон
            </label>
            <input
              {...register("phone", {
                required: "Телефон обязателен",
                validate: {
                  belarusianFormat: (v) =>
                    validatePhone(v) ||
                    "Введите номер телефона (+375... или 80...)",
                },
              })}
              className={`form-field ${errors.phone ? "border-red-500 " : ""}`}
              placeholder="+375 XX XXX-XX-XX"
              id="form-phone"
            />
            {errors.phone && <FormError errorMessage={errors.phone.message} />}
          </div>

          <div>
            <label
              className="form-label form-label-required"
              htmlFor="form-message"
            >
              Сообщение
            </label>
            <textarea
              {...register("message", {
                required: "Сообщение обязательно",
                minLength: {
                  value: 2,
                  message: "Сообщение должно содержать минимум 2 символа",
                },
              })}
              rows={4}
              className={`form-field ${
                errors.message ? "border-red-500 " : ""
              }`}
              placeholder="Введите сообщение"
              id="form-message"
            />
            {errors.message && (
              <FormError errorMessage={errors.message.message} />
            )}
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              className="btn btn-success disabled:opacity-50"
              disabled={isSubmitting}
            >
              Отправить
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="btn btn-primary"
            >
              Назад
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessagePage;
