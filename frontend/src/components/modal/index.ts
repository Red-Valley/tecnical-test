import React from 'react'
export * from './Modal'

/**
 * This interface describes the modal props
 *
 * @typeParam show: boolean - Indicates if show the modal
 * @typeParam children: React.ReactNode - Modal children
 * @typeParam title?: string - Optional title
 * @typeParam toggleModal?: () => void - Optional function for show and hide the modal
 */
export interface IModalProps {
  show: boolean
  children: React.ReactNode
  title?: string
  toggleModal?: () => void
}
