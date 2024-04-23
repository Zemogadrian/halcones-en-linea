import { test, expect, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
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

  //   test('Succes login', async () => {
  //     email.value = 'jedealbagaytan@gmail.com'
  //     password.value = '46983916'

  //     button.click()

  //     await new Promise(resolve => setTimeout(resolve, 3000))

  //     const paragraphError = screen.getByRole('paragraph')

  //     console.log(paragraphError)

  //     expect(
  //       paragraphError != null
  //     )
  //       .toBe(false)
  //   })

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
