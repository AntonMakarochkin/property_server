import axios from "axios";


export async function addCourseToUser(customer: string) {
  const response = axios.post("http://localhost:3000/buy_course", {
    customer,
  });
  return response;
}

export default {};
