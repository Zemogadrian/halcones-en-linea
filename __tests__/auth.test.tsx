import { test, expect, describe } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import Page from '../src/app/login/page'

describe('Login page', () => {
  render(<Page />)
  const email = screen.getByPlaceholderText('Usuario')
  const password = screen.getByPlaceholderText('Contraseña')
  const button = screen.getByRole('button', { name: 'Ingresar' })

  if (
    !(email instanceof HTMLInputElement) ||
    !(password instanceof HTMLInputElement)
  ) throw new Error('Input elements not found')

  test('Succes login', async () => {
    email.value = 'jedealbafsagaytan@gmail.com'
    password.value = '46983916'

    button.click()

    await waitFor(() => {
      // Assuming the error paragraph is rendered if there's an error
      // Adjust this condition based on your actual implementation
      const paragraphError = screen.queryByRole('paragraph')

      console.log(paragraphError)

      expect(paragraphError).toBeNull() // Expect error paragraph not to be present
    })
  })

  test('Error login', async () => {
    email.value = 'hugo@hugo.com'
    password.value = '123456'

    button.click()

    await new Promise(resolve => setTimeout(resolve, 0))

    const paragraphError = screen.getByRole('paragraph')

    expect(
      paragraphError != null
    )
      .toBe(true)
  })
})
