// Hook personalizado para validação de formulários
import { useState, useCallback } from 'react';

export interface FormErrors {
  [key: string]: string;
}

export interface ValidationRules {
  [key: string]: {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => boolean;
    message?: string;
  };
}

export const useFormValidation = (rules: ValidationRules) => {
  // Estado que armazena os erros de validação de cada campo
  const [errors, setErrors] = useState<FormErrors>({});

  // Valida um campo individual baseado nas regras definidas
  const validate = useCallback((name: string, value: string): string => {
    const rule = rules[name];
    if (!rule) return '';

    // Verifica se campo obrigatório está preenchido
    if (rule.required && !value.trim()) {
      return rule.message || 'Este campo é obrigatório';
    }

    // Verifica tamanho mínimo
    if (rule.minLength && value.length < rule.minLength) {
      return rule.message || `Mínimo de ${rule.minLength} caracteres`;
    }

    // Verifica padrão regex
    if (rule.pattern && !rule.pattern.test(value)) {
      return rule.message || 'Formato inválido';
    }

    // Executa validação customizada
    if (rule.custom && !rule.custom(value)) {
      return rule.message || 'Valor inválido';
    }

    return '';
  }, [rules]);

  // Valida um campo e atualiza estado de erros
  const validateField = useCallback((name: string, value: string) => {
    const error = validate(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
    return error === '';
  }, [validate]);

  // Valida todos os campos do formulário
  const validateAll = useCallback((values: { [key: string]: string }) => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(rules).forEach(name => {
      const error = validate(name, values[name] || '');
      if (error) {
        newErrors[name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [rules, validate]);

  // Limpa todos os erros
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    errors,
    validateField,
    validateAll,
    clearErrors
  };
};
