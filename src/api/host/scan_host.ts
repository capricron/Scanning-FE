import { url } from "../../env";

// src/utils/api.js
export const scanTarget = async ({ name, host, nmap, nikto, nuclei }: any) => {
    try {
      const response = await fetch(`${url}/host`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, host, nmap, nikto, nuclei }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      console.log('oke')
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };
