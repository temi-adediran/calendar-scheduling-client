import { Select, Textarea, Button } from "flowbite-react";
import { useState } from "react";
import { BaseService } from "../services/BaseService";

function ScoreForm({ session, handleShowDetail }) {
  const [score, setScore] = useState(1);
  const [note, setNote] = useState("");
  const scoreOptions = [...Array(5).keys()].map((v) => v + 1);

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitRating = async (data) => {
      try {
        const response = await BaseService.post("post_rating", data);
        console.log(response);
        alert(response.message);
      } catch (e) {
        console.log(e);
      }
    }

    submitRating({rating: score, note: note, id: session.id});
  }

  const handleUpdateScore = (e) => {
    const newValue = e.target.value;
    setScore(newValue);
  }

  const handleUpdateNote = (e) => {
    setNote(e.target.value);
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mx-5 py-6">
            <h3>Add your rating for this session.</h3>
          </div>

          <div className="mb-4">
            <div className="mb-2">
              <label htmlFor="score">Your rating</label>
            </div>
            <Select value={score} onChange={(e) => handleUpdateScore(e)}>
              {
                scoreOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))
              }
            </Select>
          </div>

          <div>
            <div className="mb-2">
              <label htmlFor="notes">Your notes</label>
            </div>
            <Textarea id="notes" placeholder="Add your note..." rows={5} onChange={(e) => handleUpdateNote(e)} />
          </div>

          <div className="flex justify-start mt-4">
            <div className="mt-4 mr-4">
              <Button color="blue" type="submit">Save</Button>
            </div>

            <div className="mt-4 ml-4">
              <Button outline color="blue" onClick={(e) => handleShowDetail(e, 0)}>Cancel</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ScoreForm;
