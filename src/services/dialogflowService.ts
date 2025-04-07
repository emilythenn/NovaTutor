export const sendMessageToDialogflow = async (message: string): Promise<string> => {
  const proxyUrl = "http://localhost:5001/proxy";

  try {
    const response = await fetch(proxyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        queryResult: { queryText: message },
      }),
    });

    if (!response.ok) {
      console.error("Error response from proxy server:", response.statusText);
      return "An error occurred while communicating with the server.";
    }

    const data = await response.json();
    return data.fulfillmentText || "Sorry, I couldn't process your request.";
  } catch (error) {
    console.error("Error communicating with proxy server:", error);
    return "An error occurred while processing your request.";
  }
};