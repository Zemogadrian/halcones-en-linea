export const LabeledInput = (
  {
    label,
    name,
    type = 'text',
    placeholder
  }:
  {
    label: string
    name: string
    type?: React.HTMLInputTypeAttribute
    placeholder?: string
  }
) => (
  <label
    className='flex flex-col gap-1'
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
    />
  </label>
)
