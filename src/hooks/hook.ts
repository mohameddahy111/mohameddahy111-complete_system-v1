"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export const useGetData = (url: string) => {
  const [data, setData] = useState<[] | null>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState<boolean | null>(null);
  const getData = async () => {
    return axios.get(url);
  };

  useEffect(() => {
    setLoading(true);
    getData()
      .then((data) => {
        setData(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response.data.message);
        setLoading(false);
      });
  }, []);
  return {
    data,
    error,
    loading
  };
};

// export const usePostDataTrip = (url: string, values: any, fun?: Function) => {
//   const { enqueueSnackbar } = useSnackbar();
//   const [data, setData] = useState<[] | null>([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState<boolean | null>(null);
//   const postData = async () => {
//     return axios.post(url, values);
//   };

//   useEffect(() => {
//     setLoading(true);
//     postData()
//       .then((res) => {
//         if (res.status === 200) {
//           enqueueSnackbar(`${res.data.message}`, { variant: "success" });
//           setLoading(false);
//           if (fun) {
//             fun();
//           }
//         } else {
//           enqueueSnackbar(`${res.data.message}`, { variant: "error" });
//           setLoading(false);
//         }
//       })
//       .catch((error) => {
//         setError(error.response.data.message);
//         setLoading(false);
//       });
//   }, []);
//   return {
//     data,
//     error,
//     loading
//   };
// };
