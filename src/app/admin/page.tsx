export default function AdminPage () {
  return (
    <form className='flex flex-col'>
      <input type='text' placeholder='Nombres' />
      <input type='text' placeholder='Apellidos' />
      <input type='email' placeholder='Correo' />
      <input type='password' placeholder='Contraseña' />
      <input type='tel' placeholder='Telefono' />
      <input type='date' placeholder='Fecha de nacimiento' />

      <button type='submit'>Registrar</button>
    </form>
  )
}
