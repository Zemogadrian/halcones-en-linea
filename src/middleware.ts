import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from './services/supabase/middleware'
import { foundUserRedirect, userHasPermissionToEnter } from './services/supabase/functions/utils'

const LOGIN_PATHNAME = '/login'

// This function can be marked `async` if using `await` inside
export async function middleware (request: NextRequest) {
  const response = NextResponse.next()
  const pathname = new URL(request.url).pathname
  const supabase = await createClient(request, response)
  const { data } = await supabase.auth.getSession()

  const isLogged = data?.session != null

  // Si no hay un usuario no logueado y trata de acceder a una página que requiere autenticación, redirigirlo a la página de login
  if (pathname !== LOGIN_PATHNAME && !isLogged) {
    return NextResponse.redirect(new URL(LOGIN_PATHNAME, request.url))
  }

  if (pathname === LOGIN_PATHNAME && !isLogged) {
    return response
  }

  const { data: userData } = await supabase.from('user_data').select('roles(*)').eq('owner', data.session?.user.id ?? 0).single()
  const redirectUrl = foundUserRedirect(userData?.roles?.id ?? 0)

  // Si el usuario está logueado y trata de acceder a la página de login, redirigirlo a la página correspondiente
  if (pathname === LOGIN_PATHNAME && isLogged) {
    return NextResponse.redirect(new URL(redirectUrl, request.url))
  }

  // Si el usuario está logueado y trata de acceder a una pagina de la cual no tiene autorización, redirigirlo a la página correspondiente
  const authorizeOrRedirect = (
    userHasPermissionToEnter(userData?.roles?.id ?? 0, pathname) &&
    pathname !== '/'
  )
    ? () => response
    : () => NextResponse.redirect(new URL(redirectUrl, request.url))

  return authorizeOrRedirect()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
}
