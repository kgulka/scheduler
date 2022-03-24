export default function Error(props) {
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
    <main className="appointment__card appointment__card--error">
      <section className="appointment__error-message">
        <h1 className="text--semi-bold">Error</h1>
        <h3 className="text--light">{props.message}</h3>
      </section>
      <img
        className="appointment__error-close"
        src="images/close.png"
        alt="Close"
        onClick={props.onClose}
      />
    </main>
  );
}