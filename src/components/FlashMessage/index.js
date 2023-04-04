import React from "react";
import { useContext } from "react";
import FlashMessageContext from "../../context/FlashMessage/flashMessageContext";
import "./FlashMessage.scss";
const FlashMessage = () => {
  const flashMessageContext = useContext(FlashMessageContext);
  return (
    <>
      {flashMessageContext.notification !== null && (
        <div className={flashMessageContext.notification}>
          <p> {flashMessageContext.notificationText} </p>
        </div>
      )}
    </>
  );
};
export default FlashMessage;
