import "components/Appointment/styles.scss";
import useVisualMode from "../../hooks/useVisualMode";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save (name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then (() =>  transition(SHOW));
   
  } 
  return (

    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => {
            console.log("Clicked onAdd"); 
            transition(CREATE);
        }} />}
      {mode === SHOW && (
        <Show
          student={props.interview? props.interview.student : null}
          interviewer={props.interview? props.interview.interviewer: null}
        />
      )}
      {mode === SAVING && (
        <Status message={"Saving..."} />
      )}
       {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => {back(); }}
        />
      )}
    </article>
  );
}
