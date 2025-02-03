import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import ModalDialogBox from "./ModalDialogBox";


const MoodTracker = () => {
  const moods = [
    { text: "Happy", emoji: "🙂" },
    { text: "Sad", emoji: "😢" },
    { text: "Annoyed", emoji: "😒" },
    { text: "Excited", emoji: "🤩" },
    { text: "Angry", emoji: "😡" },
  ];

  const [selectedMood, setSelectedMood] = useState(null);
  // const [moodEntries, setMoodEntries] = useState([]);
  const [moodEntries, setMoodEntries] = useState(() => {
    const savedMoods = localStorage.getItem("moodEntries");
    return savedMoods ? JSON.parse(savedMoods) : [];
  });
  
  const [deletedMoods, setDeletedMoods] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [deleteAllConfirm,setDeleteAllConfirm] = useState(false);

  const addMoodEntry = () => {
    if (!selectedMood) return;
    const date = new Date();
    const dateString = date.toLocaleString();
    setMoodEntries([{ dateString, ...selectedMood },...moodEntries ]);
    toast.success("Mood added");
    setSelectedMood(null);
  };

  // const clearMoods = () => {
  //   setShowModal(true);
    
  //   setMoodEntries([]);
  //   toast.success("Cleared all moods");
  // }

  const confirmClearMoods = () => {
    setMoodEntries([]);
    toast.success("Cleared all moods");
    setShowModal(false);
  };

  const deleteSelectedMood = (index) => {
    setDeletedMoods([...deletedMoods,moodEntries[index]]);
    setMoodEntries(moodEntries.filter((_,i)=>i!==index));
    toast.warning(`${index+1} Mood deleted`);
  }

  const undoEntry=()=>{
    setMoodEntries([...moodEntries,deletedMoods[deletedMoods.length -1]]);
    toast.info("Undo successful!");
  }

  useEffect(() => {
    localStorage.setItem("moodEntries", JSON.stringify(moodEntries));
  }, [moodEntries]);

  return (
    <>
      <ToastContainer />
      {showModal && (
        <ModalDialogBox
          onConfirm={confirmClearMoods}
          onCancel={() => setShowModal(false)}
        />
      )}
      <div className="max-w-md mx-auto p-4 bg-white-300 text-black-50 shadow-md rounded-lg">
        <h1 className="text-xl font-bold mb-4 ">Mood Tracker</h1>
        <div className="flex gap-2 mb-4">
          <select
            className="p-2 border rounded w-full"
            value={selectedMood?.text || ""}
            onChange={(e) =>
              setSelectedMood(moods.find((m) => m.text === e.target.value))
            }
          >
            <option value="" disabled>
              Select your mood
            </option>
            {moods.map((mood) => (
              <option key={mood.text} value={mood.text}>
                {mood.emoji} {mood.text}
              </option>
            ))}
          </select>
          <button
            onClick={addMoodEntry}
            className="bg-yellow-300 text-white bor p-2 rounded cursor-pointer"
          >
            Add
          </button>
        </div>

        {moodEntries.length > 0 && (
          <div className="flex justify-between mb-4">
            <button
              onClick={() => setShowModal(true)}
              className="bg-red-500 text-white p-2 rounded cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}
        <button
          className="cursor-pointer"
          onClick={() => {
            undoEntry();
          }}
        >
          Undo
        </button>

        <ul className="space-y-2">
          {moodEntries.map((mood, index) => (
            <li key={index} className="p-2 border rounded flex justify-between">
              <span>{mood.dateString}</span>
              <span className="text-lg">
                {mood.emoji} {mood.text}
              </span>
              <span
                className="cursor-pointer"
                onClick={() => {
                  deleteSelectedMood(index);
                }}
              >
                ❌Delete
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MoodTracker;
