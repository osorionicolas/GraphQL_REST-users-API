import './App.css'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from
} from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import { GetUsers } from './components/GetUsers'
import { Form } from './components/Form'

const errorLink = onError(({ graphqlErrors, networkError}) => {
  if(graphqlErrors){
    graphqlErrors.map(({message, location, path}) => {
      alert(`Graphql error ${message}`)
    })
  }
  if(networkError){
    alert(`Network error ${networkError}`)
  }
})

const link = from([
  errorLink,
  new HttpLink({uri: "http://localhost:9000/graphql"})
])

const client = new ApolloClient({
  cache: new InMemoryCache,
  link: link
})

function App() {
  return (
    <ApolloProvider client={client}>
      <GetUsers />
      {/*<Form />*/}
    </ApolloProvider>
  )
}

export default App
