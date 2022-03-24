
export default function Status(props) {
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
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">{props.message}</h1>
    </main>
  );
}