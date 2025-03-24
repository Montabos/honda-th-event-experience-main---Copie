import { InputHTMLAttributes, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  fullWidth?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, fullWidth = false, ...props }, ref) => {
    const baseStyles = 'rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-honda-red focus:border-transparent'
    const errorStyles = 'border-red-500 focus:ring-red-500'

    return (
      <div className={twMerge('flex flex-col', fullWidth && 'w-full')}>
        {label && (
          <label className="mb-2 text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={twMerge(
            baseStyles,
            error && errorStyles,
            fullWidth && 'w-full',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input 