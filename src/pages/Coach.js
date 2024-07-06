import Navigation from "../components/Navigation";
import UpcomingSessions from "../components/UpcomingSessions";

function Coach() {

  return (
    <div className="mx-auto flex flex-col justify-center items-center px-6 pt-8 pt:mt-0">
      <Navigation />
      <UpcomingSessions />

    </div>
  )
}

export default Coach;
