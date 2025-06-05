import type React from "react"

export interface RequestType {
  value: string
  label: string
  icon: React.ReactNode
}

export interface FormState {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  requestType: string
}

export interface ContactFormProps {
  onSubmit: (formData: FormState) => Promise<void>
  requestTypes?: RequestType[]
}
