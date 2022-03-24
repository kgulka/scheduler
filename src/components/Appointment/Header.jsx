export default function Header(props) {
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

    <header className="appointment__time">
      <h4 className="text--semi-bold">{props.time}</h4>
      <hr className="appointment__separator" />
    </header>
  );
}