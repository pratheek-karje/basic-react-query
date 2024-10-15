import { useQuery } from "@tanstack/react-query";
import { Item } from "./Item";
import axios from "axios";

export function Box() {

  const { data: items, error, isLoading } = useQuery({
    queryKey: ["ITEMS"],
    queryFn: async() => {
      try {
        const res = await axios.get("http://localhost:8000/todo");
        return res.data;
      } catch (err) {
        console.error("error:", err);
        throw err;
      }
    }
  });
  if (isLoading) return <p>Loading....</p>;
  if (error) return <p>Error loading items!</p>;

  return <>
    TODO items:
    <ol>
      {items.map(item => <Item key={item} item={item}></Item>)}
    </ol>
  </>
}


