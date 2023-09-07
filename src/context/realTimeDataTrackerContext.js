import React from "react";
import { useState, useEffect, createContext } from "react";

export const RealTimeDataTrackerContext = createContext(null);

export const RealTimeDataTrackerContextProvider = (props) => {

    const [likesCount, setLikesCount] = useState([]);

    const contextValue = {likesCount, setLikesCount}


    return <RealTimeDataTrackerContext.Provider value={contextValue}>
        {props.children}
    </RealTimeDataTrackerContext.Provider>
}