import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./App.css";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>[table]</div>
    </ApolloProvider>
  );
}

export default App;
