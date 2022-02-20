const Notification = ({ message, errorOrNotification }) => {
    if (message === null) {
      return null
    }
    
    return (
      <div className={errorOrNotification === "error" ? 'error' : "notification"}>
        {message}
      </div>
    )
  }
  
  export default Notification