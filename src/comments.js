import { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";

export default function Comments() {
  const [error, setError] = useState(null);
  const [isLoaded, setLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/comments/")
      .then((resolve) => {
        console.log(resolve.data);
        setLoaded(true);
        setItems(resolve.data);
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      });
  }, []);

  if (error) return <div className="error">Error: error</div>;
  if (!isLoaded) return <div className="loading">Loading..</div>;
  else
    return (
      <ul className="comments">
        {Array.from(items).map((item) => (
          <li key={item.id}>
            <strong>-{item.name}</strong> - {item.body}
            <br />
          </li>
        ))}
      </ul>
    );
}
