import { InputHTMLAttributes, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: string
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className, ...props }, ref) => {
    const baseStyles = 'h-5 w-5 rounded border-gray-300 text-honda-red focus:ring-honda-red'
    const errorStyles = 'border-red-500 focus:ring-red-500'

    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            ref={ref}
            className={twMerge(
              baseStyles,
              error && errorStyles,
              className
            )}
            {...props}
          />
        </div>
        {label && (
          <div className="ml-3">
            <label className="text-sm font-medium text-gray-700">
              {label}
            </label>
            {error && (
              <p className="mt-1 text-sm text-red-500">
                {error}
              </p>
            )}
          </div>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export default Checkbox 