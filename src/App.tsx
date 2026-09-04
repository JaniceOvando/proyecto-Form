import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";

type Info = {
  version: string;
  app: string;
};

function App() {

  const [info, setInfo] = useState<Info | null>(null);

  useEffect(() => {

    async function obtenerInfo() {

      const response = await fetch(
        "https://d3ujwk09smrk9z.cloudfront.net/info"
      );

      const data = await response.json();

      console.log(data);

      setInfo(data);
    }

    obtenerInfo();

  }, []);

  return (
    <Stack spacing={2} sx={{ padding: 3 }}>

      <h1>TaskFlow API</h1>

      {info && (
        <div>
          <p>Aplicación: {info.app}</p>
          <p>Versión: {info.version}</p>
        </div>
      )}

    </Stack>
  );
}

export default App;