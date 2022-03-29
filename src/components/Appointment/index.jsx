import "components/Appointment/styles.scss";
import useVisualMode from "../../hooks/useVisualMode";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

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
  function confirm() {
    transition(CONFIRM);
  }
  function confirmDelete () {
    deleteInterview();
  } 
  function cancelDelete () {
    back();
  } 

  function deleteInterview () {
    transition(DELETE);
    props.cancelInterview(props.id)
      .then (() =>  {
        console.log("deleteInterview success:", props.id)
        transition(EMPTY);
       });   
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
          onDelete={confirm}
          onEdit={()=>transition(EDIT)}
        />
      )}

      {mode === SAVING && (
        <Status message={"Saving..."} />
      )}
      {mode === CONFIRM && (
        <Confirm 
          message="Do you want to delete this interview?"
          onConfirm={confirmDelete} 
          onCancel={cancelDelete}
        />
      )}       
      {mode === DELETE && (
        <Status message={"Deleting..."} />
      )}       
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => {back(); }}
        />
      )}
      {mode === EDIT && (
        <Form
        interviewers={props.interviewers}
        student={props.interview? props.interview.student : null}
        interviewer={props.interview? props.interview.interviewer.id : null}
        onSave={save}
        onCancel={() => {back(); }}
      />
      )}

    </article>
  );
}
