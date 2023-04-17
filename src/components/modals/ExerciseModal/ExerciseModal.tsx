import React, { ReactNode } from 'react'

interface ModalType {
  children?: ReactNode
  isOpen: boolean
  toggle: () => void
}

export default function Modal(props: ModalType) {
  return (
    <div>
      <style>{css2}</style>
      <>
        {props.isOpen && (
          <div className="modal-overlay" onClick={props.toggle}>
            <div onClick={e => e.stopPropagation()} className="modal-box">
              {props.children}
            </div>
          </div>
        )}
      </>
    </div>
  )
}

const css2 = `
.modal-overlay {
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-box {
  display: block;
  background: white;
  width: 70%;
  height: 70%;
  padding: 1rem;
  border-radius: 1rem;
  overflow-y: scroll;
}
        `
