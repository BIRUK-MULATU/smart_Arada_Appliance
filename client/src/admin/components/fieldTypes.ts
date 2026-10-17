export type FieldType = 'text' | 'textarea' | 'number' | 'checkbox' | 'select'

export type FieldOption = { label: string; value: string | number }

export type FieldConfig = {
  name: string
  label: string
  type: FieldType
  options?: FieldOption[]
  required?: boolean
  placeholder?: string
  nullable?: boolean // number fields only — empty input saves as null instead of 0
}

export type ColumnConfig<T> = {
  key: keyof T
  label: string
  render?: (item: T) => string
}

export type FormValues = Record<string, string | number | boolean>

export function defaultFormValues(fields: FieldConfig[]): FormValues {
  const values: FormValues = {}
  for (const field of fields) {
    if (field.type === 'checkbox') values[field.name] = false
    else if (field.type === 'number') values[field.name] = 0
    else if (field.type === 'select') values[field.name] = field.options?.[0]?.value ?? ''
    else values[field.name] = ''
  }
  return values
}

export function itemToFormValues(item: Record<string, unknown>, fields: FieldConfig[]): FormValues {
  const values: FormValues = {}
  for (const field of fields) {
    const raw = item[field.name]
    if (field.type === 'checkbox') values[field.name] = Boolean(raw)
    else if (field.type === 'number') values[field.name] = raw === null || raw === undefined ? '' : Number(raw)
    else values[field.name] = raw === null || raw === undefined ? '' : String(raw)
  }
  return values
}

export function formValuesToPayload(values: FormValues, fields: FieldConfig[]): Record<string, unknown> {
  const payload: Record<string, unknown> = {}
  for (const field of fields) {
    const raw = values[field.name]
    if (field.type === 'checkbox') {
      payload[field.name] = Boolean(raw)
    } else if (field.type === 'number') {
      if (raw === '' && field.nullable) payload[field.name] = null
      else payload[field.name] = Number(raw)
    } else if (field.type === 'select') {
      const isNumeric = field.options?.some((o) => typeof o.value === 'number')
      payload[field.name] = isNumeric ? Number(raw) : raw
    } else {
      payload[field.name] = raw
    }
  }
  return payload
}
