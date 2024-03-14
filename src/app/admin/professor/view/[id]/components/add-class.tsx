'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { IconPlus } from '@tabler/icons-react'
import { useState } from 'react'
import { AddClassForm } from './add-class-form'

interface Props {
  professorId: string
}

export const AddClass = ({ professorId }: Props) => {
  const [isView, setView] = useState(false)

  return (
    <>
      <button
        onClick={() => setView(true)}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded transition-colors'
      >
        <IconPlus size={20} />
      </button>

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
              <AddClassForm
                professorId={professorId}
                onCreate={() => {
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
