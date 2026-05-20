import {
  createContext,
  useContext,
  useState
} from "react"

const ModalContext = createContext()

function ModalProvider({ children }) {
  const [itemId, setItemId] =
    useState(null)

  const [mediaType, setMediaType] =
    useState(null)

  const openModal = (
    id,
    type
  ) => {
    setItemId(id)
    setMediaType(type)
  }

  const closeModal = () => {
    setItemId(null)
    setMediaType(null)
  }

  return (
    <ModalContext.Provider
      value={{
        itemId,
        mediaType,
        openModal,
        closeModal
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

function useModal() {
  return useContext(ModalContext)
}

export {
  ModalProvider,
  useModal
}