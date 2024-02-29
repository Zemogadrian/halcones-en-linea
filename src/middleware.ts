import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// import { recoverAccount } from './services/halcones/actions'
// import { UserTypes } from './services/halcones/types'
// import { foundUserRedirect, userHasPermissionToEnter } from './services/halcones/utils'

// const LOGIN_PATHNAME = '/login'

// This function can be marked `async` if using `await` inside
export async function middleware (request: NextRequest) {
  // const pathname = request.nextUrl.pathname

  // const token = request.cookies.get('token')

  // const isHasToken = token !== undefined ?? token?.value !== undefined

  // // Si hay un usuario logueado y trata de acceder a la página de login, redirigirlo a su página correspondiente
  // if (pathname === LOGIN_PATHNAME && isHasToken) {
  //   const user = await recoverAccount(token?.value ?? '')

  //   const redirecUrl = foundUserRedirect(user.user_type as UserTypes)

  //   return NextResponse.redirect(new URL(redirecUrl, request.url))
  // }

  // // Si no hay un usuario logueado y trata de acceder a una página que requiere autenticación, redirigirlo a la página de login
  // if (pathname !== LOGIN_PATHNAME && !isHasToken) {
  //   return NextResponse.redirect(new URL(LOGIN_PATHNAME, request.url))
  // }

  // if (isHasToken) {
  //   const user = await recoverAccount(token?.value ?? '')

  //   const isPermitEnter = userHasPermissionToEnter(user.user_type as UserTypes, pathname)

  //   const redirecUrl = foundUserRedirect(user.user_type as UserTypes)

  //   const permitFunction = isPermitEnter ? NextResponse.next : () => NextResponse.redirect(new URL(redirecUrl, request.url))

  //   return permitFunction()
  // }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
}
