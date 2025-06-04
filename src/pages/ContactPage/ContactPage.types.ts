import React from "react";

export interface ContactPageProps {
  title?: string;
    subtitle?: string;
    description?: string;
    contactFormTitle?: string;
    contactFormDescription?: string;
    contactFormFields?: {
        name: string;
        email: string;
        message: string;
    };
    contactFormSubmitButtonText?: string;
    contactFormSuccessMessage?: string;
    contactFormErrorMessage?: string;
    contactFormLoadingMessage?: string;
    contactFormSubmitUrl?: string;
    contactFormMethod?: "POST" | "GET";
    contactFormHeaders?: Record<string, string>;
    contactFormOnSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
    contactFormOnSuccess?: (response: any) => void;
    contactFormOnError?: (error: any) => void;
    contactFormOnLoading?: () => void;
    contactFormOnChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    contactFormOnBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    contactFormOnFocus?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    contactFormOnReset?: () => void;
    contactFormResetButtonText?: string;
    contactFormShowResetButton?: boolean;
    contactFormShowLoadingIndicator?: boolean;
    contactFormShowSuccessMessage?: boolean;
    contactFormShowErrorMessage?: boolean;
    contactFormShowValidationErrors?: boolean;
}
export interface FAQ{
    question: string;
    answer: string;
}