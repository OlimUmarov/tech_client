import { ChangeEvent } from 'react';

export type FormValues = {
    phone: string;
  };
  
export   type InputProps = {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    value: string;
    onBlur: () => void;
  };