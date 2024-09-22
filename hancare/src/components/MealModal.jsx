import React from "react";
import "./MealModal.css";

const MealModal = ({ title, message, onCancel, onConfirm, confirm }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{title}</h2>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button className="cancel-button" onClick={onCancel}>
            취소
          </button>
          <button className="confirm-button" onClick={onConfirm}>
            {confirm}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealModal;
