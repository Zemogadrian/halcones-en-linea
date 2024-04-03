'use client'

import { JitsiMeeting } from '@jitsi/react-sdk'

interface Props {
  code: string
  account: {
    first_name: string
    email: string
  }
  appName: string
}

export const Meet = ({ account, code, appName }: Props) => (
  <JitsiMeeting
    domain='meet.jit.si'
    roomName={code}
    configOverwrite={{
      disableModeratorIndicator: true
    }}
    lang='es'
    interfaceConfigOverwrite={{
      APP_NAME: appName,
      DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
      HIDE_INVITE_MORE_HEADER: true
    }}
    userInfo={{
      displayName: account.first_name,
      email: account.email
    }}
    onApiReady={(externalApi) => {
      // here you can attach custom event listeners to the Jitsi Meet External API
      // you can also store it locally to execute commands
    }}
    getIFrameRef={(iframeRef) => { iframeRef.style.height = '100vh' }}
  />
)
