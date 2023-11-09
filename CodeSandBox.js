import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [fetchData,setFetchData]=useState([])
  const [showData, setShowData] = useState(false);

  const pushData = { id: 101, title: "New book", body: "kids", userId: 1 };
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(pushData)
        }
      ).then((result) => {
        console.log(result);
        result.json().then((apiData) => {
          console.warn("response", [apiData]);
          setData([apiData]);
          console.log(data);
        });
      });
    };
    fetchData();
  }, []);

  const fetchPostData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const result = await response.json();
    console.log(result);
    setFetchData(result)
  };
  const handleButtonClick = () => {
    setShowData(!showData);
    fetchPostData();
  };
  return (
    <div className="App">
  <h1>Hello CodeSandbox</h1>
  <table style={{ border: '2px solid black', width: '100%', borderCollapse: 'collapse' }}>
    <tbody>
      <tr>
        <th style={{ border: '1px solid black', padding: '8px' }}>Id</th>
        <th style={{ border: '1px solid black', padding: '8px' }}>Title</th>
        <th style={{ border: '1px solid black', padding: '8px' }}>Body</th>
        <th style={{ border: '1px solid black', padding: '8px' }}>UserId</th>
      </tr>
      {showData &&
        data.map((ele) => (
          <tr key={ele.id}>
            <td style={{ border: '1px solid black', padding: '8px' }}>{ele.id}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{ele.title}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{ele.body}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{ele.userId}</td>
          </tr>
        ))}
    </tbody>
  </table>
  <h1>
    <button onClick={handleButtonClick}>! Show Created data</button>
  </h1>
</div>

  );
}
