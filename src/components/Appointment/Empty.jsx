export default function Empty(props) {
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
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  );
}