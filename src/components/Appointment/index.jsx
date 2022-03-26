import "components/Appointment/styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

// export default function Appointment({ interview={student: "", interviewer: {} }, ...props}) {
//   const { student, interviewer } = interview;
//   return (
//     <article className="appointment">
//       <Header time={props.time} />
//       {interviewer.name && <Show student={student} interviewer={interviewer.name}/> }
//       {!interviewer.name && <Empty  /> } 
//     </article>
//   );
// }

export default function Appointment(props) {

  return (
    <article className="appointment">
      <Header time={props.time} />
      {props.interview ? <Show student={props.interview.student} interview={props.interview.interviewer} />
      : <Empty />}
    </article>
  );
}
/* <Show student={props.interview.student} interviewer={props.interview.interviewer.name}/> }    */