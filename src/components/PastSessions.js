import { useEffect, useState } from "react";
import { BaseService } from '../services/BaseService';
import { Button, Card } from "flowbite-react";
import { formatDate, getCalculatedTime } from "../utils/functions";
import ScoreForm from "./Score";
import { Rating } from "flowbite-react";

function PastSessions() {
  const [pastSessions, setPastSessions] = useState([]);
  const [showDetail, setShowDetail] = useState(0);

  const handleShowDetail = (e, id) => {
    e.preventDefault();
    setShowDetail(id);
  }

  useEffect(() => {
    const getPastSessions = async () => {
      try {
        const response = await BaseService.get(`past_session`);
        setPastSessions(response);
      } catch (e) {
        console.log(e)
      }
    }

    getPastSessions();
  }, [])


  return (
    <div className="mx-auto flex flex-col justify-center items-center px-6 pt-8 pt:mt-0">
      <div>
        <h2 className="mb-8">Past Sessions</h2>
      </div>

      <div>
        {
          pastSessions.length === 0 ? (
            <Card>
              <div>
                <span>No past sessions.</span>
              </div>
            </Card>
          ) : (
            pastSessions.map((session, index) => {
              return (
                <div key={index} className="mb-4">
                  <Card className="max-w-sm">
                    <div>
                      <h3>{formatDate(new Date(session.time_booked))}</h3>
                    </div>
                    <div>
                      { session.start_time } - { getCalculatedTime(session.start_time) }
                    </div>
                    <hr></hr>

                    <div>Coach: {session.coach_name}</div>
                    <div className="mb-4">Phone no: {session.coach_phone_no} </div>

                    <div>Student: {session.student_name}</div>
                    <div className="mb-4">Phone no: {session.student_phone_no}</div>

                    <Button onClick={(e) => handleShowDetail(e, session.id)} outline gradientDuoTone="purpleToBlue">Show Details</Button>
                    {
                      showDetail === session.id && (
                        session.rating == null ? (
                          <ScoreForm session={session} handleShowDetail={handleShowDetail} />
                        ): (
                          <Score session={session} />
                        )
                      )
                    }
                  </Card>
                </div>
              )
            })
          )
        }
      </div>
    </div>
  )
}

function Score({ session }) {
  const rating = [...Array(session.rating).keys()];
  const nonRated = [...Array(5 - session.rating).keys()];

  return (
    <div className="mt-8">
      <div className="flex justify-between">
        <p>Rating: </p>
        <Rating>
          {
            rating.map((r) => (
              <Rating.Star key={r} />
            ))
          }
          {
            nonRated.length > 0 ? (
              nonRated.map((x) => (
                <Rating.Star filled={false} key={x} />
              ))
            ) : null
          }
        </Rating>
      </div>
      <div className="flex justify-between">
        <p>Note:</p>
        <div>{session.note}</div>
      </div>
    </div>
  )
}

export default PastSessions;
