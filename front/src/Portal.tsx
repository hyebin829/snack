import ReactDOM from 'react-dom'

interface IModal {
  children: JSX.Element
}

const Portal = ({ children }: IModal) => {
  const el = typeof window !== 'undefined' && document.getElementById('modal')
  return el && children ? ReactDOM.createPortal(children, el) : null
}

export default Portal
