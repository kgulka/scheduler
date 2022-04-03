import "components/Appointment/styles.scss";
import useVisualMode from "../../hooks/useVisualMode";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    return props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(function (error) {
        transition(ERROR_SAVE, true);
      });
  }
  function confirm() {
    transition(CONFIRM);
  }
  function confirmDelete() {
    deleteInterview();
  }
  function cancelDelete() {
    back();
  }

  function deleteInterview() {
    transition(DELETE, true);
    return props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(function (error) {
        transition(ERROR_DELETE, true);
      });
  }
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && (
        <Empty
          onAdd={() => {
            console.log("Clicked onAdd");
            transition(CREATE);
          }}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview ? props.interview.student : null}
          interviewer={props.interview ? props.interview.interviewer : null}
          onDelete={confirm}
          onEdit={() => transition(EDIT)}
        />
      )}

      {mode === SAVING && <Status message={"Saving..."} />}
      {mode === CONFIRM && (
        <Confirm
          message="Do you want to delete this interview?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
      {mode === DELETE && <Status message={"Deleting..."} />}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => {
            back();
          }}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          student={props.interview ? props.interview.student : null}
          interviewer={
            props.interview
              ? props.interview.interviewer
                ? props.interview.interviewer.id
                : null
              : null
          }
          onSave={save}
          onCancel={() => {
            back();
          }}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Could not save appointment."
          onClose={() => {
            back();
          }}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="Could not save appointment."
          onClose={() => {
            back();
          }}
        />
      )}
    </article>
  );
}
