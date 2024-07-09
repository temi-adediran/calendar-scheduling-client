import { useContext, createContext, useState } from "react";
import UpcomingSessions from "../components/UpcomingSessions";
import { Button } from "flowbite-react";
import SelectCoach from "../components/SelectCoach";

const TabContext = createContext({
  activeTabValue: null,
  setActiveTabValue: () => {}
});

function TabProvider({children}) {
  const [activeTabValue, setActiveTabValue] = useState('upcoming-sessions');

  return (
    <TabContext.Provider value={{activeTabValue, setActiveTabValue}}>
      {children}
    </TabContext.Provider>
  );
}

function TabTrigger({ value, children }) {
  const { activeTabValue, setActiveTabValue } = useContext(TabContext);

  const handleSetActiveTabValue = () => {
    setActiveTabValue(value);
  };

  return (
    <div>
      <Button
      outline
      gradientDuoTone="purpleToBlue"
      onClick={handleSetActiveTabValue}
      className={`tab mx-8 ${activeTabValue === value ? "active" : ""}`}
    >
      {children}
      </Button>
    </div>
  );
}

function TabContent({value, children}) {
  const {activeTabValue} = useContext(TabContext);

  if(activeTabValue !== value) return null;

  return children;
}


function Student() {
  return (
    <div className="mx-auto flex flex-col justify-center px-6 pt-8 pt:mt-0">
      <section>
        <h1 className="mb-8">Student Dashboard</h1>
        <TabProvider>
          <div className="tabs flex justify-center">
            <TabTrigger value="upcoming-sessions">Upcoming Sessions</TabTrigger>
            <TabTrigger value="book-session">Book a New Session</TabTrigger>
          </div>
          <TabContent value="upcoming-sessions"><UpcomingSessions /></TabContent>
          <TabContent value="book-session"><SelectCoach /></TabContent>
        </TabProvider>
      </section>
    </div>
  )
}

export default Student;
