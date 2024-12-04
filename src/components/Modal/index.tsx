import "./index.css";
export type ModalProps = {
  title: string;
  description: string;
  action: () => void;
  textAction: string;
};
const Modal = ({ title, description, action, textAction }: ModalProps) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <button onClick={action}>{textAction}</button>
      </div>
    </div>
  );
};

export default Modal;
