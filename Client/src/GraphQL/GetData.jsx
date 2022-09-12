import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { LOAD_USERS } from "./Queries";

function GetUsers() {
  //const { error, loading, data } = useQuery(LOAD_USERS);
  const { data } = useQuery(LOAD_USERS);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (data) {
      setUsers(data.getAllUsers);
    }
  }, [data]);

  return (
    <div>
      {users.map((val) => {
        return (
          <h1 key={val.firstName}> {val.firstName + " " + val.lastName}</h1>
        );
      })}
    </div>
  );
}

export default GetUsers;
