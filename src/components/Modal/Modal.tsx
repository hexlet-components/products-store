import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

interface ModalProps {
  title: string
  isOpen: boolean
  closeModal: () => void
  children: React.ReactElement
}

const Modal: FC<ModalProps> = ({ title, isOpen, closeModal, children }) => {
  const { t } = useTranslation()

  return (
    <div
      className={`modal fade ${isOpen ? 'show' : ''}`}
      tabIndex={-1}
      style={{ display: 'block', zIndex: `${isOpen ? 1 : -1}`, background: '#00000080' }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {title}
            </h5>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>

          {children}

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={closeModal}
            >
              {t('close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
