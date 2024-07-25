import { useAuth } from "../hooks/useAuth";
import { Card } from "flowbite-react";
import { getCalculatedTime, formatDateWithDay } from "../utils/functions";
import { useData } from "../hooks/useData";

function UpcomingSessions() {
  const { isAuthenticated } = useAuth();
  const url = `upcoming_session?user_type=${isAuthenticated}`;
  const [upcomingSessions] = useData(url, []);

  // useEffect(() => {
  //   const getUpcomingSessions = async () => {
  //     try {
  //       const response = await BaseService.get(`upcoming_session?user_type=${isAuthenticated}`);
  //       setUpcomingSessions(response);
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   }

  //   getUpcomingSessions();
  // }, [isAuthenticated])


  return (
    <div className="mx-auto flex flex-col justify-center items-center px-6 pt-8 pt:mt-0">
      <div>
        <h2 className="mb-8">Upcoming Sessions</h2>
      </div>

      <div>
        {
          upcomingSessions.length === 0 ? (
            <Card>
              <div>
                <span>No upcoming sessions.</span>
              </div>
            </Card>
          ) : (
            upcomingSessions.map((session, index) => {
              return (
                <div key={index} className="mb-4">
                  <Card className="max-w-sm">
                    <div>
                      <h3>{formatDateWithDay(new Date(session.time_booked))}</h3>
                    </div>
                    <div>
                      { session.start_time } - { getCalculatedTime(session.start_time) }
                    </div>
                    <hr></hr>
                    {
                      isAuthenticated === "student" && (
                        <>
                          <div>Coach: {session.coach_name}</div>
                          <div className="mb-4">Phone no: {session.coach_phone_no} </div>
                        </>
                      )
                    }

                    {
                      isAuthenticated === "coach" && (
                        <>
                          <div>Student: {session.student_name}</div>
                          <div>Phone no: {session.student_phone_no}</div>
                        </>
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

export default UpcomingSessions;
