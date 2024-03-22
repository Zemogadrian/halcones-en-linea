import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

interface RenderProps extends React.HTMLAttributes<HTMLElement> {
  close: () => void
}

interface Props {
  Button: (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => JSX.Element
  Render: (props: RenderProps) => JSX.Element
}

/**
 * @description This component renders a button that when clicked will show a section with a close button
 * @example <AsideFadeIn Button={(props) => <button {...props} />} Render={(props) => <section {...props} />} />
 */
export const AsideFadeIn = ({ Button, Render }: Props) => {
  const [isView, setView] = useState(false)

  return (
    <>
      <Button
        onClick={() => {
          setView(true)
        }}
      />

      <AnimatePresence>
        {isView && (
          <motion.div
            onClick={() => setView(false)}
            className='fixed flex justify-end w-screen h-screen inset-0 bg-black/50 z-30'
            initial='hidden'
            animate='visible'
            exit='hidden'
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 }
            }}
          >
            <motion.section
              onClick={(e) => e.stopPropagation()}
              variants={{
                hidden: { x: '100%', opacity: 0 },
                visible: { x: 0, opacity: 1 }
              }}
              transition={{ type: 'just' }}
              className=' bg-gradient-to-b from-itesus-secondary from-20% to-itesus-primary w-96 h-full overflow-y-auto p-4'
            >
              <Render
                close={() => {
                  setView(false)
                }}
              />
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
