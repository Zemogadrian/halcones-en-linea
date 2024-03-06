type InputProps = React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>

interface LabeledInputProps extends InputProps {
  label: string
  multiline?: boolean
}

export const LabeledInput = ({
  label,
  multiline = false,
  ...props
}: LabeledInputProps) =>
  !multiline
    ? (
      <label
        className='flex flex-col gap-1 mt-1'
      >
        <span
          className='text-white font-medium'
        >
          {label}
        </span>

        <input
          className='rounded-md px-2'
          {...props}
        />
      </label>
      )
    : (
      <label
        className='flex flex-col gap-1 mt-1'
      >
        <span
          className='text-white font-medium'
        >
          {label}
        </span>

        <textarea
          className='rounded-md px-2'
          {...props}
        />
      </label>
      )

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode
  label: string
}

export const Select = ({ children, label, ...props }: SelectProps) => (
  <label
    className='flex flex-col gap-1 mt-1'
  >
    <span
      className='text-white font-medium'
    >
      {label}
    </span>
    <select
      className='w-full px-2 border py-1 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-itesus-primary focus:border-transparent'
      {...props}
    >
      {children}
    </select>
  </label>
)
