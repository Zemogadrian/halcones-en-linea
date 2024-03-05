export const LabeledInput = (
  {
    label,
    name,
    type = 'text',
    placeholder,
    required = false,
    multiline = false
  }:
  {
    label: string
    name: string
    type?: React.HTMLInputTypeAttribute
    placeholder?: string
    required?: boolean
    multiline?: boolean
  }
) => !multiline
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
        type={type}
        placeholder={placeholder}
        name={name}
        className='rounded-md px-2'
        required={required}
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
        placeholder={placeholder}
        name={name}
        className='rounded-md px-2'
        required={required}
      />
    </label>
    )
