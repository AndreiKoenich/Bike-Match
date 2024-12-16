import Joi from 'joi';
import { regularExpressions } from '../../enums/regularExpressions.js';
import { validationRules } from '../../enums/validationRules.js';
import { userRoles } from '../../enums/userRoles.js';

export const userSchema = Joi.object({
    name: Joi.string()
        .min(validationRules.MIN_NAME_SIZE)
        .max(validationRules.MAX_NAME_SIZE)
        .pattern(regularExpressions.LETTERS_SPACE_APOSTROPHE_HYPHEN)
        .messages({
            'string.empty': 'O nome não pode estar vazio.',
            'string.min': `O nome deve ter pelo menos ${validationRules.MIN_NAME_SIZE} caracteres.`,
            'string.max': `O nome deve ter no máximo ${validationRules.MAX_NAME_SIZE} caracteres.`,
            'string.pattern.base': 'O nome só pode conter letras, espaços, apóstrofos e hífens.',
        })
        .required(),
    login: Joi.string()
        .min(validationRules.MIN_LOGIN_SIZE)
        .max(validationRules.MAX_LOGIN_SIZE)
        .pattern(regularExpressions.LOGIN)
        .messages({
            'string.empty': 'O login não pode estar vazio.',
            'string.min': `O login deve ter pelo menos ${validationRules.MIN_LOGIN_SIZE} caracteres.`,
            'string.max': `O login deve ter no máximo ${validationRules.MAX_LOGIN_SIZE} caracteres.`,
            'string.pattern.base': 'O login só pode conter letras, números e os caracteres .-_',
        })
        .required(),
    age: Joi.number()
        .min(validationRules.MIN_AGE)
        .messages({
            'number.base': 'A idade deve ser um número.',
            'number.min': `O usuário deve ter pelo menos ${validationRules.MIN_AGE} anos.`,
        })
        .required(),
    email: Joi.string()
        .email()
        .messages({
            'string.email': 'Formato do e-mail inválido.',
        })
        .required(),
    cpf: Joi.string()
        .pattern(regularExpressions.NUMBERS)
        .length(validationRules.CPF_SIZE)
        .messages({
            'string.pattern.base': `CPF inválido. O CPF deve ter exatamente ${validationRules.CPF_SIZE} números.`,
            'string.length': `CPF inválido. O CPF deve ter exatamente ${validationRules.CPF_SIZE} números.`,
        })
        .required(),
    password: Joi.string()
        .min(validationRules.MIN_PASSWORD_SIZE)
        .max(validationRules.MAX_PASSWORD_SIZE)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/)
        .messages({
            'string.min': `A senha deve ter pelo menos ${validationRules.MIN_PASSWORD_SIZE} caracteres.`,
            'string.max': `A senha deve ter no máximo ${validationRules.MAX_PASSWORD_SIZE} caracteres.`,
            'string.pattern.base': 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.',
        })
        .required(),
    role: Joi.string()
        .valid(...Object.values(userRoles))
        .messages({
            'any.only': `Papel do usuário inválido. Os papéis possíveis são: ${Object.values(userRoles).join(', ')}.`,
        })
        .required(),

    registerDate: Joi.string()
        .required()
});
