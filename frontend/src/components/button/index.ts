export * from './Button'

/**
 * This interface describes the button props
 *
 * @typeParam text: string - Button text
 * @typeParam className?: string - Optional prop that customizes the component
 * @typeParam href?: string - Optional prop with the path for redirect
 * @typeParam disabled?: boolean - Optional prop that indicates if disable the button
 * @typeParam onClick?: any - Optional prop with the event executed when the button is clicked
 */
export interface IButtonProps {
  text: string
  className?: string
  href?: string
  disabled?: boolean
  onClick?: any
}
