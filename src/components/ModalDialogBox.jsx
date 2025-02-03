import React from 'react'

const ModalDialogBox = ({ onConfirm, onCancel }) => {
  return (
    <div>
      <div className="border-2">
        <h1>Are you sure you want to delete all Moods</h1>\
        <div>
          <button onClick={onConfirm} className="border-b-red-100 bg-red-500">
            Yes
          </button>
          <button onClick={onCancel} className="border-b-red-100 bg-blue-500">
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDialogBox
