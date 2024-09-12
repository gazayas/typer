// TODO: Eventually use this in instead of the dummy data in the Typer component.

export function getQuotesFromApi() {
  // TODO: Add a link to the following link so people can bypass
  // the cors issue if they compile the program on their own machine:
  // https://cors-anywhere.herokuapp.com/

  // https://stackoverflow.com/questions/43462367/how-to-overcome-the-cors-issue-in-reactjs
  const corsBypassUrl = "https://cors-anywhere.herokuapp.com/"
  const quotesApi = "https://zenquotes.io/api/quotes"

  if (!quoteData) {
    fetch(corsBypassUrl + quotesApi)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        setQuotes(data) // TODO: await?
        // TODO: After the quotes are set, make TyperBox visible (or a class for a div inside it) visible.
      });
  } else {
    // TODO: Remind users to use the cors-anywhere link first
  }
}
