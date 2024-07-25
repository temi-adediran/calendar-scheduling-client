import { useState, useEffect } from "react";
import { BaseService } from '../services/BaseService';

export const useData = (url, defaultState) => {
  const [data, setData] = useState(defaultState);

  useEffect(() => {
    let ignore = false;

    const getData = async () => {
      try {
        const response = await BaseService.get(url);
        if (!ignore) { setData(response) }
      } catch (e) {
        console.log(e)
      }
    }

    getData();

    return () => {
      ignore = true;
    };
  }, [url])

  return [data, setData];
}
