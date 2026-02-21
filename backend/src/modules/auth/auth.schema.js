const Joi = require('joi');

// Signup
const signupSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Please provide a valid email address',
        'string.empty': 'Email cannot be empty',
        'any.required': 'Email is required'
    }),
    username: Joi.string().min(3).max(30).default(Joi.ref('email')).messages({
        'string.base': 'Username must be a string',
        'string.empty': 'Username cannot be empty',
        'string.min': 'Username must be at least 3 characters long',
        'string.max': 'Username must not exceed 30 characters'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required'
    }),
    phone: Joi.string().pattern(/^[0-9]{10,15}$/).optional().messages({
        'string.pattern.base': 'Phone number must be 10-15 digits'
    }),
    age: Joi.number().integer().min(13).max(120).optional().messages({
        'number.base': 'Age must be a number',
        'number.min': 'Age must be at least 13',
        'number.max': 'Age must not exceed 120'
    }),
    sex: Joi.string().valid('male', 'female', 'other').optional().messages({
        'any.only': 'Sex must be either male, female, or other'
    }),
    avatar: Joi.string().uri().optional().messages({
        'string.uri': 'Avatar must be a valid URL'
    }),
    role: Joi.string().valid('user', 'organizer').default('user').messages({
        'any.only': 'Role must be either user or organizer'
    })
});

// Organizer Signup - Requires all user fields + additional organizer-specific fields
const organizerSignupSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Please provide a valid email address',
        'string.empty': 'Email cannot be empty',
        'any.required': 'Email is required'
    }),
    username: Joi.string().min(3).max(30).default(Joi.ref('email')).messages({
        'string.base': 'Username must be a string',
        'string.empty': 'Username cannot be empty',
        'string.min': 'Username must be at least 3 characters long',
        'string.max': 'Username must not exceed 30 characters'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required'
    }),
    phone: Joi.string().pattern(/^[0-9]{10,15}$/).required().messages({
        'string.pattern.base': 'Phone number must be 10-15 digits',
        'any.required': 'Phone number is required for organizer'
    }),
    age: Joi.number().integer().min(18).max(120).required().messages({
        'number.base': 'Age must be a number',
        'number.min': 'Organizer must be at least 18 years old',
        'number.max': 'Age must not exceed 120',
        'any.required': 'Age is required for organizer'
    }),
    sex: Joi.string().valid('male', 'female', 'other').optional().messages({
        'any.only': 'Sex must be either male, female, or other'
    }),
    avatar: Joi.string().uri().optional().messages({
        'string.uri': 'Avatar must be a valid URL'
    }),
    // Organizer-specific fields
    citizenId: Joi.string().pattern(/^[0-9]{9,12}$/).required().messages({
        'string.pattern.base': 'Citizen ID must be 9-12 digits',
        'string.empty': 'Citizen ID cannot be empty',
        'any.required': 'Citizen ID is required for organizer'
    }),
    bankAccount: Joi.object({
        accountNumber: Joi.string().pattern(/^[0-9]{9,20}$/).required().messages({
            'string.pattern.base': 'Account number must be 9-20 digits',
            'any.required': 'Account number is required'
        }),
        accountName: Joi.string().min(3).max(100).required().messages({
            'string.min': 'Account name must be at least 3 characters',
            'any.required': 'Account name is required'
        }),
        bankName: Joi.string().min(3).max(100).required().messages({
            'string.min': 'Bank name must be at least 3 characters',
            'any.required': 'Bank name is required'
        })
    }).required().messages({
        'any.required': 'Bank account information is required for organizer'
    }),
    role: Joi.string().valid('organizer').default('organizer').messages({
        'any.only': 'Role must be organizer for this registration'
    })
});

// Signin
const signinSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Please provide a valid email address',
        'string.empty': 'Email cannot be empty',
        'any.required': 'Email is required'
    }),
    password: Joi.string().required().messages({
        'string.empty': 'Password cannot be empty',
        'any.required': 'Password is required'
    })
});

// Forgot Password
const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Please provide a valid email address',
        'string.empty': 'Email cannot be empty',
        'any.required': 'Email is required'
    })
});

// Reset Password
const resetPasswordSchema = Joi.object({
    token: Joi.string().required().messages({
        'string.empty': 'Token cannot be empty',
        'any.required': 'Token is required'
    }),
    newPassword: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'New password is required'
    })
});

module.exports = {
    signupSchema,
    organizerSignupSchema,
    signinSchema,
    forgotPasswordSchema,
    resetPasswordSchema
};