/* external imports */
import { Provider } from 'react-redux'
/* styles */
import '@/styles/globals.css'
import { store } from '@/core/reducers/store'

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store} >
      <Component {...pageProps} />
    </Provider>
  )
}
