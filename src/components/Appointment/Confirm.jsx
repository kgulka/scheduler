import Button from "../Button";
export default function Confirm(props) {
  // const intListArr = props.interviewers.map(item => { 
  //   console.log("Lprops.selected:", props.selected);
    
  //   return (
  //     <InterviewerListItem 
  //       key={item.id} 
  //       name={item.name} 
  //       avatar={item.avatar} 
  //       selected={item.id === props.value} 
  //       setInterviewer={() => props.onChange(item.id)} 
  //     />
  //   )
  // });

  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="appointment__actions">
        <Button onClick={props.onCancel} danger>Cancel</Button>
        <Button onClick={props.onConfirm} danger>Confirm</Button>
      </section>
    </main>
  );
}