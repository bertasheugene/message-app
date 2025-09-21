import Joi from "joi";

export const messageSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    "string.min": "Имя должно содержать минимум 2 символа",
    "string.empty": "Имя обязательное поле",
  }),
  phone: Joi.string()
    .pattern(/^(?:375|80)(?:25|29|33|44)\d{7}$/)
    .required()
    .messages({
      "string.pattern.base": "Введите номер телефона (+375... или 80...)",
      "string.empty": "Телефон обязателеное поле",
    }),
  message: Joi.string().min(2).required().messages({
    "string.min": "Сообщение должно содержать минимум 2 символа",
    "string.empty": "Сообщение обязательное поле",
  }),
});
