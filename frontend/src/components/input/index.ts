export * from './Input'

/**
 * This interface describes the item props
 *
 * @typeParam label: string - Label text
 * @typeParam name: string - Input name
 * @typeParam type?: string - Optional prop with a type
 * @typeParam wrapperClassName?: string - Optional prop with a class for customize the wrapper
 * @typeParam inputClassName?: string - Optional prop with a class to customize the input
 * @typeParam value?: string - Optional prop with a input value
 * @typeParam onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void - Optional function for the input handle change
 * @typeParam checked?: boolean - Optional boolean that indicates if the input is required
 */
export interface IInputProps {
  label: string
  name: string
  type?: string
  wrapperClassName?: string
  inputClassName?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  checked?: boolean
  required?: boolean
}
